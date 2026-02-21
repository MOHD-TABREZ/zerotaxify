# ZeroTaxify (Next.js Production Build)

Production-ready multi-page website for ZeroTaxify using Next.js App Router.

## Stack
- Next.js 15 (App Router)
- React 19
- Nodemailer (contact form email delivery)
- Zod (API validation)
- Decimal.js (precise tax calculations)
- Lucide React (modern iconography)

## Features
- Multi-page architecture:
  - `/` Home
  - `/services`
  - `/about`
  - `/testimonials`
  - `/resources`
  - `/contact`
- Sapphire-only premium design with light and dark mode.
- Redesigned logo with dedicated light/dark variants.
- Floating WhatsApp CTA with pre-filled message.
- Improved process/comparison sections with overflow-safe responsive layout.
- Secure contact form API:
  - Honeypot anti-spam field
  - Server-side schema validation
  - Basic IP rate limiting
  - SMTP email delivery to `Info@zerotaxify.com`

## Tax Calculator
The calculator supports:
- India (INR):
  - Old vs New regime compare mode
  - Section 87A rebate handling
  - New-regime marginal relief near threshold
  - Cess inclusion
- USA (USD):
  - Federal tax estimate by filing status
  - Standard deduction / itemized deduction handling
  - Withholding-based refund/due estimate

### Formula references used
- India slabs/rules: Income Tax Department resources and FY 2025-26 FAQs.
- US federal brackets and deductions: IRS inflation adjustment release for tax year 2026.

## Environment Variables
Copy `.env.example` to `.env` and fill values:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
WHATSAPP_NUMBER=919052029525
```

## Local Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`

## Production
```bash
npm run build
npm run start
```

## Notes
- Use a Gmail App Password if SMTP uses Gmail.
- Calculator output is planning-grade; final filing output depends on full return details.
