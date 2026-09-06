"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Scene = { id:string; eyebrow:string; title:string; subtitle:string; image:string; tone:string; location:string; action:string };
type Project = { id:string; title:string; tag:string; stack:string; metric:string; story:string; scene:string };

const scenes:Scene[] = [
  {id:"arrival",eyebrow:"CHAPTER 01 · THE TRAILHEAD",title:"The Journey Begins",subtitle:"AI · ML · DATA · AUTONOMY",image:"/assets/jungle-river.png",tone:"jungle",location:"River Valley",action:"ENTER THE JOURNEY"},
  {id:"about",eyebrow:"CHAPTER 02 · THE EXPLORER",title:"Meet the Builder",subtitle:"4+ YEARS · PRODUCTION SYSTEMS",image:"/assets/jungle-river.png",tone:"sun",location:"Canopy Ridge",action:"DISCOVER MY STORY"},
  {id:"experience",eyebrow:"CHAPTER 03 · THE ASCENT",title:"From Data to Systems",subtitle:"ENGINEERING · CLOUD · SCALE",image:"/assets/jungle-river.png",tone:"mountain",location:"The Ascent",action:"TRACE THE PATH"},
  {id:"projects",eyebrow:"CHAPTER 04 · THE DISCOVERY",title:"Field Notes",subtitle:"AGENTS · ML · DATA PRODUCTS",image:"/assets/jungle-river.png",tone:"ruins",location:"Temple of Systems",action:"OPEN DISCOVERIES"},
  {id:"skills",eyebrow:"CHAPTER 05 · THE ARSENAL",title:"Tools of the Expedition",subtitle:"PYTHON · LANGGRAPH · GCP · AZURE",image:"/assets/jungle-river.png",tone:"mist",location:"Research Camp",action:"INSPECT THE ARSENAL"},
  {id:"research",eyebrow:"CHAPTER 06 · THE LAB",title:"Questions Worth Chasing",subtitle:"NLP · KNOWLEDGE · INTELLIGENCE",image:"/assets/jungle-river.png",tone:"blue",location:"The Hidden Lab",action:"READ RESEARCH"},
  {id:"robotics",eyebrow:"CHAPTER 07 · THE FRONTIER",title:"Intelligence, Embodied",subtitle:"ROBOTICS · AUTONOMY · HUMAN-AI",image:"/assets/jungle-river.png",tone:"future",location:"The Frontier",action:"ENTER THE FRONTIER"},
  {id:"vision",eyebrow:"CHAPTER 08 · THE HORIZON",title:"The Intelligent Future",subtitle:"QUANTUM EVOLUTION · HUMAN-AI CONVERGENCE",image:"/assets/jungle-river.png",tone:"dawn",location:"Horizon Point",action:"SEE THE VISION"},
  {id:"contact",eyebrow:"CHAPTER 09 · THE CAMP",title:"Continue the Expedition",subtitle:"LET'S BUILD WHAT COMES NEXT",image:"/assets/jungle-river.png",tone:"warm",location:"Base Camp",action:"MAKE CONTACT"},
];

const projects:Project[] = [
 {id:"insights",title:"Dashboardless Insights",tag:"AGENTIC AI",stack:"LangChain · LangGraph · LangSmith · AGUI",metric:"60–70% faster insight retrieval",story:"Decision-ready answers without waiting for a dashboard. Built for business users and 20+ stakeholders.",scene:"The Observatory"},
 {id:"monday",title:"Agent Monday",tag:"AUTOMATION",stack:"OpenAI Agents SDK · Celery · Kubernetes · FastAPI · OKTA",metric:"70% faster reporting · 99%+ weekly reliability",story:"A production agent workflow that turns recurring reporting into an autonomous operating loop.",scene:"The Operations Camp"},
 {id:"shopping",title:"Shopping Assistant",tag:"MULTI-AGENT",stack:"Google ADK · GCP · Retail AI",metric:"1K+ sessions · ~40% recommendation improvement",story:"A real-time shopping companion combining tools, memory and agentic orchestration for retail journeys.",scene:"The River Market"},
 {id:"skillsmap",title:"Client Skillset Mapping",tag:"KNOWLEDGE AI",stack:"LangGraph · OCR · Enterprise Graph · NLP",metric:"~50% team-fit accuracy improvement",story:"Connected documents, skills and people into a knowledge-driven matching workflow.",scene:"The Archive"},
 {id:"rdw",title:"RICOM RDW Migration",tag:"DATA ENGINEERING",stack:"PySpark · Databricks · ADLS Gen2 · Synapse",metric:"~40% ETL latency reduction · 14 data cubes",story:"A resilient migration and optimization path for enterprise data workloads at scale.",scene:"The Engine Room"},
 {id:"assessnex",title:"AssessNex AI",tag:"RESEARCH / PRODUCT",stack:"Azure OpenAI · LangGraph · FastAPI · RAG",metric:"Multi-agent assessment generation",story:"An M.Tech project exploring agent orchestration, Bloom calibration, RAG and validation for educational assessment generation.",scene:"The Ancient Library"},
];

