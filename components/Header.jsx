'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/Logo';
import StylePicker from '@/components/StylePicker';
import ThemeToggle from '@/components/ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/tax-calculator', label: 'Tax Calculator' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Logo className="nav-logo" />

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={pathname === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <StylePicker />
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
