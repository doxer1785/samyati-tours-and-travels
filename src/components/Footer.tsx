import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 py-14">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-stone-800">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-bold text-white tracking-tight">
              Samyati Tours &amp; Travels
            </p>
            <p className="text-xs text-stone-400 mt-3 max-w-sm leading-relaxed">
              Curated group departures, sacred Himalayan Yatras, coastal backwater charters,
              and bespoke private holiday packages departing from Mumbai, Pune, and across India.
            </p>
            <div className="mt-5">
              <a
                href="https://www.instagram.com/samyati_travel/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <span>instagram.com/samyati_travel</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <p className="font-semibold text-white text-sm mb-3">Explore Sections</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="#packages"
                  onClick={(e) => handleNav(e, 'packages')}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Signature Tour Packages
                </a>
              </li>
              <li>
                <a
                  href="#customizer"
                  onClick={(e) => handleNav(e, 'customizer')}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Interactive Option Customizer
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleNav(e, 'gallery')}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Expedition Photo Gallery
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleNav(e, 'testimonials')}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Verified Traveler Stories
                </a>
              </li>
              <li>
                <a
                  href="#booking-inquiry"
                  onClick={(e) => handleNav(e, 'booking-inquiry')}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Custom Booking Inquiry
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs">
            <p className="font-semibold text-white text-sm mb-3">Popular Departures</p>
            <p className="text-stone-400">
              Kashmir Dal Lake &amp; Gulmarg · Leh Ladakh &amp; Turtuk · Kedarnath &amp; Badrinath Do Dham Yatra · Kerala Munnar &amp; Alleppey Houseboat · Royal Rajasthan Heritage · Bali Island Signature
            </p>
            <p className="text-stone-500 pt-2">
              Departure Hubs: Mumbai · Pune · Thane · Nashik · Delhi · Bengaluru
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Samyati Tours &amp; Travels. All rights reserved.
          </p>
          <p>Crafted for bespoke Indian &amp; international journeys.</p>
        </div>
      </div>
    </footer>
  );
};
