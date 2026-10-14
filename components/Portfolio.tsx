"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Atom, Bot, Braces, Check, ChevronRight,
  Cloud, Code2, Database, ExternalLink, Github, Linkedin, Menu, Network,
  Orbit, Radio, ShieldCheck, Sparkles, Workflow, X, Zap
} from "lucide-react";

type DemoTab = "agents" | "features" | "evaluation";

const projects = [
  {
    number: "01", category: "AGENTIC AI · RETAIL", title: "Shopping Assistant",
    description: "Personalized retail journeys powered by multi-agent workflows, tool calling, and cross-session context.",
    tags: ["MCP", "Google ADK", "Agentic AI"], visual: "shopping", accent: "cyan",
    detail: "A retail-oriented assistant concept combining recommendations, tool-enabled workflows, memory, and guardrails. The public case study should describe only the parts you personally built and can disclose."
  },
  {
    number: "02", category: "ML PLATFORM · GCP", title: "Feature Store Pipeline",
    description: "Reusable patterns connecting offline features to online serving through managed cloud components.",
    tags: ["BigQuery", "Vertex AI", "Bigtable"], visual: "pipeline", accent: "violet",
    detail: "An architecture story following BigQuery, Vertex AI Feature View, Bigtable Online Store, and model serving—with attention to schemas, entity keys, timestamps, and synchronization."
  },
  {
    number: "03", category: "AI · BUSINESS INTELLIGENCE", title: "AIRI — Reportless Insights",
    description: "Decision-ready answers to business questions through agentic workflows, evaluation, and guardrails.",
    tags: ["LangGraph", "DeepAgents", "Evaluation"], visual: "insights", accent: "blue",
    detail: "A decision-support experience focused on turning business questions into useful answers, with evaluation, validation, and clear boundaries around data access."
  },
  {
    number: "04", category: "AUTONOMOUS WORKFLOWS", title: "Agent Monday",
    description: "An agent framework concept for orchestrating task execution, tool use, and validation.",
    tags: ["Agents", "Automation", "LLMs"], visual: "agents", accent: "pink",
    detail: "Use this case study to explain task decomposition, orchestration, execution traces, and how failures are detected and handled. Replace this starter copy with verified project details."
  },
  {
    number: "05", category: "LLM APPLICATION · ASSESSMENT", title: "AssessNex AI",
    description: "LLM-powered question and assessment generation with structured validation and Bloom’s Taxonomy alignment.",
    tags: ["Azure OpenAI", "LangGraph", "FastAPI"], visual: "assess", accent: "green",
    detail: "An academic assessment platform with question and paper generation, document processing, validation, and plagiarism-related workflows. Confirm current deployment and feature status before publishing."
  },
  {
    number: "06", category: "FUTURE EXPLORATION", title: "Future Intelligence",
    description: "A research direction spanning quantum computing, human–AI convergence, and robotics.",
    tags: ["Quantum", "Robotics", "HCI"], visual: "future", accent: "amber",
    detail: "This is a future-facing exploration area—not a claim of completed professional delivery. Use it to publish research notes, prototypes, and clearly labelled experiments as they become real."
  }
];

