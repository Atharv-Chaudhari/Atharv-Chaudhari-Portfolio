 "use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ForestScene = dynamic(() => import("../components/three/ForestScene"), { ssr:false });

const projects = [
  ["01","Dashboardless Insights","LangChain · LangGraph · LangSmith · AGUI","AI insight platform for 20+ stakeholders; reduced insight retrieval time by ~60–70%."],
  ["02","Agent Monday","OpenAI Agents SDK · Celery · Kubernetes · FastAPI · OKTA","Production reporting automation delivering 99%+ weekly reliability and ~70% faster reporting."],
  ["03","Shopping Assistant","Google ADK · GCP","Conversational shopping assistant supporting 1K+ sessions with ~40% recommendation accuracy improvement."],
  ["04","Client Skillset Mapping","LangGraph · OCR · NLP · Enterprise Graph","Intelligent skill mapping solution improving team-fit accuracy by ~50%."],
  ["05","RICOM RDW Migration","PySpark · Databricks · ADLS Gen2 · Synapse","Modernized ETL architecture with ~40% latency reduction across 14 data cubes."]
];

const skills = {
  "Artificial Intelligence":["Machine Learning","Deep Learning","NLP","LLMs","RAG","Prompt Engineering"],
  "Agentic AI":["LangGraph","LangChain","OpenAI Agents SDK","Google ADK","Multi-Agent Systems"],
  "Data & Cloud":["PySpark","Databricks","Azure","GCP","ADLS Gen2","Synapse"],
  "Engineering":["Python","FastAPI","Kubernetes","Docker","REST APIs","ETL / ELT"],
  "Exploration":["Robotics","Autonomous Systems","Human-AI Convergence","Quantum Computing"]
};

