"use client";
import { useEffect, useState } from "react";

export default function Ambience() {
  const [paused, setPaused] = useState(false);
  const [dots, setDots] = useState<Array<{x:number;y:number;s:number;d:number}>>([]);
  useEffect(() => {
    setDots(Array.from({length:34}, (_, i) => ({x:(i*37)%100,y:(i*61)%100,s:2+(i%4),d:(i%7)*0.8})));
  }, []);
  return <>
    <div className={`particles ${paused ? "paused" : ""}`} aria-hidden>
      {dots.map((p,i)=><i key={i} style={{left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,animationDelay:`${p.d}s`}} />)}
    </div>
    <button className="sound" onClick={()=>setPaused(v=>!v)} aria-label="Toggle ambience animation">◒ {paused ? "AMBIENCE OFF" : "AMBIENCE ON"}</button>
  </>;
}
