/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  BookingInquiry,
  INITIAL_PACKAGES,
  INITIAL_TESTIMONIALS,
  PackageCategory,
  PackageCustomization,
  TestimonialItem,
  TourPackage,
} from './data/travelData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PackagesStudio } from './components/PackagesStudio';
import { ExpeditionGallery } from './components/ExpeditionGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingInquirySection } from './components/BookingInquirySection';
import { Footer } from './components/Footer';

const STORAGE_KEYS = {
  PACKAGES: 'samyati_packages_v1',
  INQUIRIES: 'samyati_inquiries_v1',
  TESTIMONIALS: 'samyati_testimonials_v1',
};

export default function App() {
  const [packages, setPackages] = useState<TourPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_PACKAGES;
  });

  const [selectedCategory, setSelectedCategory] = useState<PackageCategory>('All');

  const [customization, setCustomization] = useState<PackageCustomization>(() => {
    const firstPkg = INITIAL_PACKAGES[0];
    return {
      packageId: firstPkg.id,
      durationDays: firstPkg.baseDurationDays,
      hotelTier: 'boutique-4',
      transportMode: 'private-suv',
      mealPlan: 'map-halfboard',
      selectedAddOnIds: [firstPkg.availableAddOns[0]?.id].filter(Boolean) as string[],
      travelersCount: 4,
      departureCity: 'Mumbai',
    };
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_TESTIMONIALS;
  });

  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'SAM-849210',
        fullName: 'Aarav & Snehal Deshmukh',
        email: 'aarav.deshmukh@example.com',
        phone: '+91 98220 41892',
        departureCity: 'Pune',
        packageId: 'kashmir-shikara-alpine',
        packageTitle: 'Kashmir Valley, Gulmarg & Pahalgam Odyssey',
        durationDays: 6,
        hotelTier: 'boutique-4',
        transportMode: 'private-suv',
        mealPlan: 'map-halfboard',
        selectedAddOns: ['Gulmarg Gondola Phase 1 & 2 Priority Pass'],
        travelDate: '2026-11-24',
        travelersCount: 4,
        estimatedTotalINR: 171520,
        specialRequests: 'Prefer lake-facing rooms in Srinagar houseboat',
        createdAt: '6 Nov 2026',
        status: 'Received — Advisor Assigned',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    } catch {
      // ignore
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch {
      // ignore
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  }, [inquiries]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkgId: string) => {
    const target = packages.find((p) => p.id === pkgId);
    if (!target) return;
    setCustomization((prev) => ({
      ...prev,
      packageId: target.id,
      durationDays: target.baseDurationDays,
      selectedAddOnIds: target.availableAddOns.length > 0 ? [target.availableAddOns[0].id] : [],
      departureCity: target.departureHubs.includes(prev.departureCity)
        ? prev.departureCity
        : target.departureHubs[0] || 'Mumbai',
    }));
  };

  const handleUpdateCustomization = (next: Partial<PackageCustomization>) => {
    setCustomization((prev) => ({ ...prev, ...next }));
  };

  const handleSaveEditedPackage = (updatedPkg: TourPackage, isNew: boolean) => {
    if (isNew) {
      setPackages((prev) => [updatedPkg, ...prev]);
    } else {
      setPackages((prev) =>
        prev.map((pkg) => (pkg.id === updatedPkg.id ? updatedPkg : pkg))
      );
    }
    setCustomization((prev) => ({
      ...prev,
      packageId: updatedPkg.id,
      durationDays: updatedPkg.baseDurationDays,
    }));
  };

  const handleResetPackages = () => {
    setPackages(INITIAL_PACKAGES);
    const first = INITIAL_PACKAGES[0];
    setCustomization({
      packageId: first.id,
      durationDays: first.baseDurationDays,
      hotelTier: 'boutique-4',
      transportMode: 'private-suv',
      mealPlan: 'map-halfboard',
      selectedAddOnIds: [first.availableAddOns[0]?.id].filter(Boolean) as string[],
      travelersCount: 4,
      departureCity: 'Mumbai',
    });
    setSelectedCategory('All');
  };

  const handleSelectPackageFromGallery = (pkgId: string) => {
    handleSelectPackage(pkgId);
    scrollToSection('booking-inquiry');
  };

  const handleAddTestimonial = (newReview: TestimonialItem) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const handleSubmitInquiry = (inquiry: BookingInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      <Header onNavigate={scrollToSection} />

      <main className="flex-1">
        <HeroSection
          packages={packages}
          selectedCategory={selectedCategory}
          selectedPackageId={customization.packageId}
          selectedHotelTier={customization.hotelTier}
          travelersCount={customization.travelersCount}
          onSelectCategory={setSelectedCategory}
          onSelectPackageId={handleSelectPackage}
          onSelectHotelTier={(tier) => handleUpdateCustomization({ hotelTier: tier })}
          onChangeTravelers={(count) =>
            handleUpdateCustomization({ travelersCount: count })
          }
          onJumpToCustomizer={() => scrollToSection('customizer')}
          onJumpToInquiry={() => scrollToSection('booking-inquiry')}
        />

        <PackagesStudio
          packages={packages}
          selectedCategory={selectedCategory}
          customization={customization}
          onSelectCategory={setSelectedCategory}
          onUpdateCustomization={handleUpdateCustomization}
          onSelectPackageForCustomization={handleSelectPackage}
          onSaveEditedPackage={handleSaveEditedPackage}
          onResetPackages={handleResetPackages}
          onProceedToBooking={() => scrollToSection('booking-inquiry')}
        />

        <ExpeditionGallery
          onSelectPackageFromGallery={handleSelectPackageFromGallery}
        />

        <TestimonialsSection
          testimonials={testimonials}
          packageTitles={packages.map((p) => p.title)}
          onAddTestimonial={handleAddTestimonial}
        />

        <BookingInquirySection
          packages={packages}
          customization={customization}
          inquiries={inquiries}
          onUpdateCustomization={handleUpdateCustomization}
          onSelectPackageForCustomization={handleSelectPackage}
          onSubmitInquiry={handleSubmitInquiry}
          onDeleteInquiry={handleDeleteInquiry}
        />
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
