"use client";
import { useEffect, useState } from "react";
import WorldFX from "../components/WorldFX";

type Scene={id:string;chapter:string;title:string;line:string;location:string;image:string;accent:string;next:string;type:"nature"|"ruin"|"lab"|"future"};
type Project={id:string;title:string;tag:string;stack:string;metric:string;story:string;artifact:string;detail:string};

const scenes:Scene[]=[
{id:"home",chapter:"01 / THE TRAILHEAD",title:"Enter the Unknown",line:"AI · MACHINE LEARNING · DATA · AUTONOMY",location:"River Valley · 06:42",image:"/assets/01-trail.jpg",accent:"gold",next:"BEGIN EXPEDITION",type:"nature"},
{id:"about",chapter:"02 / THE EXPLORER",title:"The Builder",line:"4+ YEARS · PRODUCTION AI / ML",location:"Canopy Ridge · 08:15",image:"/assets/05-canopy.jpg",accent:"green",next:"OPEN DOSSIER",type:"nature"},
{id:"journey",chapter:"03 / THE ASCENT",title:"From Data to Systems",line:"ENGINEERING · CLOUD · SCALE",location:"Upper Falls · 10:28",image:"/assets/02-waterfall.jpg",accent:"gold",next:"TRACE JOURNEY",type:"nature"},
{id:"projects",chapter:"04 / THE DISCOVERY",title:"The Hidden Temple",line:"AGENTS · ML · DATA PRODUCTS",location:"Temple Ruins · 13:04",image:"/assets/03-ruins.jpg",accent:"cyan",next:"OPEN ARTIFACTS",type:"ruin"},
{id:"skills",chapter:"05 / THE ARSENAL",title:"Tools of the Expedition",line:"PYTHON · LANGGRAPH · GCP · AZURE",location:"Research Camp · 15:37",image:"/assets/04-river.jpg",accent:"gold",next:"INSPECT ARSENAL",type:"nature"},
{id:"research",chapter:"06 / THE ARCHIVE",title:"Questions Worth Chasing",line:"NLP · KNOWLEDGE · INTELLIGENCE",location:"The Hidden Lab · 17:20",image:"/assets/06-dusk.jpg",accent:"cyan",next:"ENTER ARCHIVE",type:"lab"},
{id:"robotics",chapter:"07 / THE FRONTIER",title:"Intelligence, Embodied",line:"ROBOTICS · AUTONOMY · HUMAN-AI",location:"Frontier Outpost · 18:11",image:"/assets/07-frontier.jpg",accent:"cyan",next:"ENTER FRONTIER",type:"future"},
{id:"vision",chapter:"08 / THE HORIZON",title:"The Intelligent Future",line:"QUANTUM EVOLUTION · HUMAN-AI CONVERGENCE",location:"Horizon Point · 19:02",image:"/assets/08-horizon.jpg",accent:"gold",next:"LOOK AHEAD",type:"future"},
{id:"contact",chapter:"09 / THE CONNECTION",title:"Continue the Expedition",line:"LET'S BUILD WHAT COMES NEXT",location:"Base Camp · 19:40",image:"/assets/01-trail.jpg",accent:"gold",next:"MAKE CONTACT",type:"nature"}
];

