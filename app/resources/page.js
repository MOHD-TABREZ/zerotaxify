import Link from 'next/link';

const resources = [
  {
    title: 'AY 2026-27 India Filing Deadlines',
    text: 'Due-date checklist for salaried, business, and audit-category taxpayers.'
  },
  {
    title: 'Corporate Tax Planning Playbook',
    text: 'How companies can structure compliance and advance-tax planning through the year.'
  },
  {
    title: 'US vs India Tax Comparison',
    text: 'Understand filing differences, deductions, and common cross-border mistakes.'
  },
  {
    title: 'Salary Tax Optimization Playbook',
    text: 'High-impact deductions and structuring ideas for salaried professionals.'
  },
  {
    title: 'Startup GST + TDS Compliance Checklist',
    text: 'Simple monthly checklist to avoid compliance misses and penalties.'
  },
  {
    title: 'Pre-March 31 Tax Planning Guide',
    text: 'A practical guide to avoid last-minute tax planning decisions.'
  }
];

export const metadata = {
  title: 'Resources | ZeroTaxify',
  description: 'Tax tips, filing deadlines, and guides for India, corporate, and USA taxpayers.'
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Guides & Insights</span>
            <h1>Resources for Better Tax Decisions</h1>
            <p>
              Get practical filing insights, deadlines, and strategy guides from the ZeroTaxify advisory team.
            </p>
          </div>
          <aside className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
              alt="Tax resources"
            />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container service-grid">
          {resources.map((item) => (
            <article className="card service-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link href="/contact" className="btn btn-secondary" style={{ marginTop: 10 }}>
                Request this guide
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
