import React from 'react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="font-display text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-800"
        >
          Samyati Tours &amp; Travels
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          <a
            href="#packages"
            onClick={(e) => handleNavClick(e, 'packages')}
            className="hover:text-stone-950 hover:underline underline-offset-8 decoration-amber-800/70 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Packages
          </a>
          <a
            href="#customizer"
            onClick={(e) => handleNavClick(e, 'customizer')}
            className="hover:text-stone-950 hover:underline underline-offset-8 decoration-amber-800/70 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Customizer
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, 'gallery')}
            className="hover:text-stone-950 hover:underline underline-offset-8 decoration-amber-800/70 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Gallery
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleNavClick(e, 'testimonials')}
            className="hover:text-stone-950 hover:underline underline-offset-8 decoration-amber-800/70 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Stories
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('booking-inquiry')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-amber-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
          >
            Plan Your Journey
          </button>
        </div>
      </div>
    </header>
  );
};
