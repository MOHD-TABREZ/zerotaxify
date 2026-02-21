import Link from 'next/link';
import TaxCalculatorTabs from '@/components/TaxCalculatorTabs';

const indiaNewSlabs = [
  ['Up to Rs. 4,00,000', 'Nil'],
  ['Rs. 4,00,001 to Rs. 8,00,000', '5%'],
  ['Rs. 8,00,001 to Rs. 12,00,000', '10%'],
  ['Rs. 12,00,001 to Rs. 16,00,000', '15%'],
  ['Rs. 16,00,001 to Rs. 20,00,000', '20%'],
  ['Rs. 20,00,001 to Rs. 24,00,000', '25%'],
  ['Above Rs. 24,00,000', '30%']
];

const indiaOldSlabsBelow60 = [
  ['Up to Rs. 2,50,000', 'Nil'],
  ['Rs. 2,50,001 to Rs. 5,00,000', '5%'],
  ['Rs. 5,00,001 to Rs. 10,00,000', '20%'],
  ['Above Rs. 10,00,000', '30%']
];

const indiaOldSlabsSenior = [
  ['Up to Rs. 3,00,000', 'Nil'],
  ['Rs. 3,00,001 to Rs. 5,00,000', '5%'],
  ['Rs. 5,00,001 to Rs. 10,00,000', '20%'],
  ['Above Rs. 10,00,000', '30%']
];

const indiaOldSlabsSuperSenior = [
  ['Up to Rs. 5,00,000', 'Nil'],
  ['Rs. 5,00,001 to Rs. 10,00,000', '20%'],
  ['Above Rs. 10,00,000', '30%']
];

const indiaSurcharge = [
  ['Above Rs. 50 lakh and up to Rs. 1 crore', '10% of income tax'],
  ['Above Rs. 1 crore and up to Rs. 2 crore', '15% of income tax'],
  ['Above Rs. 2 crore and up to Rs. 5 crore', '25% of income tax'],
  ['Above Rs. 5 crore', '37% (Old regime) / 25% cap (New regime)']
];

const indiaRebate = [
  ['Old Regime', 'Rs. 5,00,000', 'Up to Rs. 12,500'],
  ['New Regime', 'Rs. 12,00,000*', 'Up to Rs. 60,000']
];

const usSingleBrackets = [
  ['Up to $11,925', '10%'],
  ['$11,926 to $48,475', '12%'],
  ['$48,476 to $103,350', '22%'],
  ['$103,351 to $197,300', '24%'],
  ['$197,301 to $256,225', '32%'],
  ['$256,226 to $626,350', '35%'],
  ['Above $626,350', '37%']
];

const usJointBrackets = [
  ['Up to $23,850', '10%'],
  ['$23,851 to $96,950', '12%'],
  ['$96,951 to $206,700', '22%'],
  ['$206,701 to $394,600', '24%'],
  ['$394,601 to $501,050', '32%'],
  ['$501,051 to $751,600', '35%'],
  ['Above $751,600', '37%']
];

const usStandardDeductions = [
  ['Single', '$15,750'],
  ['Married Filing Jointly', '$31,500'],
  ['Married Filing Separately', '$15,750'],
  ['Head of Household', '$23,625']
];

const indiaSteps = [
  'Choose FY 2025-26 (AY 2026-27) and select your preferred regime option.',
  'Select your age bracket if you want old-regime precision for senior/super-senior exemption limits.',
  'Enter gross annual salary before exemptions. Add exempt allowance adjustments separately where relevant.',
  'Add other income and deduction estimates such as savings deductions, insurance, and eligible exemptions.',
  'Click Calculate Tax and compare old vs new regime output before filing.'
];

const usSteps = [
  'Select filing status first because it changes bracket thresholds and standard deduction.',
  'Enter gross annual income in USD and update above-the-line adjustments where applicable.',
  'Add pre-tax contributions and optional itemized deduction values if they exceed the standard deduction.',
  'Provide federal withholding already paid so refund or additional due can be estimated.',
  'Review the bracket breakdown and effective tax rate to plan payments before final return filing.'
];

