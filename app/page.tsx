'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

const Ambient3D = dynamic(() => import('../components/Ambient3D'), { ssr: false });

type Chapter = { id: string; no: string; title: string; nav: string; kicker: string; heading: string; copy: string };
const chapters: Chapter[] = [
  { id:'home', no:'01', title:'The Beginning', nav:'Home', kicker:'ENTER THE JOURNEY', heading:'A JOURNEY INTO THE INTELLIGENT FUTURE.', copy:'AI · ML · Agentic Systems · Data · Robotics' },
  { id:'about', no:'02', title:'The Explorer', nav:'About', kicker:'THE EXPLORER', heading:'BUILDING INTELLIGENCE THAT MOVES.', copy:'Specialist Programmer · AI / ML Engineer · 4 years in production systems' },
  { id:'journey', no:'03', title:'The Journey', nav:'Journey', kicker:'THE JOURNEY', heading:'FROM DATA FOUNDATIONS TO AUTONOMOUS SYSTEMS.', copy:'Enterprise data → ML engineering → agentic AI → intelligent systems' },
  { id:'projects', no:'04', title:'The Discoveries', nav:'Projects', kicker:'THE DISCOVERIES', heading:'SYSTEMS BUILT FOR THE REAL WORLD.', copy:'Select a discovery and inspect the mission.' },
  { id:'skills', no:'05', title:'The Arsenal', nav:'Skills', kicker:'THE ARSENAL', heading:'THE TOOLS BEHIND THE JOURNEY.', copy:'Agentic AI · ML · Data · Cloud · Backend' },
  { id:'research', no:'06', title:'The Learning', nav:'Research', kicker:'THE LEARNING', heading:'ALWAYS MOVING BEYOND THE MAP.', copy:'M.Tech AI/ML · NLP · Cambridge Data Science & ML · continuous research' },
  { id:'robotics', no:'07', title:'The Evolution', nav:'Robotics', kicker:'THE EVOLUTION', heading:'DIGITAL INTELLIGENCE BECOMES EMBODIED.', copy:'Perception · reasoning · action · adaptation' },
  { id:'vision', no:'08', title:'The Future', nav:'Vision', kicker:'THE FUTURE', heading:'QUANTUM EVOLUTION. HUMAN-AI CONVERGENCE. ROBOTICS.', copy:'A long-horizon view of adaptive, collaborative intelligence.' },
  { id:'contact', no:'09', title:'The Connection', nav:'Contact', kicker:'THE CONNECTION', heading:'THE NEXT CHAPTER STARTS HERE.', copy:'AI/ML engineering · intelligent systems · research · collaboration' },
];

const projects = [
  ['Dashboardless Insights','LangChain · LangGraph · LangSmith · AGUI','20+ stakeholders · 60–70% faster insight retrieval'],
  ['Agent Monday','OpenAI Agents SDK · Celery · Kubernetes · FastAPI · OKTA','70% faster reporting · 99%+ reliable weekly delivery'],
  ['Shopping Assistant','Google ADK · GCP','1K+ sessions · ~40% recommendation accuracy improvement'],
  ['Client Skillset Mapping','LangGraph · OCR · NLP · Enterprise Graph','~50% team-fit accuracy improvement'],
  ['RICOM RDW Migration','PySpark · Databricks · ADLS Gen2 · Synapse','~40% ETL latency reduction · 14 data cubes'],
];

