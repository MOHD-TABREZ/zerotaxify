import TestimonialCards from '@/components/TestimonialCards';

export const metadata = {
  title: 'Testimonials | ZeroTaxify',
  description: 'Real client testimonials from Indian and US taxpayers.'
};

export default function TestimonialsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Client Outcomes</span>
            <h1>Real Feedback from Taxpayers We Support</h1>
            <p>
              From salaried employees to founders and US taxpayers, clients choose ZeroTaxify for reliability,
              savings clarity, and faster turnaround.
            </p>
          </div>
          <aside className="hero-visual card" style={{ padding: 18 }}>
            <h3 style={{ marginTop: 0 }}>Overall Satisfaction</h3>
            <p className="rating" style={{ marginTop: 4 }}>★★★★★</p>
            <p style={{ color: 'var(--muted)', marginBottom: 0 }}>4.9/5 for advisory quality, support, and filing accuracy.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <TestimonialCards />
        </div>
      </section>
    </main>
  );
}
