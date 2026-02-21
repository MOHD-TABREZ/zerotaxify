import Link from 'next/link';

const CAL_URL = 'https://cal.com/zerotaxify';

export const metadata = {
  title: 'About | ZeroTaxify',
  description: 'Learn about ZeroTaxify mission, vision, and advisory team.'
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">About ZeroTaxify</span>
            <h1>High-Trust Tax Advisory, Built in India</h1>
            <p>
              ZeroTaxify combines tax domain expertise with modern systems to help individuals and businesses
              file correctly, reduce risks, and improve tax efficiency.
            </p>
          </div>
          <aside className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
              alt="ZeroTaxify team meeting"
            />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container page-grid-two">
          <article className="card">
            <h3 style={{ marginTop: 0 }}>Mission</h3>
            <p>
              To simplify taxation for Indian residents, corporates, and US taxpayers through expert-led filing,
              proactive planning, and secure digital workflows.
            </p>
          </article>
          <article className="card">
            <h3 style={{ marginTop: 0 }}>Vision</h3>
            <p>
              To become the most trusted India-origin platform for high-accuracy tax planning,
              compliance, and long-term tax advisory.
            </p>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <article className="card big4-highlight">
            <h3 style={{ marginTop: 0 }}>Big 4 Experience, Productized for Fast Execution</h3>
            <p>
              Our advisory process is shaped by professionals with prior exposure to Big 4 tax and compliance
              practices. That means tighter review controls, stronger documentation standards, and audit-ready
              communication for every filing cycle.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container page-grid-two">
          <article className="card">
            <h3 style={{ marginTop: 0 }}>Why Choose ZeroTaxify</h3>
            <ul>
              <li>India + international tax coverage in one team.</li>
              <li>Planning-first approach instead of filing-only execution.</li>
              <li>Faster response SLAs and transparent documentation.</li>
              <li>Secure workflows with expert review checkpoints.</li>
            </ul>
          </article>
          <article className="card">
            <h3 style={{ marginTop: 0 }}>Advisory Focus</h3>
            <ul>
              <li>Indian income tax filing and planning.</li>
              <li>Corporate tax filing and compliance strategy.</li>
              <li>US federal and state filing support.</li>
              <li>GST, TDS, payroll, and ROC compliance.</li>
            </ul>
            <a className="btn btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12 }}>
              Schedule a Call
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