const projects:Project[]=[
{id:"insights",title:"Dashboardless Insights",tag:"AGENTIC AI",stack:"LangChain · LangGraph · LangSmith · AGUI",metric:"60–70% faster insight retrieval",story:"Decision-ready answers without waiting for a dashboard.",artifact:"OBSERVATORY",detail:"Built for business users and 20+ stakeholders, turning questions into grounded, decision-ready answers."},
{id:"monday",title:"Agent Monday",tag:"AUTOMATION",stack:"OpenAI Agents SDK · Celery · Kubernetes · FastAPI · OKTA",metric:"70% faster reporting · 99%+ weekly reliability",story:"Recurring reporting transformed into an autonomous operating loop.",artifact:"OPERATIONS",detail:"Production workflow combining agents, scheduling, APIs and resilient delivery mechanisms."},
{id:"shopping",title:"Shopping Assistant",tag:"MULTI-AGENT",stack:"Google ADK · GCP · Retail AI",metric:"1K+ sessions · ~40% recommendation improvement",story:"A real-time shopping companion with memory and tools.",artifact:"RIVER MARKET",detail:"Multi-agent retail workflow designed around personalized recommendations and tool-aware conversations."},
{id:"skillsmap",title:"Client Skillset Mapping",tag:"KNOWLEDGE AI",stack:"LangGraph · OCR · Enterprise Graph · NLP",metric:"~50% team-fit accuracy improvement",story:"People, skills and documents connected into one matching workflow.",artifact:"ARCHIVE",detail:"Knowledge-driven graph and NLP pipeline for discovering stronger team-to-skill alignment."},
{id:"rdw",title:"RICOM RDW Migration",tag:"DATA ENGINEERING",stack:"PySpark · Databricks · ADLS Gen2 · Synapse",metric:"~40% ETL latency reduction · 14 data cubes",story:"A resilient enterprise data migration and optimization path.",artifact:"ENGINE ROOM",detail:"Large-scale ETL modernization focused on latency, reliability and reusable data structures."},
{id:"assessnex",title:"AssessNex AI",tag:"RESEARCH / PRODUCT",stack:"Azure OpenAI · LangGraph · FastAPI · RAG",metric:"Multi-agent assessment generation",story:"Agent orchestration for intelligent educational assessment generation.",artifact:"ANCIENT LIBRARY",detail:"M.Tech project exploring Bloom calibration, RAG, multi-agent orchestration and validation."}
];

const skills=["Python","LangChain","LangGraph","DeepAgents","MCP","Google ADK","OpenAI Agents SDK","ML Workflows","Feature Engineering","Model Serving","Evaluation","ETL / ELT","Feature Stores","GCP","Azure","Databricks","BigQuery","Vertex AI","Bigtable","FastAPI","PostgreSQL","REST APIs"];
const journey=["B.Tech · CSE · CGPA 9.83","M.Tech · AI / ML · NLP","Specialist Programmer · Infosys","Cambridge · Data Science & ML · 2026"];

function Icon({name}:{name:string}){const p:any={arrow:"M5 12h14m-6-6 6 6-6 6",play:"M8 5l11 7-11 7V5Z",close:"M5 5l14 14M19 5 5 19",menu:"M4 7h16M4 12h16M4 17h16",compass:"M12 3l3 6-3 12-3-12 3-6Z",plus:"M12 5v14M5 12h14"};return <svg viewBox="0 0 24 24"><path d={p[name]||p.arrow}/></svg>}

