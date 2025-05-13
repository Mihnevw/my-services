import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import * as emailValidator from 'email-validator';
import { promises as dns } from 'dns';

// Common email domains
const COMMON_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'abv.bg',
  'mail.bg',
  'aol.com',
  'protonmail.com',
  'icloud.com',
  'live.com',
  'me.com',
  'msn.com',
  'ymail.com',
  'zoho.com',
  'yandex.com',
  'mail.ru',
  'gmx.com',
  'inbox.com',
  'fastmail.com',
  'tutanota.com'
];

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Use TLS instead of SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify domain exists and can receive emails
async function verifyDomain(domain: string): Promise<{ isValid: boolean; error?: string }> {
  try {
    // Check if domain is in common domains list
    if (COMMON_DOMAINS.includes(domain.toLowerCase())) {
      return { isValid: true };
    }

    // Check MX records with timeout
    const mxRecords = await Promise.race([
      dns.resolveMx(domain),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('DNS lookup timeout')), 5000)
      )
    ]);

    if (!Array.isArray(mxRecords) || mxRecords.length === 0) {
      return { 
        isValid: false, 
        error: `The domain "${domain}" does not exist or cannot receive emails. Please use a valid email address.` 
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Domain verification error:', error);
    return { 
      isValid: false, 
      error: `The domain "${domain}" does not exist or cannot receive emails. Please use a valid email address.` 
    };
  }
}

// Verify email exists by attempting to send a test email
async function verifyEmail(email: string): Promise<boolean> {
  try {
    // Create a test transporter
    const testTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Try to send a test email
    await testTransporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Email Verification',
      text: 'This is a test email to verify your address.',
    });

    return true;
  } catch (error) {
    console.error('Email verification error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailValidator.validate(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g., user@domain.com)' },
        { status: 400 }
      );
    }

    // Verify domain
    const domain = email.split('@')[1];
    const domainVerification = await verifyDomain(domain);
    if (!domainVerification.isValid) {
      return NextResponse.json(
        { error: domainVerification.error },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send confirmation email
    await transporter.sendMail({
      from: "Team Mihnev",
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <h1>Thank you for reaching out!</h1>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Best regards,<br>Team Mihnev</p>
      `,
    });

    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
} 