import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#08080C] border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo.png" alt="GYF" width={28} height={28} className="brightness-0 invert opacity-60" />
            <span className="text-gray-500 text-sm font-medium">Get Your Fit</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#how-it-works" className="hover:text-gray-300 transition-colors">How It Works</a>
            <a href="#perception" className="hover:text-gray-300 transition-colors">Perception Layer</a>
            <a href="#cta" className="hover:text-gray-300 transition-colors">Early Access</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-400 transition-colors text-xl">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors text-xl">💼</a>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© 2026 Get Your Fit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
