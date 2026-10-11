"use client";

import Link from "next/link";
import { ArrowLeft, Download, Mail, Linkedin, MapPin } from "lucide-react";

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="resume-toolbar no-print">
        <Link href="/" className="resume-back"><ArrowLeft size={15}/> Back to portfolio</Link>
        <button className="button button-primary" onClick={() => window.print()} type="button" aria-label="Print résumé"><Download size={15}/> Print / Save as PDF</button>
      </div>
      <article className="resume-sheet">
        <header className="resume-header">
          <div><p className="resume-kicker">AI / ML ENGINEER · SPECIALIST PROGRAMMER</p><h1>Atharv Chaudhari</h1><p className="resume-summary">Machine Learning & AI Engineer with 4+ years of experience designing and building production-grade AI, ML and data systems across retail, telecom and entertainment.</p></div>
          <div className="resume-contact"><span><MapPin size={14}/> Pune, India</span><a href="mailto:ahc382000@gmail.com"><Mail size={14}/> ahc382000@gmail.com</a><a href="https://www.linkedin.com/in/atharv-chaudhari/" target="_blank" rel="noreferrer"><Linkedin size={14}/> LinkedIn profile</a></div>
        </header>
        <section><h2>Technical focus</h2><div className="resume-skills"><p><b>Agentic AI:</b> LangChain, LangGraph, DeepAgents, MCP, Google ADK, OpenAI Agents SDK, tool calling, memory, guardrails and evaluation.</p><p><b>ML Engineering:</b> ML workflows, feature engineering, model serving, evaluation, monitoring and productionization.</p><p><b>Data Engineering:</b> ETL/ELT, PySpark, data pipelines, feature stores, distributed processing, data quality and optimization.</p><p><b>Cloud & systems:</b> GCP, Azure, Databricks, BigQuery, Vertex AI, Bigtable, Python, FastAPI, PostgreSQL, REST APIs and distributed systems.</p></div></section>
        <section><h2>Professional experience</h2>
          <div className="resume-role"><div className="resume-role-top"><h3>Specialist Programmer — L2</h3><span>Oct 2025 – Present</span></div><p className="resume-company">Infosys · Pune</p><ul><li>Built agentic AI workflows for decision-ready business insights with governed data access, tool calling and guardrails.</li><li>Architected reusable GCP feature-store templates from BigQuery through Vertex AI Feature Views and the Bigtable-backed Online Store to model serving.</li><li>Built a Google ADK shopping assistant with personalized recommendations, session-aware orchestration and cross-session memory.</li><li>Developed OpenAI Agents SDK reporting workflows with Postgres state, resilient batching and secure integrations.</li></ul></div>
          <div className="resume-role"><div className="resume-role-top"><h3>Specialist Programmer — L1</h3><span>Aug 2022 – Sep 2025</span></div><p className="resume-company">Infosys · Pune</p><ul><li>Developed LangGraph and OCR-based resume parsing, profile summaries, skill validation and candidate-to-project matching.</li><li>Built a GPT-4o text-to-SQL experience with schema awareness, role-based filters and PII guardrails.</li><li>Migrated and optimized enterprise data warehouse workloads using Azure Databricks, ADLS Gen2, Synapse and PySpark.</li><li>Supported distributed ETL pipelines, medallion architecture, enterprise data cubes and data-platform operations.</li></ul></div>
        </section>
        <section><h2>Selected project outcomes</h2><div className="resume-outcomes"><div><strong>~70%</strong><span>faster report generation reported for Agent Monday</span></div><div><strong>~40%</strong><span>reported recommendation-accuracy improvement for Shopping Assistant</span></div><div><strong>14</strong><span>enterprise data cubes migrated / optimized</span></div><div><strong>20+</strong><span>stakeholders reported for business insights assistant</span></div></div><p className="resume-note">Metrics are résumé-reported outcomes; evaluation methods and production context may differ.</p></section>
        <section><h2>Education</h2><div className="resume-education"><div><b>M.Tech. — Artificial Intelligence & Machine Learning</b><span>BITS Pilani, Work Integrated Learning Program · 2024–2026</span></div><div><b>B.Tech. — Computer Science & Engineering</b><span>Walchand Institute of Technology · 2018–2022</span></div><div><b>Data Science & Machine Learning Training</b><span>Infosys / University of Cambridge program listed in profile · 2026</span></div></div></section>
        <section><h2>Certifications & recognition</h2><p>Microsoft Certified: Azure Developer Associate · Azure AI Engineer Associate · Azure Data Engineer Associate · Kaggle 3× Expert · Rank 3, HackerEarth Earth Day ML Challenge · 1st Prize, RIT & WIT AI Hackathon · Rank 5, A Perfect Fit NLP Challenge.</p></section>
        <footer className="resume-footer"><span>ATHARV CHAUDHARI</span><span>AI / ML ENGINEERING · DATA SYSTEMS · AGENTIC AI</span></footer>
      </article>
    </main>
  );
}
