import React, { useState } from 'react';
import { Check, Edit3, Plus, RotateCcw, Sliders, X } from 'lucide-react';
import {
  HotelTier,
  HOTEL_TIER_META,
  MealPlan,
  MEAL_PLAN_META,
  PackageCategory,
  PackageCustomization,
  TourPackage,
  TransportMode,
  TRANSPORT_MODE_META,
} from '../data/travelData';
import {
  calculateCustomPackagePrice,
  filterPackages,
  formatINR,
} from '../utils/packageLogic';
import { ResilientImage } from './ResilientImage';

interface PackagesStudioProps {
  packages: TourPackage[];
  selectedCategory: PackageCategory;
  customization: PackageCustomization;
  onSelectCategory: (cat: PackageCategory) => void;
  onUpdateCustomization: (next: Partial<PackageCustomization>) => void;
  onSelectPackageForCustomization: (pkgId: string) => void;
  onSaveEditedPackage: (updatedPkg: TourPackage, isNew: boolean) => void;
  onResetPackages: () => void;
  onProceedToBooking: () => void;
}

const CATEGORIES: PackageCategory[] = [
  'All',
  'Himalayan & Ladakh',
  'Spiritual Yatras',
  'Coastal & Backwaters',
  'Royal Heritage',
  'International Escapes',
];

