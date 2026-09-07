 "use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const Explorer = dynamic(() => import("../components/game/Explorer"), { ssr: false });

type Project = {
  name: string;
  tag: string;
  result: string;
  stack: string;
  mission: string;
  details: string[];
};

const projects: Project[] = [
  {
    name: "Dashboardless Insights",
    tag: "AGENTIC ANALYTICS",
    result: "~60–70% faster insight retrieval",
    stack: "LangChain · LangGraph · LangSmith · AGUI",
    mission: "Decision-ready answers from KPI and MarketShare data without manually navigating static dashboards.",
    details: ["20+ stakeholders", "Multi-agent insight workflow", "Governed tool-driven responses", "Tracing and evaluation with LangSmith"]
  },
  {
    name: "Agent Monday",
    tag: "AUTONOMOUS REPORTING",
    result: "~70% faster generation · 99%+ delivery reliability",
    stack: "OpenAI Agents SDK · Celery · Kubernetes · FastAPI · OKTA",
    mission: "Scalable weekly performance reporting across forecasting, product planning, marketing and competitor analysis.",
    details: ["Parallel Celery orchestration", "Retry / timeout / failure isolation", "Postgres state and memory", "Enterprise authentication"]
  },
  {
    name: "Shopping Assistant",
    tag: "CONTEXTUAL AI",
    result: "~40% recommendation accuracy improvement",
    stack: "Google ADK · GCP · Memory · Guardrails",
    mission: "Context-aware shopping assistance with real-time intent switching and persistent preferences.",
    details: ["1K+ sessions", "Cross-session memory", "Stateful agent orchestration", "Response validation"]
  },
  {
    name: "Client Skillset Mapping",
    tag: "AI MATCHING",
    result: "~50% team-fit accuracy improvement",
    stack: "LangGraph · OCR · Enterprise Graph · NLP",
    mission: "Assemble project teams from client requirements, skill dependencies and employee experience.",
    details: ["PyMuPDF / Tesseract parsing", "Relevance scoring", "Profile freshness checks", "Requirement-to-skill graph mapping"]
  },
  {
    name: "RICOM RDW Migration",
    tag: "DATA PLATFORM",
    result: "~40% ETL latency reduction",
    stack: "PySpark · Databricks · ADLS Gen2 · Synapse",
    mission: "Modernize a legacy Oracle / SQL Server RDW into a scalable Azure data platform.",
    details: ["Bronze / Silver / Gold pipelines", "SCD 1–4 transformations", "14 enterprise data cubes", "ADF / Data Core / Control-M"]
  },
  {
    name: "Feature Store Architecture",
    tag: "ML PLATFORM",
    result: "Reusable online / offline feature flow",
    stack: "BigQuery · Feature View · Bigtable · Vertex AI",
    mission: "Reusable GCP template connecting offline feature computation to online serving.",
    details: ["BigQuery offline layer", "Feature View schema", "Bigtable online store", "Model-serving-ready contracts"]
  }
];

const chapters = [
  { id: "trailhead", no: "01", title: "Trailhead", scene: "/scenes/jungle-river.svg", kicker: "ENTER THE WORLD", body: "AI / ML ENGINEER · AGENTIC SYSTEMS · DATA · AUTONOMY" },
  { id: "camp", no: "02", title: "Expedition Camp", scene: "/scenes/jungle-river.svg", kicker: "THE ENGINEER", body: "Four years building production AI/ML and data systems." },
  { id: "ruins", no: "03", title: "The Lost Ruins", scene: "/scenes/ruins.svg", kicker: "PROJECT ARCHIVE", body: "Six engineering missions. Open the artifacts and inspect what was built." },
  { id: "archive", no: "04", title: "Hidden Archive", scene: "/scenes/archive.svg", kicker: "DATA + ML", body: "Pipelines, feature stores, distributed processing and serving infrastructure." },
  { id: "frontier", no: "05", title: "The Frontier", scene: "/scenes/robotics.svg", kicker: "ROBOTICS + AUTONOMY", body: "Software intelligence moving toward machines and the physical world." },
  { id: "horizon", no: "06", title: "The Horizon", scene: "/scenes/horizon.svg", kicker: "FUTURE VISION", body: "Quantum evolution · human–AI convergence · embodied intelligence." }
];

const skillGroups = [
  ["AGENTIC AI", "LangChain", "LangGraph", "DeepAgents", "MCP", "Google ADK", "OpenAI Agents SDK"],
  ["ML", "NLP", "Deep Learning", "Reinforcement Learning", "Feature Engineering", "Evaluation"],
  ["DATA", "PySpark", "Databricks", "BigQuery", "Bigtable", "Snowflake", "ADLS Gen2", "Synapse"],
  ["SYSTEMS", "Python", "FastAPI", "PostgreSQL", "Celery", "Kubernetes", "REST APIs"],
  ["CLOUD", "GCP", "Azure", "Vertex AI", "ADF", "GitHub", "DataDog", "OKTA"]
];

