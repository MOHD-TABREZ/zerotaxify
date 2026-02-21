'use client';

import { MoonStar, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const initial = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(initial);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    window.localStorage.setItem('zt-theme', next);
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme} type="button" aria-label="Toggle dark mode">
      {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
    </button>
  );
}
