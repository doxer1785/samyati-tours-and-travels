import React, { useState } from 'react';
import { MessageSquarePlus, Star } from 'lucide-react';
import { TestimonialItem } from '../data/travelData';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  packageTitles: string[];
  onAddTestimonial: (newReview: TestimonialItem) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  packageTitles,
  onAddTestimonial,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [travelerName, setTravelerName] = useState('');
  const [roleAndCity, setRoleAndCity] = useState('');
  const [tripTaken, setTripTaken] = useState(packageTitles[0] || 'Kashmir Valley Odyssey');
  const [groupType, setGroupType] = useState('Family Departure');
  const [quote, setQuote] = useState('');
  const [outcomeHighlight, setOutcomeHighlight] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (travelerName.trim().length < 2 || quote.trim().length < 10) {
      setFormError('Please provide your name and a brief story (at least 10 characters).');
      return;
    }

    const newEntry: TestimonialItem = {
      id: `test-${Date.now()}`,
      travelerName: travelerName.trim(),
      roleAndCity: roleAndCity.trim() || 'Verified Traveler · Mumbai',
      tripTaken,
      travelDate: 'Nov 2026',
      groupType,
      quote: quote.trim(),
      outcomeHighlight:
        outcomeHighlight.trim() || 'Seamless end-to-end itinerary & verified stays',
      rating: 5,
    };

    onAddTestimonial(newEntry);
    setTravelerName('');
    setRoleAndCity('');
    setQuote('');
    setOutcomeHighlight('');
    setFormError('');
    setShowAddForm(false);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 border-b border-stone-200/80">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-medium text-amber-900 mb-2">
              03. Verified Traveler Stories &amp; Batch Outcomes
            </p>
            <h2
              className="font-display text-2xl md:text-4xl font-semibold text-stone-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Trusted by Families, Senior Yatris &amp; Corporate Groups
            </h2>
            <p className="text-sm md:text-base text-stone-600 mt-2 max-w-[65ch]">
              Read firsthand accounts from travelers across Mumbai, Pune, Thane, and Nashik
              who customized their itineraries with Samyati Tours &amp; Travels.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{showAddForm ? 'Close Review Form' : 'Share Your Travel Story'}</span>
          </button>
        </div>

        {/* Collapsible Add Review Form */}
        {showAddForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-12 p-6 md:p-8 bg-white rounded-xl border border-stone-300 space-y-4"
          >
            <h3 className="font-display text-lg font-semibold text-stone-950">
              Submit Your Samyati Travel Experience
            </h3>
            {formError && (
              <p role="alert" className="text-xs font-medium text-red-700">
                {formError}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Your Full Name *
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={travelerName}
                  onChange={(e) => setTravelerName(e.target.value)}
                  placeholder="e.g. Aditi & Pranav Deshpande"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="review-city"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Profession &amp; City
                </label>
                <input
                  id="review-city"
                  type="text"
                  value={roleAndCity}
                  onChange={(e) => setRoleAndCity(e.target.value)}
                  placeholder="e.g. Family Group · Kothrud, Pune"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="review-package"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Tour Package Completed
                </label>
                <select
                  id="review-package"
                  value={tripTaken}
                  onChange={(e) => setTripTaken(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                >
                  {packageTitles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="review-group-type"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Traveler Type
                </label>
                <input
                  id="review-group-type"
                  type="text"
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  placeholder="e.g. Private Couple / Senior Yatra"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="review-outcome"
                  className="block text-xs font-medium text-stone-700 mb-1"
                >
                  Key Trip Outcome Highlight
                </label>
                <input
                  id="review-outcome"
                  type="text"
                  value={outcomeHighlight}
                  onChange={(e) => setOutcomeHighlight(e.target.value)}
                  placeholder="e.g. Smooth VIP Darshan & 4-star heated stays"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="review-quote"
                className="block text-xs font-medium text-stone-700 mb-1"
              >
                Your Review *
              </label>
              <textarea
                id="review-quote"
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Share how the itinerary, stays, and tour manager performed..."
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 bg-stone-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg cursor-pointer"
              >
                Publish Story
              </button>
            </div>
          </form>
        )}

        {/* Testimonials 2-Column Editorial Grid (No thick left accent borders, zero-pill metadata) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="p-6 md:p-8 bg-white rounded-xl border border-stone-200/90 flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed metadata header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 pb-4 mb-4 border-b border-stone-100">
                  <div>
                    <span className="font-medium text-amber-900">{item.tripTaken}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      {' · '}
                    </span>
                    <span>{item.travelDate}</span>
                  </div>
                  <div
                    className="flex items-center gap-0.5 text-amber-700"
                    aria-label={`Rated ${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-600 text-amber-600"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm md:text-base text-stone-800 leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div>
                {/* Concrete Outcome Statement */}
                <p className="text-xs font-medium text-stone-700 bg-[#FAF8F5] px-3.5 py-2.5 rounded-lg border border-stone-200/80 mb-4">
                  Outcome: {item.outcomeHighlight}
                </p>

                {/* Attributable Traveler Details */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-stone-950">{item.travelerName}</p>
                    <p className="text-stone-500 mt-0.5">{item.roleAndCity}</p>
                  </div>
                  <span className="text-stone-400">{item.groupType}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
