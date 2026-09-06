import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

const chapters = [
  ['01', 'HOME', 'The Beginning', 'home'],
  ['02', 'ABOUT', 'The Explorer', 'about'],
  ['03', 'JOURNEY', 'The Journey', 'journey'],
  ['04', 'PROJECTS', 'The Discoveries', 'projects'],
  ['05', 'SKILLS', 'The Arsenal', 'skills'],
  ['06', 'RESEARCH', 'The Learning', 'research'],
  ['07', 'ROBOTICS', 'The Evolution', 'robotics'],
  ['08', 'VISION', 'The Future', 'vision'],
  ['09', 'CONTACT', 'The Connection', 'contact'],
] as const;

const projects = [
  {
    id: '01',
    title: 'Dashboardless Insights',
    tag: 'AGENTIC AI',
    metric: '60–70% faster insight retrieval',
    image: '/scenes/projects-lab.png',
    body: 'Decision-ready business answers built with LangChain, LangGraph, LangSmith and AGUI, designed around real stakeholder workflows.',
  },
  {
    id: '02',
    title: 'Agent Monday',
    tag: 'AUTONOMOUS SYSTEMS',
    metric: '70% faster reporting · 99%+ reliable delivery',
    image: '/scenes/robotics-yard.png',
    body: 'A production reporting agent using OpenAI Agents SDK, Celery, Kubernetes, FastAPI and OKTA.',
  },
  {
    id: '03',
    title: 'Shopping Assistant',
    tag: 'RETAIL AI',
    metric: '1K+ sessions · ~40% accuracy uplift',
    image: '/scenes/skills-cave.png',
    body: 'A multi-agent shopping experience using Google ADK and GCP for contextual, personalized recommendations.',
  },
  {
    id: '04',
    title: 'Client Skillset Mapping',
    tag: 'NLP · GRAPH AI',
    metric: '~50% team-fit improvement',
    image: '/scenes/journey-desert.png',
    body: 'OCR, NLP, LangGraph and enterprise graph signals combined to improve intelligent team-to-skill matching.',
  },
  {
    id: '05',
    title: 'RICOM RDW Migration',
    tag: 'DATA ENGINEERING',
    metric: '~40% ETL latency reduction · 14 cubes',
    image: '/scenes/vision-cliffs.png',
    body: 'PySpark and Databricks migration architecture across ADLS Gen2 and Synapse.',
  },
] as const;

type Project = (typeof projects)[number];

