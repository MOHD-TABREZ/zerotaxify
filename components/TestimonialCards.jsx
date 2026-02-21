import { testimonials } from '@/lib/siteData';

export default function TestimonialCards({ limit = null }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="testimonial-grid">
      {list.map((item) => {
        const avatar = item.gender === 'female' ? '👩' : item.gender === 'male' ? '👨' : '🧑';
        return (
          <article className="card testimonial-card" key={`${item.name}-${item.location}`}>
            <div className="profile">
              <span className={`avatar-badge ${item.gender || 'neutral'}`} aria-hidden="true">
                {avatar}
              </span>
              <div>
                <strong>{item.name}</strong>
                <p>{item.location}</p>
              </div>
            </div>
            <p>“{item.text}”</p>
            <div className="rating">★★★★★</div>
          </article>
        );
      })}
    </div>
  );
}
