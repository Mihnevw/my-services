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
    const { email, socialLinks } = await req.json()
    if (!email || !socialLinks) {
      return NextResponse.json({ error: 'Email and socialLinks are required' }, { status: 400 })
    }

    // Send notification email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your social links have been updated',
      html: `
        <h1>Social Links Updated</h1>
        <p>Hello,</p>
        <p>Your profile social media links were updated successfully:</p>
        <ul>
          <li>Twitter: ${socialLinks.twitter || '-'}<br/>
          <li>LinkedIn: ${socialLinks.linkedin || '-'}<br/>
          <li>GitHub: ${socialLinks.github || '-'}<br/>
          <li>Instagram: ${socialLinks.instagram || '-'}<br/>
        </ul>
        <p>If you did not make this change, please contact support immediately.</p>
        <p>Best regards,<br/>Team Mihnev</p>
      `,
    })

    return NextResponse.json({ message: 'Notification email sent' }, { status: 200 })
  } catch (error) {
    console.error('Social links notification error:', error)
    return NextResponse.json({ error: 'Failed to send notification email' }, { status: 500 })
  }
} 