import { NextRequest, NextResponse } from 'next/server'

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzYOPIv-u0XL2clDvP5QpCLEH2c5BbKNWAhM2jNOGwBKilTl5Ig6VB9TtPVIHTSi_fh/exec'

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

    return NextResponse.json({ success: true, firstName })
  } catch (err) {
    console.error('[waitlist] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
