import Decimal from 'decimal.js';

const D = (value) => new Decimal(value || 0);
const max0 = (value) => Decimal.max(D(value), D(0));
const minDecimal = (a, b) => Decimal.min(D(a), D(b));

const INDIA_OLD_SLABS_BY_AGE = {
  below60: [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 0.05 },
    { upto: 1000000, rate: 0.2 },
    { upto: null, rate: 0.3 }
  ],
  senior: [
    { upto: 300000, rate: 0 },
    { upto: 500000, rate: 0.05 },
    { upto: 1000000, rate: 0.2 },
    { upto: null, rate: 0.3 }
  ],
  super_senior: [
    { upto: 500000, rate: 0 },
    { upto: 1000000, rate: 0.2 },
    { upto: null, rate: 0.3 }
  ]
};

const INDIA_NEW_SLABS = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.1 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.2 },
  { upto: 2400000, rate: 0.25 },
  { upto: null, rate: 0.3 }
];

const INDIA_SURCHARGE_RULES = [
  { threshold: 50000000, rate: 0.37 },
  { threshold: 20000000, rate: 0.25 },
  { threshold: 10000000, rate: 0.15 },
  { threshold: 5000000, rate: 0.1 }
];

const US_BRACKETS_2026 = {
  single: [
    { upto: 12400, rate: 0.1 },
    { upto: 50400, rate: 0.12 },
    { upto: 105700, rate: 0.22 },
    { upto: 201775, rate: 0.24 },
    { upto: 256225, rate: 0.32 },
    { upto: 640600, rate: 0.35 },
    { upto: null, rate: 0.37 }
  ],
  married_joint: [
    { upto: 24800, rate: 0.1 },
    { upto: 100800, rate: 0.12 },
    { upto: 211400, rate: 0.22 },
    { upto: 403550, rate: 0.24 },
    { upto: 512450, rate: 0.32 },
    { upto: 768700, rate: 0.35 },
    { upto: null, rate: 0.37 }
  ],
  married_separate: [
    { upto: 12400, rate: 0.1 },
    { upto: 50400, rate: 0.12 },
    { upto: 105700, rate: 0.22 },
    { upto: 201775, rate: 0.24 },
    { upto: 256225, rate: 0.32 },
    { upto: 384350, rate: 0.35 },
    { upto: null, rate: 0.37 }
  ],
  head_household: [
    { upto: 17700, rate: 0.1 },
    { upto: 67450, rate: 0.12 },
    { upto: 105700, rate: 0.22 },
    { upto: 201750, rate: 0.24 },
    { upto: 256200, rate: 0.32 },
    { upto: 640600, rate: 0.35 },
    { upto: null, rate: 0.37 }
  ]
};

const US_STANDARD_DEDUCTION_2026 = {
  single: 16100,
  married_joint: 32200,
  married_separate: 16100,
  head_household: 24150
};

function progressiveTax(taxableIncome, slabs) {
  const taxable = max0(taxableIncome);
  let previous = D(0);
  let total = D(0);
  const breakdown = [];

  for (const slab of slabs) {
    const upper = slab.upto === null ? null : D(slab.upto);
    const slabTop = upper ?? taxable;
    const slabAmount = max0(minDecimal(taxable, slabTop).minus(previous));

    if (slabAmount.greaterThan(0)) {
      const slabTax = slabAmount.times(slab.rate);
      total = total.plus(slabTax);
      breakdown.push({
        from: previous.toNumber(),
        to: upper ? upper.toNumber() : null,
        rate: slab.rate,
        taxable: slabAmount.toNumber(),
        tax: slabTax.toNumber()
      });
    }

    if (upper && taxable.lessThanOrEqualTo(upper)) break;
    previous = slabTop;
  }

  return {
    tax: total.toNumber(),
    breakdown
  };
}

function getIndiaOldSlabs(ageGroup) {
  return INDIA_OLD_SLABS_BY_AGE[ageGroup] || INDIA_OLD_SLABS_BY_AGE.below60;
}

function getIndiaSurchargeRate(taxableIncome, regime) {
  const income = max0(taxableIncome).toNumber();

  for (const rule of INDIA_SURCHARGE_RULES) {
    if (income > rule.threshold) {
      if (regime === 'new' && rule.rate > 0.25) {
        return 0.25;
      }
      return rule.rate;
    }
  }

  return 0;
}

