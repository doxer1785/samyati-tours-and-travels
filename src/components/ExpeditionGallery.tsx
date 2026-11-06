import React, { useState } from 'react';
import { ExternalLink, Maximize2, X } from 'lucide-react';
import {
  GALLERY_ITEMS,
  GalleryItem,
  PackageCategory,
} from '../data/travelData';
import { ResilientImage } from './ResilientImage';

interface ExpeditionGalleryProps {
  onSelectPackageFromGallery: (packageId: string) => void;
}

const GALLERY_FILTERS: PackageCategory[] = [
  'All',
  'Himalayan & Ladakh',
  'Coastal & Backwaters',
  'Royal Heritage',
  'International Escapes',
];

export const ExpeditionGallery: React.FC<ExpeditionGalleryProps> = ({
  onSelectPackageFromGallery,
}) => {
  const [activeFilter, setActiveFilter] = useState<PackageCategory>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredPhotos =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-16 md:py-24 border-b border-stone-200/80">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-amber-900 mb-2">
              02. Visual Field Dispatches &amp; Real Departures
            </p>
            <h2
              className="font-display text-2xl md:text-4xl font-semibold text-stone-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Moments From Our Recent Group &amp; Private Journeys
            </h2>
            <p className="text-sm md:text-base text-stone-600 mt-2 max-w-[65ch]">
              Every photograph reflects the actual routes, heritage houseboats, and mountain
              passes experienced by Samyati travelers. Follow daily batch stories on Instagram.
            </p>
          </div>

          <a
            href="https://www.instagram.com/samyati_travel/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto"
          >
            <span>Follow @samyati_travel</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
          </a>
        </div>

        {/* Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter gallery by destination region"
          className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg overflow-x-auto w-fit max-w-full mb-8"
        >
          {GALLERY_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-stone-950 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Bento Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-xl overflow-hidden border border-stone-200/90 bg-stone-900 min-h-[290px] md:min-h-[340px] flex flex-col justify-end ${
                activeFilter === 'All' ? item.aspectClass : 'md:col-span-1'
              }`}
            >
              <ResilientImage
                src={item.image}
                alt={`${item.title} — ${item.location}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10 p-6 text-white flex items-end justify-between gap-4">
                <div>
                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs text-amber-200/95 mb-1">
                    <span>{item.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.capturedDuring}</span>
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-2 max-w-xl">
                    {item.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(item)}
                  aria-label={`Inspect photograph: ${item.title}`}
                  className="p-2.5 bg-white/15 hover:bg-white text-white hover:text-stone-950 rounded-lg backdrop-blur-xs transition-colors shrink-0 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-photo-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full border border-stone-200 shadow-2xl">
            <div className="relative aspect-16/9 w-full bg-stone-950">
              <ResilientImage
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close gallery lightbox"
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span>{selectedPhoto.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPhoto.capturedDuring}</span>
                </div>
                <h3
                  id="lightbox-photo-title"
                  className="font-display text-2xl font-semibold text-stone-950"
                >
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-stone-600 mt-2 max-w-xl">
                  {selectedPhoto.caption}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const pkgId = selectedPhoto.linkedPackageId;
                    setSelectedPhoto(null);
                    onSelectPackageFromGallery(pkgId);
                  }}
                  className="px-5 py-3 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Book This Destination
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
