import ContactForm from '@/components/ContactForm';

const CAL_URL = 'https://cal.com/zerotaxify';

export const metadata = {
  title: 'Contact | ZeroTaxify',
  description: 'Contact ZeroTaxify for India, corporate, and US tax consultation.'
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Schedule a Call</span>
            <h1>Talk to a ZeroTaxify Tax Expert</h1>
            <p>
              Share your profile and filing timelines. Our team will respond with a tailored action plan.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer">
                Schedule via Cal.com
              </a>
            </div>
            <div className="hero-badges">
              <span>📞 +91 9052029525</span>
              <span>📧 Info@zerotaxify.com</span>
              <span>📍 30N Gould St, Sherdian, WY 82801, USA</span>
            </div>
          </div>
          <aside className="hero-visual card" style={{ padding: 18 }}>
            <h3 style={{ marginTop: 0 }}>Response Window</h3>
            <p style={{ margin: 0, color: 'var(--muted)' }}>
              Usually within 24 business hours for consultations and filing requests.
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <ContactForm />

          <div style={{ display: 'grid', gap: 12 }}>
            <article className="card">
              <h3 style={{ marginTop: 0 }}>Direct Contact</h3>
              <p>📞 <strong>+91 9052029525</strong></p>
              <p>📧 <strong>Info@zerotaxify.com</strong></p>
              <p>📍 <strong>30N Gould St, Sherdian, WY 82801, USA</strong></p>
              <p style={{ marginBottom: 0, color: 'var(--muted)' }}>Mon-Sat | 9:30 AM - 7:30 PM IST</p>
            </article>

            <article className="card map-card">
              <iframe
                title="Sherdian Wyoming Map"
                src="https://www.google.com/maps?q=30N%20Gould%20St%20Sherdian%20WY%2082801&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