function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('section[data-chapter]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute('data-chapter') || 'home');
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Scene({ src, intensity = 1 }: { src: string; intensity?: number }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      element.style.setProperty('--mx', `${x * 1.5 * intensity}px`);
      element.style.setProperty('--my', `${y * intensity}px`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [intensity]);

  return (
    <div ref={sceneRef} className="scene" aria-hidden="true">
      <div className="scene-image" style={{ backgroundImage: `url(${src})` }} />
      <div className="scene-vignette" />
      <div className="scene-haze" />
    </div>
  );
}

function Ambience() {
  const [paused, setPaused] = useState(false);
  const dots = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        x: (index * 37) % 100,
        y: (index * 61) % 100,
        size: 2 + (index % 4),
        delay: (index % 7) * 0.8,
      })),
    [],
  );

  return (
    <>
      <div className={`particles ${paused ? 'paused' : ''}`} aria-hidden="true">
        {dots.map((dot, index) => (
          <i
            key={index}
            style={
              {
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
                animationDelay: `${dot.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <button className="sound" onClick={() => setPaused((value) => !value)} aria-label="Toggle ambience animation">
        {paused ? 'AMBIENCE OFF' : 'AMBIENCE ON'}
      </button>
    </>
  );
}

function Portfolio() {
  const active = useActiveSection();
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [progress, setProgress] = useState(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
    setMenu(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
  }, []);

  const stats = useMemo(
    () => [
      ['04+', 'Years in production AI / ML'],
      ['05', 'Flagship engineering projects'],
      ['03', 'Azure AI / Data certifications'],
      ['09.83', 'B.Tech CGPA'],
    ],
    [],
  );

  return (
    <main>
      <Ambience />
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="Return to beginning">
          <b>AC</b>
          <span>Atharv Chaudhari</span>
        </button>
        <nav aria-label="Primary navigation">
          {chapters.slice(0, 8).map((chapter) => (
            <button
              key={chapter[3]}
              className={active === chapter[3] ? 'active' : ''}
              onClick={() => scrollTo(chapter[3])}
            >
              {chapter[1]}
            </button>
          ))}
        </nav>
        <button className="menu" onClick={() => setMenu((value) => !value)} aria-label="Open menu" aria-expanded={menu}>
          <span />
          <span />
          <span />
        </button>
      </header>
      {menu && (
        <div className="mobile-menu">
          {chapters.map((chapter) => (
            <button key={chapter[3]} onClick={() => scrollTo(chapter[3])}>
              {chapter[0]} <span>/</span> {chapter[1]}
            </button>
          ))}
        </div>
      )}

      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <section id="home" data-chapter="home" className="hero">
        <Scene src="/scenes/hero-clean.png" intensity={1.8} />
        <div className="hud left-rail" aria-hidden="true">
          <span>EXPLORE</span>
          <i />
          <span>LEARN</span>
          <i />
          <span>BUILD</span>
          <i />
          <span>AUTOMATE</span>
        </div>
        <div className="hero-copy reveal">
          <p className="eyebrow">CHAPTER 01 · THE BEGINNING</p>
          <h1>
            INTO THE
            <br />
            <em>INTELLIGENT FUTURE</em>
          </h1>
          <p className="lead">AI / ML · AGENTIC SYSTEMS · DATA · ROBOTICS</p>
          <p className="hero-caption">Systems that move from signal to decision.</p>
          <button className="gold-btn" onClick={() => scrollTo('about')}>
            BEGIN JOURNEY <span aria-hidden="true">&gt;</span>
          </button>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span className="chevron" />
          <small>EXPLORE THE MAP</small>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>01</span>
          <i />
          <b>THE BEGINNING</b>
        </div>
      </section>

      <section id="about" data-chapter="about" className="scene-section about">
        <Scene src="/scenes/about.png" intensity={1.2} />
        <div className="section-content two-col">
          <div className="chapter-label">CHAPTER 02 / THE EXPLORER</div>
          <div>
            <h2>
              I BUILD SYSTEMS THAT <em>THINK.</em>
            </h2>
            <p className="large">
              I work across Machine Learning, Artificial Intelligence, Agentic AI and Data Engineering — turning messy
              information into systems that reason, act and deliver.
            </p>
            <div className="stats">
              {stats.map((stat) => (
                <div key={stat[0]}>
                  <strong>{stat[0]}</strong>
                  <span>{stat[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="journey" data-chapter="journey" className="journey section-dark">
        <Scene src="/scenes/journey-desert.png" intensity={0.7} />
        <div className="section-inner">
          <div className="chapter-label">CHAPTER 03 / THE JOURNEY</div>
          <h2>
            THE PATH <em>SO FAR</em>
          </h2>
          <p className="section-intro">A field record of the systems, places and ideas that shaped the expedition.</p>
          <div className="timeline">
            <article>
              <span>2018 — 2022</span>
              <h3>B.Tech · Computer Science</h3>
              <p>Walchand Institute of Technology · CGPA 9.83</p>
              <b>THE FOUNDATION</b>
            </article>
            <article>
              <span>2022 — NOW</span>
              <h3>Specialist Programmer · Infosys</h3>
              <p>Production AI / ML, data engineering, cloud systems and intelligent automation.</p>
              <b>THE EXPEDITION</b>
            </article>
            <article>
              <span>2024 — 2026</span>
              <h3>M.Tech · AI &amp; ML</h3>
              <p>BITS Pilani · NLP specialization. Building deeper foundations in modern AI.</p>
              <b>THE DEEP DIVE</b>
            </article>
            <article>
              <span>2026</span>
              <h3>Data Science &amp; ML · Cambridge</h3>
              <p>Continuing the academic and practical journey across modern data and ML systems.</p>
              <b>THE NEXT CHAPTER</b>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" data-chapter="projects" className="scene-section discoveries">
        <Scene src="/scenes/projects-lab.png" intensity={1.1} />
        <div className="section-content">
          <div className="projects-heading">
            <div className="chapter-label">CHAPTER 04 / THE DISCOVERIES</div>
            <h2>
              PROJECT <em>FILES.</em>
            </h2>
            <p className="section-intro">Select an artifact to inspect the work behind the scene.</p>
          </div>
          <div className="project-deck">
            {projects.map((project) => (
              <button className="project-card" key={project.id} onClick={() => setSelected(project)}>
                <div className="project-visual" style={{ backgroundImage: `url(${project.image})` }}>
                  <span>{project.id}</span>
                  <small>OPEN FILE</small>
                </div>
                <div className="project-copy">
                  <small>{project.tag}</small>
                  <h3>{project.title}</h3>
                  <b>{project.metric}</b>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" data-chapter="skills" className="arsenal section-dark">
        <Scene src="/scenes/skills-cave.png" intensity={0.55} />
        <div className="section-inner">
          <div className="chapter-label">CHAPTER 05 / THE ARSENAL</div>
          <h2>
            TOOLS FOR <em>THE EXPEDITION.</em>
          </h2>
          <div className="skill-map">
            {[
              ['AGENTIC AI', 'LangChain · LangGraph · DeepAgents · MCP · Google ADK · OpenAI Agents SDK'],
              ['ML ENGINEERING', 'ML workflows · feature engineering · serving · evaluation · monitoring'],
              ['DATA ENGINEERING', 'ETL / ELT · pipelines · Feature Stores · optimization'],
              ['CLOUD & DATA', 'GCP · Azure · Databricks · BigQuery · Vertex AI · Bigtable'],
              ['BACKEND & SYSTEMS', 'Python · FastAPI · PostgreSQL · REST APIs · scalable architectures'],
              ['RESEARCH MINDSET', 'NLP · RAG · multi-agent systems · knowledge-driven ML'],
            ].map((skill, index) => (
              <div key={skill[0]} className="skill-node" style={{ '--n': index } as CSSProperties}>
                <span>0{index + 1}</span>
                <h3>{skill[0]}</h3>
                <p>{skill[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="research" data-chapter="research" className="scene-section research">
        <Scene src="/scenes/research-clean.png" intensity={1} />
        <div className="section-content research-layout">
          <div>
            <div className="chapter-label">CHAPTER 06 / THE LEARNING</div>
            <h2>
              RESEARCH IS THE <em>COMPASS.</em>
            </h2>
            <p className="large">
              My academic work sits around NLP, knowledge-driven machine learning, multi-agent systems and intelligent
              assessment generation.
            </p>
            <p>
              My M.Tech work on AssessNex AI explored an agent-driven platform for automated educational assessment
              generation using Azure OpenAI, LangChain and LangGraph.
            </p>
          </div>
          <div className="research-console glass">
            <div className="console-head">
              <span>RESEARCH CONSOLE</span>
              <i>ONLINE</i>
            </div>
            <div className="console-body">
              <div className="brain">CORE</div>
              <span>KNOWLEDGE</span>
              <span>REASONING</span>
              <span>AGENTS</span>
              <span>VALIDATION</span>
              <strong>ASSESSNEX AI</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="robotics" data-chapter="robotics" className="robotics section-dark">
        <Scene src="/scenes/robotics-yard.png" intensity={0.45} />
        <div className="robot-grid-bg" />
        <div className="section-inner robotics-layout">
          <div>
            <div className="chapter-label">CHAPTER 07 / THE EVOLUTION</div>
            <h2>
              FROM <em>DIGITAL</em> INTELLIGENCE
              <br />
              TO EMBODIED INTELLIGENCE.
            </h2>
            <p className="large">
              Robotics is where intelligence leaves the screen. My future direction connects agentic reasoning,
              perception, planning and physical autonomy.
            </p>
            <p>
              Not cyberpunk for the sake of it — intelligent machines operating naturally in the world, with humans
              still at the center.
            </p>
          </div>
          <div className="robot-stage">
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="robot-silhouette">
              CORE<span>AI</span>
            </div>
            <small>HUMAN · AI · ROBOTICS</small>
          </div>
        </div>
      </section>

      <section id="vision" data-chapter="vision" className="vision">
        <Scene src="/scenes/vision-cliffs.png" intensity={0.35} />
        <div className="sun" />
        <div className="mountains m1" />
        <div className="mountains m2" />
        <div className="section-inner vision-content">
          <div className="chapter-label">CHAPTER 08 / THE FUTURE</div>
          <h2>
            QUANTUM EVOLUTION.
            <br />
            <em>HUMAN–AI CONVERGENCE.</em>
            <br />
            ROBOTIC AUTONOMY.
          </h2>
          <p className="large">
            The destination is not replacing humans. It is extending what humans can imagine, understand and build.
          </p>
          <button className="gold-btn" onClick={() => scrollTo('contact')}>
            CONTINUE THE JOURNEY <span aria-hidden="true">&gt;</span>
          </button>
        </div>
      </section>

      <section id="contact" data-chapter="contact" className="contact section-dark">
        <Scene src="/scenes/contact-camp.png" intensity={0.35} />
        <div className="section-inner contact-inner">
          <div className="chapter-label">CHAPTER 09 / THE CONNECTION</div>
          <h2>
            EVERY EXPEDITION <em>NEEDS A NEXT MOVE.</em>
          </h2>
          <p className="large">
            If you're building intelligent products, autonomous workflows, data systems or the next generation of AI —
            let's talk.
          </p>
          <div className="contact-links">
            <a href="mailto:ahc382000@gmail.com">EMAIL &gt;</a>
            <a href="https://www.linkedin.com/in/atharv-chaudhari" target="_blank" rel="noreferrer">
              LINKEDIN &gt;
            </a>
          </div>
          <footer>
            <span>© 2026 Atharv Chaudhari</span>
            <span>AI · DATA · AUTONOMY · ROBOTICS</span>
            <span>END OF CURRENT CHAPTER</span>
          </footer>
        </div>
      </section>

      <div className="chapter-dock" aria-label="Chapter navigation">
        {chapters.map((chapter, index) => (
          <button
            key={chapter[3]}
            title={chapter[1]}
            className={active === chapter[3] ? 'on' : ''}
            onClick={() => scrollTo(chapter[3])}
            aria-label={`Go to ${chapter[1]}`}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="artifact-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <button className="close" onClick={() => setSelected(null)} aria-label="Close artifact">
              X
            </button>
            <small>
              {selected.id} · {selected.tag}
            </small>
            <h2>{selected.title}</h2>
            <strong>{selected.metric}</strong>
            <p>{selected.body}</p>
            <div className="artifact-meta">
              <span>
                ROLE
                <b>AI / ML ENGINEERING</b>
              </span>
              <span>
                STACK
                <b>PYTHON · CLOUD · AGENTS</b>
              </span>
              <span>
                MODE
                <b>PRODUCTION</b>
              </span>
            </div>
            <button className="gold-btn" onClick={() => setSelected(null)}>
              RETURN TO MAP <span aria-hidden="true">&lt;</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function App() {
  useEffect(() => {
    document.title = 'Atharv Chaudhari — AI / ML Engineer';
    const description = 'A cinematic, game-inspired portfolio for Atharv Chaudhari — AI, ML, Agentic Systems, Data and Robotics.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  return <Portfolio />;
}

export default App;