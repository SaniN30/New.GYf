import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#F3F4F6] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 mb-10 sm:mb-12">
          <div className="flex-shrink-0 md:w-48">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <Image src="/assets/logo-new.png" alt="GYF" fill className="object-contain" />
              </div>
              <span className="font-bold text-[#0A0A0A] text-sm">Get Your Fit</span>
            </Link>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">AI-native personal stylist. Built for your body.</p>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-12 flex-1">
            {[
              { cat:'Product', items:['The Stylist','Perception Layer','The Arc'] },
              { cat:'Company', items:['About','Early Access'] },
              { cat:'Legal', items:['Privacy Policy','Terms'] },
            ].map(({cat,items}) => (
              <div key={cat}>
                <p className="text-xs font-bold text-[#0A0A0A] uppercase tracking-[0.12em] mb-4">{cat}</p>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item}><a href="#" className="text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#F3F4F6]">
          <p className="text-xs text-[#9CA3AF]">© 2026 Get Your Fit. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[['https://instagram.com','📸'],['https://linkedin.com','💼']].map(([href,icon]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#F3F4F6] flex items-center justify-center text-sm hover:border-[#E5E7EB] hover:bg-[#F9FAFB] transition-all">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
