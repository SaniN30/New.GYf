import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[40px] h-[40px]">
              <Image src="/assets/logo-new.png" alt="GYF" fill className="object-contain" />
            </div>
            <span className="text-gray-600 text-sm font-semibold">Get Your Fit</span>
          </Link>
          <div className="flex items-center gap-8 text-sm text-gray-400">
            <a href="#how-it-works" className="hover:text-[#7C3AED] transition-colors">How It Works</a>
            <a href="#perception" className="hover:text-[#7C3AED] transition-colors">Perception Layer</a>
            <a href="#cta" className="hover:text-[#7C3AED] transition-colors">Early Access</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center text-lg transition-colors hover:scale-110 duration-200">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center text-lg transition-colors hover:scale-110 duration-200">💼</a>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Get Your Fit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
