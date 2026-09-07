"use client";
import { useEffect, useRef } from "react";

export default function WorldFX({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf=0, w=0, h=0;
    const dots = Array.from({length: 75}, (_,i)=>({x:Math.random(),y:Math.random(),s:0.4+Math.random()*1.6,v:0.05+Math.random()*0.16,p:Math.random()*Math.PI*2,leaf:i%4===0}));
    const resize=()=>{w=canvas.width=window.innerWidth*devicePixelRatio;h=canvas.height=window.innerHeight*devicePixelRatio;canvas.style.width=window.innerWidth+'px';canvas.style.height=window.innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};
    const draw=(t:number)=>{ctx.clearRect(0,0,innerWidth,innerHeight); dots.forEach(d=>{d.y-=d.v*0.002*intensity; d.x+=Math.sin(t*.00025+d.p)*.00025*intensity;if(d.y<-.05)d.y=1.05; if(d.x<-.05)d.x=1.05;if(d.x>1.05)d.x=-.05; const x=d.x*innerWidth,y=d.y*innerHeight;ctx.globalAlpha=.18+.18*Math.sin(t*.001+d.p);ctx.fillStyle=d.leaf?'#d6b36b':'#e7f2d5';ctx.beginPath();ctx.arc(x,y,d.s,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;raf=requestAnimationFrame(draw)};
    resize(); window.addEventListener('resize',resize); raf=requestAnimationFrame(draw); return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)};
  },[intensity]);
  return <canvas ref={ref} className="world-fx" aria-hidden="true"/>;
}
