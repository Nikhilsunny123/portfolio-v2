"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function MatterCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050506, 0.05);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Objects
    const group = new THREE.Group();
    scene.add(group);

    // 1. Wireframe Polyhedra
    const icosahedronGeometry = new THREE.IcosahedronGeometry(3, 1);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    group.add(icosahedron);

    const torusGeometry = new THREE.TorusKnotGeometry(4, 0.5, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x9d00ff,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    group.add(torus);

    // 2. Matter Dust Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    group.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", onDocumentMouseMove);
    window.addEventListener("scroll", onScroll);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      group.rotation.y += 0.002;
      group.rotation.x += 0.001;

      icosahedron.rotation.x = elapsedTime * 0.2;
      icosahedron.rotation.y = elapsedTime * 0.3;

      torus.rotation.x = elapsedTime * -0.1;
      torus.rotation.y = elapsedTime * -0.2;

      // Parallax & Scroll target interpolation
      const targetCamX = mouseX * 0.003;
      const targetCamY = -mouseY * 0.003 - scrollY * 0.002;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onDocumentMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose Geometries and Materials
      icosahedronGeometry.dispose();
      icosahedronMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ background: "#050506" }}
    />
  );
}
