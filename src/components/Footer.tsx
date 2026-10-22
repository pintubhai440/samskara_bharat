import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/content';
import { Heart } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenContact,
  onOpenPrivacy,
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-[#17324D] text-[#FFF9F0] border-t-4 border-[#FF9933] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-[#FFF9F0] px-4 py-2.5 rounded-2xl inline-block shadow-sm">
              <Logo size="md" currentLang={currentLang} />
            </div>
            <p className="text-sm text-gray-300 max-w-sm leading-relaxed font-sans">
              {t.footer.tagline}
            </p>
            <div className="text-xs text-[#FFD166] font-devanagari">
              आत्मवत् सर्वभूतेषु यः पश्यति स पश्यति।
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#about" className="hover:text-[#FF9933] transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-[#FF9933] transition-colors">
                  {t.nav.curriculum}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#FF9933] transition-colors">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#modes" className="hover:text-[#FF9933] transition-colors">
                  {t.nav.modes}
                </a>
              </li>
            </ul>
          </div>

          {/* Policy & Support Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Institutional &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#FF9933] transition-colors text-left cursor-pointer"
                >
                  {t.footer.contact}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#FF9933] transition-colors text-left cursor-pointer"
                >
                  {t.footer.privacy}
                </button>
              </li>
              <li className="pt-2 text-xs text-gray-400">
                Grades: LKG to Class 10 (Ages 3 to 16)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Samskara Bharat. {t.footer.rights}</p>
          <div className="flex items-center gap-1 text-gray-300">
            <span>Rooted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF9933] fill-[#FF9933]" />
            <span>for the children of Bharat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
