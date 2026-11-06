import {
  BookingInquiry,
  HOTEL_TIER_META,
  MEAL_PLAN_META,
  PackageCategory,
  PackageCustomization,
  TourPackage,
  TRANSPORT_MODE_META,
} from '../data/travelData';

export interface PriceBreakdown {
  durationAdjustedBase: number;
  hotelTierTotalPerPerson: number;
  transportDeltaPerPerson: number;
  mealPlanTotalPerPerson: number;
  addOnsPerPerson: number;
  perPersonPrice: number;
  groupDiscountPercent: number;
  groupDiscountAmount: number;
  totalGroupPrice: number;
}

/**
 * Calculates deterministic, real-time pricing for a customized tour package.
 */
export function calculateCustomPackagePrice(
  pkg: TourPackage,
  customization: PackageCustomization
): PriceBreakdown {
  const days = Math.max(pkg.minDays, Math.min(pkg.maxDays, customization.durationDays));
  const dailyBaseRate = pkg.basePricePerPerson / pkg.baseDurationDays;
  const durationAdjustedBase = Math.round(dailyBaseRate * days);

  const hotelMeta = HOTEL_TIER_META[customization.hotelTier] ?? HOTEL_TIER_META['comfort-3'];
  const hotelTierTotalPerPerson = Math.round(durationAdjustedBase * hotelMeta.multiplier);

  const transportMeta =
    TRANSPORT_MODE_META[customization.transportMode] ?? TRANSPORT_MODE_META['group-coach'];
  const transportDeltaPerPerson = transportMeta.deltaPerPerson;

  const mealMeta = MEAL_PLAN_META[customization.mealPlan] ?? MEAL_PLAN_META['cp-breakfast'];
  const mealPlanTotalPerPerson = mealMeta.deltaPerDay * days;

  const addOnsPerPerson = pkg.availableAddOns
    .filter((addon) => customization.selectedAddOnIds.includes(addon.id))
    .reduce((sum, addon) => sum + addon.pricePerPerson, 0);

  const perPersonPrice =
    hotelTierTotalPerPerson +
    transportDeltaPerPerson +
    mealPlanTotalPerPerson +
    addOnsPerPerson;

  const travelers = Math.max(1, Math.min(40, customization.travelersCount));
  let groupDiscountPercent = 0;
  if (travelers >= 10) {
    groupDiscountPercent = 8;
  } else if (travelers >= 6) {
    groupDiscountPercent = 5;
  }

  const rawTotal = perPersonPrice * travelers;
  const groupDiscountAmount = Math.round(rawTotal * (groupDiscountPercent / 100));
  const totalGroupPrice = rawTotal - groupDiscountAmount;

  return {
    durationAdjustedBase,
    hotelTierTotalPerPerson,
    transportDeltaPerPerson,
    mealPlanTotalPerPerson,
    addOnsPerPerson,
    perPersonPrice,
    groupDiscountPercent,
    groupDiscountAmount,
    totalGroupPrice,
  };
}

/**
 * Filters packages by category and optional search query.
 */
export function filterPackages(
  packages: TourPackage[],
  category: PackageCategory,
  searchQuery: string = ''
): TourPackage[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return packages.filter((pkg) => {
    const matchesCategory = category === 'All' || pkg.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      pkg.title.toLowerCase().includes(normalizedQuery) ||
      pkg.region.toLowerCase().includes(normalizedQuery) ||
      pkg.subtitle.toLowerCase().includes(normalizedQuery) ||
      pkg.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

export interface InquiryFormInput {
  fullName: string;
  email: string;
  phone: string;
  departureCity: string;
  packageId: string;
  travelDate: string;
  travelersCount: number;
  specialRequests: string;
}

export interface InquiryValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  packageId?: string;
  travelDate?: string;
  travelersCount?: string;
}

/**
 * Validates the custom booking inquiry form inputs without silently substituting defaults.
 */
export function validateBookingInquiry(input: InquiryFormInput): {
  isValid: boolean;
  errors: InquiryValidationErrors;
} {
  const errors: InquiryValidationErrors = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address for itinerary confirmation.';
  }

  const digitsOnly = (input.phone || '').replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    errors.phone = 'Please enter a valid 10-digit WhatsApp or mobile number.';
  }

  if (!input.packageId || input.packageId.trim() === '') {
    errors.packageId = 'Please select a tour package from the dropdown.';
  }

  if (!input.travelDate || input.travelDate.trim() === '') {
    errors.travelDate = 'Please select your preferred departure date.';
  }

  if (
    typeof input.travelersCount !== 'number' ||
    Number.isNaN(input.travelersCount) ||
    input.travelersCount < 1 ||
    input.travelersCount > 50
  ) {
    errors.travelersCount = 'Traveler count must be between 1 and 50.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createBookingInquiryRecord(
  input: InquiryFormInput,
  pkg: TourPackage,
  customization: PackageCustomization
): BookingInquiry {
  const breakdown = calculateCustomPackagePrice(pkg, {
    ...customization,
    travelersCount: input.travelersCount,
  });

  const selectedAddOns = pkg.availableAddOns
    .filter((a) => customization.selectedAddOnIds.includes(a.id))
    .map((a) => a.label);

  return {
    id: `SAM-${Date.now().toString().slice(-6)}`,
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    departureCity: input.departureCity.trim() || 'Mumbai',
    packageId: pkg.id,
    packageTitle: pkg.title,
    durationDays: customization.durationDays,
    hotelTier: customization.hotelTier,
    transportMode: customization.transportMode,
    mealPlan: customization.mealPlan,
    selectedAddOns,
    travelDate: input.travelDate,
    travelersCount: input.travelersCount,
    estimatedTotalINR: breakdown.totalGroupPrice,
    specialRequests: input.specialRequests.trim(),
    createdAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    status: 'Received — Advisor Assigned',
  };
}
