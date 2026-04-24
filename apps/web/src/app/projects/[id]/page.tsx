"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { GenerationJob } from "@blockthread/core";

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<GenerationJob | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`job:${id}`);
    if (raw) setJob(JSON.parse(raw) as GenerationJob);
  }, [id]);

  if (!job) {
    return (
      <main>
        <div className="container page-body">
          <p>Project not found.</p>
          <Link href="/new">← Create a new project</Link>
        </div>
        <style>{`.container{max-width:1100px;margin:0 auto;padding:0 24px}.page-body{padding:40px 0}`}</style>
      </main>
    );
  }

  const steps = [
    { label: "Overview", href: `/projects/${id}`, active: true },
    { label: "Editor", href: `/projects/${id}/editor`, active: false },
    { label: "Export", href: `/projects/${id}/export`, active: false },
  ];

  return (
    <main>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            ← BlockThread
          </Link>
        </div>
      </nav>

      <div className="container page-body">
        <div className="breadcrumb">
          {steps.map((s, i) => (
            <span key={s.label} className="breadcrumb-item">
              {i > 0 && <span className="breadcrumb-sep">›</span>}
              <Link
                href={s.href}
                className={s.active ? "breadcrumb-active" : ""}
              >
                {s.label}
              </Link>
            </span>
          ))}
        </div>

        <h1 className="page-title">Project overview</h1>

        <div className="meta-grid">
          <div className="meta-card">
            <span className="meta-label">ID</span>
            <span className="meta-value mono">{job.id}</span>
          </div>
          <div className="meta-card">
            <span className="meta-label">Garment</span>
            <span className="meta-value">{job.garmentType}</span>
          </div>
          <div className="meta-card">
            <span className="meta-label">Output type</span>
            <span className="meta-value">{job.outputType}</span>
          </div>
          <div className="meta-card">
            <span className="meta-label">Status</span>
            <span className="meta-value status-badge">{job.status}</span>
          </div>
        </div>

        <div className="action-row">
          <Link href={`/projects/${id}/editor`} className="btn btn-primary">
            Open editor →
          </Link>
          <Link href={`/projects/${id}/export`} className="btn btn-outline">
            Export PNG
          </Link>
        </div>
      </div>

      <style>{`
        .nav { border-bottom: 1px solid var(--color-border); padding: 16px 0; position:sticky; top:0; background:var(--color-bg); z-index:10; }
        .nav-inner { display:flex; align-items:center; }
        .nav-logo { font-size:1rem; font-weight:600; color:var(--color-text); }
        .nav-logo:hover { text-decoration:none; color:var(--color-accent); }
        .page-body { max-width:800px; padding-top:32px; padding-bottom:80px; display:flex; flex-direction:column; gap:24px; }
        .breadcrumb { display:flex; align-items:center; gap:4px; font-size:0.875rem; color:var(--color-text-muted); }
        .breadcrumb-sep { margin:0 4px; }
        .breadcrumb-active { color:var(--color-text); font-weight:600; }
        .page-title { font-size:2rem; font-weight:800; letter-spacing:-0.03em; }
        .meta-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
        .meta-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius); padding:16px; display:flex; flex-direction:column; gap:4px; }
        .meta-label { font-size:0.75rem; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.05em; }
        .meta-value { font-size:0.9375rem; font-weight:600; }
        .mono { font-family:var(--font-mono); font-size:0.8rem; word-break:break-all; }
        .status-badge { color:var(--color-accent); }
        .action-row { display:flex; gap:12px; flex-wrap:wrap; }
        .btn { display:inline-flex; align-items:center; padding:10px 20px; border-radius:var(--radius); font-size:0.9375rem; font-weight:600; cursor:pointer; border:none; transition:background 0.15s; text-decoration:none; }
        .btn-primary { background:var(--color-accent); color:#fff; }
        .btn-primary:hover { background:var(--color-accent-hover); text-decoration:none; color:#fff; }
        .btn-outline { background:transparent; color:var(--color-text); border:1px solid var(--color-border); }
        .btn-outline:hover { border-color:var(--color-accent); color:var(--color-accent); text-decoration:none; }
      `}</style>
    </main>
  );
}
