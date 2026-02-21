import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  FileCheck2,
  Instagram,
  Landmark,
  Linkedin,
  Mail,
  MapPinned,
  PhoneCall,
  ShieldCheck,
  Twitter
} from 'lucide-react';
import Logo from '@/components/Logo';

const CAL_URL = 'https://cal.com/zerotaxify';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-callout">
        <div>
          <p className="eyebrow">Need Expert Filing Help?</p>
          <h3>Get a personalized tax strategy in one consultation.</h3>
        </div>
        <a href={CAL_URL} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
          Schedule a Call <ArrowRight size={15} />
        </a>
      </div>

      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            ZeroTaxify delivers premium tax filing and advisory services for India, corporate entities, and US
            taxpayers with secure workflows and expert-reviewed outcomes.
          </p>

          <div className="socials" aria-label="social links">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4>Solutions</h4>
          <ul>
            <li>
              <Link href="/services">Indian Income Tax Filing</Link>
            </li>
            <li>
              <Link href="/services">Corporate Tax Filing</Link>
            </li>
            <li>
              <Link href="/services">US Federal & State Filing</Link>
            </li>
            <li>
              <Link href="/services">GST & Compliance</Link>
            </li>
            <li>
              <Link href="/tax-calculator">Tax Calculator</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Why ZeroTaxify</h4>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">
                <ShieldCheck size={15} />
              </span>
              <span>Secure client document workflow</span>
            </li>
            <li>
              <span className="feature-icon">
                <FileCheck2 size={15} />
              </span>
              <span>Multi-layer review for filing accuracy</span>
            </li>
            <li>
              <span className="feature-icon">
                <Landmark size={15} />
              </span>
              <span>India + USA cross-jurisdiction support</span>
            </li>
            <li>
              <span className="feature-icon">
                <Calculator size={15} />
              </span>
              <span>Planning-first advisory and projections</span>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact & Trust</h4>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">
                <PhoneCall size={15} />
              </span>
              <span>+91 9052029525</span>
            </li>
            <li>
              <span className="contact-icon">
                <Mail size={15} />
              </span>
              <span>Info@zerotaxify.com</span>
            </li>
            <li>
              <span className="contact-icon">
                <MapPinned size={15} />
              </span>
              <span>30N Gould St, Sherdian, WY 82801, USA</span>
            </li>
            <li>
              <span className="contact-icon">
                <BadgeCheck size={15} />
              </span>
              <span>Expert-reviewed filing workflow</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 ZeroTaxify. All rights reserved.</p>
        <p>Estimator outputs are indicative and should be validated during professional filing.</p>
      </div>
    </footer>
  );
}
