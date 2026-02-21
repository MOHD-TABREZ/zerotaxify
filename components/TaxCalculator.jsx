'use client';

import { useEffect, useMemo, useState } from 'react';
import { calculateIndiaTax, calculateUSTax } from '@/lib/tax/engine';

const ONES = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen'
];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function sanitizeNumericText(value) {
  if (!value) return '';
  let cleaned = String(value).replace(/[^\d.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
  }
  return cleaned;
}

function formatNumericInput(cleanedValue, locale) {
  if (!cleanedValue) return '';

  const hasDot = cleanedValue.includes('.');
  const [intRaw, fracRaw = ''] = cleanedValue.split('.');
  const intPart = (intRaw || '0').replace(/^0+(?=\d)/, '') || '0';
  const grouped = Number(intPart).toLocaleString(locale, { maximumFractionDigits: 0 });

  if (hasDot) {
    return `${grouped}.${fracRaw.slice(0, 2)}`;
  }
  return grouped;
}

function parseLocalizedNumber(value) {
  const cleaned = sanitizeNumericText(value);
  if (!cleaned) return 0;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function wordsUnderThousand(num) {
  let n = Math.floor(num);
  if (n === 0) return '';

  let text = '';
  if (n >= 100) {
    text += `${ONES[Math.floor(n / 100)]} hundred`;
    n %= 100;
    if (n > 0) text += ' and ';
  }

  if (n >= 20) {
    text += TENS[Math.floor(n / 10)];
    n %= 10;
    if (n > 0) text += ` ${ONES[n]}`;
  } else if (n > 0) {
    text += ONES[n];
  }

  return text.trim();
}

function toWordsInternational(num) {
  const n = Math.floor(Math.abs(num));
  if (!n) return 'zero';

  const units = ['', 'thousand', 'million', 'billion', 'trillion'];
  let value = n;
  let idx = 0;
  const parts = [];

  while (value > 0 && idx < units.length) {
    const chunk = value % 1000;
    if (chunk > 0) {
      const chunkWords = wordsUnderThousand(chunk);
      const label = units[idx] ? ` ${units[idx]}` : '';
      parts.unshift(`${chunkWords}${label}`.trim());
    }
    value = Math.floor(value / 1000);
    idx += 1;
  }

  return parts.join(' ').trim();
}

function toWordsIndian(num) {
  let n = Math.floor(Math.abs(num));
  if (!n) return 'zero';

  const parts = [];
  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;

  if (crore) parts.push(`${toWordsInternational(crore)} crore`);
  if (lakh) parts.push(`${toWordsInternational(lakh)} lakh`);
  if (thousand) parts.push(`${toWordsInternational(thousand)} thousand`);
  if (n) parts.push(wordsUnderThousand(n));

  return parts.join(' ').trim();
}

function titleCase(text) {
  return text
    .split(' ')
    .map((x) => (x ? x[0].toUpperCase() + x.slice(1) : x))
    .join(' ');
}

function money(value, currency) {
  const locale = currency === 'USD' ? 'en-US' : 'en-IN';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(Math.max(Number(value || 0), 0));
}

function rate(value, income) {
  if (!income) return '0.00%';
  return `${((value / income) * 100).toFixed(2)}%`;
}

function Breakdown({ rows, currency }) {
  if (!rows?.length) return null;

  return (
    <div className="calc-breakdown">
      <h4>Bracket / Slab Breakdown</h4>
      <ul>
        {rows.map((row, idx) => (
          <li key={`${row.from}-${row.to}-${idx}`}>
            <span>
              {money(row.taxable, currency)} taxed at {(row.rate * 100).toFixed(0)}%
              {row.to ? ` (up to ${money(row.to, currency)})` : ' (top slab)'}
            </span>
            <strong>{money(row.tax, currency)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TaxCalculator({
  lockedCountry = null,
  showHead = true,
  compact = false,
  title = 'Tax Savings Calculator (INR + USD)',
  stepScope = null
}) {
  const [country, setCountry] = useState(lockedCountry || 'INR');
  const [incomeInput, setIncomeInput] = useState('');
  const [deductionsInput, setDeductionsInput] = useState('');
  const [currentPaidInput, setCurrentPaidInput] = useState('');
  const [indiaRegime, setIndiaRegime] = useState('compare');
  const [indiaAge, setIndiaAge] = useState('below60');
  const [filingStatus, setFilingStatus] = useState('single');
  const [pretaxInput, setPretaxInput] = useState('');
  const [itemizedInput, setItemizedInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isIndia = country === 'INR';
  const locale = isIndia ? 'en-IN' : 'en-US';

  useEffect(() => {
    if (lockedCountry) {
      setCountry(lockedCountry);
    }
  }, [lockedCountry]);

  const incomePresets = isIndia
    ? ['500000', '1200000', '1800000', '2500000']
    : ['60000', '120000', '200000', '350000'];

  const currentLabel = useMemo(
    () => (isIndia ? 'Current Tax Paid (Optional)' : 'Tax Withheld (W-2 / Estimated)'),
    [isIndia]
  );

  const grossIncomeValue = parseLocalizedNumber(incomeInput);
  const grossWords = useMemo(() => {
    if (!grossIncomeValue) return '';
    const words = isIndia ? toWordsIndian(grossIncomeValue) : toWordsInternational(grossIncomeValue);
    return titleCase(words);
  }, [grossIncomeValue, isIndia]);

  const handleNumberChange = (setter) => (e) => {
    const cleaned = sanitizeNumericText(e.target.value);
    setter(formatNumericInput(cleaned, locale));
  };

  useEffect(() => {
    setIncomeInput((prev) => formatNumericInput(sanitizeNumericText(prev), locale));
    setDeductionsInput((prev) => formatNumericInput(sanitizeNumericText(prev), locale));
    setCurrentPaidInput((prev) => formatNumericInput(sanitizeNumericText(prev), locale));
    setPretaxInput((prev) => formatNumericInput(sanitizeNumericText(prev), locale));
    setItemizedInput((prev) => formatNumericInput(sanitizeNumericText(prev), locale));
  }, [locale]);

  const { result, error } = useMemo(() => {
    const hasIncomeText = sanitizeNumericText(incomeInput).length > 0;

    if (!hasIncomeText) {
      return { result: null, error: '' };
    }

    if (!Number.isFinite(grossIncomeValue) || grossIncomeValue <= 0) {
      return {
        result: null,
        error: 'Please enter a valid annual gross income.'
      };
    }

    const deductions = parseLocalizedNumber(deductionsInput);
    const currentTaxPaid = parseLocalizedNumber(currentPaidInput);
    const pretaxContributions = parseLocalizedNumber(pretaxInput);
    const itemizedDeductions = parseLocalizedNumber(itemizedInput);

    try {
      if (isIndia) {
        const india = calculateIndiaTax({
          grossIncome: grossIncomeValue,
          deductions,
          currentTaxPaid,
          regime: indiaRegime,
          ageGroup: indiaAge
        });

        return {
          result: {
            country: 'INR',
            data: india,
            effectiveRate:
              india.mode === 'compare'
                ? rate(india.recommended.totalTax, grossIncomeValue)
                : rate(india.selected.totalTax, grossIncomeValue)
          },
          error: ''
        };
      }

      const us = calculateUSTax({
        grossIncome: grossIncomeValue,
        aboveLineDeductions: deductions,
        pretaxContributions,
        itemizedDeductions,
        withholding: currentTaxPaid,
        filingStatus
      });

      return {
        result: {
          country: 'USD',
          data: us,
          effectiveRate: rate(us.federalTax, grossIncomeValue)
        },
        error: ''
      };
    } catch (calcError) {
      return {
        result: null,
        error: 'Calculation failed. Please verify all numeric inputs.'
      };
    }
  }, [
    deductionsInput,
    filingStatus,
    grossIncomeValue,
    incomeInput,
    indiaAge,
    indiaRegime,
    isIndia,
    itemizedInput,
    pretaxInput,
    currentPaidInput
  ]);

  function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function resetAll() {
    setIncomeInput('');
    setDeductionsInput('');
    setCurrentPaidInput('');
    setPretaxInput('');
    setItemizedInput('');
    setIndiaRegime('compare');
    setIndiaAge('below60');
    setFilingStatus('single');
    setSubmitted(false);
  }

  function applyPreset(value) {
    setIncomeInput(formatNumericInput(value, locale));
  }

  const indiaRecommended =
    result?.country === 'INR'
      ? result.data.mode === 'compare'
        ? result.data.recommended
        : result.data.selected
      : null;

  const indiaMonthlyTax = indiaRecommended ? indiaRecommended.totalTax / 12 : 0;
  const indiaPostTaxIncome = indiaRecommended ? indiaRecommended.grossIncome - indiaRecommended.totalTax : 0;

  const usMonthlyTax = result?.country === 'USD' ? result.data.federalTax / 12 : 0;
  const usPostTaxIncome = result?.country === 'USD' ? result.data.grossIncome - result.data.federalTax : 0;

  const showError = Boolean(error) && (submitted || sanitizeNumericText(incomeInput).length > 0);

  const scope = stepScope || (lockedCountry ? lockedCountry.toLowerCase() : 'global');
  const generalAnchor = `${scope}-general`;
  const deductionsAnchor = `${scope}-deductions`;
  const resultsAnchor = `${scope}-results`;

  return (
    <section className={`tax-calc-wrap${compact ? ' compact' : ''}`}>
      {showHead ? (
        <div className="tax-calc-head">
          <p className="eyebrow">Live Estimator</p>
          <h2>{title}</h2>
          <p>
            Supports Indian and US comma formats, dynamic slab/bracket output, and practical planning estimates.
          </p>
        </div>
      ) : null}

      <div className={`tax-calc-grid${compact ? ' compact' : ''}`}>
        <form className="tax-form card" onSubmit={onSubmit}>
          <div className="field-grid two" data-step-anchor={generalAnchor}>
            {!lockedCountry ? (
              <label>
                Country / Currency
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="INR">India (INR)</option>
                  <option value="USD">USA (USD)</option>
                </select>
              </label>
            ) : (
              <label>
                Country / Currency
                <input value={isIndia ? 'India (INR)' : 'USA (USD)'} disabled readOnly />
              </label>
            )}

            <label>
              Annual Gross Income
              <input
                type="text"
                inputMode="decimal"
                placeholder={isIndia ? 'e.g. 12,00,000' : 'e.g. 120,000'}
                value={incomeInput}
                onChange={handleNumberChange(setIncomeInput)}
                required
              />
              <small className="input-help">
                {grossIncomeValue > 0
                  ? `${money(grossIncomeValue, isIndia ? 'INR' : 'USD')} • ${grossWords}`
                  : ''}
              </small>
              <div className="preset-row">
                {incomePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className="preset-btn"
                    onClick={() => applyPreset(preset)}
                  >
                    {formatNumericInput(preset, locale)}
                  </button>
                ))}
              </div>
            </label>
          </div>

          <div className="field-grid two" data-step-anchor={deductionsAnchor}>
            <label>
              {isIndia ? 'Additional Deductions / Exemptions' : 'Above-the-line Deductions'}
              <input
                type="text"
                inputMode="decimal"
                placeholder={isIndia ? 'e.g. 2,50,000' : 'e.g. 4,500'}
                value={deductionsInput}
                onChange={handleNumberChange(setDeductionsInput)}
              />
            </label>
            <label>
              {currentLabel}
              <input
                type="text"
                inputMode="decimal"
                placeholder={isIndia ? 'e.g. 2,20,000' : 'e.g. 13,000'}
                value={currentPaidInput}
                onChange={handleNumberChange(setCurrentPaidInput)}
              />
            </label>
          </div>

          {isIndia ? (
            <div className="field-grid two">
              <label>
                India Regime
                <select value={indiaRegime} onChange={(e) => setIndiaRegime(e.target.value)}>
                  <option value="compare">Compare Old vs New (Recommended)</option>
                  <option value="new">New Regime</option>
                  <option value="old">Old Regime</option>
                </select>
              </label>
              <label>
                Age Group
                <select value={indiaAge} onChange={(e) => setIndiaAge(e.target.value)}>
                  <option value="below60">Below 60 years</option>
                  <option value="senior">60 to 80 years</option>
                  <option value="super_senior">Above 80 years</option>
                </select>
              </label>
            </div>
          ) : (
            <div className="field-grid three">
              <label>
                Filing Status
                <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}>
                  <option value="single">Single</option>
                  <option value="married_joint">Married Filing Jointly</option>
                  <option value="head_household">Head of Household</option>
                  <option value="married_separate">Married Filing Separately</option>
                </select>
              </label>
              <label>
                Pre-tax Contributions
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 8,000"
                  value={pretaxInput}
                  onChange={handleNumberChange(setPretaxInput)}
                />
              </label>
              <label>
                Itemized Deductions
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Optional"
                  value={itemizedInput}
                  onChange={handleNumberChange(setItemizedInput)}
                />
              </label>
            </div>
          )}

          <div className="calc-actions">
            <button className="btn btn-primary" type="submit">
              Calculate Tax
            </button>
            <button className="btn btn-ghost" type="button" onClick={resetAll}>
              Reset
            </button>
          </div>

          {showError ? <p className="error-text">{error}</p> : null}
        </form>

        <div className="calc-result card" data-step-anchor={resultsAnchor}>
          {!result && !showError ? (
            <div className="result-empty" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ) : null}

          {result?.country === 'INR' ? (
            <>
              {result.data.mode === 'compare' ? (
                <>
                  <div className="result-stats">
                    <div>
                      <span>Recommended Regime</span>
                      <strong>{result.data.recommended.regime === 'new' ? 'New Regime' : 'Old Regime'}</strong>
                    </div>
                    <div>
                      <span>Estimated Tax</span>
                      <strong>{money(result.data.recommended.totalTax, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Effective Rate</span>
                      <strong>{result.effectiveRate}</strong>
                    </div>
                    <div>
                      <span>Potential Regime Savings</span>
                      <strong>{money(result.data.potentialSavingsBetweenRegimes, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Surcharge + Cess</span>
                      <strong>
                        {money(
                          result.data.recommended.surcharge + result.data.recommended.cess,
                          'INR'
                        )}
                      </strong>
                    </div>
                    <div>
                      <span>Monthly Tax (Est.)</span>
                      <strong>{money(indiaMonthlyTax, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Post-Tax Income</span>
                      <strong>{money(indiaPostTaxIncome, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Taxable Income</span>
                      <strong>{money(result.data.recommended.taxableIncome, 'INR')}</strong>
                    </div>
                  </div>

                  <p className="delta-text">
                    {result.data.projectedDifference >= 0
                      ? `Projected savings/refund vs current paid tax: ${money(result.data.projectedDifference, 'INR')}`
                      : `Projected additional tax due vs current paid tax: ${money(Math.abs(result.data.projectedDifference), 'INR')}`}
                  </p>

                  <Breakdown rows={result.data.recommended.breakdown} currency="INR" />
                </>
              ) : (
                <>
                  <div className="result-stats">
                    <div>
                      <span>Selected Regime</span>
                      <strong>{result.data.selected.regime === 'new' ? 'New Regime' : 'Old Regime'}</strong>
                    </div>
                    <div>
                      <span>Estimated Tax</span>
                      <strong>{money(result.data.selected.totalTax, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Taxable Income</span>
                      <strong>{money(result.data.selected.taxableIncome, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Effective Rate</span>
                      <strong>{result.effectiveRate}</strong>
                    </div>
                    <div>
                      <span>Surcharge + Cess</span>
                      <strong>
                        {money(result.data.selected.surcharge + result.data.selected.cess, 'INR')}
                      </strong>
                    </div>
                    <div>
                      <span>Monthly Tax (Est.)</span>
                      <strong>{money(indiaMonthlyTax, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Post-Tax Income</span>
                      <strong>{money(indiaPostTaxIncome, 'INR')}</strong>
                    </div>
                    <div>
                      <span>Age Bracket</span>
                      <strong>
                        {indiaAge === 'below60'
                          ? 'Below 60'
                          : indiaAge === 'senior'
                            ? '60 - 80'
                            : 'Above 80'}
                      </strong>
                    </div>
                  </div>

                  <p className="delta-text">
                    {result.data.projectedDifference >= 0
                      ? `Projected savings/refund vs current paid tax: ${money(result.data.projectedDifference, 'INR')}`
                      : `Projected additional tax due vs current paid tax: ${money(Math.abs(result.data.projectedDifference), 'INR')}`}
                  </p>

                  <Breakdown rows={result.data.selected.breakdown} currency="INR" />
                </>
              )}
            </>
          ) : null}

          {result?.country === 'USD' ? (
            <>
              <div className="result-stats">
                <div>
                  <span>Federal Tax</span>
                  <strong>{money(result.data.federalTax, 'USD')}</strong>
                </div>
                <div>
                  <span>Taxable Income</span>
                  <strong>{money(result.data.taxableIncome, 'USD')}</strong>
                </div>
                <div>
                  <span>Deduction Used</span>
                  <strong>{money(result.data.deductionUsed, 'USD')}</strong>
                </div>
                <div>
                  <span>Effective Rate</span>
                  <strong>{result.effectiveRate}</strong>
                </div>
                <div>
                  <span>Monthly Tax (Est.)</span>
                  <strong>{money(usMonthlyTax, 'USD')}</strong>
                </div>
                <div>
                  <span>Post-Tax Income</span>
                  <strong>{money(usPostTaxIncome, 'USD')}</strong>
                </div>
                <div>
                  <span>Filing Status</span>
                  <strong>{result.data.filingStatus.replaceAll('_', ' ')}</strong>
                </div>
                <div>
                  <span>Adjusted Income</span>
                  <strong>{money(result.data.adjustedIncome, 'USD')}</strong>
                </div>
              </div>

              <p className={`delta-text ${result.data.refundOrDue >= 0 ? 'ok' : 'warn'}`}>
                {result.data.refundOrDue >= 0
                  ? `Estimated refund: ${money(result.data.refundOrDue, 'USD')}`
                  : `Estimated additional due: ${money(Math.abs(result.data.refundOrDue), 'USD')}`}
              </p>

              <Breakdown rows={result.data.breakdown} currency="USD" />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
