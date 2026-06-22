import Image from 'next/image'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-16 w-16 flex-shrink-0">
              <Image
                src="/assets/logo-new.png"
                alt="GYF"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </div>
            <span className="text-gray-700 text-sm font-medium leading-none">Get Your Fit</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-gray-700">
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#perception" className="hover:text-gray-900 transition-colors">Perception Layer</a>
            <a href="#cta" className="hover:text-gray-900 transition-colors">Early Access</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/getyourfit.gyf?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#E1306C] transition-colors p-1.5 rounded-lg hover:bg-pink-50">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/company/get-your-fit-g-y-f/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0A66C2] transition-colors p-1.5 rounded-lg hover:bg-blue-50">
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-700">
          <p>© 2026 Get Your Fit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
