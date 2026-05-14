import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name    = String(formData.get('name')    ?? '').trim();
  const email   = String(formData.get('email')   ?? '').trim();
  const phone   = String(formData.get('phone')   ?? '').trim();
  const subject = String(formData.get('subject') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: 'Message vide.' }, { status: 400 });
  }

  const to = process.env.CONTACT_TO || 'n.almeida@solidem.pro';

  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    console.log('Contact form (no SMTP):', { name, email, phone, subject, message });
    return NextResponse.json({ success: true });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const file = formData.get('file') as File | null;
  const attachments: { filename: string; content: Buffer; contentType: string }[] = [];

  if (file && file.size > 0) {
    const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé (jpg, png, pdf).' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max. 5 Mo).' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buffer, contentType: file.type });
  }

  await transporter.sendMail({
    from:        `"SOLIDEM Site" <${process.env.SMTP_USER}>`,
    to,
    replyTo:     email,
    subject:     subject || 'Nouveau message depuis le site SOLIDEM',
    text:        `Nom    : ${name}\nE-mail : ${email}\nTél.   : ${phone}\nSujet  : ${subject}\n\nMessage :\n${message}`,
    attachments,
  });

  return NextResponse.json({ success: true });
}
