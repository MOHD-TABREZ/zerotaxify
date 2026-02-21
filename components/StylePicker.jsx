'use client';

import { useEffect, useState } from 'react';

const styles = [
  { value: 'sky', label: 'Sky Blue' },
  { value: 'ocean', label: 'Ocean Teal' },
  { value: 'ruby', label: 'Ruby Glow' },
  { value: 'amber', label: 'Amber Lux' },
  { value: 'forest', label: 'Forest Neo' }
];

export default function StylePicker() {
  const [style, setStyle] = useState('sky');

  useEffect(() => {
    const initial = document.documentElement.getAttribute('data-style') || 'sky';
    setStyle(initial);
  }, []);

  function onChange(next) {
    setStyle(next);
    document.documentElement.setAttribute('data-style', next);
    window.localStorage.setItem('zt-style', next);
  }

  return (
    <label className="style-select-wrap">
      <span className="sr-only">Choose color style</span>
      <select
        className="style-select"
        value={style}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Choose color style"
      >
        {styles.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
