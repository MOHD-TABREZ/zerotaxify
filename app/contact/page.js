import ContactForm from '@/components/ContactForm';

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
            <span className="eyebrow">Book Consultation</span>
            <h1>Talk to a ZeroTaxify Tax Expert</h1>
            <p>
              Share your profile and filing timelines. Our team will respond with a tailored action plan.
            </p>
            <div className="hero-badges">
              <span>📞 +91 9052029525</span>
              <span>📧 ramjanalibaba2121@gmail.com</span>
              <span>📍 LB Nagar, Hyderabad, India</span>
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
              <p>📧 <strong>ramjanalibaba2121@gmail.com</strong></p>
              <p>📍 <strong>LB Nagar, Hyderabad, India</strong></p>
              <p style={{ marginBottom: 0, color: 'var(--muted)' }}>Mon-Sat | 9:30 AM - 7:30 PM IST</p>
            </article>

            <article className="card map-card">
              <iframe
                title="LB Nagar Hyderabad Map"
                src="https://www.google.com/maps?q=LB%20Nagar%20Hyderabad&output=embed"
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
