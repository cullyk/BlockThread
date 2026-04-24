"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createJob } from "@blockthread/core";
import type { GarmentType } from "@blockthread/core";

export default function NewProjectPage() {
  const router = useRouter();
  const [garmentType, setGarmentType] = useState<GarmentType>("shirt");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);

  function handleCreate() {
    setCreating(true);
    const job = createJob(garmentType, garmentType);
    // In MVP: persist to sessionStorage; future: POST to API
    sessionStorage.setItem(`job:${job.id}`, JSON.stringify(job));
    router.push(`/projects/${job.id}`);
  }

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
        <h1 className="page-title">New project</h1>

        <div className="warning-banner">
          <p>
            ⚠️ Only upload photos of clothing you own or have explicit permission to
            use. Do not upload images with logos, brand marks, or copyrighted
            graphics.
          </p>
        </div>

        <section className="card">
          <h2 className="card-title">Garment type</h2>
          <div className="type-grid">
            {(["shirt", "pants"] as GarmentType[]).map((t) => (
              <button
                key={t}
                className={`type-card ${garmentType === t ? "selected" : ""}`}
                onClick={() => setGarmentType(t)}
              >
                <span className="type-icon">{t === "shirt" ? "👕" : "👖"}</span>
                <span className="type-label">
                  {t === "shirt" ? "Classic shirt" : "Classic pants"}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">Upload photos</h2>
          <div className="upload-grid">
            <label className="upload-zone">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setFrontImage(e.target.files?.[0] ?? null)}
              />
              <span className="upload-icon">📷</span>
              <span className="upload-label">Front *</span>
              {frontImage && (
                <span className="upload-filename">{frontImage.name}</span>
              )}
            </label>

            <label className="upload-zone">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setBackImage(e.target.files?.[0] ?? null)}
              />
              <span className="upload-icon">📷</span>
              <span className="upload-label">Back *</span>
              {backImage && (
                <span className="upload-filename">{backImage.name}</span>
              )}
            </label>
          </div>
          <p className="upload-hint">
            Optional: add sleeve or leg detail photos after creating the project.
          </p>
        </section>

        <div className="actions">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? "Creating…" : "Create project →"}
          </button>
        </div>
      </div>

      <style>{`
        .nav {
          border-bottom: 1px solid var(--color-border);
          padding: 16px 0;
          position: sticky;
          top: 0;
          background: var(--color-bg);
          z-index: 10;
        }
        .nav-inner {
          display: flex;
          align-items: center;
        }
        .nav-logo {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text);
        }
        .nav-logo:hover {
          text-decoration: none;
          color: var(--color-accent);
        }

        .page-body {
          max-width: 680px;
          padding-top: 40px;
          padding-bottom: 80px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .warning-banner {
          background: #1c1500;
          border: 1px solid #3d2e00;
          border-radius: var(--radius);
          padding: 12px 16px;
        }
        .warning-banner p {
          font-size: 0.875rem;
          color: var(--color-warning);
          line-height: 1.5;
        }

        .card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
        }
        .card-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .type-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .type-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px;
          border-radius: var(--radius);
          border: 2px solid var(--color-border);
          background: var(--color-bg);
          cursor: pointer;
          transition: border-color 0.15s;
          color: var(--color-text);
        }
        .type-card:hover { border-color: var(--color-accent); }
        .type-card.selected { border-color: var(--color-accent); background: #1a1a2e; }
        .type-icon { font-size: 2rem; }
        .type-label { font-size: 0.9rem; font-weight: 600; }

        .upload-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }
        .upload-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px 16px;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius);
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .upload-zone:hover { border-color: var(--color-accent); }
        .upload-icon { font-size: 1.5rem; }
        .upload-label { font-size: 0.875rem; font-weight: 600; }
        .upload-filename {
          font-size: 0.75rem;
          color: var(--color-success);
          word-break: break-all;
          text-align: center;
        }
        .upload-hint {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }

        .actions {
          display: flex;
          gap: 12px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: var(--radius);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background 0.15s;
          text-decoration: none;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-primary {
          background: var(--color-accent);
          color: #fff;
        }
        .btn-primary:hover:not(:disabled) {
          background: var(--color-accent-hover);
        }
        .btn-lg {
          padding: 14px 28px;
          font-size: 1rem;
        }
      `}</style>
    </main>
  );
}
