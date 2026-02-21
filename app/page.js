import Link from 'next/link';
import ServiceCards from '@/components/ServiceCards';
import TaxCalculator from '@/components/TaxCalculator';
import TestimonialCards from '@/components/TestimonialCards';

const CAL_URL = 'https://cal.com/zerotaxify';

export default function HomePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Fintech + Legal Tax Expertise</span>
            <h1>Simplifying Taxes Globally<br />India | Corporate | USA</h1>
            <p>
              ZeroTaxify helps salaried professionals, business owners, and US taxpayers file accurately,
              save more, and stay fully compliant with confidence.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href="/contact">Get Started</Link>
              <a className="btn btn-secondary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Schedule a Call</a>
            </div>
            <div className="hero-badges">
              <span>ISO-style process controls</span>
              <span>Secure filing workflow</span>
              <span>1000+ client engagements</span>
            </div>
          </div>

          <aside className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
              alt="Tax planning consultation"
            />
            <div className="metric-row">
              <div className="metric"><strong>1200+</strong><p>Clients served</p></div>
              <div className="metric"><strong>8400+</strong><p>Returns filed</p></div>
              <div className="metric"><strong>10Cr+</strong><p>Tax savings delivered</p></div>
              <div className="metric"><strong>4.9/5</strong><p>Client rating</p></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Premium Services for Real Tax Complexity</h2>
              <p>
                End-to-end filing and compliance support across Indian personal tax, corporate taxation,
                and US federal/state filing requirements.
              </p>
            </div>
            <Link className="btn btn-secondary" href="/services">View all services</Link>
          </div>
          <ServiceCards />
        </div>
      </section>

      <section className="section" id="calculator">
        <div className="container">
          <TaxCalculator />
          <div className="hero-cta" style={{ marginTop: 14 }}>
            <Link className="btn btn-secondary" href="/tax-calculator">Open Advanced Dual Calculator</Link>
          </div>

          <div className="process-compare">
            <article className="card">
              <h3>ZeroTaxify Filing Process</h3>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>
                A fast and transparent 4-step workflow designed for error-free filing and better tax outcomes.
              </p>
              <div className="process-grid" style={{ marginTop: 12 }}>
                <div className="process-step"><strong>1</strong><p>Profile assessment and checklist finalization.</p></div>
                <div className="process-step"><strong>2</strong><p>Regime + deduction optimization by experts.</p></div>
                <div className="process-step"><strong>3</strong><p>Draft return preparation and secure review.</p></div>
                <div className="process-step"><strong>4</strong><p>File, confirm, and receive post-filing support.</p></div>
              </div>
            </article>

            <article className="card">
              <h3>DIY vs ZeroTaxify</h3>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>
                Why clients switch from self-filing to professional filing.
              </p>
              <div className="compare-wrap" style={{ marginTop: 12 }}>
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Criteria</th>
                      <th>DIY Filing</th>
                      <th>ZeroTaxify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Accuracy</td>
                      <td>Depends on individual knowledge</td>
                      <td>Expert-reviewed return checks</td>
                    </tr>
                    <tr>
                      <td>Tax Savings</td>
                      <td>Basic deductions only</td>
                      <td>Strategic optimization and advisory</td>
                    </tr>
                    <tr>
                      <td>Corporate/US Complexity</td>
                      <td>Higher omission risk</td>
                      <td>Dedicated cross-border specialists</td>
                    </tr>
                    <tr>
                      <td>Turnaround</td>
                      <td>Variable</td>
                      <td>Usually 24 to 72 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h3>Client Success Metrics</h3>
              <p>Real outcomes from engagements across India, UAE, UK, and USA.</p>
            </div>
          </div>

          <div className="stats-grid">
            <article className="card stat-card"><strong>58M+</strong><p>INR refunds processed</p></article>
            <article className="card stat-card"><strong>97%</strong><p>On-time filing rate</p></article>
            <article className="card stat-card"><strong>31%</strong><p>Average tax reduction cases</p></article>
            <article className="card stat-card"><strong>24h</strong><p>Typical first response SLA</p></article>
          </div>

          <div className="cta-banner">
            <div>
              <h3 style={{ margin: 0 }}>Free Consultation for New Clients</h3>
              <p>Get an expert review of your filing profile before you submit.</p>
            </div>
            <a className="btn btn-secondary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Schedule a Call</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h3>What Clients Say</h3>
              <p>Trusted by salaried employees, business owners, and US taxpayers.</p>
            </div>
            <Link className="btn btn-secondary" href="/testimonials">View all testimonials</Link>
          </div>
          <TestimonialCards limit={3} />
        </div>
      </section>
    </main>
  );
}
