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
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Send notification email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your password has been changed successfully',
      html: `
        <h1>Password Changed Successfully</h1>
        <p>Hello,</p>
        <p>Your password was changed successfully on our platform. If you did not make this change, please contact support immediately.</p>
        <p>Best regards,<br/>Team Mihnev</p>
      `,
    })

    return NextResponse.json({ message: 'Notification email sent' }, { status: 200 })
  } catch (error) {
    console.error('Password change notification error:', error)
    return NextResponse.json({ error: 'Failed to send notification email' }, { status: 500 })
  }
} 