export default function Page() {
  const [active, setActive] = useState('home');
  const [menu, setMenu] = useState(false);
  const [explore, setExplore] = useState(false);
  const [motion, setMotion] = useState(true);
  const [project, setProject] = useState(0);
  const [scene, setScene] = useState(0);

  const activeIndex = useMemo(() => chapters.findIndex(c => c.id === active), [active]);

  const go = (id: string) => {
    setActive(id); setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: motion ? 'smooth' : 'auto', block: 'start' });
  };

  useEffect(() => {
    const els = chapters.map(c => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { threshold: [0.25, 0.55, 0.8] });
    els.forEach(e => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!explore) return;
      if (e.key === 'Escape') setExplore(false);
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') go(chapters[Math.min(activeIndex+1, chapters.length-1)].id);
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') go(chapters[Math.max(activeIndex-1, 0)].id);
    };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [explore, activeIndex, motion]);

  return <main className={`game ${explore ? 'exploring' : ''} ${motion ? '' : 'no-motion'}`}>
    <div className="world" aria-hidden="true">
      <div className={`world-image scene-${scene}`} />
      <div className="world-depth" />
      <div className="world-light" />
      <Ambient3D />
      <div className="world-vignette" />
    </div>

    <header className="topbar">
      <button className="brand" onClick={() => go('home')}><span className="logo">AC</span><span>Atharv Chaudhari</span></button>
      <nav className={menu ? 'nav open' : 'nav'}>{chapters.map(c => <button className={active===c.id?'selected':''} key={c.id} onClick={() => go(c.id)}>{c.nav}</button>)}</nav>
      <div className="top-right"><div className="role"><span>●</span><b>AI / ML Engineer</b><small>Building Intelligent Systems</small></div><button className="hamb" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button></div>
    </header>

    <aside className="left-rail">{chapters.map(c => <button key={c.id} className={active===c.id?'on':''} onClick={() => go(c.id)}><span>{c.no}</span></button>)}</aside>

    <section id="home" className="hero section">
      <div className="hero-copy panel-safe">
        <span className="kicker">{chapters[0].kicker}</span>
        <h1>A JOURNEY INTO THE<br/><em>INTELLIGENT FUTURE.</em></h1>
        <p className="hero-sub">From data to decision.<br/>From models to autonomy.<br/>From AI to embodied intelligence.</p>
        <button className="begin" onClick={() => { setExplore(true); go('about'); }}><span>◈</span> Begin Journey <b>→</b></button>
        <div className="micro">EXPLORE · LEARN · BUILD · AUTOMATE</div>
      </div>
      <div className="player-mark"><div className="player-ring">AC</div><span>PLAYER // ATHARV</span></div>
      <div className="profile glass"><small>PLAYER PROFILE</small><h2>Atharv Chaudhari</h2><p>AI / ML Engineer</p><div className="profile-stats"><span><b>4+</b> Years</span><span><b>12+</b> AI/ML projects</span><span><b>3×</b> Kaggle Expert</span></div></div>
      <button className="scroll" onClick={() => go('about')}>↓ <span>Scroll to explore</span></button>
    </section>

    <section id="about" className="section content"><div className="content-wrap"><span className="kicker">02 · THE EXPLORER</span><h2>BUILDING INTELLIGENCE<br/><em>THAT MOVES.</em></h2><p className="lead">Production AI/ML, agentic systems, data engineering and scalable software — designed around useful outcomes.</p><div className="clean-grid"><article><small>MISSION</small><h3>Turn intelligence into meaningful impact.</h3><p>Specialist Programmer at Infosys with hands-on experience designing production-grade AI, ML and data systems.</p></article><div className="stats-grid"><div><b>4+</b><span>Years production</span></div><div><b>9.83</b><span>B.Tech CGPA</span></div><div><b>M.Tech</b><span>AI / ML · NLP</span></div><div><b>2026</b><span>Cambridge DS & ML</span></div></div></div></div></section>

    <section id="journey" className="section content"><div className="content-wrap"><span className="kicker">03 · THE JOURNEY</span><h2>FOUR YEARS.<br/><em>ONE DIRECTION.</em></h2><div className="timeline">{[['2022','Foundation','B.Tech CSE · WIT Solapur'],['2023–24','Enterprise Systems','Data engineering · ML workflows'],['2024–26','Intelligent Systems','M.Tech AI/ML · NLP · Agentic AI'],['2026','Expansion','Cambridge Data Science & ML']].map((x,i)=><article key={x[0]}><i>{i+1}</i><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></div></section>

    <section id="projects" className="section content"><div className="content-wrap wide"><span className="kicker">04 · THE DISCOVERIES</span><h2>SYSTEMS BUILT FOR THE<br/><em>REAL WORLD.</em></h2><div className="discovery"><div className="discovery-world"><span>DISCOVERY {String(project+1).padStart(2,'0')}</span><h3>{projects[project][0]}</h3><div className="scan"></div></div><article className="glass detail"><small>MISSION LOG</small><h3>{projects[project][0]}</h3><strong>{projects[project][1]}</strong><p>{projects[project][2]}</p><div className="project-nav"><button onClick={()=>setProject((project+projects.length-1)%projects.length)}>←</button><span>{project+1} / {projects.length}</span><button onClick={()=>setProject((project+1)%projects.length)}>→</button></div></article></div></div></section>

    <section id="skills" className="section content"><div className="content-wrap wide"><span className="kicker">05 · THE ARSENAL</span><h2>THE TOOLS BEHIND<br/><em>THE JOURNEY.</em></h2><div className="arsenal">{[['01','Agentic AI','LangChain · LangGraph · DeepAgents · MCP · Google ADK · OpenAI Agents SDK'],['02','ML Engineering','ML workflows · feature engineering · serving · evaluation · monitoring'],['03','Data Engineering','ETL/ELT · pipelines · Feature Stores · optimization'],['04','Cloud & Data','GCP · Azure · Databricks · BigQuery · Vertex AI · Bigtable'],['05','Backend & Systems','Python · FastAPI · PostgreSQL · REST · scalable architectures']].map(x=><article key={x[0]}><small>{x[0]}</small><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></div></section>

    <section id="research" className="section content"><div className="content-wrap"><span className="kicker">06 · THE LEARNING</span><h2>BEYOND THE<br/><em>KNOWN MAP.</em></h2><div className="research"><article><small>2024–2026</small><h3>M.Tech AI & ML</h3><p>BITS Pilani · NLP specialization</p></article><article><small>2026</small><h3>Data Science & ML</h3><p>University of Cambridge · June–November 2026</p></article><article><small>CREDENTIALS</small><h3>Azure · Claude · Kaggle</h3><p>Azure Developer, Data Engineer & AI Engineer · Claude certifications · Kaggle 3× Expert</p></article></div></div></section>

    <section id="robotics" className="section content"><div className="robot-stage"><div className="robot-copy"><span className="kicker">07 · THE EVOLUTION</span><h2>DIGITAL INTELLIGENCE<br/><em>BECOMES EMBODIED.</em></h2><p>Robotics is the next layer of the journey — perception, reasoning, action and adaptation.</p><button className="begin" onClick={()=>go('vision')}>Continue →</button></div><div className="robot"><div className="head"></div><div className="body"></div><div className="arm left"></div><div className="arm right"></div></div></div></section>

    <section id="vision" className="section content"><div className="vision"><div><span className="kicker">08 · THE FUTURE</span><h2>QUANTUM EVOLUTION.<br/>HUMAN-AI CONVERGENCE.<br/><em>ROBOTICS.</em></h2><p>A long-horizon view of intelligence that collaborates with people, reasons across systems and increasingly interacts with the physical world.</p></div><div className="horizon"><i>HUMAN</i><i>AI</i><i>ROBOTICS</i></div></div></section>

    <section id="contact" className="section content contact"><div className="content-wrap"><span className="kicker">09 · THE CONNECTION</span><h2>THE NEXT CHAPTER<br/><em>STARTS HERE.</em></h2><p>AI/ML engineering · intelligent systems · research · ambitious technical collaboration.</p><div className="contact-links"><a href="mailto:ahc382000@gmail.com">Email ↗</a><a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></section>

    <footer className="hud"><div className="progress"><span>JOURNEY {String(Math.round((activeIndex+1)/chapters.length*100)).padStart(2,'0')}%</span><i><b style={{width:`${(activeIndex+1)/chapters.length*100}%`}}/></i></div><div className="chapters">{chapters.map(c=><button key={c.id} className={active===c.id?'active':''} onClick={()=>go(c.id)}><strong>{c.no}</strong><span>{c.title}</span></button>)}</div><div className="tools"><button onClick={()=>setExplore(!explore)}>◈ {explore?'EXIT':'EXPLORE'}</button><button onClick={()=>setMotion(!motion)}>✦ {motion?'MOTION':'STILL'}</button><button onClick={()=>setScene((scene+1)%2)}>◐ SCENE</button></div></footer>
    {explore && <div className="explore-hint">EXPLORE MODE · A / D · ← / → · ESC</div>}
  </main>;
}
