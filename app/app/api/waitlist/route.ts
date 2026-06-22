import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL    = process.env.WAITLIST_FROM_EMAIL ?? 'GYF <waitlist@getyourfit.tech>'
const AUDIENCE_ID   = process.env.RESEND_AUDIENCE_ID  // optional — logs contacts in Resend

function welcomeHtml(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to GYF</title>
</head>
<body style="margin:0;padding:0;background:#0d0e11;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0e11;padding:48px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111318;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

          <!-- Header bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1b20 0%,#0d0e11 100%);padding:40px 48px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;font-family:monospace;color:rgba(196,149,106,0.8);letter-spacing:0.2em;text-transform:uppercase;">Get Your Fit</p>
              <h1 style="margin:12px 0 0;font-size:36px;font-weight:900;color:#ffffff;letter-spacing:-0.03em;line-height:1.1;">
                Welcome,<br/>${firstName}.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 48px 32px;">
              <p style="margin:0 0 20px;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.75;">
                You&rsquo;re now on the GYF early access list. We&rsquo;re building an AI stylist that truly understands you — your body, your palette, your presence.
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:rgba(255,255,255,0.55);line-height:1.75;">
                When we open the doors, you&rsquo;ll be among the first to walk through them.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.06);margin:28px 0;"></div>

              <!-- What to expect -->
              <p style="margin:0 0 14px;font-size:10px;font-family:monospace;color:rgba(255,255,255,0.25);letter-spacing:0.18em;text-transform:uppercase;">What&rsquo;s coming</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${[
                  ['01', 'Body-aware outfit generation — complete looks, not individual items'],
                  ['02', 'Skin tone & proportion analysis from a single photo'],
                  ['03', 'AI that learns your taste with every interaction'],
                ].map(([n, text]) => `
                <tr>
                  <td style="padding:10px 0;vertical-align:top;">
                    <span style="font-size:10px;font-family:monospace;color:rgba(196,149,106,0.6);margin-right:14px;">${n}</span>
                    <span style="font-size:13px;color:rgba(255,255,255,0.45);line-height:1.5;">${text}</span>
                  </td>
                </tr>`).join('')}
              </table>

              <!-- Divider -->
              <div style="height:1px;background:rgba(255,255,255,0.06);margin:28px 0;"></div>

              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.28);line-height:1.7;">
                We&rsquo;ll only reach out when there&rsquo;s something real to share — no noise, no newsletters.<br/>
                Reply to this email anytime if you have questions.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 48px 32px;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:11px;font-family:monospace;color:rgba(255,255,255,0.18);letter-spacing:0.1em;">
                GYF &mdash; AI Personal Stylist &mdash; <a href="https://getyourfit.tech" style="color:rgba(196,149,106,0.5);text-decoration:none;">getyourfit.tech</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone } = body as { name?: string; email?: string; phone?: string }

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: 'Name, email, and phone are required.' }, { status: 400 })
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRx.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
    }

    const firstName = name.trim().split(/\s+/)[0]

    // 1. Send welcome email
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email.trim()],
        subject: `${firstName}, you're on the GYF list.`,
        html: welcomeHtml(firstName),
      }),
    })

    if (!emailRes.ok) {
      const err = await emailRes.text()
      console.error('[waitlist] Resend email error:', err)
      return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 502 })
    }

    // 2. Add to Resend Audience (best-effort)
    if (AUDIENCE_ID) {
      await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          first_name: firstName,
          last_name: name.trim().split(/\s+/).slice(1).join(' ') || undefined,
          unsubscribed: false,
          data: { phone: phone.trim() },
        }),
      }).catch(e => console.error('[waitlist] Audience add error:', e))
    }

    // 3. Append row to Google Sheet via Apps Script Web App (best-effort)
    const sheetsUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL
    if (sheetsUrl) {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      }).catch(e => console.error('[waitlist] Sheets error:', e))
    }

    return NextResponse.json({ success: true, firstName })
  } catch (err) {
    console.error('[waitlist] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