function calculateIndiaOneRegime({ grossIncome, deductions, regime, ageGroup }) {
  const gross = max0(grossIncome);
  const deduction = max0(deductions);
  const standardDeduction = regime === 'new' ? D(75000) : D(50000);
  const taxableIncome = max0(gross.minus(deduction).minus(standardDeduction));
  const slabs = regime === 'new' ? INDIA_NEW_SLABS : getIndiaOldSlabs(ageGroup);
  const slabResult = progressiveTax(taxableIncome, slabs);

  const baseTax = D(slabResult.tax);
  let rebate = D(0);
  let marginalRelief = D(0);

  if (regime === 'old') {
    if (taxableIncome.lessThanOrEqualTo(500000)) {
      rebate = Decimal.min(baseTax, D(12500));
    }
  } else {
    if (taxableIncome.lessThanOrEqualTo(1200000)) {
      rebate = Decimal.min(baseTax, D(60000));
    } else {
      // Applies simple marginal relief around the new-regime rebate threshold.
      const excessOverThreshold = taxableIncome.minus(1200000);
      if (baseTax.greaterThan(excessOverThreshold)) {
        marginalRelief = baseTax.minus(excessOverThreshold);
      }
    }
  }

  const taxAfterReliefs = max0(baseTax.minus(rebate).minus(marginalRelief));
  const surchargeRate = getIndiaSurchargeRate(taxableIncome, regime);
  const surcharge = taxAfterReliefs.times(surchargeRate);
  const cess = taxAfterReliefs.plus(surcharge).times(0.04);
  const totalTax = taxAfterReliefs.plus(surcharge).plus(cess);

  return {
    regime,
    ageGroup,
    grossIncome: gross.toNumber(),
    deductions: deduction.toNumber(),
    standardDeduction: standardDeduction.toNumber(),
    taxableIncome: taxableIncome.toNumber(),
    baseTax: baseTax.toNumber(),
    rebate: rebate.toNumber(),
    marginalRelief: marginalRelief.toNumber(),
    surchargeRate,
    surcharge: surcharge.toNumber(),
    cess: cess.toNumber(),
    totalTax: totalTax.toNumber(),
    breakdown: slabResult.breakdown
  };
}

export function calculateIndiaTax({
  grossIncome,
  deductions,
  currentTaxPaid,
  regime,
  ageGroup = 'below60'
}) {
  const paid = max0(currentTaxPaid);

  if (regime === 'compare') {
    const oldRegime = calculateIndiaOneRegime({ grossIncome, deductions, regime: 'old', ageGroup });
    const newRegime = calculateIndiaOneRegime({ grossIncome, deductions, regime: 'new', ageGroup });
    const recommended = oldRegime.totalTax <= newRegime.totalTax ? oldRegime : newRegime;

    return {
      mode: 'compare',
      oldRegime,
      newRegime,
      recommended,
      projectedDifference: paid.minus(recommended.totalTax).toNumber(),
      potentialSavingsBetweenRegimes: Math.abs(oldRegime.totalTax - newRegime.totalTax)
    };
  }

  const selected = calculateIndiaOneRegime({ grossIncome, deductions, regime, ageGroup });

  return {
    mode: 'single',
    selected,
    projectedDifference: paid.minus(selected.totalTax).toNumber()
  };
}

export function calculateUSTax({
  grossIncome,
  aboveLineDeductions,
  pretaxContributions,
  itemizedDeductions,
  withholding,
  filingStatus
}) {
  const status = US_BRACKETS_2026[filingStatus] ? filingStatus : 'single';
  const gross = max0(grossIncome);
  const adjustments = max0(D(aboveLineDeductions).plus(pretaxContributions));
  const adjustedIncome = max0(gross.minus(adjustments));

  const standardDeduction = D(US_STANDARD_DEDUCTION_2026[status]);
  const itemized = max0(itemizedDeductions);
  const deductionUsed = Decimal.max(standardDeduction, itemized);
  const taxableIncome = max0(adjustedIncome.minus(deductionUsed));

  const bracketResult = progressiveTax(taxableIncome, US_BRACKETS_2026[status]);
  const federalTax = D(bracketResult.tax);
  const paid = max0(withholding);
  const refundOrDue = paid.minus(federalTax);

  return {
    filingStatus: status,
    grossIncome: gross.toNumber(),
    adjustedIncome: adjustedIncome.toNumber(),
    standardDeduction: standardDeduction.toNumber(),
    deductionUsed: deductionUsed.toNumber(),
    taxableIncome: taxableIncome.toNumber(),
    federalTax: federalTax.toNumber(),
    withholding: paid.toNumber(),
    refundOrDue: refundOrDue.toNumber(),
    breakdown: bracketResult.breakdown
  };
}
