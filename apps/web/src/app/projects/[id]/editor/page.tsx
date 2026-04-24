"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { GenerationJob } from "@blockthread/core";
import { generatePlaceholderLayout } from "@blockthread/template-engine";
import type { PlaceholderLayout } from "@blockthread/template-engine";

const DISPLAY_SCALE = 1; // Render at 1:1 for MVP

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<GenerationJob | null>(null);
  const [layout, setLayout] = useState<PlaceholderLayout | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`job:${id}`);
    if (raw) {
      const j = JSON.parse(raw) as GenerationJob;
      setJob(j);
      setLayout(generatePlaceholderLayout(j.outputType));
    }
  }, [id]);

  if (!job || !layout) {
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
    { label: "Editor", href: `/projects/${id}/editor`, active: true },
    { label: "Export", href: `/projects/${id}/export`, active: false },
  ];

  const svgW = layout.canvas.width * DISPLAY_SCALE;
  const svgH = layout.canvas.height * DISPLAY_SCALE;

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

        <h1 className="page-title">Template editor</h1>
        <p className="page-subtitle">
          Placeholder layout — {layout.outputType} template ({layout.canvas.width} ×{" "}
          {layout.canvas.height}px)
        </p>

        <div className="editor-layout">
          <div className="canvas-wrapper">
            <svg
              width={svgW}
              height={svgH}
              viewBox={`0 0 ${layout.canvas.width} ${layout.canvas.height}`}
              className="template-svg"
              style={{ maxWidth: "100%" }}
            >
              {/* Transparent background */}
              <rect
                width={layout.canvas.width}
                height={layout.canvas.height}
                fill="none"
                stroke="#444"
                strokeDasharray="4 4"
              />

              {layout.panels.map((panel) => (
                <g key={panel.name}>
                  <rect
                    x={panel.x}
                    y={panel.y}
                    width={panel.width}
                    height={panel.height}
                    fill={panel.fillColor}
                    fillOpacity={0.8}
                    stroke="#555"
                    strokeWidth={1}
                  />
                  <text
                    x={panel.x + 4}
                    y={panel.y + 14}
                    fontSize={10}
                    fill="#111"
                    fontFamily="system-ui, sans-serif"
                  >
                    {panel.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <aside className="panel-list">
            <h2 className="panel-list-title">Panels</h2>
            <ul className="panels">
              {layout.panels.map((panel) => (
                <li key={panel.name} className="panel-item">
                  <span
                    className="panel-swatch"
                    style={{ background: panel.fillColor }}
                  />
                  <span className="panel-name">{panel.label}</span>
                  <span className="panel-dims">
                    {panel.width}×{panel.height}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="action-row">
          <Link href={`/projects/${id}/export`} className="btn btn-primary">
            Continue to export →
          </Link>
        </div>
      </div>

      <style>{`
        .nav { border-bottom:1px solid var(--color-border); padding:16px 0; position:sticky; top:0; background:var(--color-bg); z-index:10; }
        .nav-inner { display:flex; align-items:center; }
        .nav-logo { font-size:1rem; font-weight:600; color:var(--color-text); }
        .nav-logo:hover { text-decoration:none; color:var(--color-accent); }
        .page-body { padding-top:32px; padding-bottom:80px; display:flex; flex-direction:column; gap:24px; }
        .breadcrumb { display:flex; align-items:center; gap:4px; font-size:0.875rem; color:var(--color-text-muted); }
        .breadcrumb-sep { margin:0 4px; }
        .breadcrumb-active { color:var(--color-text); font-weight:600; }
        .page-title { font-size:2rem; font-weight:800; letter-spacing:-0.03em; }
        .page-subtitle { color:var(--color-text-muted); font-size:0.9375rem; margin-top:-8px; }
        .editor-layout { display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap; }
        .canvas-wrapper { background:#1a1a1a; border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:16px; overflow:auto; max-width:100%; }
        .template-svg { display:block; }
        .panel-list { background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:16px; min-width:200px; flex-shrink:0; }
        .panel-list-title { font-size:0.875rem; font-weight:600; margin-bottom:12px; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.05em; }
        .panels { list-style:none; display:flex; flex-direction:column; gap:6px; }
        .panel-item { display:flex; align-items:center; gap:8px; font-size:0.8125rem; }
        .panel-swatch { width:12px; height:12px; border-radius:2px; flex-shrink:0; border:1px solid rgba(255,255,255,0.1); }
        .panel-name { flex:1; }
        .panel-dims { color:var(--color-text-muted); font-family:var(--font-mono); font-size:0.75rem; }
        .action-row { display:flex; gap:12px; flex-wrap:wrap; }
        .btn { display:inline-flex; align-items:center; padding:10px 20px; border-radius:var(--radius); font-size:0.9375rem; font-weight:600; cursor:pointer; border:none; transition:background 0.15s; text-decoration:none; }
        .btn-primary { background:var(--color-accent); color:#fff; }
        .btn-primary:hover { background:var(--color-accent-hover); text-decoration:none; color:#fff; }
      `}</style>
    </main>
  );
}