export default function Home() {
  const [dark,setDark] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *",{y:38,opacity:0,duration:1,stagger:.09,ease:"power3.out"});
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el)=> {
        gsap.from(el,{y:55,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 84%"}});
      });
    },root);
    return () => ctx.revert();
  },[]);

  return <main ref={root} className={dark ? "site dark" : "site light"}>
    <ForestScene dark={dark}/>
    <nav className="nav">
      <a href="#home" className="brand">AC<span>·</span>26</a>
      <div className="navlinks">
        <a href="#about">About</a><a href="#experience">Journey</a><a href="#projects">Projects</a>
        <a href="#skills">Skills</a><a href="#research">Research</a><a href="#vision">Vision</a>
      </div>
      <button className="theme" onClick={()=>setDark(v=>!v)}>{dark ? "☀ Day" : "☾ Dusk"}</button>
    </nav>

    <section id="home" className="hero">
      <div className="hero-copy">
        <div className="location">AN EXPLORATION IN INTELLIGENCE · 2026</div>
        <p className="eyebrow">AI · MACHINE LEARNING · AGENTIC SYSTEMS · DATA · ROBOTICS</p>
        <h1>Atharv<br/><i>Chaudhari</i></h1>
        <p className="hero-lead">Specialist Programmer · AI / ML Engineer</p>
        <p className="lead">I build intelligent systems where machine learning, agentic AI, data engineering and scalable software meet the next frontier of autonomy.</p>
        <div className="actions"><a className="btn primary" href="#projects">Explore my work ↘</a><a className="btn ghost" href="#about">Enter the journey</a></div>
      </div>
      <div className="scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section id="about" className="section about reveal">
      <div className="section-kicker">01 · THE EXPLORER</div>
      <div className="split">
        <div><h2>Engineering intelligence<br/><i>for the real world.</i></h2></div>
        <div><p>With 4+ years of production experience, I work across AI/ML, agentic systems, data engineering, cloud architecture and full-stack engineering.</p><p>My interest is increasingly moving toward autonomous systems — the space where intelligence can perceive, reason, collaborate and eventually act in the physical world.</p></div>
      </div>
      <div className="stats"><div><b>4+</b><span>Years experience</span></div><div><b>20+</b><span>Stakeholders</span></div><div><b>14</b><span>Data cubes modernized</span></div><div><b>3×</b><span>Kaggle Expert</span></div></div>
    </section>

    <section id="experience" className="section journey reveal">
      <div className="section-kicker">02 · THE JOURNEY</div>
      <h2>From data pipelines<br/><i>to autonomous intelligence.</i></h2>
      <div className="timeline">
        <div><span>2022 — PRESENT</span><h3>Infosys · Specialist Programmer</h3><p>Building production AI/ML, agentic AI, data and cloud solutions across enterprise environments.</p></div>
        <div><span>EARLIER FOUNDATION</span><h3>Computer Science → AI/ML</h3><p>From a 9.83 CGPA B.Tech in Computer Science to an M.Tech in AI/ML with an NLP specialization.</p></div>
        <div><span>NEXT CHAPTER</span><h3>Intelligence → Autonomy</h3><p>Exploring robotics, autonomous systems and the convergence of human intelligence with increasingly capable AI.</p></div>
      </div>
    </section>

    <section id="projects" className="section projects reveal">
      <div className="section-kicker">03 · DISCOVERIES</div>
      <div className="section-head"><h2>Selected work</h2><p>Systems built for real users, real constraints and measurable outcomes.</p></div>
      <div className="project-grid">{projects.map(([n,title,stack,desc])=><article className="project" key={n}><div className="project-number">{n}</div><div className="project-glyph">◈</div><h3>{title}</h3><small>{stack}</small><p>{desc}</p><span className="project-arrow">↗</span></article>)}</div>
    </section>

    <section id="skills" className="section skills reveal">
      <div className="section-kicker">04 · THE TOOLKIT</div><h2>The technologies<br/><i>behind the journey.</i></h2>
      <div className="skill-grid">{Object.entries(skills).map(([group,items])=><div className="skill-card" key={group}><h3>{group}</h3><div>{items.map(x=><span key={x}>{x}</span>)}</div></div>)}</div>
    </section>

    <section className="section education reveal">
      <div className="section-kicker">05 · THE ARCHIVE</div>
      <div className="education-grid">
        <div><span>2026</span><h3>University of Cambridge</h3><p>Data Science & Machine Learning</p></div>
        <div><span>2024 — 2026</span><h3>BITS Pilani</h3><p>M.Tech Artificial Intelligence & Machine Learning · NLP specialization</p></div>
        <div><span>2018 — 2022</span><h3>Walchand Institute of Technology</h3><p>B.Tech Computer Science & Engineering · CGPA 9.83</p></div>
      </div>
    </section>

    <section id="research" className="section research reveal">
      <div className="section-kicker">06 · THE HORIZON</div>
      <div className="split"><h2>Curiosity is the<br/><i>next destination.</i></h2><div><p>Research interests spanning agentic AI, knowledge-driven machine learning, multimodal intelligence, autonomous systems, robotics and human-AI convergence.</p><p>The long-term question: how do we move from models that answer to systems that understand context, make decisions and act responsibly?</p></div></div>
    </section>

    <section className="section achievements reveal">
      <div className="section-kicker">07 · MILESTONES</div><div className="achievement-grid">
        <div><b>#3</b><span>HackerEarth Earth Day ML Challenge</span></div>
        <div><b>1st</b><span>RIT & WIT AI Hackathon</span></div>
        <div><b>#5</b><span>HackerEarth A Perfect Fit NLP Challenge</span></div>
        <div><b>∞</b><span>Continuous learning</span></div>
      </div>
      <p className="certs">Microsoft Certified · Azure Developer · Azure Data Engineer · Azure AI Engineer · Claude Certified Developer · Claude Certified Architect · Infosys Professional Certifications</p>
    </section>

    <section id="vision" className="section vision reveal">
      <div className="vision-scene"><div className="sun"></div><div className="mountain m1"></div><div className="mountain m2"></div><div className="mist"></div></div>
      <div className="vision-copy"><div className="section-kicker">08 · FUTURE VISION</div><h2>Beyond the screen.</h2><p>Quantum evolution. Human-AI convergence. Robotics. Autonomous systems.</p><p className="vision-small">I want to work at the boundary where digital intelligence becomes capable of interacting with the physical world — responsibly, creatively and at scale.</p></div>
    </section>

    <section className="section contact reveal">
      <div className="section-kicker">09 · THE NEXT CHAPTER</div><h2>Let's build something<br/><i>worth exploring.</i></h2>
      <div className="contact-row"><a href="mailto:ahc382000@gmail.com">ahc382000@gmail.com</a><a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank">LinkedIn ↗</a></div>
    </section>
    <footer>ATHARV CHAUDHARI · AI / ML · AGENTIC AI · ROBOTICS · 2026</footer>
  </main>;
}