const skillGroups = [
 ["Agentic AI","LangChain","LangGraph","DeepAgents","MCP","Google ADK","OpenAI Agents SDK"],
 ["ML Engineering","ML workflows","Feature engineering","Model serving","Evaluation & monitoring"],
 ["Data Engineering","ETL / ELT","Data pipelines","Feature Stores","Data optimization"],
 ["Cloud & Data","GCP","Azure","Databricks","BigQuery","Vertex AI","Bigtable"],
 ["Backend & Systems","Python","FastAPI","PostgreSQL","REST APIs","Scalable architectures"],
];

function Glyph({type}:{type:string}) { const paths:any={arrow:"M4 12h15m-6-6 6 6-6 6",compass:"M12 3l3 6-3 12-3-12 3-6Z",play:"M8 5l11 7-11 7V5Z",map:"M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z",close:"M5 5l14 14M19 5 5 19",menu:"M4 7h16M4 12h16M4 17h16"}; return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[type]||paths.arrow}/></svg> }

export default function Page(){
 const [index,setIndex]=useState(0); const [menu,setMenu]=useState(false); const [modal,setModal]=useState<Project|null>(null); const [sound,setSound]=useState(false); const [hud,setHud]=useState(true); const [explore,setExplore]=useState(false); const [mouse,setMouse]=useState({x:0,y:0});
 const root=useRef<HTMLDivElement>(null);
 const scene=scenes[index];
 const progress=Math.round(((index)/(scenes.length-1))*100);
 const next=()=>setIndex(v=>Math.min(v+1,scenes.length-1)); const prev=()=>setIndex(v=>Math.max(v-1,0));
 useEffect(()=>{ const onKey=(e:KeyboardEvent)=>{if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")next(); if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")prev(); if(e.key==="Escape"){setModal(null);setMenu(false);setExplore(false)}}; window.addEventListener("keydown",onKey); return()=>window.removeEventListener("keydown",onKey)},[]);
 useEffect(()=>{ const onMove=(e:MouseEvent)=>setMouse({x:(e.clientX/window.innerWidth-.5)*2,y:(e.clientY/window.innerHeight-.5)*2}); window.addEventListener("mousemove",onMove); return()=>window.removeEventListener("mousemove",onMove)},[]);
 const currentProjects=useMemo(()=>projects.filter(p=>p.id!=="rdw"||index>1),[index]);
 return <main ref={root} className={`game ${scene.tone} ${hud?"hud-on":"hud-off"}`} style={{"--mx":mouse.x,"--my":mouse.y} as React.CSSProperties}>
   <div className="scene" aria-hidden="true">
     <div className="scene-image" style={{backgroundImage:`url(${scene.image})`}} />
     <div className="parallax parallax-fog"/><div className="parallax canopy"/><div className="parallax birds">✦　·　✦　　　·　✦</div>
     <div className="water-shimmer"/><div className="leaf-field">{Array.from({length:22}).map((_,i)=><i key={i} style={{left:`${(i*47)%100}%`,top:`${(i*31)%90}%`,animationDelay:`-${i*.41}s`}}/>)}</div>
     <div className="film"/>
   </div>
   <header className="topbar">
     <button className="brand" onClick={()=>setIndex(0)}><span className="brand-mark">AC</span><span><b>Atharv Chaudhari</b><small>AI / ML ENGINEER</small></span></button>
     <nav className="desktop-nav">{scenes.slice(0,7).map((s,i)=><button key={s.id} className={i===index?"active":""} onClick={()=>setIndex(i)}>{String(i+1).padStart(2,"0")} {s.id}</button>)}</nav>
     <div className="top-actions"><button onClick={()=>setSound(v=>!v)} className="tiny">{sound?"SOUND ON":"SOUND OFF"}</button><button onClick={()=>setHud(v=>!v)} className="tiny">HUD {hud?"ON":"OFF"}</button><button className="menu-btn" onClick={()=>setMenu(v=>!v)} aria-label="Menu"><Glyph type={menu?"close":"menu"}/></button></div>
   </header>
   {menu&&<div className="mobile-menu">{scenes.map((s,i)=><button key={s.id} onClick={()=>{setIndex(i);setMenu(false)}}><span>{String(i+1).padStart(2,"0")}</span>{s.title}</button>)}</div>}
   <section className="hero-copy">
      <div className="chapter-label"><span className="dot"/> {scene.eyebrow}</div>
      <h1>{scene.title}</h1><p>{scene.subtitle}</p>
      <div className="hero-actions"><button className="primary" onClick={()=>{if(index===3)setExplore(true);else next()}}><Glyph type="play"/>{scene.action}</button><button className="ghost" onClick={()=>setIndex(Math.min(index+2,scenes.length-1))}><Glyph type="compass"/>SKIP AHEAD</button></div>
      <div className="location"><span>◈</span> {scene.location}<b> / </b> {String(index+1).padStart(2,"0")} of {String(scenes.length).padStart(2,"0")}</div>
   </section>
   <aside className="profile-card">
      <div className="card-top"><span>FIELD DOSSIER</span><span>AC / 2026</span></div>
      <h2>AI / ML<br/><em>Engineer</em></h2>
      <p>Building intelligent systems across data, agents, ML and autonomy.</p>
      <div className="stats"><span><b>4+</b> YEARS</span><span><b>12+</b> PROJECTS</span><span><b>5+</b> RESEARCH</span></div>
      <button onClick={()=>setIndex(1)}>OPEN DOSSIER <Glyph type="arrow"/></button>
   </aside>
   <div className="left-rail"><div className="rail-line"/><span>EXPLORE</span><button onClick={prev} disabled={index===0}>↑</button><button onClick={next} disabled={index===scenes.length-1}>↓</button></div>
   <div className="bottom-hud">
      <div className="progress-meta"><span>EXPEDITION PROGRESS</span><b>{progress}%</b></div><div className="progress"><i style={{width:`${Math.max(8,progress)}%`}}/></div>
      <div className="chapters">{scenes.map((s,i)=><button key={s.id} onClick={()=>setIndex(i)} className={i===index?"selected":""}><span>{String(i+1).padStart(2,"0")}</span><small>{s.title}</small></button>)}</div>
      <div className="controls"><span><kbd>A</kbd><kbd>D</kbd> MOVE</span><span><kbd>←</kbd><kbd>→</kbd> CHAPTER</span><button onClick={()=>setExplore(true)}>ENTER FREE EXPLORE <Glyph type="arrow"/></button></div>
   </div>
   <div className="scroll-cue"><span>SCROLL TO MOVE</span><i>↓</i></div>
   <section className="content-world">
     <div className="world-header"><span>DISCOVERIES</span><h2>Artifacts from the expedition.</h2><p>Short stories. Deep systems. Open what interests you.</p></div>
     <div className="project-grid">{currentProjects.map(p=><article className="project-card" key={p.id} onClick={()=>setModal(p)}><div className="project-scene"><span>{p.scene}</span><b>{p.tag}</b><div className="ruin-glyph">◈</div></div><div className="project-body"><h3>{p.title}</h3><p>{p.metric}</p><small>{p.stack}</small><button>INSPECT ARTIFACT <Glyph type="arrow"/></button></div></article>)}</div>
     <div className="journey-panels"><article><span>01 · THE BUILDER</span><h3>From curiosity to production.</h3><p>Production AI/ML, agentic workflows, data engineering and cloud systems.</p><button onClick={()=>setIndex(2)}>TRACE EXPERIENCE →</button></article><article><span>02 · THE RESEARCHER</span><h3>Questions become systems.</h3><p>NLP, knowledge-driven ML, multi-agent architectures and evaluation.</p><button onClick={()=>setIndex(5)}>ENTER RESEARCH →</button></article><article><span>03 · THE FRONTIER</span><h3>Intelligence gets embodied.</h3><p>Robotics, autonomy, quantum evolution and human-AI convergence.</p><button onClick={()=>setIndex(6)}>ENTER ROBOTICS →</button></article></div>
     <div className="arsenal"><div><span>ARSENAL</span><h2>Built with the right tool for the terrain.</h2></div>{skillGroups.map(g=><div className="skill-group" key={g[0]}><b>{g[0]}</b><p>{g.slice(1).join("  ·  ")}</p></div>)}</div>
     <div className="future"><div className="sunrise"/><span>CHAPTER 08 · THE HORIZON</span><h2>Quantum evolution.<br/>Human-AI convergence.<br/><em>Embodied intelligence.</em></h2><button onClick={()=>setIndex(7)}>STEP INTO THE FUTURE <Glyph type="arrow"/></button></div>
     <footer><div><b>AC</b><span>ATHARV CHAUDHARI · AI / ML ENGINEER</span></div><div><a href="mailto:ahc382000@gmail.com">EMAIL</a><a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank">LINKEDIN</a></div></footer>
   </section>
   {modal&&<div className="modal-backdrop" onClick={()=>setModal(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setModal(null)}><Glyph type="close"/></button><span>{modal.tag} · {modal.scene}</span><h2>{modal.title}</h2><div className="modal-metric">{modal.metric}</div><p>{modal.story}</p><h4>TECHNOLOGY</h4><div className="chips">{modal.stack.split(" · ").map(x=><i key={x}>{x}</i>)}</div><div className="modal-actions"><button className="primary" onClick={()=>{setModal(null);setIndex(4)}}>EXPLORE SKILLS <Glyph type="arrow"/></button><button className="ghost" onClick={()=>setModal(null)}>RETURN TO TRAIL</button></div></div></div>}
   {explore&&<div className="explore-overlay"><div className="explore-scene" style={{backgroundImage:`url(${scene.image})`}}/><div className="explore-vignette"/><div className="explore-copy"><span>FREE EXPLORE · {scene.location}</span><h2>{scene.title}</h2><p>Use A / D or the arrow keys to move through the expedition.</p><div><button onClick={prev}>← PREVIOUS</button><button onClick={next}>NEXT →</button></div></div><button className="exit" onClick={()=>setExplore(false)}>ESC · EXIT EXPLORE</button></div>}
 </main>
}
