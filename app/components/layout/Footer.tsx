import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo-new.png" alt="GYF" width={72} height={72} className="h-16 w-auto" />
            <span className="text-gray-700 text-sm font-medium">Get Your Fit</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-700">
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#perception" className="hover:text-gray-900 transition-colors">Perception Layer</a>
            <a href="#cta" className="hover:text-gray-900 transition-colors">Early Access</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-400 transition-colors text-xl">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400 transition-colors text-xl">💼</a>
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
