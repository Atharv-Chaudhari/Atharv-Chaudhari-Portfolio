"use client";
import { useEffect, useRef } from "react";

type SceneProps = { src: string; className?: string; intensity?: number };

export default function Scene({ src, className = "", intensity = 1 }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty("--mx", `${x * 1.5 * intensity}px`);
      el.style.setProperty("--my", `${y * 1.0 * intensity}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [intensity]);
  return (
    <div ref={ref} className={`scene ${className}`}>
      <div className="scene-image" style={{ backgroundImage: `url(${src})` }} />
      <div className="scene-vignette" />
      <div className="scene-haze" />
    </div>
  );
}
