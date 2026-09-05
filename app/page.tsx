 "use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ForestScene = dynamic(() => import("../components/three/ForestScene"), { ssr: false });

const projects = [
  {
    n: "01",
    title: "Dashboardless Insights",
    tag: "AGENTIC AI",
    desc: "Insights chatbot using LangChain, LangGraph, LangSmith and AGUI across KPI and MarketShare data.",
    tech: "LangChain • LangGraph • LangSmith • AGUI",
    impact: "20+ stakeholders • ~60–70% faster insight retrieval"
  },
  {
    n: "02",
    title: "Agent Monday",
    tag: "MULTI-AGENT SYSTEMS",
    desc: "Scalable weekly performance reporting platform with AI-generated analysis, visualizations, competitor comparisons and resilient batch execution.",
    tech: "OpenAI Agents SDK • Celery • Kubernetes • FastAPI • OKTA",
    impact: "70% faster reporting • 99%+ reliable weekly delivery"
  },
  {
    n: "03",
    title: "Shopping Assistant",
    tag: "GEN AI",
    desc: "Context-aware GCP shopping assistant with dynamic context switching, persistent preferences and stateful agent orchestration.",
    tech: "Google ADK • GCP • Agentic AI",
    impact: "1K+ sessions • ~40% recommendation accuracy improvement"
  },
  {
    n: "04",
    title: "Client Skillset Mapping",
    tag: "AI + KNOWLEDGE GRAPH",
    desc: "Resume parsing and enterprise graph-based team matching using skill, experience, role and profile-recency scoring.",
    tech: "LangGraph • OCR • Enterprise Graph • NLP",
    impact: "~50% improvement in team-fit accuracy"
  },
  {
    n: "05",
    title: "RICOM RDW Migration",
    tag: "DATA ENGINEERING",
    desc: "Legacy Oracle/SQL Server analytics modernization using Azure Databricks, ADLS Gen2 and Medallion architecture.",
    tech: "PySpark • Databricks • ADLS Gen2 • Synapse",
    impact: "~40% ETL latency reduction • 14 data cubes"
  }
];

const experience = [
  {
    year: "2025 — NOW",
    title: "Specialist Programmer — L2",
    company: "Infosys",
    text: "Senior Software and AI/ML engineering across agentic systems, feature platforms and scalable AI reporting."
  },
  {
    year: "2022 — 2025",
    title: "Specialist Programmer — L1",
    company: "Infosys",
    text: "GenAI engineering, data engineering and enterprise modernization across resume intelligence, Text-to-SQL, telecom analytics and CRM data platforms."
  }
];

const skills = {
  "AI / ML": ["Machine Learning", "Deep Learning", "NLP", "Reinforcement Learning", "Predictive Analysis", "Statistics"],
  "Agentic AI": ["LangChain", "LangGraph", "LangSmith", "DeepAgents", "OpenAI Agents SDK", "Google ADK", "MCP", "AGUI"],
  "Data": ["PySpark", "Databricks", "Snowflake", "BigQuery", "PostgreSQL", "ADLS Gen2", "Synapse", "Oracle", "SQL Server"],
  "Engineering": ["Python", "SQL", "JavaScript", "FastAPI", "Flask", "Django", "Celery", "RabbitMQ", "REST APIs", "Microservices"],
  "Cloud / Platform": ["Azure", "GCP", "Vertex AI", "Bigtable", "Kubernetes", "GitHub", "DataDog", "ADF"],
};

const certifications = [
  "Microsoft Certified: Azure Developer Associate",
  "Microsoft Certified: Azure Data Engineer Associate",
  "Microsoft Certified: Azure AI Engineer Associate",
  "Claude Certified Developer — Foundations",
  "Claude Certified Architect — Professional",
  "Infosys Tagged AI, Cloud, Insights & Big Data Professional",
  "Kaggle 3x Expert"
];