const experience = [
  { period: "2022 — PRESENT", role: "Senior Software & AI Engineer", domain: "Retail & Consumer", note: "AI/ML systems, agentic workflows, and cloud data platforms." },
  { period: "2020 — 2022", role: "Software Engineer", domain: "Telecom", note: "Software systems, data workflows, and backend engineering." },
  { period: "EDUCATION", role: "Computer Science", domain: "B.E. / M.Tech AI & ML", note: "Use the exact institution names, dates, and degree titles from your current résumé." }
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span className="label-dot" />{children}</div>;
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "pipeline") return <div className="visual-pipeline"><div className="pipe-node"><Database size={20}/><span>BigQuery</span></div><i/><div className="pipe-node"><Workflow size={20}/><span>Feature View</span></div><i/><div className="pipe-node"><Cloud size={20}/><span>Bigtable</span></div></div>;
  if (kind === "insights") return <div className="visual-insights"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="insight-core"><Network size={42}/></div><span className="float-tag tag-one">Question</span><span className="float-tag tag-two">Evidence</span><span className="float-tag tag-three">Answer</span></div>;
  if (kind === "agents") return <div className="visual-agent"><div className="agent-ring"><Bot size={46}/></div><div className="agent-link link-a"/><div className="agent-link link-b"/><div className="mini-node node-a"><Braces size={16}/></div><div className="mini-node node-b"><ShieldCheck size={16}/></div></div>;
  if (kind === "assess") return <div className="visual-assess"><div className="paper-window"><div className="window-bar"><i/><i/><i/></div><div className="paper-line long"/><div className="paper-line"/><div className="paper-option"/><div className="paper-option"/><div className="paper-option selected"/></div><Sparkles className="assess-spark" size={24}/></div>;
  if (kind === "future") return <div className="visual-future"><div className="future-orbit orbit-one"/><div className="future-orbit orbit-two"/><Atom size={48}/><span className="future-point p-one"/><span className="future-point p-two"/><span className="future-point p-three"/></div>;
  return <div className="visual-shopping"><div className="shopping-phone"><div className="phone-speaker"/><span className="phone-kicker">YOUR PICKS</span><div className="product-row"><b/><span/><span/></div><div className="product-row"><b/><span/><span/></div><div className="product-row"><b/><span/><span/></div></div><div className="shopping-bubble"><Zap size={22}/></div></div>;
}