export const PackagesStudio: React.FC<PackagesStudioProps> = ({
  packages,
  selectedCategory,
  customization,
  onSelectCategory,
  onUpdateCustomization,
  onSelectPackageForCustomization,
  onSaveEditedPackage,
  onResetPackages,
  onProceedToBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [customAddonTitle, setCustomAddonTitle] = useState('');
  const [customAddonPrice, setCustomAddonPrice] = useState('1800');

  const activePackage =
    packages.find((p) => p.id === customization.packageId) || packages[0];

  const visiblePackages = filterPackages(packages, selectedCategory, searchQuery);
  const priceBreakdown = calculateCustomPackagePrice(activePackage, customization);

  const handleToggleAddOn = (addonId: string) => {
    const exists = customization.selectedAddOnIds.includes(addonId);
    const nextIds = exists
      ? customization.selectedAddOnIds.filter((id) => id !== addonId)
      : [...customization.selectedAddOnIds, addonId];
    onUpdateCustomization({ selectedAddOnIds: nextIds });
  };

  const handleAddCustomActivityToPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customAddonTitle.trim();
    const numericPrice = Math.max(0, Number(customAddonPrice) || 1500);
    if (!trimmed) return;

    const newAddonId = `custom-${Date.now()}`;
    const updatedPkg: TourPackage = {
      ...activePackage,
      availableAddOns: [
        ...activePackage.availableAddOns,
        {
          id: newAddonId,
          label: trimmed,
          pricePerPerson: numericPrice,
          description: 'Custom traveler-requested excursion or upgrade',
        },
      ],
    };

    onSaveEditedPackage(updatedPkg, false);
    onUpdateCustomization({
      selectedAddOnIds: [...customization.selectedAddOnIds, newAddonId],
    });
    setCustomAddonTitle('');
  };

  const openEditorForPackage = (pkg: TourPackage) => {
    setIsCreatingNew(false);
    setEditingPackage(JSON.parse(JSON.stringify(pkg)));
  };

  const openNewPackageCreator = () => {
    setIsCreatingNew(true);
    setEditingPackage({
      id: `custom-pkg-${Date.now()}`,
      title: 'Gokarna, Murudeshwar & Honnavar Coastal Trail',
      subtitle: 'Om Beach sunset trek, Murudeshwar Shiva temple & Sharavathi backwater boat ride',
      category: 'Coastal & Backwaters',
      region: 'Gokarna · Murudeshwar · Honnavar',
      departureHubs: ['Mumbai', 'Pune', 'Bengaluru'],
      baseDurationDays: 4,
      minDays: 3,
      maxDays: 7,
      basePricePerPerson: 14900,
      bestSeason: 'October – March',
      groupSize: '4 – 20 Travelers',
      image: '/src/assets/images/pkg_kerala_backwaters_1793996272596.jpg',
      fallbackGradient: 'from-teal-950 via-stone-900 to-stone-950',
      highlights: [
        'Guided 5-beach coastal cliff trail across Kudle, Om, Half Moon & Paradise Beach',
        'Darshan at Murudeshwar temple & 123-ft Shiva statue overlooking the Arabian Sea',
        'Private country boat ride in Honnavar mangrove backwaters',
      ],
      availableAddOns: [
        {
          id: 'scuba-netrani',
          label: 'Netrani Island Snorkeling & Boat Excursion',
          pricePerPerson: 3200,
          description: 'Clear-water coral reef excursion off Murudeshwar coast',
        },
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Gokarna & Kudle Beach Sunset',
          summary: 'Check in to coastal resort, visit Mahabaleshwar Temple, and relax by Kudle beach cafes.',
        },
        {
          day: 2,
          title: 'Om Beach to Paradise Beach Cliff Trail',
          summary: 'Morning guided coastal hike with boat return and evening beachside bonfire.',
        },
        {
          day: 3,
          title: 'Honnavar Backwaters & Murudeshwar Temple',
          summary: 'Cruise Sharavathi river mangroves and visit the towering Murudeshwar sea shrine.',
        },
        {
          day: 4,
          title: 'Jog Falls Viewpoint & Return Journey',
          summary: 'Morning halt at Jog Falls viewpoint before return departure to Mumbai / Pune.',
        },
      ],
    });
  };

  const durationOptions: number[] = [];
  for (let d = activePackage.minDays; d <= activePackage.maxDays; d++) {
    durationOptions.push(d);
  }

  return (
    <section id="packages" className="py-16 md:py-24 border-b border-stone-200/80">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-amber-900 mb-2">
              01. Curated Departures &amp; Editable Itineraries
            </p>
            <h2
              className="font-display text-2xl md:text-4xl font-semibold text-stone-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Signature Tour Packages Across India &amp; Beyond
            </h2>
            <p className="text-sm md:text-base text-stone-600 mt-2 max-w-[65ch]">
              Browse our departure-ready itineraries or open any package in the Customizer below
              to adjust duration, hotel tier, private transport, and curated local experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openNewPackageCreator}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add Custom Package</span>
            </button>
            <button
              type="button"
              onClick={onResetPackages}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Filter tour packages by category"
            className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg overflow-x-auto"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => onSelectCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-stone-950 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="w-full md:w-72">
            <label htmlFor="package-search-input" className="sr-only">
              Search packages by destination or keyword
            </label>
            <input
              id="package-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kashmir, Kedarnath, Kerala..."
              className="w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-800"
            />
          </div>
        </div>

        {/* Packages Grid */}
        {visiblePackages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
            <p className="text-base font-medium text-stone-800 mb-2">
              No tour packages match your current filter.
            </p>
            <p className="text-xs text-stone-500 mb-4">
              Try clearing your search query or switching to All categories.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-amber-900 transition-colors cursor-pointer"
            >
              Show All Packages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {visiblePackages.map((pkg) => {
              const isCurrentlyActive = pkg.id === activePackage.id;
              return (
                <article
                  key={pkg.id}
                  className={`group flex flex-col justify-between bg-white rounded-xl overflow-hidden border transition-colors ${
                    isCurrentlyActive
                      ? 'border-amber-800 ring-1 ring-amber-800/30'
                      : 'border-stone-200/90 hover:border-stone-300'
                  }`}
                >
                  <div>
                    {/* 4:3 Package Image */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-900">
                      <ResilientImage
                        src={pkg.image}
                        alt={pkg.title}
                        fallbackGradient={pkg.fallbackGradient}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                        <span className="text-xs font-medium text-amber-200">
                          {pkg.region}
                        </span>
                        <span className="font-mono-tabular text-sm font-semibold">
                          {formatINR(pkg.basePricePerPerson)}
                          <span className="text-[11px] font-normal text-stone-300"> / person</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body — Zero-Pill Metadata Discipline */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                        <span>{pkg.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">
                          {pkg.baseDurationDays}D / {pkg.baseDurationDays - 1}N
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Ex-{pkg.departureHubs.slice(0, 2).join(', ')}</span>
                      </div>

                      <h3 className="font-display text-xl font-semibold text-stone-950 leading-snug mb-2">
                        {pkg.title}
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        {pkg.subtitle}
                      </p>

                      <ul className="space-y-1.5 border-t border-stone-100 pt-3 text-xs text-stone-700">
                        {pkg.highlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-800 font-bold" aria-hidden="true">
                              ·
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPackageForCustomization(pkg.id);
                        const el = document.getElementById('customizer');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex-1 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isCurrentlyActive
                          ? 'bg-amber-900 text-white'
                          : 'bg-stone-900 text-white hover:bg-amber-900'
                      }`}
                    >
                      {isCurrentlyActive ? 'Customizing Below' : 'Customize Options'}
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditorForPackage(pkg)}
                      aria-label={`Edit package details for ${pkg.title}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Edit Package</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Interactive Editable Package Studio (#customizer) */}
        <div
          id="customizer"
          className="bg-white rounded-2xl border border-stone-300/90 p-6 md:p-10 scroll-mt-24"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-900 font-medium mb-1">
                <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Interactive Package Option Customizer</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-stone-950">
                Tailor Your Package Options &amp; Live Estimate
              </h3>
              <p className="text-xs md:text-sm text-stone-600 mt-1">
                Use the dropdowns below to switch packages, edit trip duration, upgrade hotel tiers,
                choose private transport, or add custom local experiences.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openEditorForPackage(activePackage)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Edit Package Template</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Dropdown Controls & Editable Add-Ons */}
            <div className="lg:col-span-7 space-y-6">
              {/* Primary Package Selector Dropdown */}
              <div>
                <label
                  htmlFor="studio-package-dropdown"
                  className="block text-xs font-semibold text-stone-800 mb-2"
                >
                  Select Tour Package to Customize
                </label>
                <select
                  id="studio-package-dropdown"
                  value={activePackage.id}
                  onChange={(e) => onSelectPackageForCustomization(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-medium bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-950 focus:outline-none focus:border-amber-800"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} — {pkg.category} (Base: {formatINR(pkg.basePricePerPerson)})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2x3 Grid of Option Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Option 1: Trip Duration Dropdown */}
                <div>
                  <label
                    htmlFor="studio-duration-dropdown"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Trip Duration (Days / Nights)
                  </label>
                  <select
                    id="studio-duration-dropdown"
                    value={customization.durationDays}
                    onChange={(e) =>
                      onUpdateCustomization({ durationDays: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                  >
                    {durationOptions.map((d) => (
                      <option key={d} value={d}>
                        {d} Days / {d - 1} Nights
                        {d === activePackage.baseDurationDays ? ' (Standard)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Option 2: Departure Hub Dropdown */}
                <div>
                  <label
                    htmlFor="studio-departure-dropdown"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Departure City Hub
                  </label>
                  <select
                    id="studio-departure-dropdown"
                    value={customization.departureCity}
                    onChange={(e) =>
                      onUpdateCustomization({ departureCity: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                  >
                    {Array.from(
                      new Set([...activePackage.departureHubs, 'Mumbai', 'Pune', 'Delhi', 'Ahmedabad'])
                    ).map((hub) => (
                      <option key={hub} value={hub}>
                        Ex-{hub} Departure
                      </option>
                    ))}
                  </select>
                </div>

                {/* Option 3: Hotel & Stay Tier Dropdown */}
                <div>
                  <label
                    htmlFor="studio-hotel-dropdown"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Accommodation Tier
                  </label>
                  <select
                    id="studio-hotel-dropdown"
                    value={customization.hotelTier}
                    onChange={(e) =>
                      onUpdateCustomization({ hotelTier: e.target.value as HotelTier })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                  >
                    {(Object.keys(HOTEL_TIER_META) as HotelTier[]).map((tier) => (
                      <option key={tier} value={tier}>
                        {HOTEL_TIER_META[tier].label}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {HOTEL_TIER_META[customization.hotelTier].note}
                  </p>
                </div>

                {/* Option 4: Transport Mode Dropdown */}
                <div>
                  <label
                    htmlFor="studio-transport-dropdown"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Transport &amp; Transfers
                  </label>
                  <select
                    id="studio-transport-dropdown"
                    value={customization.transportMode}
                    onChange={(e) =>
                      onUpdateCustomization({
                        transportMode: e.target.value as TransportMode,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                  >
                    {(Object.keys(TRANSPORT_MODE_META) as TransportMode[]).map((mode) => (
                      <option key={mode} value={mode}>
                        {TRANSPORT_MODE_META[mode].label} (
                        {TRANSPORT_MODE_META[mode].deltaPerPerson === 0
                          ? 'Included'
                          : `+${formatINR(TRANSPORT_MODE_META[mode].deltaPerPerson)}`}
                        )
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {TRANSPORT_MODE_META[customization.transportMode].note}
                  </p>
                </div>

                {/* Option 5: Meal Plan Dropdown */}
                <div>
                  <label
                    htmlFor="studio-meal-dropdown"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Dining &amp; Meal Plan
                  </label>
                  <select
                    id="studio-meal-dropdown"
                    value={customization.mealPlan}
                    onChange={(e) =>
                      onUpdateCustomization({ mealPlan: e.target.value as MealPlan })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                  >
                    {(Object.keys(MEAL_PLAN_META) as MealPlan[]).map((plan) => (
                      <option key={plan} value={plan}>
                        {MEAL_PLAN_META[plan].label} (
                        {MEAL_PLAN_META[plan].deltaPerDay === 0
                          ? 'Included'
                          : `+${formatINR(MEAL_PLAN_META[plan].deltaPerDay)}/day`}
                        )
                      </option>
                    ))}
                  </select>
                </div>

                {/* Option 6: Travelers Count Input / Stepper */}
                <div>
                  <label
                    htmlFor="studio-travelers-input"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Number of Travelers
                  </label>
                  <input
                    id="studio-travelers-input"
                    type="number"
                    min={1}
                    max={40}
                    value={customization.travelersCount}
                    onChange={(e) =>
                      onUpdateCustomization({
                        travelersCount: Math.max(1, Math.min(40, Number(e.target.value) || 1)),
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    {customization.travelersCount >= 10
                      ? '8% Group Departure Discount Applied'
                      : customization.travelersCount >= 6
                      ? '5% Small Group Discount Applied'
                      : 'Add 6+ travelers for 5% group savings'}
                  </p>
                </div>
              </div>

              {/* Curated Experience Add-Ons + Custom Add-On Creator */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-stone-900">
                    Optional Experiences &amp; Upgrades ({activePackage.availableAddOns.length})
                  </span>
                  <span className="text-xs text-stone-500">
                    Select to include in your package
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  {activePackage.availableAddOns.map((addon) => {
                    const isChecked = customization.selectedAddOnIds.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start justify-between gap-4 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-amber-50/50 border-amber-800'
                            : 'bg-[#FAF8F5] border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleAddOn(addon.id)}
                            className="mt-1 h-4 w-4 accent-amber-900 rounded"
                          />
                          <div>
                            <p className="text-xs font-semibold text-stone-900">
                              {addon.label}
                            </p>
                            <p className="text-[11px] text-stone-600 mt-0.5">
                              {addon.description}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono-tabular text-xs font-semibold text-stone-900 whitespace-nowrap shrink-0">
                          +{formatINR(addon.pricePerPerson)}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Inline Add Custom Option Form */}
                <form
                  onSubmit={handleAddCustomActivityToPackage}
                  className="flex flex-col sm:flex-row gap-2.5 pt-2"
                >
                  <div className="flex-1">
                    <label htmlFor="custom-addon-title" className="sr-only">
                      Custom activity or special upgrade name
                    </label>
                    <input
                      id="custom-addon-title"
                      type="text"
                      value={customAddonTitle}
                      onChange={(e) => setCustomAddonTitle(e.target.value)}
                      placeholder="Add custom option (e.g. Professional Drone Shoot, Local Guide)..."
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label htmlFor="custom-addon-price" className="sr-only">
                      Estimated cost per person in INR
                    </label>
                    <input
                      id="custom-addon-price"
                      type="number"
                      min={0}
                      step={100}
                      value={customAddonPrice}
                      onChange={(e) => setCustomAddonPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    + Add Option
                  </button>
                </form>
              </div>
            </div>

            {/* Right 5 Columns: Live Price Breakdown & Day-by-Day Itinerary */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAF8F5] rounded-xl p-6 border border-stone-200/90">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-200">
                  <div>
                    <p className="text-xs text-stone-500">Selected Package</p>
                    <h4 className="font-display text-lg font-semibold text-stone-950">
                      {activePackage.title}
                    </h4>
                  </div>
                  <span className="font-mono-tabular text-xs text-stone-600 whitespace-nowrap shrink-0">
                    {customization.durationDays}D / {customization.durationDays - 1}N
                  </span>
                </div>

                {/* Price Breakdown Table */}
                <dl className="space-y-2.5 text-xs border-b border-stone-200 pb-4 mb-5">
                  <div className="flex justify-between text-stone-600">
                    <dt>
                      Duration-Adjusted Base ({customization.durationDays} Days)
                    </dt>
                    <dd className="font-mono-tabular font-medium text-stone-900">
                      {formatINR(priceBreakdown.durationAdjustedBase)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <dt>{HOTEL_TIER_META[customization.hotelTier].label}</dt>
                    <dd className="font-mono-tabular font-medium text-stone-900">
                      {formatINR(priceBreakdown.hotelTierTotalPerPerson)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <dt>{TRANSPORT_MODE_META[customization.transportMode].label}</dt>
                    <dd className="font-mono-tabular font-medium text-stone-900">
                      {priceBreakdown.transportDeltaPerPerson === 0
                        ? 'Included'
                        : `+${formatINR(priceBreakdown.transportDeltaPerPerson)}`}
                    </dd>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <dt>{MEAL_PLAN_META[customization.mealPlan].label}</dt>
                    <dd className="font-mono-tabular font-medium text-stone-900">
                      {priceBreakdown.mealPlanTotalPerPerson === 0
                        ? 'Included'
                        : `+${formatINR(priceBreakdown.mealPlanTotalPerPerson)}`}
                    </dd>
                  </div>
                  {priceBreakdown.addOnsPerPerson > 0 && (
                    <div className="flex justify-between text-amber-900 font-medium">
                      <dt>
                        Selected Experience Add-Ons ({customization.selectedAddOnIds.length})
                      </dt>
                      <dd className="font-mono-tabular">
                        +{formatINR(priceBreakdown.addOnsPerPerson)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-stone-200/80 text-sm font-semibold text-stone-950">
                    <dt>Customized Rate Per Traveler</dt>
                    <dd className="font-mono-tabular">
                      {formatINR(priceBreakdown.perPersonPrice)}
                    </dd>
                  </div>
                  {priceBreakdown.groupDiscountPercent > 0 && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <dt>
                        Group Savings ({priceBreakdown.groupDiscountPercent}% for{' '}
                        {customization.travelersCount} Travelers)
                      </dt>
                      <dd className="font-mono-tabular">
                        -{formatINR(priceBreakdown.groupDiscountAmount)}
                      </dd>
                    </div>
                  )}
                </dl>

                {/* Day-by-Day Itinerary Preview */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-stone-900">
                      Itinerary Outline ({activePackage.itinerary.length} Core Days)
                    </span>
                    <button
                      type="button"
                      onClick={() => openEditorForPackage(activePackage)}
                      className="text-xs font-medium text-amber-900 hover:underline cursor-pointer"
                    >
                      Edit Days
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {activePackage.itinerary.map((dayItem) => (
                      <div
                        key={dayItem.day}
                        className="p-2.5 bg-white rounded-lg border border-stone-200/80 text-xs"
                      >
                        <p className="font-semibold text-stone-900">
                          Day {dayItem.day}: {dayItem.title}
                        </p>
                        <p className="text-stone-600 text-[11px] mt-0.5 leading-relaxed">
                          {dayItem.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & Proceed CTA */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-stone-500 block">
                      Estimated Total ({customization.travelersCount}{' '}
                      {customization.travelersCount === 1 ? 'Traveler' : 'Travelers'} · Ex-
                      {customization.departureCity})
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Includes GST &amp; on-ground tour coordinator
                    </span>
                  </div>
                  <span
                    data-testid="customizer-total-price"
                    className="font-mono-tabular text-2xl font-bold text-stone-950"
                  >
                    {formatINR(priceBreakdown.totalGroupPrice)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onProceedToBooking}
                  className="w-full py-3.5 px-5 text-sm font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Apply Customized Package to Booking Inquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Package Template or Creating a New Package */}
      {editingPackage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-edit-pkg-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200">
              <div>
                <h3
                  id="modal-edit-pkg-title"
                  className="font-display text-xl font-semibold text-stone-950"
                >
                  {isCreatingNew ? 'Create New Editable Tour Package' : 'Edit Package Template'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Changes update the package dropdowns, cards, and pricing calculator immediately.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                aria-label="Close package editor"
                className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSaveEditedPackage(editingPackage, isCreatingNew);
                setEditingPackage(null);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="edit-pkg-title"
                    className="block text-xs font-medium text-stone-700 mb-1"
                  >
                    Package Title
                  </label>
                  <input
                    id="edit-pkg-title"
                    type="text"
                    required
                    value={editingPackage.title}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="edit-pkg-subtitle"
                    className="block text-xs font-medium text-stone-700 mb-1"
                  >
                    Subtitle / Key Route Description
                  </label>
                  <input
                    id="edit-pkg-subtitle"
                    type="text"
                    required
                    value={editingPackage.subtitle}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, subtitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-pkg-category"
                    className="block text-xs font-medium text-stone-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="edit-pkg-category"
                    value={editingPackage.category}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        category: e.target.value as Exclude<PackageCategory, 'All'>,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="edit-pkg-region"
                    className="block text-xs font-medium text-stone-700 mb-1"
                  >
                    Destinations Covered
                  </label>
                  <input
                    id="edit-pkg-region"
                    type="text"
                    required
                    value={editingPackage.region}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, region: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-pkg-price"
                    className="block text-xs font-medium text-stone-700 mb-1"
                  >
                    Base Price Per Person (INR)
                  </label>
                  <input
                    id="edit-pkg-price"
                    type="number"
                    min={3000}
                    step={500}
                    required
                    value={editingPackage.basePricePerPerson}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        basePricePerPerson: Math.max(3000, Number(e.target.value) || 10000),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm font-mono-tabular bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-pkg-days"
                    className="block text-xs font-medium text-stone-700 mb-1"
                  >
                    Standard Duration (Days)
                  </label>
                  <input
                    id="edit-pkg-days"
                    type="number"
                    min={2}
                    max={21}
                    required
                    value={editingPackage.baseDurationDays}
                    onChange={(e) => {
                      const days = Math.max(2, Math.min(21, Number(e.target.value) || 5));
                      setEditingPackage({
                        ...editingPackage,
                        baseDurationDays: days,
                        minDays: Math.max(2, days - 2),
                        maxDays: days + 4,
                      });
                    }}
                    className="w-full px-3.5 py-2 text-sm font-mono-tabular bg-[#FAF8F5] border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Editable Itinerary Days */}
              <div className="pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-800">
                    Day-by-Day Itinerary ({editingPackage.itinerary.length} Days)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingPackage({
                        ...editingPackage,
                        itinerary: [
                          ...editingPackage.itinerary,
                          {
                            day: editingPackage.itinerary.length + 1,
                            title: 'Additional Exploration & Leisure Day',
                            summary: 'Guided local sightseeing and curated cultural experiences.',
                          },
                        ],
                      })
                    }
                    className="text-xs font-semibold text-amber-900 hover:underline cursor-pointer"
                  >
                    + Add Day
                  </button>
                </div>

                <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                  {editingPackage.itinerary.map((dayObj, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FAF8F5] rounded-lg border border-stone-200 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-tabular font-semibold text-stone-600">
                          Day {dayObj.day}:
                        </span>
                        <input
                          type="text"
                          aria-label={`Day ${dayObj.day} title`}
                          value={dayObj.title}
                          onChange={(e) => {
                            const nextItinerary = [...editingPackage.itinerary];
                            nextItinerary[idx] = { ...dayObj, title: e.target.value };
                            setEditingPackage({ ...editingPackage, itinerary: nextItinerary });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs bg-white border border-stone-300 rounded"
                        />
                      </div>
                      <input
                        type="text"
                        aria-label={`Day ${dayObj.day} summary`}
                        value={dayObj.summary}
                        onChange={(e) => {
                          const nextItinerary = [...editingPackage.itinerary];
                          nextItinerary[idx] = { ...dayObj, summary: e.target.value };
                          setEditingPackage({ ...editingPackage, itinerary: nextItinerary });
                        }}
                        className="w-full px-2.5 py-1 text-xs text-stone-600 bg-white border border-stone-200 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg cursor-pointer"
                >
                  {isCreatingNew ? 'Create & Select Package' : 'Save Package Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
