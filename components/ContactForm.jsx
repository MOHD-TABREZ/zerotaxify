'use client';

import { useState } from 'react';

const initial = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: ''
};

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setStatus('Sending your request...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Submission failed.');
      }

      setForm(initial);
      setStatus(data.message || 'Thanks. We will contact you shortly.');
    } catch (err) {
      setStatus(err.message || 'Unable to submit right now.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Send a Consultation Request</h3>
      <p style={{ color: 'var(--muted)' }}>
        Submissions are securely sent to <strong>ramjanalibaba2121@gmail.com</strong>.
      </p>

      <div className="hidden-field" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Name
          <input
            type="text"
            required
            minLength={2}
            maxLength={80}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Phone
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
          />
        </label>

        <label>
          Service
          <select
            required
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Select service</option>
            <option>Indian Income Tax Filing</option>
            <option>Corporate Tax Filing</option>
            <option>US Tax Filing (Federal & State)</option>
            <option>GST Registration & Filing</option>
            <option>Company Incorporation & Compliance</option>
            <option>Tax Planning & Advisory</option>
          </select>
        </label>
      </div>

      <label>
        Message
        <textarea
          required
          minLength={10}
          maxLength={2000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your tax support needs"
        />
      </label>

      <div className="calc-cta">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      <p className="form-status">{status}</p>
    </form>
  );
}