function RateTable({ title, cols, rows }) {
  return (
    <article className="card rate-table-card">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table className="compare-table tax-rate-table">
          <thead>
            <tr>
              {cols.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${title}-${row.join('-')}`}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export const metadata = {
  title: 'Tax Calculator | ZeroTaxify',
  description:
    'India and USA tax calculator with country tabs, slab tables, filing guidance, and planning-ready estimates using current official baselines.'
};

export default function TaxCalculatorPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">ZeroTaxify Estimator Suite</span>
            <h1>India + USA Tax Calculator</h1>
            <p>
              Compare regimes, estimate liabilities, and review slab-wise tax output in one place. Inputs support
              Indian and US number formats with live updates.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href="/contact">
                Get Expert Review
              </Link>
              <Link className="btn btn-secondary" href="/services">
                Explore Services
              </Link>
            </div>
          </div>
          <aside className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80"
              alt="Tax planning dashboard"
            />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Tabbed Calculator Workspace</h2>
              <p>
                Switch between India and USA calculators in a single pane and keep the workflow clean, fast, and easy
                to review.
              </p>
            </div>
          </div>

          <TaxCalculatorTabs />

          <p className="calc-footnote">
            Calculator outputs are planning estimates. Final tax depends on complete return data, eligible credits,
            and official updates by the tax authorities. India calculations follow the current government-notified
            baseline (new-regime slabs announced in Budget 2025), and US federal values follow IRS published 2025
            thresholds with the 2025 OBBB-adjusted standard deduction.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container dual-content-grid">
          <article className="card">
            <h3>How to Use the India Calculator (FY 2025-26 / AY 2026-27)</h3>
            <ol className="steps-list">
              {indiaSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="small-note">
              New-regime rebate can reduce tax to zero up to eligible limits. Special-rate income may be excluded from
              rebate treatment.
            </p>
          </article>

          <article className="card">
            <h3>How to Use the USA Calculator</h3>
            <ol className="steps-list">
              {usSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="small-note">
              This page focuses on federal estimate logic. State taxes, credits, AMT, and special cases should be
              reviewed during return preparation.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container rate-section">
          <div className="section-head">
            <div>
              <h3>India Income Tax Slab Rates</h3>
              <p>
                These tables summarize government-notified slab structures currently used by this estimator, including
                age-based old-regime treatment and surcharge guidance.
              </p>
            </div>
          </div>

          <div className="rate-grid">
            <RateTable
              title="New Regime Slab Rates"
              cols={['Income Slab (Rs.)', 'Rate']}
              rows={indiaNewSlabs}
            />
            <RateTable
              title="Old Regime Slab Rates (Below 60)"
              cols={['Income Slab (Rs.)', 'Rate']}
              rows={indiaOldSlabsBelow60}
            />
            <RateTable
              title="Old Regime (Age 60-80)"
              cols={['Income Slab (Rs.)', 'Rate']}
              rows={indiaOldSlabsSenior}
            />
            <RateTable
              title="Old Regime (Above 80)"
              cols={['Income Slab (Rs.)', 'Rate']}
              rows={indiaOldSlabsSuperSenior}
            />
            <RateTable
              title="Surcharge Guidance"
              cols={['Total Income Range', 'Surcharge']}
              rows={indiaSurcharge}
            />
            <RateTable
              title="Rebate u/s 87A (FY 2025-26)"
              cols={['Regime', 'Income Limit', 'Max Rebate']}
              rows={indiaRebate}
            />
          </div>

          <p className="small-note">
            Health and education cess at 4% applies on tax plus surcharge. Deduction availability differs between old
            and new regime selections.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container rate-section">
          <div className="section-head">
            <div>
              <h3>USA Federal Tax Reference Tables</h3>
              <p>
                These 2025 reference tables are for planning. Final liability can change with credits, state rules, and
                specific filing circumstances.
              </p>
            </div>
          </div>

          <div className="rate-grid">
            <RateTable
              title="Federal Brackets - Single"
              cols={['Taxable Income', 'Rate']}
              rows={usSingleBrackets}
            />
            <RateTable
              title="Federal Brackets - Married Filing Jointly"
              cols={['Taxable Income', 'Rate']}
              rows={usJointBrackets}
            />
            <RateTable
              title="Standard Deduction Reference"
              cols={['Filing Status', 'Deduction']}
              rows={usStandardDeductions}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container dual-content-grid">
          <article className="card">
            <h3>How ZeroTaxify Estimates Salary Tax</h3>
            <ul>
              <li>Starts with annual gross income and eligible adjustment inputs.</li>
              <li>Applies regime-appropriate standard deductions and slab progression.</li>
              <li>Adds surcharge logic for high income bands and 4% cess for India.</li>
              <li>Compares already paid/withheld tax to estimate refund or balance due.</li>
            </ul>
          </article>

          <article className="card">
            <h3>Why Use This Calculator</h3>
            <ul>
              <li>Quick scenario comparison for old vs new regime in India.</li>
              <li>Tabbed India and US planning from a single interface.</li>
              <li>Instant bracket breakdown and effective rate visibility.</li>
              <li>Useful for pre-filing planning and cash-flow preparation.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <article className="card">
            <h3 style={{ marginTop: 0 }}>Official Source References</h3>
            <ul>
              <li>
                India Budget announcement for revised new-regime slabs:
                {' '}
                <a href="https://www.indiabudget.gov.in/doc/bspeech/bs202502010.pdf" target="_blank" rel="noopener noreferrer">Budget Speech PDF (Government of India)</a>
              </li>
              <li>
                India old-regime age slabs and surcharge references:
                {' '}
                <a href="https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1" target="_blank" rel="noopener noreferrer">Income Tax Department guidance</a>
              </li>
              <li>
                USA federal bracket and standard deduction values:
                {' '}
                <a href="https://www.irs.gov/pub/irs-drop/rp-24-40.pdf" target="_blank" rel="noopener noreferrer">IRS Revenue Procedure 2024-40 (2025 brackets)</a>
                {' '}and{' '}
                <a href="https://www.irs.gov/pub/irs-drop/rp-25-45.pdf" target="_blank" rel="noopener noreferrer">IRS Revenue Procedure 2025-45 (2025 standard deduction updates)</a>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
