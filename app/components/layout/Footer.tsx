import Image from 'next/image'
import Link from 'next/link'

const LINKS = {
  Product: ['The Stylist', 'Perception Layer', 'The Arc'],
  Company: ['About', 'Early Access'],
  Legal: ['Privacy Policy', 'Terms'],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <Image src="/assets/logo-new.png" alt="GYF" fill className="object-contain" />
              </div>
              <span className="font-bold text-[#0A0A0A] text-sm">Get Your Fit</span>
            </Link>
            <p className="text-xs text-[#6B7280] max-w-[200px] leading-relaxed">AI-native personal stylist. Built for your body.</p>
          </div>
          <div className="grid grid-cols-3 gap-12 flex-1">
            {Object.entries(LINKS).map(([cat, items]) => (
              <div key={cat}>
                <div className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-widest mb-4">{cat}</div>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item}><a href="#" className="text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <p className="text-xs text-[#9CA3AF]">© 2026 Get Your Fit. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-gray-400 hover:bg-gray-50 transition-all">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-gray-400 hover:bg-gray-50 transition-all">💼</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
