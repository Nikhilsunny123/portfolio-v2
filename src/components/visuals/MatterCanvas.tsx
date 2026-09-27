"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_reduceMotion;

varying vec2 vUv;
varying vec3 vPosition;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
  // Base dark obsidian
  vec3 color = vec3(0.02, 0.02, 0.024);
  
  float time = u_reduceMotion > 0.5 ? 0.0 : u_time * 0.15;
  
  // Domain warping for flowing aurora effect
  vec2 q = vec2(0.0);
  q.x = snoise(st + vec2(time, time * 0.5));
  q.y = snoise(st + vec2(time * 0.3, time * 0.8));
  
  vec2 r = vec2(0.0);
  r.x = snoise(st + 1.0 * q + vec2(time * 1.5, time * 0.9));
  r.y = snoise(st + 1.0 * q + vec2(time * 0.8, time * 1.2));
  
  float f = snoise(st + r * 2.0 + time * 0.5);
  
  // Subtle colors: Cyan, Electric Blue, Violet
  vec3 c1 = vec3(0.0, 0.9, 1.0) * 0.08; // Cyan
  vec3 c2 = vec3(0.23, 0.51, 0.96) * 0.07; // Blue
  vec3 c3 = vec3(0.54, 0.36, 0.96) * 0.06; // Violet
  
  color += c1 * (snoise(st * 2.0 + r + time) * 0.5 + 0.5);
  color += c2 * (snoise(st * 3.0 + q + time * 1.2) * 0.5 + 0.5);
  color += c3 * (snoise(st * 1.5 + r - time * 0.8) * 0.5 + 0.5);
  
  // Add gentle mouse interaction
  float mouseGlow = max(0.0, 1.0 - distance(st, u_mouse) * 1.5);
  color += vec3(0.05, 0.1, 0.2) * mouseGlow * (1.0 - u_reduceMotion);
  
  // Vignette for depth
  float vignette = st.x * st.y * (1.0 - st.x) * (1.0 - st.y);
  vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
  color *= vignette;
  
  gl_FragColor = vec4(color, 1.0);
}
`;

export function MatterCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Orthographic camera for full screen shader
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false, // Not needed for pure shader
      powerPreference: "high-performance",
    });
    
    // Cap pixel ratio to 1.5 for performance as requested
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mountRef.current.appendChild(renderer.domElement);

    // Full screen plane
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_reduceMotion: { value: prefersReducedMotion ? 1.0 : 0.0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse Interaction
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    const onDocumentMouseMove = (event: MouseEvent) => {
      targetMouseX = event.clientX / window.innerWidth;
      // WebGL y is flipped
      targetMouseY = 1.0 - (event.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", onDocumentMouseMove);

    // Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };
    
    // Initial size
    handleResize();
    window.addEventListener("resize", handleResize);

    // Visibility / Activity checks
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      if (isVisible) {
        const delta = clock.getDelta();
        uniforms.u_time.value += delta;
        
        // Lerp mouse
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
        uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

        renderer.render(scene, camera);
      } else {
        // Still consume clock to avoid large jumps when returning
        clock.getDelta();
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ background: "#050506" }} // Match base obsidian
    />
  );
}