function DemoLab() {
  const [tab, setTab] = useState<DemoTab>("agents");
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState("Recommend a product");
  const agentSteps = [
    ["Plan the task", "Break the request into a sequence of actions."],
    ["Select capabilities", "Choose the relevant tool or retrieval path."],
    ["Execute and observe", "Run the step and inspect the returned result."],
    ["Validate the response", "Check constraints before returning an answer."]
  ];
  const featureSteps = [
    ["BigQuery", "Offline source data and feature definitions."],
    ["Feature View", "Logical feature view and entity mapping."],
    ["Bigtable Online Store", "Online features available to serving."],
    ["Model serving", "Application or model consumes the feature values."]
  ];
  const evalRows = [{ name: "Answer relevance", a: 82, b: 91 }, { name: "Grounding", a: 88, b: 79 }, { name: "Guardrail checks", a: 76, b: 94 }];
  const steps = tab === "features" ? featureSteps : agentSteps;
  return <div className="lab-shell">
    <div className="lab-top"><div><SectionLabel>INTERACTIVE SYSTEMS LAB</SectionLabel><h3>Explore the moving parts.</h3></div><span className="demo-status"><i/> Browser demo</span></div>
    <div className="lab-tabs">
      <button className={tab === "agents" ? "active" : ""} onClick={() => { setTab("agents"); setStep(0); }}>Agent workflow</button>
      <button className={tab === "features" ? "active" : ""} onClick={() => { setTab("features"); setStep(0); }}>Feature pipeline</button>
      <button className={tab === "evaluation" ? "active" : ""} onClick={() => { setTab("evaluation"); setStep(0); }}>Evaluation</button>
    </div>
    {tab === "agents" && <div className="lab-content">
      <div className="lab-control"><label htmlFor="scenario">Sample task</label><select id="scenario" value={scenario} onChange={e => { setScenario(e.target.value); setStep(0); }}><option>Recommend a product</option><option>Answer a business question</option><option>Summarize a document</option></select><p>This is a deterministic UI simulation. It does not call a live model.</p><button className="button button-primary button-small" onClick={() => setStep((step + 1) % 4)}>{step === 3 ? "Restart run" : "Advance step"} <ArrowRight size={15}/></button></div>
      <div className="lab-steps">{steps.map((s, i) => <div className={`lab-step ${i < step ? "complete" : ""} ${i === step ? "current" : ""}`} key={s[0]}><div className="step-icon">{i < step ? <Check size={17}/> : <span>0{i + 1}</span>}</div><div><b>{s[0]}</b><p>{s[1]}</p></div><span className="step-state">{i < step ? "DONE" : i === step ? "ACTIVE" : "WAITING"}</span></div>)}<div className="trace-box"><span>EXECUTION TRACE</span><code>{`› input: "${scenario}"`}</code><code>{`› stage: ${steps[step][0].toLowerCase()}`}</code><code>› status: simulated_success</code></div></div>
    </div>}
    {tab === "features" && <div className="pipeline-demo">{steps.map((s, i) => <div className={`pipeline-stage ${i <= step ? "lit" : ""}`} key={s[0]}><div className="pipeline-icon">{i === 0 ? <Database/> : i === 1 ? <Workflow/> : i === 2 ? <Cloud/> : <Zap/>}</div><div><b>{s[0]}</b><p>{s[1]}</p></div>{i < 3 && <ChevronRight className="pipeline-arrow"/>}</div>)}<button className="button button-primary button-small" onClick={() => setStep((step + 1) % 4)}>{step === 3 ? "Reset pipeline" : "Explore next stage"} <ArrowRight size={15}/></button></div>}
    {tab === "evaluation" && <div className="eval-demo"><div className="eval-intro"><div><span className="tiny-label">ILLUSTRATIVE DATA</span><h4>Compare evaluation profiles</h4><p>Example scores only—not results from a production model.</p></div><div className="eval-legend"><span><i className="legend-a"/> Config A</span><span><i className="legend-b"/> Config B</span></div></div>{evalRows.map(row => <div className="eval-row" key={row.name}><div className="eval-row-title">{row.name}</div><div className="eval-bars"><div><span style={{ width: `${row.a}%` }}/></div><b>{row.a}</b><div><span style={{ width: `${row.b}%` }}/></div><b>{row.b}</b></div></div>)}<p className="fine-print">A real evaluation needs a defined dataset, methodology, and measured results.</p></div>}
  </div>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCommandOpen(v => !v); }
      if (e.key === "Escape") { setCommandOpen(false); setSelectedProject(null); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const activeProject = selectedProject === null ? null : projects[selectedProject];

  return <main className={ `${theme === "light" ? "light-theme" : ""} ${reduced ? "reduced-motion" : ""}` }>
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <header className="site-header">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">AC<span>.</span></span><span className="brand-name">ATHARV CHAUDHARI<small>AI / ML ENGINEER</small></span></a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#work" onClick={closeMenu}>Work</a><a href="#lab" onClick={closeMenu}>Systems Lab</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#frontier" onClick={closeMenu}>Future frontier</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Toggle light and dark theme" title="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sparkles size={17}/> : <Orbit size={17}/>}</button>
        <button className="command-button" onClick={() => setCommandOpen(true)}><span>⌘</span> K</button>
        <a className="button button-outline header-cta" href="#contact">Let&apos;s connect <ArrowUpRight size={15}/></a>
        <button className="mobile-menu icon-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse-dot"/> MACHINE LEARNING <i/> AI ENGINEERING <i/> DATA SYSTEMS</div>
        <h1>Engineering<br/>intelligence<span className="gradient-text"> that works.</span></h1>
        <p className="hero-lede">I build AI systems, agentic workflows, and data platforms that turn complex problems into useful, dependable software.</p>
        <div className="hero-meta"><span><Code2 size={15}/> Production-minded engineering</span><span><Network size={15}/> Systems thinking</span></div>
        <div className="hero-actions"><a className="button button-primary" href="#work">Explore selected work <ArrowRight size={16}/></a><a className="button button-ghost" href="#experience">My engineering journey <ArrowDown size={16}/></a></div>
        <div className="hero-socials"><a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={17}/></a><a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={17}/></a><span className="social-note">Open to thoughtful engineering conversations</span></div>
      </div>
      <div className="hero-art" aria-label="Abstract interactive-inspired computational sculpture">
        <div className="art-grid"/><div className="art-halo halo-one"/><div className="art-halo halo-two"/><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-ring ring-three"/>
        <div className="core-cube"><div className="cube-face face-front"/><div className="cube-face face-side"/><div className="cube-face face-top"/></div>
        <div className="art-node node-top"><Atom size={18}/><span>LEARN</span></div><div className="art-node node-right"><Workflow size={18}/><span>ORCHESTRATE</span></div><div className="art-node node-bottom"><Database size={18}/><span>DELIVER</span></div>
        <div className="art-caption"><span>FIG 01 / SYSTEMS IN MOTION</span><span>DATA → MODELS → IMPACT</span></div>
      </div>
      <div className="hero-bottom"><span>01 / A PRACTICE BUILT AROUND SYSTEMS</span><a href="#manifesto">Scroll to explore <ArrowDown size={14}/></a></div>
    </section>

    <section className="manifesto section-wrap" id="manifesto">
      <div className="manifesto-label"><SectionLabel>ENGINEERING POINT OF VIEW</SectionLabel><span className="manifesto-index">01 — 03</span></div>
      <div className="manifesto-content"><h2>Models are only one part of the system.</h2><p>The hard work is connecting data, context, orchestration, evaluation, and deployment into something dependable. That’s where I focus: the engineering around intelligence.</p><div className="principle-grid"><div><span>01</span><b>Build end to end</b><p>From data pipelines and feature design to serving and feedback.</p></div><div><span>02</span><b>Design for reliability</b><p>Validation, guardrails, observability, and deliberate trade-offs.</p></div><div><span>03</span><b>Make outcomes useful</b><p>Systems should help people answer questions and take action.</p></div></div></div>
    </section>

    <section className="work-section section-wrap" id="work">
      <div className="section-heading"><div><SectionLabel>SELECTED WORK</SectionLabel><h2>Built for real problems.<br/><span className="muted-heading">Designed as systems.</span></h2></div><p>A curated look at AI applications, data platforms, and intelligent workflows. Open a project to explore its technical story.</p></div>
      <div className="project-grid">{projects.map((project, i) => <button className={`project-card accent-${project.accent}`} key={project.number} onClick={() => setSelectedProject(i)}><div className="project-visual"><ProjectVisual kind={project.visual}/><span className="project-number">{project.number}</span><span className="project-open"><ArrowUpRight size={17}/></span></div><div className="project-info"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></button>)}</div>
      <div className="work-footnote"><span><Radio size={15}/> Case studies are structured to distinguish personal contribution from broader team delivery.</span><a href="#lab">Explore the systems lab <ArrowRight size={15}/></a></div>
    </section>

    <section className="lab-section section-wrap" id="lab">
      <div className="section-heading"><div><SectionLabel>INTERACTIVE DEMONSTRATIONS</SectionLabel><h2>Don&apos;t just read it.<br/><span className="muted-heading">Explore how it works.</span></h2></div><p>Small, transparent simulations that make system behavior visible. No production credentials, private data, or fake live metrics.</p></div>
      <DemoLab/>
    </section>

    <section className="experience-section section-wrap" id="experience">
      <div className="section-heading"><div><SectionLabel>PROFESSIONAL PRACTICE</SectionLabel><h2>Engineering, <span className="muted-heading">in context.</span></h2></div><p>A concise view of roles, domains, and technical focus. Confirm exact role names, dates, and institutions against your latest résumé before launch.</p></div>
      <div className="experience-layout"><div className="experience-list">{experience.map((item, i) => <div className="experience-item" key={item.period}><div className="experience-period">{item.period}</div><div className="experience-marker"><span/></div><div className="experience-detail"><h3>{item.role}</h3><div className="experience-domain">{item.domain}</div><p>{item.note}</p></div><ArrowUpRight className="experience-arrow" size={17}/></div>)}</div><aside className="skills-panel"><SectionLabel>TECHNICAL TOOLKIT</SectionLabel><h3>Tools are choices.<br/>Systems are the craft.</h3><div className="skill-group"><span>01 / AGENTIC AI</span><p>LangChain · LangGraph · MCP · Google ADK · OpenAI Agents SDK</p></div><div className="skill-group"><span>02 / ML ENGINEERING</span><p>Feature engineering · Model serving · Evaluation · Monitoring</p></div><div className="skill-group"><span>03 / DATA ENGINEERING</span><p>ETL / ELT · Feature stores · BigQuery · Databricks</p></div><div className="skill-group"><span>04 / CLOUD & BACKEND</span><p>GCP · Azure · Python · FastAPI · PostgreSQL · REST APIs</p></div><div className="skill-disclaimer">Representative skills; final list should match your current résumé.</div></aside></div>
    </section>

    <section className="frontier-section section-wrap" id="frontier">
      <div className="frontier-art"><div className="frontier-sphere"/><div className="frontier-orbit fo-one"/><div className="frontier-orbit fo-two"/><div className="frontier-orbit fo-three"/><div className="frontier-chip chip-quantum"><Atom size={17}/> Quantum</div><div className="frontier-chip chip-human"><Network size={17}/> Human + AI</div><div className="frontier-chip chip-robot"><Bot size={17}/> Robotics</div><div className="frontier-coordinate">EXPLORATION SPACE / 02</div></div>
      <div className="frontier-copy"><SectionLabel>FUTURE FRONTIER · RESEARCH INTERESTS</SectionLabel><h2>What intelligence<br/>could become.</h2><p>Beyond current engineering practice, I’m interested in the convergence of new computing paradigms, human–AI collaboration, and autonomous machines.</p><div className="frontier-topics"><div><Atom size={19}/><span><b>Quantum evolution</b><small>Computing paradigms and quantum information</small></span><ChevronRight size={16}/></div><div><Network size={19}/><span><b>Human–AI convergence</b><small>Collaborative and adaptive intelligence</small></span><ChevronRight size={16}/></div><div><Bot size={19}/><span><b>Robotics & autonomy</b><small>Embodied and autonomous systems</small></span><ChevronRight size={16}/></div></div><div className="research-note"><span className="note-mark">i</span><p>This section is for research interests and future experiments—not a representation of completed professional projects. New work can be added as prototypes and write-ups are developed.</p></div></div>
    </section>

    <section className="contact-section section-wrap" id="contact"><div className="contact-orb"><div/><div/><div/></div><div className="contact-content"><SectionLabel>START A CONVERSATION</SectionLabel><h2>Good systems start<br/>with good questions.</h2><p>Interested in AI engineering, intelligent systems, or building something useful? Let&apos;s connect.</p><div className="contact-actions"><a className="button button-primary" href="mailto:hello@example.com">Email me <ArrowUpRight size={16}/></a><a className="button button-outline" href="https://linkedin.com/" target="_blank" rel="noreferrer">Connect on LinkedIn <Linkedin size={16}/></a></div><div className="contact-edit-note">Before publishing: replace placeholder email and social URLs with your verified links.</div></div></section>

    <footer className="site-footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">AC<span>.</span></span><span className="brand-name">ATHARV CHAUDHARI<small>AI / ML ENGINEER</small></span></a><span>Built around systems, curiosity, and useful intelligence.</span><a href="#home">Back to top ↑</a><span className="footer-year">© {new Date().getFullYear()}</span></footer>

    {activeProject && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedProject(null); }}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close icon-button" aria-label="Close project details" onClick={() => setSelectedProject(null)}><X/></button><div className="modal-visual"><ProjectVisual kind={activeProject.visual}/></div><SectionLabel>{activeProject.category}</SectionLabel><h2 id="modal-title">{activeProject.title}</h2><p>{activeProject.detail}</p><div className="tag-row">{activeProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="modal-note"><ShieldCheck size={17}/><span>Replace starter descriptions with verified project details, diagrams, and public links before launch.</span></div><button className="button button-primary" onClick={() => setSelectedProject(null)}>Back to portfolio <ArrowRight size={16}/></button></div></div>}

    {commandOpen && <div className="modal-backdrop command-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setCommandOpen(false); }}><div className="command-modal" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="command-title"><Sparkles size={17}/><span>Jump to a section</span><kbd>ESC</kbd></div>{[{label:"Selected Work",href:"#work"},{label:"Interactive Systems Lab",href:"#lab"},{label:"Experience & Skills",href:"#experience"},{label:"Future Frontier",href:"#frontier"},{label:"Contact",href:"#contact"}].map(item => <a key={item.href} href={item.href} onClick={() => setCommandOpen(false)}><span>{item.label}</span><ArrowUpRight size={16}/></a>)}<div className="command-bottom"><span>QUICK NAVIGATION</span><button onClick={() => setReduced(!reduced)}>{reduced ? "Enable motion" : "Reduce motion"}</button></div></div></div>}
  </main>;
}