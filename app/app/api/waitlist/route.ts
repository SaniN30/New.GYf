import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

const SHEETS_URL =
  process.env.GOOGLE_SHEETS_SCRIPT_URL ??
  'https://script.google.com/macros/s/AKfycbzYOPIv-u0XL2clDvP5QpCLEH2c5BbKNWAhM2jNOGwBKilTl5Ig6VB9TtPVIHTSi_fh/exec'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone } = body as { name?: string; email?: string; phone?: string }

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: 'Name, email, and phone are required.' }, { status: 400 })
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRx.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const firstName = name.trim().split(/\s+/)[0]

    // Write to Google Sheets
    const params = new URLSearchParams({
      timestamp: new Date().toISOString(),
      name:  name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    })

    const sheetsRes = await fetch(`${SHEETS_URL}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow',
    })
    const text = await sheetsRes.text()
    console.log('[waitlist] Sheets response:', sheetsRes.status, text)

    // Send confirmation email via SendGrid
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: email.trim(),
        from: {
          email: process.env.SENDGRID_FROM_EMAIL ?? 'gyf1ltd@gmail.com',
          name: 'GYF — Get Your Fit',
        },
        subject: `You're on the list, ${firstName} 🎉`,
        text: `Hi ${firstName},\n\nThanks for signing up for early access to GYF — Get Your Fit!\n\nWe'll be in touch as soon as we're ready to let you in.\n\nIn the meantime, follow us on Instagram and LinkedIn for updates.\n\n— The GYF Team\nhttps://getyourfit.tech`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,0.07);">
          <!-- Header -->
          <tr>
            <td style="background:#111318;padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">GYF</p>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.55);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">Get Your Fit</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111318;letter-spacing:-0.3px;">You're on the list, ${firstName}!</p>
              <p style="margin:0 0 24px;font-size:15px;color:#5a5a65;line-height:1.6;">
                Thanks for signing up for early access to GYF. We're building an AI-native personal stylist that learns exactly what looks good on <em>you</em> — and we can't wait for you to try it.
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#5a5a65;line-height:1.6;">
                We'll reach out as soon as we're ready to let you in. Keep an eye on your inbox.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
                <tr>
                  <td style="background:#111318;border-radius:10px;">
                    <a href="https://getyourfit.tech" style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.1px;">Visit GYF →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#9a9aa5;line-height:1.6;">
                Follow us on
                <a href="https://www.instagram.com/getyourfit.gyf" style="color:#111318;text-decoration:none;font-weight:500;">Instagram</a>
                &amp;
                <a href="https://www.linkedin.com/company/get-your-fit-g-y-f/" style="color:#111318;text-decoration:none;font-weight:500;">LinkedIn</a>
                for updates.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#b0b0ba;text-align:center;">
                © 2026 Get Your Fit Ltd · <a href="https://getyourfit.tech/privacy" style="color:#b0b0ba;text-decoration:none;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      }
      try {
        await sgMail.send(msg)
        console.log('[waitlist] Confirmation email sent to', email.trim())
      } catch (mailErr) {
        // Non-fatal: log the error but don't fail the registration
        console.error('[waitlist] SendGrid error:', mailErr)
      }
    } else {
      console.warn('[waitlist] SENDGRID_API_KEY not set — skipping confirmation email')
    }

    return NextResponse.json({ success: true, firstName })
  } catch (err) {
    console.error('[waitlist] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
