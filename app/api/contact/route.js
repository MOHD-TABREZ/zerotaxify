import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

const RECIPIENT = process.env.CONTACT_TO || 'Info@zerotaxify.com';
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const ipHits = new Map();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(18),
  service: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(2000),
  website: z.string().optional().default('')
});

function sanitize(value) {
  return String(value || '').replace(/[<>]/g, '').trim();
}

function getIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (ipHits.get(ip) || []).filter((ts) => now - ts < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

export async function POST(request) {
  try {
    const ip = getIp(request);
    if (isRateLimited(ip)) {
      return Response.json(
        { ok: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ ok: false, error: 'Please fill all required fields correctly.' }, { status: 400 });
    }

    if (parsed.data.website) {
      return Response.json({ ok: true, message: 'Submission received.' });
    }

    const transporter = getTransporter();
    if (!transporter) {
      return Response.json(
        { ok: false, error: 'Email service is not configured. Add SMTP env values.' },
        { status: 500 }
      );
    }

    const safeName = sanitize(parsed.data.name);
    const safeEmail = sanitize(parsed.data.email);
    const safePhone = sanitize(parsed.data.phone);
    const safeService = sanitize(parsed.data.service);
    const safeMessage = sanitize(parsed.data.message).replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: `ZeroTaxify Website <${process.env.SMTP_USER}>`,
      to: RECIPIENT,
      replyTo: safeEmail,
      subject: `New Inquiry: ${safeService}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Service:</strong> ${safeService}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `
    });

    return Response.json({ ok: true, message: 'Thanks! Our team will contact you shortly.' });
  } catch (error) {
    return Response.json({ ok: false, error: 'Failed to submit request. Please try again.' }, { status: 500 });
  }
}
