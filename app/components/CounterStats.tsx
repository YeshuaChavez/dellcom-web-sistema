"use client";

import { useEffect, useState, useRef } from "react";

interface Stat {
  current: number;
  target: number;
  suffix: string;
  label: string;
}

export default function CounterStats() {
  const [stats, setStats] = useState<Stat[]>([
    { current: 0, target: 10, suffix: "+", label: "Años de Experiencia" },
    { current: 0, target: 15, suffix: "k+", label: "Reparaciones Exitosas" },
    { current: 0, target: 99, suffix: "%", label: "Satisfacción Cliente" }
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation duration

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out quadratic: progress * (2 - progress)
      const ease = progress * (2 - progress);

      setStats((prev) =>
        prev.map((stat) => {
          const val = Math.floor(ease * stat.target);
          return { ...stat, current: val };
        })
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted]);

  return (
    <div ref={sectionRef} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="p-8 bg-white/10 backdrop-blur-sm rounded-[2rem] border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
        >
          <span className="font-headline text-5xl font-extrabold block mb-2 text-white tabular-nums">
            {stat.current}{stat.suffix}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
