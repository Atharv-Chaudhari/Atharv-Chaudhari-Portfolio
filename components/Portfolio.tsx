"use client";
import { useEffect, useMemo, useState } from "react";
import Scene from "./Scene";
import Ambience from "./Ambience";

const chapters = [
  ["01","HOME","The Beginning","home"], ["02","ABOUT","The Explorer","about"], ["03","JOURNEY","The Journey","journey"],
  ["04","PROJECTS","The Discoveries","projects"], ["05","SKILLS","The Arsenal","skills"], ["06","RESEARCH","The Learning","research"],
  ["07","ROBOTICS","The Evolution","robotics"], ["08","VISION","The Future","vision"], ["09","CONTACT","The Connection","contact"]
] as const;

const projects = [
  {id:"01", title:"Dashboardless Insights", tag:"AGENTIC AI", metric:"60–70% faster insight retrieval", body:"Decision-ready business answers built with LangChain, LangGraph, LangSmith and AGUI, designed around real stakeholder workflows."},
  {id:"02", title:"Agent Monday", tag:"AUTONOMOUS SYSTEMS", metric:"70% faster reporting · 99%+ reliable delivery", body:"A production reporting agent using OpenAI Agents SDK, Celery, Kubernetes, FastAPI and OKTA."},
  {id:"03", title:"Shopping Assistant", tag:"RETAIL AI", metric:"1K+ sessions · ~40% accuracy uplift", body:"A multi-agent shopping experience using Google ADK and GCP for contextual, personalized recommendations."},
  {id:"04", title:"Client Skillset Mapping", tag:"NLP · GRAPH AI", metric:"~50% team-fit improvement", body:"OCR, NLP, LangGraph and enterprise graph signals combined to improve intelligent team-to-skill matching."},
  {id:"05", title:"RICOM RDW Migration", tag:"DATA ENGINEERING", metric:"~40% ETL latency reduction · 14 cubes", body:"PySpark and Databricks migration architecture across ADLS Gen2 and Synapse."}
];

function useActiveSection() {
  const [active,setActive] = useState("home");
  useEffect(()=>{
    const els = Array.from(document.querySelectorAll<HTMLElement>("section[data-chapter]"));
    const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting) setActive(e.target.getAttribute("data-chapter") || "home");}),{rootMargin:"-35% 0px -50% 0px",threshold:0});
    els.forEach(e=>obs.observe(e)); return ()=>obs.disconnect();
  },[]);
  return active;
}

