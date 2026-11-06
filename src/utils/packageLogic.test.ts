import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_PACKAGES, PackageCustomization } from '../data/travelData';
import {
  calculateCustomPackagePrice,
  filterPackages,
  validateBookingInquiry,
} from './packageLogic';

test('calculateCustomPackagePrice computes base configuration accurately', () => {
  const kashmirPkg = INITIAL_PACKAGES[0];
  const baseCustom: PackageCustomization = {
    packageId: kashmirPkg.id,
    durationDays: 6,
    hotelTier: 'comfort-3',
    transportMode: 'group-coach',
    mealPlan: 'cp-breakfast',
    selectedAddOnIds: [],
    travelersCount: 2,
    departureCity: 'Mumbai',
  };

  const result = calculateCustomPackagePrice(kashmirPkg, baseCustom);
  assert.equal(result.perPersonPrice, 24500);
  assert.equal(result.groupDiscountPercent, 0);
  assert.equal(result.totalGroupPrice, 49000);
});

test('calculateCustomPackagePrice applies hotel tier, add-ons, meal plan and group discounts', () => {
  const kashmirPkg = INITIAL_PACKAGES[0];
  const upgradedCustom: PackageCustomization = {
    packageId: kashmirPkg.id,
    durationDays: 6,
    hotelTier: 'boutique-4', // 1.24x of 24500 = 30380
    transportMode: 'private-suv', // +5800
    mealPlan: 'map-halfboard', // +650 * 6 = +3900
    selectedAddOnIds: ['gon-p2'], // +2800
    travelersCount: 6, // 5% discount
    departureCity: 'Pune',
  };

  const result = calculateCustomPackagePrice(kashmirPkg, upgradedCustom);
  // 30380 + 5800 + 3900 + 2800 = 42880 per person
  assert.equal(result.perPersonPrice, 42880);
  assert.equal(result.groupDiscountPercent, 5);
  // 42880 * 6 = 257280; 5% discount = 12864; total = 244416
  assert.equal(result.totalGroupPrice, 244416);
});

test('filterPackages filters by category and search query', () => {
  const spiritual = filterPackages(INITIAL_PACKAGES, 'Spiritual Yatras');
  assert.equal(spiritual.length, 1);
  assert.equal(spiritual[0].id, 'kedarnath-badrinath-yatra');

  const queryMatch = filterPackages(INITIAL_PACKAGES, 'All', 'Pichola');
  assert.equal(queryMatch.length, 1);
  assert.equal(queryMatch[0].id, 'rajasthan-udaipur-jodhpur');
});

test('validateBookingInquiry catches empty or invalid fields and passes valid submission', () => {
  const invalidCheck = validateBookingInquiry({
    fullName: 'A',
    email: 'not-an-email',
    phone: '12345',
    departureCity: 'Mumbai',
    packageId: '',
    travelDate: '',
    travelersCount: 0,
    specialRequests: '',
  });

  assert.equal(invalidCheck.isValid, false);
  assert.ok(invalidCheck.errors.fullName);
  assert.ok(invalidCheck.errors.email);
  assert.ok(invalidCheck.errors.phone);
  assert.ok(invalidCheck.errors.packageId);
  assert.ok(invalidCheck.errors.travelDate);
  assert.ok(invalidCheck.errors.travelersCount);

  const validCheck = validateBookingInquiry({
    fullName: 'Siddharth Kulkarni',
    email: 'siddharth@example.com',
    phone: '+91 98201 12345',
    departureCity: 'Pune',
    packageId: 'kashmir-shikara-alpine',
    travelDate: '2026-12-15',
    travelersCount: 4,
    specialRequests: 'Need ground floor rooms for parents',
  });

  assert.equal(validCheck.isValid, true);
  assert.equal(Object.keys(validCheck.errors).length, 0);
});
