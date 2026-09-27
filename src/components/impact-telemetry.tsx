import { Card, CardContent } from "@/components/ui/card";

export function ImpactTelemetry() {
  const metrics = [
    { label: "Commits (Across 6 Core Microservices)", value: "2,300+" },
    { label: "Concurrent WebSockets (JMeter Tested)", value: "1,000" },
    { label: "SSE Token Latency (Progressive AI Stream)", value: "<100ms" },
    { label: "Query Optimization (Report Generation)", value: "50%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto my-8">
      {metrics.map((metric, i) => (
        <Card key={i} className="bg-background/20 backdrop-blur border-white/10 hover:bg-background/40 transition-colors">
          <CardContent className="p-6 flex flex-col gap-2">
            <span className="text-3xl font-bold text-primary tracking-tighter">
              {metric.value}
            </span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider font-mono">
              {metric.label}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
