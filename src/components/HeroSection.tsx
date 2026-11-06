import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  HotelTier,
  HOTEL_TIER_META,
  PackageCategory,
  TourPackage,
} from '../data/travelData';
import { formatINR } from '../utils/packageLogic';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  packages: TourPackage[];
  selectedCategory: PackageCategory;
  selectedPackageId: string;
  selectedHotelTier: HotelTier;
  travelersCount: number;
  onSelectCategory: (cat: PackageCategory) => void;
  onSelectPackageId: (id: string) => void;
  onSelectHotelTier: (tier: HotelTier) => void;
  onChangeTravelers: (count: number) => void;
  onJumpToCustomizer: () => void;
  onJumpToInquiry: () => void;
}

const CATEGORIES: PackageCategory[] = [
  'All',
  'Himalayan & Ladakh',
  'Spiritual Yatras',
  'Coastal & Backwaters',
  'Royal Heritage',
  'International Escapes',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  packages,
  selectedCategory,
  selectedPackageId,
  selectedHotelTier,
  travelersCount,
  onSelectCategory,
  onSelectPackageId,
  onSelectHotelTier,
  onChangeTravelers,
  onJumpToCustomizer,
  onJumpToInquiry,
}) => {
  const activePackage =
    packages.find((p) => p.id === selectedPackageId) || packages[0];

  const filteredDropdownPackages =
    selectedCategory === 'All'
      ? packages
      : packages.filter((p) => p.category === selectedCategory);

  return (
    <section id="top" className="pt-8 pb-16 md:pt-12 md:pb-24 border-b border-stone-200/80">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* 2-Column Balanced Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium text-amber-900 tracking-wide mb-4">
                Mumbai &amp; Pune Departure Specialists · Group &amp; Bespoke Private Tours
              </p>

              <h1
                className="font-display text-stone-950 font-semibold tracking-tight leading-[1.12] mb-6"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.65rem)',
                  textWrap: 'balance',
                }}
              >
                Handcrafted Indian Yatras, Himalayan Passes &amp; Coastal Escapes.
              </h1>

              <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-[62ch] mb-8">
                From sacred Kedarnath–Badrinath pilgrimages and high-altitude Ladakh convoys
                to private Alleppey houseboats, Samyati Tours &amp; Travels designs fully
                customizable itineraries where you control your stay tier, transport, and pace.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={onJumpToCustomizer}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-amber-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Customize Package Options</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href="https://www.instagram.com/samyati_travel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/80 border border-stone-300/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>@samyati_travel on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quantitative Proof Row (Unboxed clean typography) */}
            <div className="pt-6 border-t border-stone-200/90 grid grid-cols-3 gap-6">
              <div>
                <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-stone-950">
                  4,800+
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  Travelers guided across 18 states since 2019
                </p>
              </div>
              <div>
                <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-stone-950">
                  98.4%
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  On-schedule mountain &amp; yatra departures
                </p>
              </div>
              <div>
                <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-stone-950">
                  24/7
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  Dedicated on-ground tour managers per batch
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant 16:9 Focal Visual Carrier */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[360px] lg:h-full rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-900">
              <ResilientImage
                src="/src/assets/images/hero_himalayan_valley_1793996272579.jpg"
                alt="Traditional wooden Shikara gliding across Dal Lake with snow-capped Kashmir Himalayas at golden hour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-amber-200/90 mb-1">
                    Featured Signature Route · Srinagar · Gulmarg · Pahalgam
                  </p>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-white">
                    Kashmir Valley &amp; Shikara Odyssey
                  </h2>
                  <p className="text-xs text-stone-200 mt-1">
                    6 Days / 5 Nights · Ex-Mumbai &amp; Pune · Starting at{' '}
                    <span className="font-mono-tabular font-semibold text-white">
                      {formatINR(24500)}
                    </span>{' '}
                    / person
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPackageId('kashmir-shikara-alpine');
                    onJumpToInquiry();
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-white text-stone-950 rounded-lg hover:bg-amber-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  Inquire This Tour
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Interactive Package & Option Dropdown Bar Below Hero Split */}
        <div
          aria-label="Quick Package & Option Selector"
          className="mt-10 p-6 bg-white rounded-xl border border-stone-200/90 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-100">
            <h2 className="text-sm font-semibold text-stone-900">
              Quick Package &amp; Editable Option Selector
            </h2>
            <p className="text-xs text-stone-500">
              Select any tour category, destination package, and stay tier to preview live pricing or customize further
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* 1. Category Dropdown */}
            <div>
              <label
                htmlFor="hero-category-select"
                className="block text-xs font-medium text-stone-700 mb-1.5"
              >
                1. Travel Category
              </label>
              <select
                id="hero-category-select"
                value={selectedCategory}
                onChange={(e) => {
                  const newCat = e.target.value as PackageCategory;
                  onSelectCategory(newCat);
                  const matching =
                    newCat === 'All'
                      ? packages
                      : packages.filter((p) => p.category === newCat);
                  if (matching.length > 0 && !matching.some((p) => p.id === selectedPackageId)) {
                    onSelectPackageId(matching[0].id);
                  }
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Tour Categories (6+)' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Tour Package Dropdown */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="hero-package-select"
                className="block text-xs font-medium text-stone-700 mb-1.5"
              >
                2. Editable Tour Package
              </label>
              <select
                id="hero-package-select"
                value={activePackage.id}
                onChange={(e) => onSelectPackageId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
              >
                {filteredDropdownPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} ({pkg.baseDurationDays}D/{pkg.baseDurationDays - 1}N)
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Stay Tier Dropdown */}
            <div>
              <label
                htmlFor="hero-tier-select"
                className="block text-xs font-medium text-stone-700 mb-1.5"
              >
                3. Stay &amp; Comfort Tier
              </label>
              <select
                id="hero-tier-select"
                value={selectedHotelTier}
                onChange={(e) => onSelectHotelTier(e.target.value as HotelTier)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
              >
                {(Object.keys(HOTEL_TIER_META) as HotelTier[]).map((tierKey) => (
                  <option key={tierKey} value={tierKey}>
                    {HOTEL_TIER_META[tierKey].label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Travelers Count Dropdown */}
            <div>
              <label
                htmlFor="hero-travelers-select"
                className="block text-xs font-medium text-stone-700 mb-1.5"
              >
                4. Group Size
              </label>
              <select
                id="hero-travelers-select"
                value={travelersCount}
                onChange={(e) => onChangeTravelers(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
              >
                {[1, 2, 4, 6, 8, 10, 12, 16, 20].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Traveler (Solo)' : 'Travelers'}
                    {num >= 10 ? ' (8% Group Off)' : num >= 6 ? ' (5% Group Off)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Action */}
            <div>
              <button
                type="button"
                onClick={onJumpToCustomizer}
                className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-amber-900 hover:bg-stone-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Edit Package Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
