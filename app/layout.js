import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata = {
  title: 'ZeroTaxify | India, Corporate & USA Tax Experts',
  description:
    'ZeroTaxify simplifies tax filing for India, corporate entities, and US taxpayers with expert advisory, secure workflows, and measurable savings.',
  metadataBase: new URL('https://zerotaxify.com')
};

const themeBootScript = `
(function(){
  try {
    var stored = localStorage.getItem('zt-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var style = localStorage.getItem('zt-style') || 'sky';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-style', style);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-style', 'sky');
  }
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" data-style="sky" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
