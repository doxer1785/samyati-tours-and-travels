import React, { useState } from 'react';
import { CheckCircle2, Send, Trash2 } from 'lucide-react';
import {
  BookingInquiry,
  HotelTier,
  HOTEL_TIER_META,
  MealPlan,
  MEAL_PLAN_META,
  PackageCustomization,
  TourPackage,
  TransportMode,
  TRANSPORT_MODE_META,
} from '../data/travelData';
import {
  calculateCustomPackagePrice,
  createBookingInquiryRecord,
  formatINR,
  InquiryValidationErrors,
  validateBookingInquiry,
} from '../utils/packageLogic';

interface BookingInquirySectionProps {
  packages: TourPackage[];
  customization: PackageCustomization;
  inquiries: BookingInquiry[];
  onUpdateCustomization: (next: Partial<PackageCustomization>) => void;
  onSelectPackageForCustomization: (pkgId: string) => void;
  onSubmitInquiry: (inquiry: BookingInquiry) => void;
  onDeleteInquiry: (id: string) => void;
}

export const BookingInquirySection: React.FC<BookingInquirySectionProps> = ({
  packages,
  customization,
  inquiries,
  onUpdateCustomization,
  onSelectPackageForCustomization,
  onSubmitInquiry,
  onDeleteInquiry,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('2026-12-12');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  const activePackage =
    packages.find((p) => p.id === customization.packageId) || packages[0];

  const priceBreakdown = calculateCustomPackagePrice(activePackage, customization);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBookingInquiry({
      fullName,
      email,
      phone,
      departureCity: customization.departureCity,
      packageId: activePackage.id,
      travelDate,
      travelersCount: customization.travelersCount,
      specialRequests,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setLastSubmittedId(null);
      return;
    }

    setErrors({});
    const record = createBookingInquiryRecord(
      {
        fullName,
        email,
        phone,
        departureCity: customization.departureCity,
        packageId: activePackage.id,
        travelDate,
        travelersCount: customization.travelersCount,
        specialRequests,
      },
      activePackage,
      customization
    );

    onSubmitInquiry(record);
    setLastSubmittedId(record.id);
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    const sectionEl = document.getElementById('booking-inquiry');
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="booking-inquiry" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Custom Booking Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-300/90 p-6 md:p-10">
            <p className="text-xs font-medium text-amber-900 mb-2">
              04. Direct Itinerary &amp; Custom Booking Inquiry
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-stone-950 tracking-tight mb-2">
              Request Your Custom Quote &amp; Day-Wise Proposal
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mb-8">
              Your customized package options are synced below. Adjust any dropdown or enter
              your travel details to receive a confirmed itinerary and hotel list from our
              Mumbai &amp; Pune desk.
            </p>

            {lastSubmittedId && (
              <div
                role="status"
                className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-950"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-sm">
                    Booking Inquiry Confirmed ({lastSubmittedId})
                  </p>
                  <p className="text-emerald-800 mt-0.5">
                    Your customized itinerary request has been logged in the Live Queue. A
                    dedicated Samyati Tours advisor will reach out via WhatsApp and email
                    within 2 hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
              {/* Row 1: Traveler Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-fullname"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="inquiry-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="e.g. Rajeshwari Kulkarni"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border rounded-lg text-stone-900 focus:outline-none ${
                      errors.fullName
                        ? 'border-red-600 focus:border-red-700'
                        : 'border-stone-300 focus:border-amber-800'
                    }`}
                  />
                  {errors.fullName && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="+91 98201 54321"
                    className={`w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF8F5] border rounded-lg text-stone-900 focus:outline-none ${
                      errors.phone
                        ? 'border-red-600 focus:border-red-700'
                        : 'border-stone-300 focus:border-amber-800'
                    }`}
                  />
                  {errors.phone && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Departure City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="traveler@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border rounded-lg text-stone-900 focus:outline-none ${
                      errors.email
                        ? 'border-red-600 focus:border-red-700'
                        : 'border-stone-300 focus:border-amber-800'
                    }`}
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-departure"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Preferred Departure City
                  </label>
                  <select
                    id="inquiry-departure"
                    value={customization.departureCity}
                    onChange={(e) =>
                      onUpdateCustomization({ departureCity: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                  >
                    {['Mumbai', 'Pune', 'Thane / Navi Mumbai', 'Nashik', 'Ahmedabad', 'Delhi', 'Bengaluru'].map(
                      (city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Row 3: Package Dropdown Selection */}
              <div>
                <label
                  htmlFor="inquiry-package-select"
                  className="block text-xs font-medium text-stone-800 mb-1.5"
                >
                  Selected Tour Package (Editable Options) *
                </label>
                <select
                  id="inquiry-package-select"
                  value={activePackage.id}
                  onChange={(e) => onSelectPackageForCustomization(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-medium bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-950 focus:outline-none focus:border-amber-800"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title} ({pkg.region})
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Editable Package Options Inside Form (Spacious 2-Column + Full-Width Layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label
                    htmlFor="inquiry-hotel-tier"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Stay Tier Option
                  </label>
                  <select
                    id="inquiry-hotel-tier"
                    value={customization.hotelTier}
                    onChange={(e) =>
                      onUpdateCustomization({ hotelTier: e.target.value as HotelTier })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900"
                  >
                    {(Object.keys(HOTEL_TIER_META) as HotelTier[]).map((t) => (
                      <option key={t} value={t}>
                        {HOTEL_TIER_META[t].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-meal-plan"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Meal Plan Option
                  </label>
                  <select
                    id="inquiry-meal-plan"
                    value={customization.mealPlan}
                    onChange={(e) =>
                      onUpdateCustomization({ mealPlan: e.target.value as MealPlan })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900"
                  >
                    {(Object.keys(MEAL_PLAN_META) as MealPlan[]).map((mp) => (
                      <option key={mp} value={mp}>
                        {MEAL_PLAN_META[mp].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="inquiry-transport-mode"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Transport &amp; Transfer Option
                  </label>
                  <select
                    id="inquiry-transport-mode"
                    value={customization.transportMode}
                    onChange={(e) =>
                      onUpdateCustomization({
                        transportMode: e.target.value as TransportMode,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900"
                  >
                    {(Object.keys(TRANSPORT_MODE_META) as TransportMode[]).map((m) => (
                      <option key={m} value={m}>
                        {TRANSPORT_MODE_META[m].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Travel Date, Duration & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-date"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Preferred Travel Date *
                  </label>
                  <input
                    id="inquiry-date"
                    type="date"
                    value={travelDate}
                    onChange={(e) => {
                      setTravelDate(e.target.value);
                      if (errors.travelDate) setErrors({ ...errors, travelDate: undefined });
                    }}
                    className={`w-full px-3.5 py-2 text-sm font-mono-tabular bg-[#FAF8F5] border rounded-lg text-stone-900 ${
                      errors.travelDate ? 'border-red-600' : 'border-stone-300'
                    }`}
                  />
                  {errors.travelDate && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.travelDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="inquiry-duration"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Duration (Days)
                  </label>
                  <input
                    id="inquiry-duration"
                    type="number"
                    min={activePackage.minDays}
                    max={activePackage.maxDays}
                    value={customization.durationDays}
                    onChange={(e) =>
                      onUpdateCustomization({
                        durationDays: Math.max(
                          activePackage.minDays,
                          Math.min(activePackage.maxDays, Number(e.target.value) || activePackage.baseDurationDays)
                        ),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm font-mono-tabular bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-travelers"
                    className="block text-xs font-medium text-stone-800 mb-1.5"
                  >
                    Number of Travelers *
                  </label>
                  <input
                    id="inquiry-travelers"
                    type="number"
                    min={1}
                    max={50}
                    value={customization.travelersCount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onUpdateCustomization({ travelersCount: val });
                      if (errors.travelersCount)
                        setErrors({ ...errors, travelersCount: undefined });
                    }}
                    className={`w-full px-3.5 py-2 text-sm font-mono-tabular bg-[#FAF8F5] border rounded-lg text-stone-900 ${
                      errors.travelersCount ? 'border-red-600' : 'border-stone-300'
                    }`}
                  />
                  {errors.travelersCount && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.travelersCount}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 6: Special Requests */}
              <div>
                <label
                  htmlFor="inquiry-requests"
                  className="block text-xs font-medium text-stone-800 mb-1.5"
                >
                  Custom Itinerary Notes / Senior Citizen or Dietary Preferences
                </label>
                <textarea
                  id="inquiry-requests"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Tell us about Jain/Pure Veg meal requirements, senior citizen ground-floor rooms, celebration cake, or custom sightseeing detours..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-800"
                />
              </div>

              {/* Live Price Bar & Submit */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-500 block">
                    Estimated Customized Total ({customization.travelersCount}{' '}
                    {customization.travelersCount === 1 ? 'Traveler' : 'Travelers'})
                  </span>
                  <span className="font-mono-tabular text-xl font-bold text-stone-950">
                    {formatINR(priceBreakdown.totalGroupPrice)}
                  </span>
                  <span className="text-xs text-stone-500 ml-2">
                    ({formatINR(priceBreakdown.perPersonPrice)} / person)
                  </span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Submit Custom Booking Inquiry</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right 5 Columns: Submitted Inquiries Tracker & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 md:p-8">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
                <h3 className="font-display text-xl font-semibold text-stone-950">
                  Your Submitted Booking Inquiries ({inquiries.length})
                </h3>
                <span className="text-xs text-stone-500 font-mono-tabular">
                  Live Queue
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm font-medium text-stone-700">
                    No inquiries submitted in this session yet.
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Configure your package options and submit the form to generate an instant
                    booking reference.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      data-testid="submitted-inquiry-card"
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/90 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono-tabular font-semibold text-amber-900">
                          Ref: {inq.id}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-800 font-medium">
                            {inq.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => onDeleteInquiry(inq.id)}
                            aria-label={`Remove inquiry ${inq.id}`}
                            className="p-1 text-stone-400 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="font-display text-sm font-semibold text-stone-950">
                        {inq.packageTitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 text-stone-600">
                        <span>{inq.fullName}</span>
                        <span aria-hidden="true">·</span>
                        <span>Ex-{inq.departureCity}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{inq.durationDays} Days</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">
                          {inq.travelersCount}{' '}
                          {inq.travelersCount === 1 ? 'Traveler' : 'Travelers'}
                        </span>
                      </div>

                      <div className="text-stone-600">
                        <span>{HOTEL_TIER_META[inq.hotelTier].label}</span>
                        <span className="mx-1.5" aria-hidden="true">
                          {' · '}
                        </span>
                        <span>{TRANSPORT_MODE_META[inq.transportMode].label}</span>
                      </div>

                      {inq.selectedAddOns.length > 0 && (
                        <p className="text-stone-600">
                          Add-Ons: {inq.selectedAddOns.join(', ')}
                        </p>
                      )}

                      {inq.specialRequests && (
                        <p className="text-stone-500 italic">
                          &ldquo;{inq.specialRequests}&rdquo;
                        </p>
                      )}

                      <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                        <span className="text-stone-500">
                          Departure: <span className="font-mono-tabular">{inq.travelDate}</span>
                        </span>
                        <span className="font-mono-tabular text-sm font-bold text-stone-950">
                          {formatINR(inq.estimatedTotalINR)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Travel Desk Info */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 md:p-8 space-y-4">
              <h3 className="font-display text-xl font-semibold text-white">
                Samyati Tours &amp; Travels Desk
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Whether you are planning a 15-member family Kedarnath Yatra, a corporate
                Ladakh convoy, or a private honeymoon in Kerala or Bali, our travel planners
                customize every halt to your budget.
              </p>
              <div className="space-y-2 text-xs pt-2 border-t border-stone-800">
                <p className="flex justify-between">
                  <span className="text-stone-400">Primary Departure Hubs</span>
                  <span className="font-medium text-white">Mumbai · Pune · Thane · Delhi</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-stone-400">Consultation Hours</span>
                  <span className="font-mono-tabular text-white">09:00 AM – 09:30 PM IST</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-stone-400">Official Instagram</span>
                  <a
                    href="https://www.instagram.com/samyati_travel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline font-medium"
                  >
                    @samyati_travel
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
