'use client';

import { Calculator, Landmark } from 'lucide-react';
import { useState } from 'react';
import TaxCalculator from '@/components/TaxCalculator';

const tabs = [
  {
    id: 'INR',
    label: 'India Tax Calculator',
    helper: 'Old vs new regime with age-aware slabs, surcharge, and cess.',
    icon: Calculator
  },
  {
    id: 'USD',
    label: 'USA Tax Calculator',
    helper: 'Federal estimate with filing status, deductions, and withholding.',
    icon: Landmark
  }
];

export default function TaxCalculatorTabs() {
  const [active, setActive] = useState('INR');
  const [activeStep, setActiveStep] = useState('general');

  function getAnchor(step) {
    return `${active.toLowerCase()}-${step}`;
  }

  function onStepClick(step) {
    setActiveStep(step);
    const anchor = getAnchor(step);
    const element = document.querySelector(`[data-step-anchor='${anchor}']`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <section className="taxcaster-shell" aria-label="Tax calculator switcher">
      <div className="taxcaster-head">
        <p className="eyebrow">Estimator Workspace</p>
        <h3>Choose Your Calculator</h3>
      </div>

      <div className="taxcaster-steps" aria-label="Calculation stages">
        <button
          type="button"
          className={activeStep === 'general' ? 'active' : ''}
          onClick={() => onStepClick('general')}
        >
          1. General Info
        </button>
        <button
          type="button"
          className={activeStep === 'deductions' ? 'active' : ''}
          onClick={() => onStepClick('deductions')}
        >
          2. Deductions
        </button>
        <button
          type="button"
          className={activeStep === 'results' ? 'active' : ''}
          onClick={() => onStepClick('results')}
        >
          3. Results
        </button>
      </div>

      <div className="taxcaster-tabs" role="tablist" aria-label="Select country calculator">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              className={`taxcaster-tab ${isActive ? 'active' : ''}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`taxcaster-panel-${tab.id}`}
              id={`taxcaster-tab-${tab.id}`}
              onClick={() => {
                setActive(tab.id);
                setActiveStep('general');
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <div
            key={tab.id}
            id={`taxcaster-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`taxcaster-tab-${tab.id}`}
            className={`taxcaster-panel ${isActive ? 'active' : ''}`}
            hidden={!isActive}
          >
            <p className="taxcaster-helper">{tab.helper}</p>
            <TaxCalculator
              lockedCountry={tab.id}
              compact
              showHead={false}
              title={tab.label}
              stepScope={tab.id.toLowerCase()}
            />
          </div>
        );
      })}
    </section>
  );
}