export default function Home() {
  const [chapter, setChapter] = useState(0);
  const [project, setProject] = useState<number | null>(null);
  const [panel, setPanel] = useState<"about"|"skills"|"research"|"contact"|null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [hud, setHud] = useState(true);
  const [moving, setMoving] = useState(false);
  const [boot, setBoot] = useState(true);
  const [transition, setTransition] = useState(false);

  const current = chapters[chapter];
  const progress = Math.round((chapter / (chapters.length - 1)) * 100);

  const travel = (dir: number) => {
    setMoving(true);
    setTransition(true);
    window.setTimeout(() => {
      setChapter(v => Math.max(0, Math.min(chapters.length - 1, v + dir)));
      setTransition(false);
      window.setTimeout(() => setMoving(false), 500);
    }, 420);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setBoot(false), 1500);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") travel(1);
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") travel(-1);
      if (e.key === "Escape") { setProject(null); setPanel(null); setMapOpen(false); }
      if (e.key.toLowerCase() === "m") setMapOpen(v => !v);
      if (e.key.toLowerCase() === "h") setHud(v => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (locked || project !== null || panel || mapOpen) return;
      if (Math.abs(e.deltaY) < 30) return;
      locked = true;
      travel(e.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => locked = false, 900);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [project, panel, mapOpen]);

  useEffect(() => {
    document.body.dataset.chapter = current.id;
    return () => { delete document.body.dataset.chapter; };
  }, [current.id]);

  return (
    <main className={`game-shell ${transition ? "transitioning" : ""}`}>
      {boot && <div className="boot"><div className="boot-logo">AC</div><div className="boot-line"><span /></div><small>LOADING EXPEDITION</small></div>}

      <div className="world" style={{ backgroundImage: `url(${current.scene})` }}>
        <div className="world-vignette" />
        <div className="world-mist" />
        <img className="gif-layer waterfall-gif" src="/animations/waterfall.gif" alt="" />
        <img className="gif-layer fireflies-gif" src="/animations/fireflies.gif" alt="" />
        <img className="gif-layer birds-gif" src="/animations/birds.gif" alt="" />
        <div className="grain" />
      </div>

      <header className={`topbar ${hud ? "" : "dimmed"}`}>
        <button className="brand" onClick={() => { setChapter(0); setPanel(null); }}>
          <span className="brand-mark">AC</span><span>Atharv Chaudhari</span>
        </button>
        <nav>
          {chapters.map((c, i) => <button key={c.id} className={i===chapter ? "active" : ""} onClick={() => { setChapter(i); setProject(null); setPanel(null); }}>{c.no} {c.title}</button>)}
        </nav>
        <div className="top-actions">
          <button onClick={() => setMapOpen(true)}>MAP</button>
          <button onClick={() => setHud(v => !v)}>{hud ? "HUD" : "SHOW HUD"}</button>
        </div>
      </header>

      <div className={`chapter-copy ${hud ? "" : "minimal"}`}>
        <div className="eyebrow">{current.kicker}</div>
        <div className="chapter-no">{current.no}</div>
        <h1>{current.title}</h1>
        <p>{current.body}</p>
        <div className="chapter-actions">
          {chapter === 0 && <button className="gold" onClick={() => travel(1)}>BEGIN EXPEDITION <span>→</span></button>}
          {chapter === 1 && <>
            <button className="gold" onClick={() => setPanel("about")}>FIELD NOTES</button>
            <button className="ghost" onClick={() => travel(1)}>CONTINUE TRAIL →</button>
          </>}
          {chapter === 2 && <>
            <button className="gold" onClick={() => setProject(0)}>OPEN ARTIFACTS</button>
            <button className="ghost" onClick={() => setPanel("about")}>PROFILE</button>
          </>}
          {chapter === 3 && <>
            <button className="gold" onClick={() => setPanel("skills")}>OPEN ARSENAL</button>
            <button className="ghost" onClick={() => setPanel("research")}>RESEARCH LOG</button>
          </>}
          {chapter === 4 && <>
            <button className="gold" onClick={() => setPanel("research")}>ENTER FRONTIER</button>
            <button className="ghost" onClick={() => travel(1)}>TO THE HORIZON →</button>
          </>}
          {chapter === 5 && <>
            <button className="gold" onClick={() => setPanel("contact")}>START A CONVERSATION</button>
            <button className="ghost" onClick={() => setMapOpen(true)}>EXPEDITION MAP</button>
          </>}
        </div>
      </div>

      <div className="character-track">
        <Explorer moving={moving} />
        <div className="track-shadow" />
      </div>

      <aside className={`hud ${hud ? "" : "hidden"}`}>
        <div className="hud-title">EXPEDITION STATUS</div>
        <div className="hud-row"><span>LOCATION</span><b>{current.title.toUpperCase()}</b></div>
        <div className="hud-row"><span>PROGRESS</span><b>{progress}%</b></div>
        <div className="hud-bar"><span style={{width: `${Math.max(8, progress)}%`}} /></div>
        <div className="hud-row"><span>MODE</span><b>EXPLORATION</b></div>
      </aside>

      <div className={`chapter-rail ${hud ? "" : "hidden"}`}>
        {chapters.map((c, i) => <button key={c.id} onClick={() => setChapter(i)} className={i===chapter ? "active":""}><i>{c.no}</i><span>{c.title}</span></button>)}
      </div>

      <div className={`bottom-controls ${hud ? "" : "hidden"}`}>
        <button onClick={() => travel(-1)}>← PREVIOUS</button>
        <span><kbd>A</kbd><kbd>D</kbd> TRAVEL · <kbd>M</kbd> MAP · <kbd>H</kbd> HUD</span>
        <button onClick={() => travel(1)}>NEXT →</button>
      </div>

      <div className="mobile-dock">
        <button onClick={() => setMapOpen(true)}>MAP</button>
        <button onClick={() => travel(-1)}>←</button>
        <button className="mobile-main" onClick={() => chapter === 2 ? setProject(0) : chapter === 1 ? setPanel("about") : chapter === 5 ? setPanel("contact") : travel(1)}>EXPLORE</button>
        <button onClick={() => travel(1)}>→</button>
        <button onClick={() => setHud(v => !v)}>HUD</button>
      </div>

      <div className="section-orbit">
        <button onClick={() => setPanel("about")}>ABOUT</button>
        <button onClick={() => setProject(0)}>PROJECTS</button>
        <button onClick={() => setPanel("skills")}>SKILLS</button>
        <button onClick={() => setPanel("research")}>RESEARCH</button>
        <button onClick={() => setPanel("contact")}>CONTACT</button>
      </div>

      {project !== null && (
        <div className="overlay" onClick={() => setProject(null)}>
          <section className="artifact" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setProject(null)}>×</button>
            <div className="artifact-top"><span>ARTIFACT {String(project+1).padStart(2,"0")} / {projects.length}</span><b>{projects[project].tag}</b></div>
            <h2>{projects[project].name}</h2>
            <div className="result">{projects[project].result}</div>
            <p className="mission">{projects[project].mission}</p>
            <div className="artifact-stack">{projects[project].stack}</div>
            <div className="detail-grid">{projects[project].details.map(d => <div key={d}>◈ {d}</div>)}</div>
            <div className="artifact-nav">
              <button disabled={project===0} onClick={() => setProject(project-1)}>← PREVIOUS ARTIFACT</button>
              <button disabled={project===projects.length-1} onClick={() => setProject(project+1)}>NEXT ARTIFACT →</button>
            </div>
          </section>
        </div>
      )}

      {panel && (
        <div className="overlay" onClick={() => setPanel(null)}>
          <section className="panel" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setPanel(null)}>×</button>
            {panel === "about" && <>
              <div className="eyebrow">FIELD NOTES</div><h2>How I build</h2>
              <p>Specialist Programmer and AI / ML Engineer focused on production machine learning, agentic systems, data engineering and scalable software.</p>
              <div className="stats"><div><b>4+</b><span>YEARS</span></div><div><b>12+</b><span>AI / ML BUILDS</span></div><div><b>5+</b><span>RESEARCH PAPERS</span></div></div>
              <div className="timeline"><div><b>2022–NOW</b><span>Infosys · AI / ML engineering across ML, GenAI, agentic workflows and data platforms.</span></div><div><b>2024–2026</b><span>M.Tech Artificial Intelligence & Machine Learning · BITS Pilani.</span></div><div><b>2026</b><span>Data Science & Machine Learning · University of Cambridge.</span></div></div>
            </>}
            {panel === "skills" && <>
              <div className="eyebrow">TECHNICAL ARSENAL</div><h2>Tools of the expedition</h2>
              <div className="skill-grid">{skillGroups.map(g => <div className="skill-group" key={g[0]}><h3>{g[0]}</h3><div>{g.slice(1).map(x => <span key={x}>{x}</span>)}</div></div>)}</div>
            </>}
            {panel === "research" && <>
              <div className="eyebrow">RESEARCH LOG</div><h2>Learning beyond the trail</h2>
              <p>Research interests span machine learning, NLP, reinforcement learning, deep learning and the emerging relationship between intelligent software and embodied systems.</p>
              <div className="stats"><div><b>3×</b><span>KAGGLE EXPERT</span></div><div><b>#3</b><span>HACKEREARTH ML</span></div><div><b>1st</b><span>AI HACKATHON</span></div></div>
            </>}
            {panel === "contact" && <>
              <div className="eyebrow">BASE CAMP</div><h2>Build the next chapter.</h2>
              <p>For AI engineering, agentic systems, ML platforms and ambitious technical work.</p>
              <div className="contact-links"><a href="mailto:ahc382000@gmail.com">ahc382000@gmail.com</a><a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
            </>}
          </section>
        </div>
      )}

      {mapOpen && (
        <div className="overlay map-overlay" onClick={() => setMapOpen(false)}>
          <section className="map" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setMapOpen(false)}>×</button>
            <div className="eyebrow">EXPEDITION MAP</div><h2>Choose your route.</h2>
            <div className="map-grid">{chapters.map((c,i) => <button key={c.id} className={i===chapter ? "current":""} onClick={() => { setChapter(i); setMapOpen(false); }}><span>{c.no}</span><b>{c.title}</b><small>{c.kicker}</small></button>)}</div>
          </section>
        </div>
      )}
    </main>
  );
}
