import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <nav className="nav">
        <div className="container nav-inner">
          <span className="nav-logo">BlockThread</span>
          <Link href="/new" className="btn btn-primary">
            Start a project →
          </Link>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-inner">
          <h1 className="hero-title">
            Turn clothing photos into<br />
            <span className="accent">Roblox classic templates</span>
          </h1>
          <p className="hero-subtitle">
            Upload front and back photos of a shirt or pants, preview the
            classic clothing layout, and export a ready-to-upload PNG template.
          </p>
          <div className="hero-actions">
            <Link href="/new" className="btn btn-primary btn-lg">
              Start for free →
            </Link>
          </div>
        </div>
      </header>

      <section className="steps">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <ol className="steps-list">
            <li className="step">
              <span className="step-num">01</span>
              <div>
                <h3>Upload your photos</h3>
                <p>
                  Take a photo of the front and back of your garment (shirt or
                  pants). Optionally add sleeve or leg detail shots.
                </p>
              </div>
            </li>
            <li className="step">
              <span className="step-num">02</span>
              <div>
                <h3>Generate the template</h3>
                <p>
                  BlockThread maps your clothing onto the 585 × 559 Roblox
                  classic template canvas, placing each body region in the
                  correct position.
                </p>
              </div>
            </li>
            <li className="step">
              <span className="step-num">03</span>
              <div>
                <h3>Preview and adjust</h3>
                <p>
                  Review the template layout in the interactive editor. Check
                  each panel — torso, arms, legs — before exporting.
                </p>
              </div>
            </li>
            <li className="step">
              <span className="step-num">04</span>
              <div>
                <h3>Export your PNG</h3>
                <p>
                  Download a Roblox-ready classic clothing PNG. Upload it
                  directly in Roblox Studio or the Roblox Creator Hub.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="warning-banner">
        <div className="container">
          <p>
            ⚠️{" "}
            <strong>Copyright notice:</strong> Only upload photos of clothing
            you own or have explicit permission to use. Do not upload images
            containing logos, brand marks, or copyrighted graphics. You are
            responsible for any content you upload or publish to Roblox.
          </p>
        </div>
      </section>

      <section className="limitations">
        <div className="container">
          <h2 className="section-title">MVP limitations</h2>
          <ul className="limitations-list">
            <li>Classic 2D clothing only — no Roblox layered clothing or 3D meshes</li>
            <li>Placeholder template generation in Phase 0 (pixel-perfect mapping coming soon)</li>
            <li>No background removal yet</li>
            <li>No user accounts or cloud storage yet</li>
            <li>Export produces a labelled placeholder canvas until the image pipeline is complete</li>
          </ul>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">
            BlockThread is not affiliated with or endorsed by Roblox Corporation.
            &ldquo;Roblox&rdquo; is used as a descriptive technical reference only.
          </p>
        </div>
      </footer>

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
          justify-content: space-between;
        }
        .nav-logo {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text);
        }

        .hero {
          padding: 80px 0 64px;
        }
        .hero-inner {
          max-width: 720px;
        }
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }
        .accent {
          color: var(--color-accent);
        }
        .hero-subtitle {
          font-size: 1.125rem;
          color: var(--color-text-muted);
          max-width: 560px;
          margin-bottom: 32px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
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
        .btn-primary {
          background: var(--color-accent);
          color: #fff;
        }
        .btn-primary:hover {
          background: var(--color-accent-hover);
          text-decoration: none;
          color: #fff;
        }
        .btn-lg {
          padding: 14px 28px;
          font-size: 1rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 32px;
          letter-spacing: -0.02em;
        }

        .steps {
          padding: 64px 0;
          border-top: 1px solid var(--color-border);
        }
        .steps-list {
          list-style: none;
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
        .step {
          display: flex;
          gap: 16px;
        }
        .step-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-accent);
          font-family: var(--font-mono);
          padding-top: 4px;
          flex-shrink: 0;
        }
        .step h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .step p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .warning-banner {
          background: #1c1500;
          border-top: 1px solid #3d2e00;
          border-bottom: 1px solid #3d2e00;
          padding: 16px 0;
        }
        .warning-banner p {
          font-size: 0.875rem;
          color: var(--color-warning);
          line-height: 1.6;
        }

        .limitations {
          padding: 48px 0;
          border-top: 1px solid var(--color-border);
        }
        .limitations-list {
          list-style: disc;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: var(--color-text-muted);
          font-size: 0.9375rem;
        }

        .footer {
          border-top: 1px solid var(--color-border);
          padding: 32px 0;
          margin-top: 64px;
        }
        .footer-inner {
          display: flex;
          justify-content: center;
        }
        .footer-copy {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          text-align: center;
        }
      `}</style>
    </main>
  );
}
