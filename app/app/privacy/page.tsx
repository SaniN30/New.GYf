import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const LAST_UPDATED = 'June 2026'

const sections = [
  {
    title: '1. Who We Are',
    body: `Get Your Fit ("GYF", "we", "us", "our") is an AI-powered personal styling platform. Our registered address and contact details are available at the bottom of this page. GYF is currently in open beta. This Privacy Policy explains what data we collect, why we collect it, how we protect it, and your rights over it.`,
  },
  {
    title: '2. Data We Collect',
    items: [
      {
        label: 'Account information',
        detail: 'Email address, display name, and password hash when you create an account. We never store plaintext passwords.',
      },
      {
        label: 'Photos you upload',
        detail: 'If you use the Perception Layer or Virtual Try-On, images are processed in memory for analysis and are not persistently stored on our servers after your session ends. We do not sell, share, or train third-party models on your photos.',
      },
      {
        label: 'Style preferences & interactions',
        detail: 'Saves, skips, reactions, occasion settings, and styling goals you provide. This is the core behavioural data that powers your personal taste model.',
      },
      {
        label: 'Usage and technical data',
        detail: 'Page views, session duration, device type, browser, and IP address — collected to diagnose errors and improve performance. We use privacy-respecting analytics and do not track you across third-party websites.',
      },
      {
        label: 'Communications',
        detail: 'If you contact us by email or submit a form, we retain the conversation to respond and improve our support.',
      },
    ],
  },
  {
    title: '3. How We Use Your Data',
    items: [
      { label: 'Personalisation', detail: 'To build and refine your individual taste model so recommendations improve over time.' },
      { label: 'Service delivery', detail: 'To generate outfit recommendations, process photos, and return results to you.' },
      { label: 'Product improvement', detail: 'Aggregated, anonymised interaction signals help us train better models. Your individual data is never shared raw with third parties for this purpose.' },
      { label: 'Security & fraud prevention', detail: 'To detect and prevent abuse, unauthorised access, and technical errors.' },
      { label: 'Communications', detail: 'To send you service-critical emails (account confirmation, security alerts). We will only send marketing emails if you explicitly opt in.' },
    ],
  },
  {
    title: '4. Legal Basis (GDPR)',
    body: `If you are located in the European Economic Area or United Kingdom, our legal bases for processing are: (a) contract performance — processing necessary to deliver the service you signed up for; (b) legitimate interests — analytics and security, balanced against your rights; (c) consent — for optional marketing communications and any sensitive processing you explicitly authorise; and (d) legal obligation — where we are required to retain data by applicable law.`,
  },
  {
    title: '5. Data Sharing',
    body: `We do not sell your personal data. We share data only with:`,
    items: [
      { label: 'Infrastructure providers', detail: 'Cloud hosting and storage providers operating under data processing agreements with appropriate safeguards.' },
      { label: 'Analytics tools', detail: 'Privacy-respecting, aggregated analytics only. No cross-site tracking.' },
      { label: 'Legal authorities', detail: 'When required by law, court order, or to protect the safety of our users.' },
    ],
  },
  {
    title: '6. Retention',
    body: `We retain your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where we are legally required to retain certain records. Photos submitted to the Perception Layer are not stored after your session closes.`,
  },
  {
    title: '7. Your Rights',
    body: `Depending on your location, you may have the right to:`,
    items: [
      { label: 'Access', detail: 'Request a copy of the personal data we hold about you.' },
      { label: 'Rectification', detail: 'Correct inaccurate or incomplete data.' },
      { label: 'Erasure', detail: 'Request deletion of your account and associated data.' },
      { label: 'Portability', detail: 'Receive your data in a structured, machine-readable format.' },
      { label: 'Objection', detail: 'Object to processing based on legitimate interests.' },
      { label: 'Restriction', detail: 'Request that we limit processing in certain circumstances.' },
    ],
    footer: 'To exercise any of these rights, email us at privacy@getyourfit.app. We will respond within 30 days.',
  },
  {
    title: '8. Cookies',
    body: `We use strictly necessary cookies to keep you signed in and maintain session state. We do not use advertising cookies or third-party tracking pixels. You can clear cookies at any time through your browser settings without affecting your ability to use GYF.`,
  },
  {
    title: '9. Security',
    body: `We use industry-standard encryption in transit (TLS 1.3) and at rest. Access to personal data is restricted to authorised personnel only. We conduct regular security reviews. Despite these measures, no system is perfectly secure — please use a strong, unique password and enable two-factor authentication when available.`,
  },
  {
    title: '10. Children',
    body: `GYF is not directed at children under 13 (or under 16 in the EEA). We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact us and we will delete it promptly.`,
  },
  {
    title: '11. Changes to This Policy',
    body: `We may update this policy as our product evolves. We will notify you of material changes by email or by posting a prominent notice in the app at least 14 days before they take effect. Continued use of GYF after that date constitutes acceptance of the updated policy.`,
  },
  {
    title: '12. Contact',
    body: `For privacy-related questions or to exercise your rights, contact us at:\n\nprivacy@getyourfit.app\n\nGet Your Fit — open beta`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 sm:pt-40 pb-24 sm:pb-36">

        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <div className="text-[0.68rem] font-mono text-[#6b6b78] uppercase tracking-[0.14em] mb-4">Legal</div>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-black text-[#111318] leading-[1.02] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#9ca3af] text-sm font-mono">Last updated: {LAST_UPDATED}</p>
          <p className="text-[#5a5a65] text-base leading-[1.75] mt-6 font-[350]">
            GYF is built on the principle that your data is yours. We collect only what we need to deliver a great experience, we protect it carefully, and we give you full control over it.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12 sm:space-y-16 divide-y divide-black/[0.05]">
          {sections.map((s) => (
            <div key={s.title} className="pt-10 sm:pt-12 first:pt-0 first:border-0">
              <h2 className="text-base font-bold text-[#111318] mb-4 tracking-tight">{s.title}</h2>
              {s.body && (
                <p className="text-[#5a5a65] text-[0.9375rem] leading-[1.78] font-[350] whitespace-pre-line">
                  {s.body}
                </p>
              )}
              {s.items && (
                <ul className="mt-4 space-y-4">
                  {s.items.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111318]/20 flex-shrink-0 mt-[0.55rem]" />
                      <span className="text-[0.9375rem] text-[#5a5a65] leading-[1.78] font-[350]">
                        <strong className="text-[#111318] font-semibold">{item.label}:</strong>{' '}
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {'footer' in s && s.footer && (
                <p className="mt-4 text-[0.9375rem] text-[#5a5a65] leading-[1.78] font-[350]">{s.footer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-10 border-t border-black/[0.05] flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-[#5a5a65] hover:text-[#111318] transition-colors">
            ← Back to GYF
          </Link>
          <span className="text-black/10">·</span>
          <Link href="/terms" className="text-sm font-medium text-[#5a5a65] hover:text-[#111318] transition-colors">
            Terms of Service
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