export default function Page(){
 const [scene,setScene]=useState(0),[menu,setMenu]=useState(false),[sound,setSound]=useState(false),[modal,setModal]=useState<Project|null>(null),[hud,setHud]=useState(true),[explore,setExplore]=useState(false),[details,setDetails]=useState(false),[touchStart,setTouchStart]=useState<number|null>(null),[scrolled,setScrolled]=useState(false);
 const s=scenes[scene], progress=Math.round(scene/(scenes.length-1)*100);
 const move=(dir:number)=>setScene(v=>Math.max(0,Math.min(scenes.length-1,v+dir)));
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(modal){if(e.key==="Escape")setModal(null);return} if(e.key==="ArrowRight"||e.key.toLowerCase()==="d")move(1); if(e.key==="ArrowLeft"||e.key.toLowerCase()==="a")move(-1); if(e.key==="Escape"){setMenu(false);setExplore(false)}};addEventListener("keydown",key);return()=>removeEventListener("keydown",key)},[modal]);
 useEffect(()=>{const wheel=(e:WheelEvent)=>{if(Math.abs(e.deltaY)>45)move(e.deltaY>0?1:-1)};addEventListener("wheel",wheel,{passive:true});return()=>removeEventListener("wheel",wheel)},[]);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>window.innerHeight*.65);addEventListener("scroll",onScroll,{passive:true});return()=>removeEventListener("scroll",onScroll)},[]);
 return <main className={`game scene-${s.type} accent-${s.accent} ${hud?"hud-on":"hud-off"} ${scrolled?"deep-scroll":""}`} onTouchStart={e=>setTouchStart(e.touches[0].clientX)} onTouchEnd={e=>{if(touchStart===null)return;const dx=e.changedTouches[0].clientX-touchStart;if(Math.abs(dx)>45)move(dx<0?1:-1);setTouchStart(null)}}>
  <WorldFX intensity={s.type==="future"?1.5:1}/>
  <div className="world-bg" key={s.id} style={{backgroundImage:`url(${s.image})`}}><div className="depth d1"/><div className="depth d2"/><div className="sun-glow"/><div className="birds">⌁　⌁　　　⌁</div><div className="mist"/></div>
  <div className="grain"/>
  <header className="topbar">
   <button className="brand" onClick={()=>setScene(0)}><span className="brand-mark">AC</span><span><b>Atharv Chaudhari</b><small>AI / ML ENGINEER</small></span></button>
   <nav>{scenes.map((x,i)=><button key={x.id} className={i===scene?"active":""} onClick={()=>setScene(i)}><span>{String(i+1).padStart(2,"0")}</span>{x.id}</button>)}</nav>
   <div className="actions"><button onClick={()=>setSound(v=>!v)}>{sound?"◉ SOUND":"○ SOUND"}</button><button onClick={()=>setHud(v=>!v)}>HUD {hud?"ON":"OFF"}</button><button className="menu" onClick={()=>setMenu(v=>!v)}><Icon name={menu?"close":"menu"}/></button></div>
  </header>
  {menu&&<div className="menu-panel">{scenes.map((x,i)=><button key={x.id} onClick={()=>{setScene(i);setMenu(false)}}><span>{String(i+1).padStart(2,"0")}</span><b>{x.title}</b><small>{x.chapter}</small></button>)}</div>}

  <aside className="left-ui"><div className="compass"><Icon name="compass"/></div><span>EXPEDITION</span><div className="rail">{scenes.map((_,i)=><button key={i} className={i===scene?"on":""} onClick={()=>setScene(i)}>{String(i+1).padStart(2,"0")}</button>)}</div></aside>

  <section className="hero">
   <div className="eyebrow"><i/> {s.chapter}</div><h1 key={s.id}>{s.title}</h1><p>{s.line}</p>
   <div className="actions-main"><button className="gold-btn" onClick={()=>setDetails(true)}><Icon name="play"/>{s.next}</button><button className="outline-btn" onClick={()=>setExplore(true)}><Icon name="compass"/>FREE EXPLORE</button></div>
   <div className="location"><span>◈</span>{s.location}</div>
  </section>

  <aside className="dossier">
   <div className="dossier-top"><span>FIELD DOSSIER</span><span>AC / 2026</span></div><h2>ATHARV<br/><em>CHAUDHARI</em></h2><p>AI / ML Engineer building intelligent systems across data, agents and autonomy.</p>
   <div className="quick"><b>4+</b><span>YEARS</span><b>12+</b><span>PROJECTS</span><b>5+</b><span>RESEARCH</span></div>
   <button onClick={()=>setScene(1)}>VIEW PROFILE <Icon name="arrow"/></button>
  </aside>

  <div className="scene-object">{s.type==="ruin"?<><span className="rune">◉</span><b>ANCIENT SIGNAL</b></>:s.type==="future"?<><span className="robot-orb">✦</span><b>FRONTIER SYSTEM</b></>:<><span className="relic">◇</span><b>DISCOVERY POINT</b></>}</div>

  <div className="bottom">
   <div className="bar-meta"><span>JOURNEY PROGRESS</span><b>{progress}%</b></div><div className="bar"><i style={{width:`${Math.max(5,progress)}%`}}/></div>
   <div className="chapters">{scenes.map((x,i)=><button key={x.id} className={i===scene?"selected":""} onClick={()=>setScene(i)}><strong>{String(i+1).padStart(2,"0")}</strong><span>{x.title}</span></button>)}</div>
   <div className="bottom-actions"><span><kbd>A</kbd><kbd>D</kbd> MOVE</span><span><kbd>←</kbd><kbd>→</kbd> CHAPTER</span><button onClick={()=>setDetails(true)}>OPEN CURRENT CHAPTER <Icon name="arrow"/></button></div>
  </div>

  <section className="content" id="discoveries">
   <div className="content-head"><div><span>THE FIELD JOURNAL</span><h2>Explore the work.</h2></div><p>Choose a chapter. Open an artifact. Keep moving.</p></div>
   <div className="artifact-grid">{projectSet.map((p,i)=><button className="artifact" key={p.id} onClick={()=>setModal(p)}><div className={`artifact-image ai-${i}`}><span>{String(i+1).padStart(2,"0")}</span><b>{p.artifact}</b><i>+</i></div><div className="artifact-copy"><small>{p.tag}</small><h3>{p.title}</h3><p>{p.metric}</p><em>OPEN ARTIFACT <Icon name="arrow"/></em></div></button>)}</div>
   <div className="journey-block"><div><span>THE PATH</span><h2>Built across<br/><em>systems.</em></h2></div><div className="timeline">{journey.map((j,i)=><article key={j}><b>0{i+1}</b><p>{j}</p></article>)}</div></div>
   <div className="arsenal"><div><span>THE ARSENAL</span><h2>Tools I use<br/>to build the world.</h2><button onClick={()=>setScene(4)}>INSPECT SKILLS <Icon name="arrow"/></button></div><div className="skill-cloud">{skills.map(x=><span key={x}>{x}</span>)}</div></div>
   <div className="vision"><div className="vision-sun"/><div className="vision-copy"><span>08 / THE HORIZON</span><h2>Quantum evolution.<br/><em>Human–AI convergence.</em><br/>Embodied intelligence.</h2><p>The direction: intelligence that moves from screens into systems, environments and the physical world.</p><button onClick={()=>setScene(7)}>ENTER THE HORIZON <Icon name="arrow"/></button></div><div className="mountain-line"/></div>
   <div className="contact"><span>09 / THE CONNECTION</span><h2>Ready for the<br/><em>next expedition?</em></h2><div><a href="mailto:ahc382000@gmail.com">EMAIL ME</a><a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank" rel="noreferrer">LINKEDIN</a></div></div>
   <footer><b>AC</b><span>ATHARV CHAUDHARI · AI / ML ENGINEER</span><span>© 2026</span></footer>
  </section>

  {details&&<div className="chapter-modal" onClick={()=>setDetails(false)}><div className="chapter-card" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setDetails(false)}><Icon name="close"/></button><span>{s.chapter}</span><h2>{s.title}</h2><p>{s.line}</p><div className="chapter-actions"><button onClick={()=>{setDetails(false);if(scene===3)setModal(projects[0]);else if(scene===8)location.href="mailto:ahc382000@gmail.com";else document.getElementById("discoveries")?.scrollIntoView({behavior:"smooth"})}}>EXPLORE CHAPTER <Icon name="arrow"/></button><button onClick={()=>{setDetails(false);move(1)}}>NEXT CHAPTER <Icon name="arrow"/></button></div></div></div>}
  {modal&&<div className="chapter-modal" onClick={()=>setModal(null)}><div className="project-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setModal(null)}><Icon name="close"/></button><span>{modal.tag} · {modal.artifact}</span><h2>{modal.title}</h2><strong>{modal.metric}</strong><p>{modal.story}</p><p className="detail">{modal.detail}</p><div className="chips">{modal.stack.split(" · ").map(x=><i key={x}>{x}</i>)}</div><div className="modal-actions"><button onClick={()=>setModal(null)}>BACK TO JOURNEY</button><button onClick={()=>{setModal(null);setExplore(true)}}>ENTER SCENE <Icon name="arrow"/></button></div></div></div>}
  {explore&&<div className="explore"><div className="explore-bg" style={{backgroundImage:`url(${s.image})`}}/><div className="explore-depth"/><button className="exit" onClick={()=>setExplore(false)}>ESC · EXIT EXPLORE</button><div className="explore-hud"><span>FREE EXPLORE · {s.location}</span><h2>{s.title}</h2><p>Move through the scene. Watch the environment breathe. Discover what is hidden.</p><div><button onClick={()=>move(-1)}>← PREVIOUS</button><button onClick={()=>move(1)}>NEXT →</button></div></div><div className="explore-reticle">＋</div></div>}
 </main>
}
