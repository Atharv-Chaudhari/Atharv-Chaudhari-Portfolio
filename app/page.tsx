"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Atom, Bot, BrainCircuit,
  Check, ChevronRight, CircleDot, Code2, Command, Database, Download,
  Github, Globe2, Layers3, Linkedin, Mail, Menu, Moon, Network, Radio, Search,
  ShieldCheck, Sparkles, Sun, Workflow, X, Zap
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Project = {
  id: string; number: string; title: string; category: string; type: string;
  summary: string; detail: string; stack: string[]; metric?: string; metricLabel?: string;
  icon: typeof BrainCircuit; tone: string;
};

const projects: Project[] = [
  {
    id: "shopping-assistant", number: "01", title: "Shopping Assistant", category: "Agentic AI",
    type: "Retail · Personalization", summary: "A context-aware retail assistant built around personalized recommendations and stateful agent orchestration.",
    detail: "Built on GCP with Google ADK, the system supports real-time intent changes, cross-session preference memory and controlled tool use. Guardrails help bound context, validate responses and mitigate hallucinations.",
    stack: ["Google ADK", "MCP", "GCP", "Agentic AI", "Memory", "Guardrails"],
    metric: "~40%", metricLabel: "reported improvement in recommendation accuracy", icon: Bot, tone: "cyan"
  },
  {
    id: "agent-monday", number: "02", title: "Agent Monday", category: "Agentic AI",
    type: "Enterprise · Reporting", summary: "Multi-agent product intelligence that turns performance data into grounded, decision-ready reports.",
    detail: "An OpenAI Agents SDK system for KPI-driven product reporting, with batched workflows, Postgres state, secure integrations and resilience mechanisms for rate limits, retries, timeouts and idempotency.",
    stack: ["OpenAI Agents SDK", "FastAPI", "PostgreSQL", "Celery", "Kubernetes", "AKS"],
    metric: "~70%", metricLabel: "faster report generation, as reported in résumé", icon: Workflow, tone: "violet"
  },
  {
    id: "feature-store", number: "03", title: "GCP Feature Store", category: "Data & ML",
    type: "Feature Engineering · Serving", summary: "Reusable templates for delivering governed features from analytical storage to online model serving.",
    detail: "Reusable GCP patterns map BigQuery schemas into Vertex AI Feature Views and synchronize features into the Bigtable-backed Online Store, supporting downstream serving workflows.",
    stack: ["BigQuery", "Vertex AI", "Feature Views", "Bigtable", "Model Serving"],
    icon: Database, tone: "blue"
  },
  {
    id: "reportless-insights", number: "04", title: "Reportless Insights", category: "AI Engineering",
    type: "Enterprise · Decision Support", summary: "A conversational route from business questions to decision-ready answers across KPI and market-share data.",
    detail: "Agentic workflows use LangChain, LangGraph and related evaluation/observability tooling to retrieve insights from business data, with attention to governed access, guardrails and continuous validation.",
    stack: ["LangChain", "LangGraph", "LangSmith", "MLflow", "AG-UI"],
    metric: "20+", metricLabel: "stakeholders reported in résumé", icon: BrainCircuit, tone: "cyan"
  },
  {
    id: "skill-mapping", number: "05", title: "Client Skillset Mapping", category: "AI Engineering",
    type: "Knowledge Graphs · Matching", summary: "An AI-assisted platform for matching skills and experience to client project requirements.",
    detail: "Resume parsing, skill and experience mapping, relevance scoring and profile-freshness checks support candidate-team recommendations aligned with role requirements.",
    stack: ["LangGraph", "OCR", "Knowledge Graph", "Ranking", "Validation"],
    metric: "~50%", metricLabel: "reported improvement in team-fit accuracy", icon: Network, tone: "violet"
  },
  {
    id: "rdw-migration", number: "06", title: "Enterprise Data Modernization", category: "Data & ML",
    type: "Telecom · Data Engineering", summary: "Modernizing legacy data warehousing through distributed processing and a medallion architecture.",
    detail: "Work included Oracle/SQL Server RDW migration toward Azure Databricks, ADLS Gen2 and Synapse; PySpark pipeline optimization; Bronze/Silver/Gold transformations and enterprise data cubes.",
    stack: ["Azure Databricks", "PySpark", "ADLS Gen2", "Synapse", "ETL/ELT"],
    metric: "14", metricLabel: "enterprise data cubes migrated/optimized", icon: Layers3, tone: "blue"
  }
];

