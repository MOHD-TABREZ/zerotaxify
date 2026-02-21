import Image from 'next/image';
import { testimonials } from '@/lib/siteData';

export default function TestimonialCards({ limit = null }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="testimonial-grid">
      {list.map((item) => (
        <article className="card testimonial-card" key={`${item.name}-${item.location}`}>
          <div className="profile">
            <Image src={item.image} alt={item.name} width={56} height={56} unoptimized />
            <div>
              <strong>{item.name}</strong>
              <p>{item.location}</p>
            </div>
          </div>
          <p>“{item.text}”</p>
          <div className="rating">★★★★★</div>
        </article>
      ))}
    </div>
  );
}
