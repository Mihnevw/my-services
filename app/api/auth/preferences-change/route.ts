import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(req: Request) {
  try {
    const { email, preferences } = await req.json()
    if (!email || !preferences) {
      return NextResponse.json({ error: 'Email and preferences are required' }, { status: 400 })
    }

    // Send notification email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your account preferences have been updated',
      html: `
        <h1>Preferences Updated</h1>
        <p>Hello,</p>
        <p>Your account preferences have been updated successfully:</p>
        <ul>
          <li>Email Notifications: ${preferences.emailNotifications ? 'Enabled' : 'Disabled'}</li>
          <li>Marketing Emails: ${preferences.marketingEmails ? 'Enabled' : 'Disabled'}</li>
          <li>Project Updates: ${preferences.projectUpdates ? 'Enabled' : 'Disabled'}</li>
        </ul>
        <p>If you did not make this change, please contact support immediately.</p>
        <p>Best regards,<br/>Team Mihnev</p>
      `,
    })

    return NextResponse.json({ message: 'Notification email sent' }, { status: 200 })
  } catch (error) {
    console.error('Preferences notification error:', error)
    return NextResponse.json({ error: 'Failed to send notification email' }, { status: 500 })
  }
} 