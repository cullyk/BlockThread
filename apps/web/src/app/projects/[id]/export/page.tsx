"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { GenerationJob } from "@blockthread/core";
import { buildExportMetadata } from "@blockthread/template-engine";
import type { ExportMetadata } from "@blockthread/template-engine";

export default function ExportPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<GenerationJob | null>(null);
  const [metadata, setMetadata] = useState<ExportMetadata | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`job:${id}`);
    if (raw) {
      const j = JSON.parse(raw) as GenerationJob;
      setJob(j);
      setMetadata(buildExportMetadata(j.outputType));
    }
  }, [id]);

  if (!job || !metadata) {
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
    { label: "Overview", href: `/projects/${id}`, active: false },
    { label: "Editor", href: `/projects/${id}/editor`, active: false },
    { label: "Export", href: `/projects/${id}/export`, active: true },
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

        <h1 className="page-title">Export</h1>

        <div className="export-card">
          <div className="export-header">
            <h2 className="export-type">
              {metadata.outputType === "shirt" ? "👕" : "👖"} Classic{" "}
              {metadata.outputType} template
            </h2>
            <p className="export-desc">
              {metadata.canvasWidth} × {metadata.canvasHeight}px ·{" "}
              {metadata.format.toUpperCase()} · Alpha channel:{" "}
              {metadata.hasAlphaChannel ? "Yes" : "No"}
            </p>
          </div>

          <div className="export-meta">
            <div className="meta-row">
              <span className="meta-key">Format</span>
              <span className="meta-val">{metadata.format.toUpperCase()}</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Canvas</span>
              <span className="meta-val">
                {metadata.canvasWidth} × {metadata.canvasHeight}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Alpha channel</span>
              <span className="meta-val">
                {metadata.hasAlphaChannel ? "Yes" : "No"}
              </span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Generated at</span>
              <span className="meta-val mono">
                {new Date(metadata.generatedAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="export-notice">
            <p>
              ℹ️ <strong>Phase 0 MVP:</strong> PNG download is not yet wired
              to the image pipeline. The Python worker (
              <code>workers/image/scripts/generate_classic_template.py</code>)
              generates the actual PNG locally. Run:
            </p>
            <pre>
              {`cd workers/image\npython scripts/generate_classic_template.py`}
            </pre>
          </div>

          <button className="btn btn-primary btn-lg" disabled>
            Download PNG (coming soon)
          </button>
        </div>
      </div>

      <style>{`
        .nav { border-bottom:1px solid var(--color-border); padding:16px 0; position:sticky; top:0; background:var(--color-bg); z-index:10; }
        .nav-inner { display:flex; align-items:center; }
        .nav-logo { font-size:1rem; font-weight:600; color:var(--color-text); }
        .nav-logo:hover { text-decoration:none; color:var(--color-accent); }
        .page-body { max-width:680px; padding-top:32px; padding-bottom:80px; display:flex; flex-direction:column; gap:24px; }
        .breadcrumb { display:flex; align-items:center; gap:4px; font-size:0.875rem; color:var(--color-text-muted); }
        .breadcrumb-sep { margin:0 4px; }
        .breadcrumb-active { color:var(--color-text); font-weight:600; }
        .page-title { font-size:2rem; font-weight:800; letter-spacing:-0.03em; }
        .export-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:28px; display:flex; flex-direction:column; gap:20px; }
        .export-header { display:flex; flex-direction:column; gap:4px; }
        .export-type { font-size:1.25rem; font-weight:700; }
        .export-desc { color:var(--color-text-muted); font-size:0.875rem; }
        .export-meta { display:flex; flex-direction:column; gap:8px; }
        .meta-row { display:flex; justify-content:space-between; align-items:center; font-size:0.875rem; padding:8px 0; border-bottom:1px solid var(--color-border); }
        .meta-row:last-child { border-bottom:none; }
        .meta-key { color:var(--color-text-muted); }
        .meta-val { font-weight:600; }
        .mono { font-family:var(--font-mono); font-size:0.8rem; }
        .export-notice { background:#111827; border:1px solid var(--color-border); border-radius:var(--radius); padding:16px; font-size:0.875rem; }
        .export-notice p { margin-bottom:8px; line-height:1.6; }
        .export-notice pre { font-family:var(--font-mono); font-size:0.8125rem; color:var(--color-accent); background:#0f172a; padding:10px 12px; border-radius:4px; overflow-x:auto; }
        .btn { display:inline-flex; align-items:center; padding:10px 20px; border-radius:var(--radius); font-size:0.9375rem; font-weight:600; cursor:pointer; border:none; transition:background 0.15s; text-decoration:none; }
        .btn:disabled { opacity:0.4; cursor:not-allowed; }
        .btn-primary { background:var(--color-accent); color:#fff; }
        .btn-lg { padding:14px 28px; font-size:1rem; }
      `}</style>
    </main>
  );
}