export default function Portfolio() {
  const active = useActiveSection();
  const [menu,setMenu] = useState(false);
  const [selected,setSelected] = useState<typeof projects[number] | null>(null);
  const [progress,setProgress] = useState(0);
  const activeIndex = Math.max(0, chapters.findIndex(c=>c[3]===active));
  const scrollTo = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  useEffect(()=>{
    const onScroll=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      setProgress(max>0 ? window.scrollY/max : 0);
    };
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true}); return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const stats = useMemo(()=>[
    ["04+","Years in production AI / ML"],["05","Flagship engineering projects"],["03","Azure AI / Data certifications"],["09.83","B.Tech CGPA"]
  ],[]);

  return <main>
    <Ambience />
    <header className="topbar">
      <button className="brand" onClick={()=>scrollTo("home")}><b>AC</b><span>Atharv Chaudhari</span></button>
      <nav>{chapters.slice(0,8).map(c=><button key={c[3]} className={active===c[3]?"active":""} onClick={()=>scrollTo(c[3])}>{c[1]}</button>)}</nav>
      <button className="menu" onClick={()=>setMenu(v=>!v)} aria-label="Open menu">☰</button>
    </header>
    {menu && <div className="mobile-menu">{chapters.map(c=><button key={c[3]} onClick={()=>{setMenu(false);scrollTo(c[3])}}>{c[0]} · {c[1]}</button>)}</div>}

    <div className="progress"><span style={{transform:`scaleX(${progress})`}} /></div>

    <section id="home" data-chapter="home" className="hero">
      <Scene src="/scenes/home.png" intensity={1.8}/>
      <div className="hud left-rail"><span>EXPLORE</span><i/><span>LEARN</span><i/><span>BUILD</span><i/><span>AUTOMATE</span></div>
      <div className="hero-copy reveal">
        <p className="eyebrow">CHAPTER 01 · THE BEGINNING</p>
        <h1>A JOURNEY INTO THE<br/><em>INTELLIGENT FUTURE</em></h1>
        <p className="lead">From data to decision<br/>From models to autonomy<br/>From AI to embodied intelligence.</p>
        <button className="gold-btn" onClick={()=>scrollTo("about")}>BEGIN JOURNEY <span>→</span></button>
      </div>
      <aside className="profile-card glass reveal delay-1">
        <span className="status"><i/> AVAILABLE FOR THE NEXT CHAPTER</span>
        <h3>Atharv Chaudhari</h3><p>AI / ML Engineer</p>
        <div className="card-lines"><span>◈ 4+ Years Experience</span><span>◈ AI / ML · Agentic AI</span><span>◈ Data · Cloud · Systems</span></div>
        <q>Turning intelligence into meaningful impact.</q>
      </aside>
      <div className="scroll-cue">⌄<small>SCROLL TO EXPLORE</small></div>
      <div className="chapter-strip">{chapters.slice(0,6).map((c,i)=><button key={c[3]} className={i===0?"selected":""} onClick={()=>scrollTo(c[3])}><b>{c[0]}</b><span>{c[1]}</span></button>)}</div>
    </section>

    <section id="about" data-chapter="about" className="scene-section about">
      <Scene src="/scenes/about.png" intensity={1.2}/>
      <div className="section-content two-col">
        <div className="chapter-label">CHAPTER 02 / THE EXPLORER</div>
        <div><h2>I BUILD SYSTEMS THAT <em>THINK.</em></h2><p className="large">I work across Machine Learning, Artificial Intelligence, Agentic AI and Data Engineering — turning messy information into systems that reason, act and deliver.</p><p>My work spans production AI applications, multi-agent workflows, scalable data platforms and cloud architectures. The goal is not AI for spectacle; it is intelligence that makes a real workflow better.</p><div className="stats">{stats.map(s=><div key={s[0]}><strong>{s[0]}</strong><span>{s[1]}</span></div>)}</div></div>
      </div>
      <div className="floating-note">FIELD NOTE<br/><b>Curiosity → Engineering → Impact</b></div>
    </section>

    <section id="journey" data-chapter="journey" className="journey section-dark">
      <div className="section-inner"><div className="chapter-label">CHAPTER 03 / THE JOURNEY</div><h2>THE PATH <em>SO FAR</em></h2><p className="section-intro">A progression from strong engineering foundations to production AI, agentic systems and the next frontier of intelligent machines.</p>
      <div className="timeline">
        <article><span>2018 — 2022</span><h3>B.Tech · Computer Science</h3><p>Walchand Institute of Technology · CGPA 9.83</p><b>THE FOUNDATION</b></article>
        <article><span>2022 — NOW</span><h3>Specialist Programmer · Infosys</h3><p>Production AI / ML, data engineering, cloud systems and intelligent automation.</p><b>THE EXPEDITION</b></article>
        <article><span>2024 — 2026</span><h3>M.Tech · AI & ML</h3><p>BITS Pilani · NLP specialization. Building deeper foundations in modern AI.</p><b>THE DEEP DIVE</b></article>
        <article><span>2026</span><h3>Data Science & ML · Cambridge</h3><p>Continuing the academic and practical journey across modern data and ML systems.</p><b>THE NEXT CHAPTER</b></article>
      </div></div>
    </section>

    <section id="projects" data-chapter="projects" className="scene-section discoveries">
      <Scene src="/scenes/projects.png" intensity={1.5}/>
      <div className="section-content"><div className="chapter-label">CHAPTER 04 / THE DISCOVERIES</div><h2>PROJECTS ARE <em>ARTIFACTS.</em></h2><p className="section-intro">Each one solves a real problem. Treat these as discoveries on the map — open one to inspect the engineering behind it.</p>
      <div className="project-grid">{projects.map((p,i)=><button className={`project-card p${i+1}`} key={p.id} onClick={()=>setSelected(p)}><span>{p.id}</span><small>{p.tag}</small><h3>{p.title}</h3><b>{p.metric}</b><i>INSPECT ARTIFACT →</i></button>)}</div></div>
    </section>

    <section id="skills" data-chapter="skills" className="arsenal section-dark"><div className="section-inner"><div className="chapter-label">CHAPTER 05 / THE ARSENAL</div><h2>TOOLS FOR <em>THE EXPEDITION.</em></h2><div className="skill-map">
      {[['AGENTIC AI','LangChain · LangGraph · DeepAgents · MCP · Google ADK · OpenAI Agents SDK'],['ML ENGINEERING','ML workflows · feature engineering · serving · evaluation · monitoring'],['DATA ENGINEERING','ETL / ELT · pipelines · Feature Stores · optimization'],['CLOUD & DATA','GCP · Azure · Databricks · BigQuery · Vertex AI · Bigtable'],['BACKEND & SYSTEMS','Python · FastAPI · PostgreSQL · REST APIs · scalable architectures'],['RESEARCH MINDSET','NLP · RAG · multi-agent systems · knowledge-driven ML']].map((s,i)=><div key={s[0]} className="skill-node" style={{'--n':i} as React.CSSProperties}><span>0{i+1}</span><h3>{s[0]}</h3><p>{s[1]}</p></div>)}
    </div></div></section>

    <section id="research" data-chapter="research" className="scene-section research"><Scene src="/scenes/research.png" intensity={1}/><div className="section-content research-layout"><div><div className="chapter-label">CHAPTER 06 / THE LEARNING</div><h2>RESEARCH IS THE <em>COMPASS.</em></h2><p className="large">My academic work sits around NLP, knowledge-driven machine learning, multi-agent systems and intelligent assessment generation.</p><p>My M.Tech work on AssessNex AI explored an agent-driven platform for automated educational assessment generation using Azure OpenAI, LangChain and LangGraph.</p></div><div className="research-console glass"><div className="console-head"><span>RESEARCH CONSOLE</span><i>ONLINE</i></div><div className="console-body"><div className="brain">◉</div><span>KNOWLEDGE</span><span>REASONING</span><span>AGENTS</span><span>VALIDATION</span><strong>ASSESSNEX AI</strong></div></div></div></section>

    <section id="robotics" data-chapter="robotics" className="robotics section-dark"><div className="robot-grid-bg"/><div className="section-inner robotics-layout"><div><div className="chapter-label">CHAPTER 07 / THE EVOLUTION</div><h2>FROM <em>DIGITAL</em> INTELLIGENCE<br/>TO EMBODIED INTELLIGENCE.</h2><p className="large">Robotics is where intelligence leaves the screen. My future direction connects agentic reasoning, perception, planning and physical autonomy.</p><p>Not cyberpunk for the sake of it — intelligent machines operating naturally in the world, with humans still at the center.</p></div><div className="robot-stage"><div className="orbit o1"/><div className="orbit o2"/><div className="robot-silhouette">◉<span>AI</span></div><small>HUMAN · AI · ROBOTICS</small></div></div></section>

    <section id="vision" data-chapter="vision" className="vision"><div className="sun"/><div className="mountains m1"/><div className="mountains m2"/><div className="section-inner vision-content"><div className="chapter-label">CHAPTER 08 / THE FUTURE</div><h2>QUANTUM EVOLUTION.<br/><em>HUMAN–AI CONVERGENCE.</em><br/>ROBOTIC AUTONOMY.</h2><p className="large">The destination is not replacing humans. It is extending what humans can imagine, understand and build.</p><button className="gold-btn" onClick={()=>scrollTo("contact")}>CONTINUE THE JOURNEY <span>→</span></button></div></section>

    <section id="contact" data-chapter="contact" className="contact section-dark"><div className="section-inner contact-inner"><div className="chapter-label">CHAPTER 09 / THE CONNECTION</div><h2>EVERY EXPEDITION <em>NEEDS A NEXT MOVE.</em></h2><p className="large">If you're building intelligent products, autonomous workflows, data systems or the next generation of AI — let's talk.</p><div className="contact-links"><a href="mailto:ahc382000@gmail.com">EMAIL ↗</a><a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div><footer><span>© 2026 Atharv Chaudhari</span><span>AI · DATA · AUTONOMY · ROBOTICS</span><span>END OF CURRENT CHAPTER</span></footer></div></section>

    <div className="chapter-dock">{chapters.map((c,i)=><button key={c[3]} title={c[1]} className={active===c[3]?"on":""} onClick={()=>scrollTo(c[3])}><span>{c[0]}</span></button>)}</div>

    {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="artifact-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><small>{selected.id} · {selected.tag}</small><h2>{selected.title}</h2><strong>{selected.metric}</strong><p>{selected.body}</p><div className="artifact-meta"><span>ROLE<br/><b>AI / ML ENGINEERING</b></span><span>STACK<br/><b>PYTHON · CLOUD · AGENTS</b></span><span>MODE<br/><b>PRODUCTION</b></span></div><button className="gold-btn" onClick={()=>setSelected(null)}>RETURN TO MAP <span>↩</span></button></div></div>}
  </main>;
}
