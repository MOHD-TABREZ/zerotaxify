import Link from 'next/link';
import ServiceCards from '@/components/ServiceCards';

const CAL_URL = 'https://cal.com/zerotaxify';

export const metadata = {
  title: 'Services | ZeroTaxify',
  description: 'Indian personal tax, corporate tax, and US tax services by ZeroTaxify.'
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Professional Tax Services</span>
            <h1>Services Built for Filing Accuracy and Savings</h1>
            <p>
              From tax return filing to GST, incorporation, and international tax support,
              ZeroTaxify provides complete execution plus advisory.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Schedule a Call</a>
              <Link className="btn btn-secondary" href="/contact">Request Proposal</Link>
            </div>
          </div>
          <aside className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
              alt="Tax services dashboard"
            />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ServiceCards />
        </div>
      </section>
    </main>
  );
}