const achievements = [
  "Rank 3 — HackerEarth Earth Day ML Challenge",
  "1st Prize — RIT and WIT AI Hackathon",
  "Rank 5 — HackerEarth A Perfect Fit NLP Challenge",
  "Infosys Platinum Club Member",
  "RISE / Insta Award Winner"
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className={dark ? "site dark" : "site light"}>
      <header className="nav">
        <a className="brand" href="#home"><span>AC</span> ATHARV CHAUDHARI</a>
        <nav>
          <a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a>
          <a href="#skills">Skills</a><a href="#education">Education</a><a href="#research">Research</a><a href="#vision">Vision</a><a href="#contact">Contact</a>
        </nav>
        <button className="theme" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? "☀" : "☾"}</button>
      </header>

      <main>
        <section id="home" className="hero">
          <ForestScene dark={dark} />
          <div className="hero-copy">
            <p className="eyebrow">AI • MACHINE LEARNING • AGENTIC AI • DATA • ROBOTICS</p>
            <h1>Atharv<br/><em>Chaudhari</em></h1>
            <p className="role">Specialist Programmer · AI / ML Engineer</p>
            <p className="lead">Building production-grade intelligent systems across AI engineering, machine learning, data platforms, cloud and scalable software.</p>
            <div className="actions"><a href="#projects" className="button primary">Explore my work ↘</a><a href="#about" className="button ghost">Know me</a></div>
          </div>
          <div className="scroll">SCROLL TO EXPLORE <span>↓</span></div>
        </section>

        <section id="about" className="section about reveal">
          <div className="section-label">01 / ABOUT ME</div>
          <div className="split">
            <h2>AI engineer.<br/><span>System builder.</span></h2>
            <div>
              <p>Machine Learning & AI Engineer with 4 years of experience designing and building production-grade AI, ML and data systems across retail, telecom and entertainment.</p>
              <p>I take problems from <strong>idea → architecture → implementation → production</strong>, with a systems view spanning data, models, agents, APIs, infrastructure, security, observability, scalability and cost.</p>
            </div>
          </div>
          <div className="stats">
            <div><b>4+</b><span>YEARS EXPERIENCE</span></div>
            <div><b>20+</b><span>STAKEHOLDERS ENABLED</span></div>
            <div><b>14</b><span>ENTERPRISE DATA CUBES</span></div>
            <div><b>3×</b><span>KAGGLE EXPERT</span></div>
          </div>
        </section>

        <section id="experience" className="section timeline reveal">
          <div className="section-label">02 / EXPERIENCE</div>
          <h2>Professional<br/><span>journey.</span></h2>
          <div className="journey">
            {experience.map((e, i) => <article className="journey-item" key={e.year}>
              <div className="year">{e.year}</div><div className="node">{i + 1}</div>
              <div><h3>{e.title}</h3><small>{e.company}</small><p>{e.text}</p></div>
            </article>)}
          </div>
        </section>

        <section id="projects" className="section projects reveal">
          <div className="section-label">03 / SELECTED PROJECTS</div>
          <div className="project-heading"><h2>Things<br/><span>I build.</span></h2><p>Real systems spanning agentic AI, GenAI, machine learning, data engineering and enterprise platforms.</p></div>
          <div className="project-grid">
            {projects.map(p => <article className="project" key={p.n}>
              <div className="project-art"><div className="orb"></div><span>{p.n}</span></div>
              <div className="project-info"><small>{p.tag}</small><h3>{p.title}</h3><p>{p.desc}</p><code>{p.tech}</code><strong>{p.impact}</strong><a href="#contact">Explore project ↗</a></div>
            </article>)}
          </div>
        </section>

        <section id="skills" className="section skills reveal">
          <div className="section-label">04 / TECHNICAL UNIVERSE</div>
          <h2>My technical<br/><span>stack.</span></h2>
          <div className="skill-groups">
            {Object.entries(skills).map(([group, items]) => <div className="skill-group" key={group}><h3>{group}</h3><div>{items.map(x => <span key={x}>{x}</span>)}</div></div>)}
          </div>
        </section>

        <section id="education" className="section education reveal">
          <div className="section-label">05 / EDUCATION</div>
          <h2>Learning is<br/><span>continuous.</span></h2>
          <div className="education-grid">
            <article><small>2026</small><h3>Data Science & Machine Learning</h3><p>University of Cambridge</p><span>June 2026 — November 2026</span></article>
            <article><small>2024 — 2026</small><h3>M.Tech — Artificial Intelligence & Machine Learning</h3><p>BITS Pilani</p><span>Specialization in Natural Language Processing (NLP)</span></article>
            <article><small>2018 — 2022</small><h3>B.Tech — Computer Science & Engineering</h3><p>Walchand Institute of Technology, Solapur</p><span>CGPA: 9.83</span></article>
          </div>
        </section>

        <section id="research" className="section research reveal">
          <div className="section-label">06 / RESEARCH & INTERESTS</div>
          <div className="research-box"><div><small>EXPLORING</small><h2>Knowledge-driven AI.<br/>Multi-agent systems.<br/>Autonomy.</h2></div>
            <p>Deep interest in the evolution of intelligent computing — from Machine Learning and Agentic AI toward Quantum Computing and emerging computational paradigms. Long-term focus: intelligent, adaptive and increasingly autonomous systems at scale.</p>
          </div>
        </section>

        <section className="section credentials reveal">
          <div className="section-label">07 / CERTIFICATIONS & ACHIEVEMENTS</div>
          <div className="credential-grid">
            <div><h3>Certifications</h3>{certifications.map(x => <p key={x}>✦ {x}</p>)}</div>
            <div><h3>Achievements</h3>{achievements.map(x => <p key={x}>✦ {x}</p>)}</div>
          </div>
        </section>

        <section id="vision" className="section vision reveal">
          <div className="vision-bg"><div className="sun"></div><div className="mountain m1"></div><div className="mountain m2"></div></div>
          <div className="vision-copy"><div className="section-label">08 / FUTURE VISION</div><h2>Quantum evolution.<br/>Human × AI convergence.<br/>Robotics.</h2>
            <p>I am deeply interested in where intelligent computing goes next — toward adaptive software, embodied intelligence, autonomous systems and new computational paradigms.</p>
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <div className="section-label">09 / CONNECT</div>
          <h2>Let's build<br/><em>what comes next.</em></h2>
          <div className="contact-links"><a href="mailto:ahc382000@gmail.com">ahc382000@gmail.com ↗</a><a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="#">GitHub ↗</a><a href="#">Kaggle ↗</a><a href="#">Resume ↗</a></div>
        </section>
      </main>
      <footer><span>© 2026 ATHARV CHAUDHARI</span><span>AI • ML • DATA • ROBOTICS</span><span>BUILT WITH THREE.JS</span></footer>
    </div>
  );
}