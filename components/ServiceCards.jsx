import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Calculator,
  FileSpreadsheet,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/siteData';

const iconByTitle = {
  'Indian Income Tax Filing': Calculator,
  'Corporate Tax Filing': Building2,
  'US Tax Filing (Federal & State)': Landmark,
  'GST Registration & Filing': FileSpreadsheet,
  'Company Incorporation & Compliance': BriefcaseBusiness,
  'Tax Planning & Advisory': ShieldCheck
};

export default function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map((service) => {
        const Icon = iconByTitle[service.title] || Calculator;
        return (
          <article className="card service-card" key={service.title}>
            <span className="service-icon" aria-hidden="true">
              <Icon size={18} />
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <Link href="/contact" className="text-link">
              Talk to expert <ArrowRight size={14} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
