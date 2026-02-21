import Link from 'next/link';

export default function Logo({ className = '' }) {
  return (
    <Link href="/" className={`zt-logo ${className}`.trim()} aria-label="ZeroTaxify home">
      <img className="logo-light" src="/assets/branding/zerotaxify-logo-light.svg" alt="ZeroTaxify" />
      <img className="logo-dark" src="/assets/branding/zerotaxify-logo-dark.svg" alt="ZeroTaxify" />
    </Link>
  );
}