const categories = ["All", "Agentic AI", "AI Engineering", "Data & ML"];

const capabilities = [
  { title: "Agentic AI", desc: "Planning, tool use, memory, multi-agent orchestration, guardrails and evaluation.", icon: Workflow, tags: ["LangGraph", "LangChain", "MCP", "Google ADK", "OpenAI Agents SDK", "DeepAgents"] },
  { title: "ML Engineering", desc: "Feature engineering, model workflows, serving, evaluation and monitoring.", icon: BrainCircuit, tags: ["ML workflows", "Feature engineering", "Model serving", "Evaluation"] },
  { title: "Data Engineering", desc: "Reliable data movement, transformation, feature pipelines and platform optimization.", icon: Database, tags: ["ETL / ELT", "PySpark", "Feature stores", "Data quality"] },
  { title: "Cloud & Systems", desc: "Production APIs, distributed workloads, secure integrations and cloud platforms.", icon: Globe2, tags: ["GCP", "Azure", "Databricks", "FastAPI", "PostgreSQL"] }
];

const milestones = [
  { date: "OCT 2025 — PRESENT", role: "Specialist Programmer — L2", org: "Infosys · Pune", desc: "Building production AI/ML systems, agentic workflows, feature-store patterns and decision-support experiences." },
  { date: "AUG 2022 — SEP 2025", role: "Specialist Programmer — L1", org: "Infosys · Pune", desc: "Worked across GenAI, data engineering, text-to-SQL, candidate matching and enterprise data modernization." }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [agentStep, setAgentStep] = useState(0);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [evaluationMode, setEvaluationMode] = useState<"quality" | "grounding">("quality");
  const [frontierTab, setFrontierTab] = useState("Quantum computing");
  const [contactCopied, setContactCopied] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const filteredProjects = useMemo(
    () => projects.filter(p => activeCategory === "All" || p.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCommandOpen(v => !v); }
      if (e.key === "Escape") { setCommandOpen(false); setSelectedProject(null); setMobileMenu(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => { mq.removeEventListener("change", handler); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setCommandOpen(false); setMobileMenu(false);
  };

  const commandItems = [
    { label: "Home", target: "home", hint: "Go to the introduction" },
    { label: "Selected work", target: "work", hint: "Browse engineering projects" },
    { label: "Systems Lab", target: "lab", hint: "Try interactive demos" },
    { label: "Experience", target: "experience", hint: "Career and education" },
    { label: "Future Observatory", target: "frontier", hint: "Research interests" },
    { label: "Contact", target: "contact", hint: "Get in touch" }
  ].filter(i => (i.label + i.hint).toLowerCase().includes(commandQuery.toLowerCase()));

  const motionProps = reducedMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.55 } };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Atharv Chaudhari home" onClick={() => setMobileMenu(false)}>
          <span className="brand-mark">A<span>C</span></span>
          <span className="brand-name">ATHARV CHAUDHARI<small>AI / ML ENGINEER</small></span>
        </a>
        <nav className={`nav-links ${mobileMenu ? "nav-open" : ""}`} aria-label="Main navigation">
          {[["Work","work"],["Systems Lab","lab"],["Experience","experience"],["Frontier","frontier"]].map(([label,id]) =>
            <a key={id} href={`#${id}`} onClick={() => setMobileMenu(false)}>{label}</a>
          )}
          <a href="#contact" className="nav-contact" onClick={() => setMobileMenu(false)}>Let’s connect <ArrowUpRight size={14}/></a>
        </nav>
        <div className="top-actions">
          <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme" title="Toggle theme">
            {theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}
          </button>
          <button className="command-button" onClick={() => setCommandOpen(true)} aria-label="Open command menu"><Command size={14}/><span> K</span></button>
          <button className="icon-button mobile-toggle" onClick={() => setMobileMenu(v => !v)} aria-label="Toggle menu">{mobileMenu ? <X size={19}/> : <Menu size={19}/>}</button>
        </div>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <motion.div className="eyebrow" {...motionProps}><span className="status-dot"/> MACHINE LEARNING · AI · SYSTEMS</motion.div>
          <motion.h1 {...motionProps} transition={{ duration: 0.65, delay: 0.08 }}>
            I engineer<br/>intelligent <span className="gradient-text">systems.</span>
          </motion.h1>
          <motion.p className="hero-subtitle" {...motionProps} transition={{ duration: 0.65, delay: 0.16 }}>
            From agentic AI and production ML to the data platforms that make intelligence useful at scale.
          </motion.p>
          <motion.div className="hero-ctas" {...motionProps} transition={{ duration: 0.65, delay: 0.22 }}>
            <button className="button button-primary" onClick={() => scrollTo("work")}>Explore selected work <ArrowRight size={16}/></button>
            <a className="button button-secondary" href="/resume"><Download size={15}/> View résumé</a>
          </motion.div>
          <motion.div className="hero-proof" {...motionProps} transition={{ duration: 0.65, delay: 0.28 }}>
            <div className="proof-item"><span className="proof-number">4+</span><span>years in AI & engineering</span></div>
            <span className="proof-separator"/>
            <div className="proof-item"><span className="proof-number">AI → Systems</span><span>from idea to production</span></div>
          </motion.div>
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/atharv-chaudhari/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
            <a href="https://github.com/Atharv-Chaudhari" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>
            <a href="mailto:ahc382000@gmail.com" aria-label="Email"><Mail size={17}/></a>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract 3D-inspired intelligent systems artwork">
          <div className="art-grid" />
          <div className="orbit orbit-a"><i/><i/><i/></div>
          <div className="orbit orbit-b"><i/><i/></div>
          <div className="orbit orbit-c"/>
          <div className="core-shell"><div className="core-inner"><BrainCircuit size={58} strokeWidth={1.1}/></div></div>
          <div className="art-crosshair crosshair-a"/>
          <div className="art-crosshair crosshair-b"/>
          <div className="floating-label label-a"><span className="label-pulse"/> SYSTEMS / 001 <b>ACTIVE</b></div>
          <div className="floating-label label-b"><span>01</span> AGENTIC INTELLIGENCE</div>
          <div className="floating-label label-c"><span>02</span> DATA INFRASTRUCTURE</div>
          <div className="art-caption"><span>FIG 01 / SYSTEMS IN MOTION</span><span>INTERACTIVE BY DESIGN ↗</span></div>
          <div className="art-scanline"/>
        </div>
        <a className="scroll-cue" href="#manifesto"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
      </section>

      <section className="manifesto section-wrap" id="manifesto">
        <div className="section-kicker"><span>01 / APPROACH</span><span className="kicker-line"/></div>
        <div className="manifesto-grid">
          <motion.h2 {...motionProps}>The model is only<br/>one part of the <span className="muted-gradient">system.</span></motion.h2>
          <motion.div className="manifesto-copy" {...motionProps}>
            <p>I focus on the engineering around intelligence: data, orchestration, APIs, evaluation, security and infrastructure working together as one reliable platform.</p>
            <p className="muted-copy">The goal is not a convincing demo. It is a system that behaves predictably when real constraints show up.</p>
            <button className="text-link" onClick={() => scrollTo("lab")}>Explore how I think <ArrowDownRight size={16}/></button>
          </motion.div>
        </div>
        <div className="capability-grid">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return <motion.article className="capability-card" key={cap.title} {...motionProps}>
              <div className="capability-top"><span className="cap-index">0{i+1}</span><Icon size={21}/></div>
              <h3>{cap.title}</h3><p>{cap.desc}</p>
              <div className="tag-list">{cap.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            </motion.article>;
          })}
        </div>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-kicker"><span>02 / SELECTED WORK</span><span className="kicker-line"/><span className="kicker-note">ENGINEERING IN PRACTICE</span></div>
        <div className="section-heading-row">
          <div><h2>Built for the <span className="gradient-text">real world.</span></h2><p className="section-intro">A selection of systems spanning agentic AI, decision support and data platforms.</p></div>
          <span className="project-count">{String(filteredProjects.length).padStart(2,"0")} PROJECTS <ArrowDownRight size={14}/></span>
        </div>
        <div className="filter-row" role="group" aria-label="Filter projects">
          {categories.map(c => <button key={c} className={`filter-chip ${activeCategory === c ? "active" : ""}`} onClick={() => setActiveCategory(c)}>{c}</button>)}
        </div>
        <div className="projects-grid">
          {filteredProjects.map((p, i) => {
            const Icon = p.icon;
            return <motion.button layout key={p.id} className={`project-card tone-${p.tone}`} onClick={() => setSelectedProject(p)} {...motionProps}>
              <div className="project-visual">
                <div className="visual-grid"/>
                <div className="visual-number">{p.number}</div>
                <div className="project-visual-icon"><Icon size={45} strokeWidth={1.15}/></div>
                <div className="visual-orbit"/>
                <div className="visual-orbit orbit-inner"/>
                <div className="project-open"><ArrowUpRight size={17}/></div>
                <span className="visual-type">{p.type.toUpperCase()}</span>
              </div>
              <div className="project-info">
                <div className="project-title-row"><h3>{p.title}</h3><ArrowUpRight size={17}/></div>
                <p>{p.summary}</p>
                <div className="tag-list">{p.stack.slice(0,4).map(t => <span className="tag" key={t}>{t}</span>)}</div>
                {p.metric && <div className="project-metric"><strong>{p.metric}</strong><span>{p.metricLabel}</span></div>}
              </div>
            </motion.button>;
          })}
        </div>
        <div className="work-footnote"><CircleDot size={13}/> Project details are based on résumé/profile material. Metrics are reported outcomes and may vary by evaluation method or production context.</div>
      </section>

      <section className="lab-section section-wrap" id="lab">
        <div className="section-kicker"><span>03 / SYSTEMS LAB</span><span className="kicker-line"/><span className="kicker-note">INTERACT · INSPECT · UNDERSTAND</span></div>
        <div className="section-heading-row lab-heading">
          <div><h2>Don’t just read it.<br/><span className="gradient-text">Run the idea.</span></h2><p className="section-intro">Small, browser-based simulations that expose the mechanics behind intelligent systems.</p></div>
          <div className="lab-stamp"><Radio size={15}/> BROWSER SIMULATIONS <span>NO API KEY REQUIRED</span></div>
        </div>
        <div className="lab-grid">
          <article className="lab-card agent-lab">
            <div className="lab-card-header"><div><span className="lab-id">LAB / 001</span><h3>Agent execution trace</h3></div><span className="demo-badge"><span/> SIMULATED</span></div>
            <p className="lab-description">Step through a task lifecycle and inspect where planning, tools and validation fit together.</p>
            <div className="execution-flow">
              {[
                ["01","Plan","Break the request into steps.", Workflow],
                ["02","Route","Choose an allowed tool.", Network],
                ["03","Execute","Run the selected action.", Zap],
                ["04","Validate","Check the result and constraints.", ShieldCheck]
              ].map(([num, title, desc, Icon], i) => {
                const StepIcon = Icon as typeof Workflow;
                return <button key={num as string} className={`execution-step ${agentStep === i ? "selected" : ""} ${agentStep > i ? "complete" : ""}`} onClick={() => setAgentStep(i)}>
                  <span className="execution-index">{agentStep > i ? <Check size={13}/> : num as string}</span>
                  <span className="execution-copy"><strong>{title as string}</strong><small>{desc as string}</small></span>
                  <StepIcon size={17}/>
                </button>;
              })}
            </div>
            <div className="trace-output">
              <div className="trace-top"><span><span className="trace-dot"/> TRACE OUTPUT</span><span>STEP {String(agentStep+1).padStart(2,"0")} / 04</span></div>
              <code>{[
                "> task.plan(objective, constraints)",
                "> router.select(allowed_tool, context)",
                "> tool.execute(input, timeout=30s)",
                "> validator.check(output, policy)"
              ][agentStep]}</code>
              <p>{[
                "The orchestrator decomposes the request and records a plan.",
                "Routing selects a tool based on capability and policy.",
                "Execution should respect timeouts, retries and tool boundaries.",
                "Validation checks whether the output is usable and safe to return."
              ][agentStep]}</p>
            </div>
            <button className="button button-secondary lab-next" onClick={() => setAgentStep((agentStep+1)%4)}>{agentStep === 3 ? "Restart trace" : "Advance trace"} <ArrowRight size={15}/></button>
          </article>

          <article className="lab-card pipeline-lab">
            <div className="lab-card-header"><div><span className="lab-id">LAB / 002</span><h3>Feature delivery pipeline</h3></div><span className="demo-badge"><span/> SIMULATED</span></div>
            <p className="lab-description">Explore the path from analytical data to features consumed during inference.</p>
            <div className="pipeline-flow">
              {[
                ["BigQuery","Offline feature data","database"],
                ["Feature View","Definitions & mapping","layers"],
                ["Bigtable","Online feature store","server"],
                ["Model serving","Inference consumption","cpu"]
              ].map(([name, desc, kind], i) => <button key={name} onClick={() => setPipelineStep(i)} className={`pipeline-node ${pipelineStep === i ? "selected" : ""} ${pipelineStep > i ? "visited" : ""}`}>
                <span className="pipeline-node-icon">{kind === "database" ? <Database size={18}/> : kind === "layers" ? <Layers3 size={18}/> : kind === "server" ? <Radio size={18}/> : <BrainCircuit size={18}/>}</span>
                <span><strong>{name}</strong><small>{desc}</small></span>
                {i < 3 && <ChevronRight className="pipeline-chevron" size={16}/>}
              </button>)}
            </div>
            <div className="pipeline-detail">
              <span className="lab-id">SELECTED STAGE / 0{pipelineStep+1}</span>
              <h4>{["Analytical source","Feature definitions","Online feature storage","Inference layer"][pipelineStep]}</h4>
              <p>{[
                "BigQuery stores analytical data. Feature rows need consistent entity keys, timestamps and typed values.",
                "A Feature View maps the source schema and defines how features are represented and synchronized.",
                "The Bigtable-backed Online Store provides low-latency access to synchronized feature values.",
                "A serving component retrieves the required features and uses them as model inputs at inference time."
              ][pipelineStep]}</p>
              <div className="pipeline-progress"><span style={{ width: `${(pipelineStep+1)*25}%` }}/></div>
            </div>
            <button className="button button-secondary lab-next" onClick={() => setPipelineStep((pipelineStep+1)%4)}>{pipelineStep === 3 ? "Back to source" : "Next pipeline stage"} <ArrowRight size={15}/></button>
          </article>

          <article className="lab-card eval-lab">
            <div className="lab-card-header"><div><span className="lab-id">LAB / 003</span><h3>Evaluation workbench</h3></div><span className="demo-badge"><span/> SAMPLE DATA</span></div>
            <p className="lab-description">Explore why model quality is multidimensional. These sample scores are illustrative, not measured results.</p>
            <div className="eval-switch" role="group" aria-label="Evaluation dimension">
              <button className={evaluationMode === "quality" ? "active" : ""} onClick={() => setEvaluationMode("quality")}>Answer quality</button>
              <button className={evaluationMode === "grounding" ? "active" : ""} onClick={() => setEvaluationMode("grounding")}>Grounding</button>
            </div>
            {[
              {name:"Configuration A", quality:74, grounding:82, safety:91},
              {name:"Configuration B", quality:86, grounding:77, safety:88}
            ].map(row => <div className="score-row" key={row.name}>
              <div className="score-heading"><strong>{row.name}</strong><span>{row[evaluationMode]}/100</span></div>
              <div className="score-track"><span style={{ width: `${row[evaluationMode]}%` }}/></div>
              <div className="score-sub">Safety checks <b>{row.safety}/100</b></div>
            </div>)}
            <div className="evaluation-note"><ShieldCheck size={16}/><p>A useful evaluation combines representative test cases, explicit rubrics, safety checks and reproducible comparisons.</p></div>
          </article>
        </div>
        <div className="lab-disclaimer"><ShieldCheck size={15}/> These are client-side learning simulations. They do not call a model, access production infrastructure or represent live telemetry.</div>
      </section>

      <section className="experience-section section-wrap" id="experience">
        <div className="section-kicker"><span>04 / EXPERIENCE</span><span className="kicker-line"/><span className="kicker-note">PROFESSIONAL FOUNDATION</span></div>
        <div className="experience-grid">
          <div className="experience-intro"><h2>Engineering is<br/>a <span className="gradient-text">practice.</span></h2><p className="section-intro">Experience across enterprise AI, data engineering and production systems.</p>
            <div className="experience-facts"><div><span>01</span><p>Production AI<br/>and agentic systems</p></div><div><span>02</span><p>Cloud data<br/>platforms</p></div><div><span>03</span><p>Enterprise<br/>engineering</p></div></div>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => <motion.article className="timeline-item" key={m.role} {...motionProps}>
              <div className="timeline-marker"><span/></div><div className="timeline-content"><span className="timeline-date">{m.date}</span><h3>{m.role}</h3><span className="timeline-org">{m.org}</span><p>{m.desc}</p></div>
            </motion.article>)}
            <div className="education-card"><span className="lab-id">EDUCATION</span><div className="education-item"><span className="education-year">2024 — 2026</span><div><h4>M.Tech. · Artificial Intelligence & Machine Learning</h4><p>BITS Pilani, Work Integrated Learning Program</p></div></div><div className="education-item"><span className="education-year">2018 — 2022</span><div><h4>B.Tech. · Computer Science & Engineering</h4><p>Walchand Institute of Technology</p></div></div><div className="education-item"><span className="education-year">2026</span><div><h4>Data Science & Machine Learning Training</h4><p>Infosys / University of Cambridge program listed in profile</p></div></div></div>
          </div>
        </div>
        <div className="credentials-strip"><div><Sparkles size={17}/><span>Microsoft Azure Developer Associate</span></div><div><Sparkles size={17}/><span>Microsoft Azure AI Engineer Associate</span></div><div><Sparkles size={17}/><span>Microsoft Azure Data Engineer Associate</span></div><div><Zap size={17}/><span>Kaggle · 3× Expert (profile-listed)</span></div></div>
      </section>

      <section className="frontier-section section-wrap" id="frontier">
        <div className="section-kicker"><span>05 / FUTURE OBSERVATORY</span><span className="kicker-line"/><span className="kicker-note">RESEARCH INTERESTS · NOT CLAIMED PROJECTS</span></div>
        <div className="frontier-layout">
          <div className="frontier-copy"><span className="frontier-overline"><Atom size={15}/> BEYOND TODAY’S SYSTEMS</span><h2>Curiosity has<br/>a <span className="gradient-text">long horizon.</span></h2><p>Exploring how computing paradigms, human–AI collaboration and autonomous machines may reshape intelligent systems.</p>
            <div className="frontier-tabs">
              {["Quantum computing","Human–AI convergence","Robotics & autonomy"].map((t, i) => <button key={t} className={frontierTab === t ? "active" : ""} onClick={() => setFrontierTab(t)}><span>0{i+1}</span>{t}<ArrowUpRight size={15}/></button>)}
            </div>
          </div>
          <div className="frontier-art">
            <div className="frontier-stars"/>
            <div className="frontier-ring ring-one"/><div className="frontier-ring ring-two"/><div className="frontier-ring ring-three"/>
            <div className="frontier-object">{frontierTab === "Quantum computing" ? <Atom size={74} strokeWidth={0.8}/> : frontierTab === "Human–AI convergence" ? <Network size={74} strokeWidth={0.8}/> : <Bot size={74} strokeWidth={0.8}/>}</div>
            <div className="frontier-art-label"><span>FIELD NOTE / 0{["Quantum computing","Human–AI convergence","Robotics & autonomy"].indexOf(frontierTab)+1}</span><strong>{frontierTab.toUpperCase()}</strong></div>
            <p className="frontier-art-caption">{frontierTab === "Quantum computing" ? "New computational models · Quantum information · QML" : frontierTab === "Human–AI convergence" ? "Collaborative intelligence · Human-in-the-loop systems · Adaptive interfaces" : "Embodied intelligence · Autonomous agents · Human–robot interaction"}</p>
          </div>
        </div>
        <div className="frontier-note"><CircleDot size={14}/><p>This section represents long-term interests and areas for learning. Research, prototypes and results will be added only as they are actually completed.</p></div>
      </section>

      <section className="contact-section section-wrap" id="contact">
        <div className="contact-panel">
          <div className="contact-orb" aria-hidden="true"><div/><div/><div/></div>
          <div className="contact-copy"><div className="section-kicker"><span>06 / CONNECT</span><span className="kicker-line"/></div><h2>Have a problem<br/>worth <span className="gradient-text">engineering?</span></h2><p>For AI engineering, intelligent systems and thoughtful technical collaboration.</p><a className="button button-primary" href="mailto:ahc382000@gmail.com">Start a conversation <ArrowUpRight size={16}/></a></div>
          <div className="contact-links"><a href="mailto:ahc382000@gmail.com"><span className="contact-icon"><Mail size={18}/></span><span><small>EMAIL</small><strong>ahc382000@gmail.com</strong></span><ArrowUpRight size={15}/></a><a href="https://www.linkedin.com/in/atharv-chaudhari/" target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin size={18}/></span><span><small>LINKEDIN</small><strong>Connect professionally</strong></span><ArrowUpRight size={15}/></a><a href="https://github.com/Atharv-Chaudhari" target="_blank" rel="noreferrer"><span className="contact-icon"><Github size={18}/></span><span><small>GITHUB</small><strong>Code and experiments</strong></span><ArrowUpRight size={15}/></a></div>
        </div>
      </section>

      <footer className="footer section-wrap"><a className="brand footer-brand" href="#home"><span className="brand-mark">A<span>C</span></span><span className="brand-name">ATHARV CHAUDHARI<small>AI / ML ENGINEER</small></span></a><span className="footer-center">DESIGNED AROUND SYSTEMS, BUILT WITH INTENT.</span><button className="back-top" onClick={() => scrollTo("home")}>BACK TO TOP <ArrowUpRight size={14}/></button><span className="footer-copy">© {new Date().getFullYear()} Atharv Chaudhari</span></footer>

      <AnimatePresence>
        {selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
          <motion.div className="project-modal" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18 }} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={19}/></button>
            <span className="lab-id">PROJECT / {selectedProject.number} · {selectedProject.category.toUpperCase()}</span><h2 id="modal-title">{selectedProject.title}</h2><p className="modal-summary">{selectedProject.summary}</p><div className={`modal-art tone-${selectedProject.tone}`}><selectedProject.icon size={62} strokeWidth={1}/><span>{selectedProject.type.toUpperCase()}</span></div><h3>Engineering overview</h3><p>{selectedProject.detail}</p><h3>Technologies & concepts</h3><div className="tag-list">{selectedProject.stack.map(t => <span className="tag" key={t}>{t}</span>)}</div>{selectedProject.metric && <div className="modal-metric"><strong>{selectedProject.metric}</strong><span>{selectedProject.metricLabel}. This is a résumé-reported result, not an independently verified benchmark.</span></div>}<div className="modal-footer"><span>Detailed implementation and public links can be added where disclosure is permitted.</span><button className="button button-secondary" onClick={() => setSelectedProject(null)}>Close <X size={14}/></button></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {commandOpen && <motion.div className="command-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCommandOpen(false)}>
          <motion.div className="command-palette" initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command palette">
            <div className="command-search"><Search size={18}/><input autoFocus placeholder="Where do you want to go?" value={commandQuery} onChange={e => setCommandQuery(e.target.value)}/><button onClick={() => setCommandOpen(false)}><X size={16}/></button></div>
            <div className="command-list">{commandItems.map((item, i) => <button key={item.target} onClick={() => scrollTo(item.target)}><span className="command-item-icon">{i === 0 ? <Globe2 size={16}/> : i === 1 ? <Layers3 size={16}/> : i === 2 ? <Workflow size={16}/> : i === 3 ? <Code2 size={16}/> : i === 4 ? <Atom size={16}/> : <Mail size={16}/>}</span><span><strong>{item.label}</strong><small>{item.hint}</small></span><span className="command-enter">↵</span></button>)}{commandItems.length === 0 && <p className="empty-command">No matching sections.</p>}</div>
            <div className="command-footer"><span><Command size={12}/> K TO TOGGLE</span><span>ESC TO CLOSE</span></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
