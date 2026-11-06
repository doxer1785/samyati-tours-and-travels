export type PackageCategory =
  | 'All'
  | 'Himalayan & Ladakh'
  | 'Spiritual Yatras'
  | 'Coastal & Backwaters'
  | 'Royal Heritage'
  | 'International Escapes';

export type HotelTier = 'comfort-3' | 'boutique-4' | 'luxury-5';
export type TransportMode = 'group-coach' | 'private-suv' | 'flight-inclusive';
export type MealPlan = 'cp-breakfast' | 'map-halfboard' | 'ap-allmeals';

export interface PackageAddOn {
  id: string;
  label: string;
  pricePerPerson: number;
  description: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  summary: string;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<PackageCategory, 'All'>;
  region: string;
  departureHubs: string[];
  baseDurationDays: number;
  minDays: number;
  maxDays: number;
  basePricePerPerson: number; // in INR
  bestSeason: string;
  groupSize: string;
  image: string;
  fallbackGradient: string;
  highlights: string[];
  availableAddOns: PackageAddOn[];
  itinerary: ItineraryDay[];
}

export interface PackageCustomization {
  packageId: string;
  durationDays: number;
  hotelTier: HotelTier;
  transportMode: TransportMode;
  mealPlan: MealPlan;
  selectedAddOnIds: string[];
  travelersCount: number;
  departureCity: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: Exclude<PackageCategory, 'All'>;
  caption: string;
  capturedDuring: string;
  linkedPackageId: string;
  image: string;
  aspectClass: string;
}

export interface TestimonialItem {
  id: string;
  travelerName: string;
  roleAndCity: string;
  tripTaken: string;
  travelDate: string;
  groupType: string;
  quote: string;
  outcomeHighlight: string;
  rating: number;
}

export interface BookingInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  departureCity: string;
  packageId: string;
  packageTitle: string;
  durationDays: number;
  hotelTier: HotelTier;
  transportMode: TransportMode;
  mealPlan: MealPlan;
  selectedAddOns: string[];
  travelDate: string;
  travelersCount: number;
  estimatedTotalINR: number;
  specialRequests: string;
  createdAt: string;
  status: 'Received — Advisor Assigned';
}

export const HOTEL_TIER_META: Record<
  HotelTier,
  { label: string; multiplier: number; note: string }
> = {
  'comfort-3': {
    label: 'Verified 3-Star Comfort',
    multiplier: 1.0,
    note: 'Handpicked clean stays with mountain or courtyard views',
  },
  'boutique-4': {
    label: '4-Star Boutique & Heritage',
    multiplier: 1.24,
    note: 'Character stays, heated rooms in high altitudes & curated dining',
  },
  'luxury-5': {
    label: '5-Star Luxury & Palace Stays',
    multiplier: 1.58,
    note: 'Premier suites, private houseboats & heritage palace wings',
  },
};

export const TRANSPORT_MODE_META: Record<
  TransportMode,
  { label: string; deltaPerPerson: number; note: string }
> = {
  'group-coach': {
    label: 'AC Luxury Tempo Traveller / Coach',
    deltaPerPerson: 0,
    note: 'Captain seats with experienced mountain & highway drivers',
  },
  'private-suv': {
    label: 'Private Toyota Innova Crysta',
    deltaPerPerson: 5800,
    note: 'Dedicated chauffeur-driven SUV for flexible photo & cafe stops',
  },
  'flight-inclusive': {
    label: 'Ex-Mumbai / Pune Flights + Private SUV',
    deltaPerPerson: 16500,
    note: 'Return airfare from Mumbai/Pune plus private ground transfers',
  },
};

export const MEAL_PLAN_META: Record<
  MealPlan,
  { label: string; deltaPerDay: number; note: string }
> = {
  'cp-breakfast': {
    label: 'Breakfast Only (CP)',
    deltaPerDay: 0,
    note: 'Daily regional & continental breakfast at hotel',
  },
  'map-halfboard': {
    label: 'Breakfast & Dinner (MAP)',
    deltaPerDay: 650,
    note: 'Daily breakfast plus authentic local dinners every evening',
  },
  'ap-allmeals': {
    label: 'All Meals & Trail Refreshments (AP)',
    deltaPerDay: 1200,
    note: 'Breakfast, lunch, dinner & hot chai/snack halts en route',
  },
};

export const INITIAL_PACKAGES: TourPackage[] = [
  {
    id: 'kashmir-shikara-alpine',
    title: 'Kashmir Valley, Gulmarg & Pahalgam Odyssey',
    subtitle: 'Private houseboat stay on Dal Lake, Gondola Phase II & Betaab Valley pine trails',
    category: 'Himalayan & Ladakh',
    region: 'Srinagar · Gulmarg · Pahalgam',
    departureHubs: ['Mumbai', 'Pune', 'Delhi', 'Srinagar'],
    baseDurationDays: 6,
    minDays: 4,
    maxDays: 10,
    basePricePerPerson: 24500,
    bestSeason: 'March – October & Winter Snow',
    groupSize: '2 – 18 Travelers',
    image: '/src/assets/images/hero_himalayan_valley_1793996272579.jpg',
    fallbackGradient: 'from-stone-800 via-amber-950 to-stone-900',
    highlights: [
      '1 Night on a carved cedarwood heritage houseboat on Nigeen / Dal Lake',
      'Private golden-hour Shikara ride past floating lotus gardens',
      'Gulmarg Gondola cable car pass & Aru-Betaab Valley sightseeing circuit',
    ],
    availableAddOns: [
      {
        id: 'gon-p2',
        label: 'Gulmarg Gondola Phase 1 & 2 Priority Pass',
        pricePerPerson: 2800,
        description: 'Pre-booked boarding up to Apharwat Peak (13,780 ft)',
      },
      {
        id: 'wazwan-dinner',
        label: 'Private Kashmiri Wazwan Feast on Houseboat Deck',
        pricePerPerson: 1650,
        description: '7-course traditional dinner with Kahwa infused with Pampore saffron',
      },
      {
        id: 'sonamarg-day',
        label: 'Thajiwas Glacier & Sonamarg Excursion',
        pricePerPerson: 2200,
        description: 'Full-day private excursion to the Meadow of Gold',
      },
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Golden Hour Shikara', summary: 'Airport pickup, check-in to heritage cedarwood houseboat, and tranquil evening Shikara glide across Dal Lake.' },
      { day: 2, title: 'Srinagar Mughal Gardens to Pahalgam', summary: 'Visit Nishat Bagh and Chashme Shahi, stop at Pampore saffron fields, and drive along the Lidder River to Pahalgam.' },
      { day: 3, title: 'Aru, Betaab Valley & Chandanwari Circuit', summary: 'Explore Himalayan cedar forests, riverside meadows in Betaab Valley, and local union cab circuit.' },
      { day: 4, title: 'Pahalgam to Gulmarg Alpine Meadows', summary: 'Scenic ascent to Gulmarg (8,690 ft), afternoon walk to St. Mary Church and high-altitude golf course.' },
      { day: 5, title: 'Apharwat Peak Gondola & Return to Srinagar', summary: 'Morning Gondola ride to snow-covered Apharwat ridge, evening Old City craft walk in Srinagar.' },
      { day: 6, title: 'Morning Floating Market & Departure', summary: 'Early morning vegetable boat market visit followed by airport transfer.' },
    ],
  },
  {
    id: 'ladakh-monastery-circuit',
    title: 'Leh Ladakh, Nubra Valley & Pangong Tso Expedition',
    subtitle: 'High-altitude passes across Khardung La, Thiksey Monastery & Diskit sand dunes',
    category: 'Himalayan & Ladakh',
    region: 'Leh · Nubra · Pangong · Turtuk',
    departureHubs: ['Mumbai', 'Pune', 'Delhi', 'Leh'],
    baseDurationDays: 7,
    minDays: 5,
    maxDays: 11,
    basePricePerPerson: 29800,
    bestSeason: 'May – September',
    groupSize: '4 – 16 Travelers',
    image: '/src/assets/images/pkg_ladakh_monastery_1793996275998.jpg',
    fallbackGradient: 'from-slate-900 via-amber-900 to-stone-900',
    highlights: [
      'Acclimatization-first itinerary with onboard oxygen cylinder support',
      'Sunrise prayer ceremony at Thiksey & Hemis monasteries',
      'Overnight glamping beside Pangong Lake & Hunder double-humped camel safari',
    ],
    availableAddOns: [
      {
        id: 'turtuk-ext',
        label: 'Turtuk Balti Village Border Excursion',
        pricePerPerson: 3400,
        description: 'Visit India’s northernmost apricot valley along the Shyok River',
      },
      {
        id: 'hanle-astro',
        label: 'Hanle Dark Sky Reserve Stargazing Night',
        pricePerPerson: 4800,
        description: 'Guided astronomical telescope session under Bortle Class 1 skies',
      },
    ],
    itinerary: [
      { day: 1, title: 'Touchdown in Leh (11,500 ft) & Complete Rest', summary: 'Transfer to heated boutique hotel in Leh. Guided hydration and acclimatization briefing.' },
      { day: 2, title: 'Sham Valley, Sangam & Thiksey Monastery', summary: 'Visit Indus-Zanskar confluence, Magnetic Hill, Pathar Sahib, and sunset at Shanti Stupa.' },
      { day: 3, title: 'Leh to Nubra Valley via Khardung La', summary: 'Cross Khardung La pass (17,582 ft), visit Diskit Maitreya Buddha, and Hunder cold desert dunes.' },
      { day: 4, title: 'Nubra to Turtuk Village & Return to Hunder', summary: 'Explore Balti stone houses, natural cold storage, and walnut orchards of Turtuk.' },
      { day: 5, title: 'Shyok River Route to Pangong Tso', summary: 'Dramatic mountain drive along the Shyok river to the cobalt-blue waters of Pangong Lake.' },
      { day: 6, title: 'Pangong Sunrise & Chang La Pass to Leh', summary: 'Morning lake photography, return via Chang La and Rancho School to Leh bazaar.' },
      { day: 7, title: 'Departure Over the Himalayan Range', summary: 'Morning transfer to Kushok Bakula Rimpochee Airport.' },
    ],
  },
  {
    id: 'kedarnath-badrinath-yatra',
    title: 'Kedarnath & Badrinath Do Dham Sacred Yatra',
    subtitle: 'Guided Himalayan pilgrimage with Haridwar Ganga Aarti, Rishikesh & Mana Village',
    category: 'Spiritual Yatras',
    region: 'Haridwar · Guptkashi · Kedarnath · Badrinath',
    departureHubs: ['Mumbai', 'Pune', 'Delhi', 'Haridwar'],
    baseDurationDays: 6,
    minDays: 5,
    maxDays: 10,
    basePricePerPerson: 22900,
    bestSeason: 'May – June & September – October',
    groupSize: '6 – 24 Travelers',
    image: '/src/assets/images/pkg_ladakh_monastery_1793996275998.jpg',
    fallbackGradient: 'from-amber-950 via-stone-900 to-stone-950',
    highlights: [
      'Complete Yatra registration, VIP Darshan assistance & dedicated Samyati tour manager',
      'Rishikesh Laxman Jhula, Devprayag confluence & Mana (First Indian Village)',
      'Optional Phata/Sersi helicopter shuttle coordination for senior citizens',
    ],
    availableAddOns: [
      {
        id: 'heli-shuttle',
        label: 'Phata–Kedarnath Return Helicopter Slot Assistance',
        pricePerPerson: 9500,
        description: 'Priority shuttle coordination avoiding the 16 km Gaurikund steep trek',
      },
      {
        id: 'rudra-abhishek',
        label: 'Early Morning Rudrabhishek Pooja Booking',
        pricePerPerson: 2100,
        description: 'Pre-arranged temple sanctum Vedic ritual with pandit',
      },
    ],
    itinerary: [
      { day: 1, title: 'Haridwar Arrival & Evening Har Ki Pauri Ganga Aarti', summary: 'Meet at Haridwar / Dehradun, check in, and attend the illuminated evening Aarti by the Ganges.' },
      { day: 2, title: 'Haridwar to Guptkashi via Devprayag Confluence', summary: 'Scenic drive along the Alaknanda and Bhagirathi confluence at Devprayag and Rudraprayag.' },
      { day: 3, title: 'Sonprayag to Kedarnath Ji Darshan', summary: 'Trek or helicopter shuttle to Kedarnath Temple (11,755 ft) and evening Sandhya Aarti at the shrine.' },
      { day: 4, title: 'Morning Darshan & Return to Guptkashi / Pipalkoti', summary: 'Early morning temple darshan against the Kedar Dome peaks and descent to valley stay.' },
      { day: 5, title: 'Drive to Badrinath Ji & Mana Village Exploration', summary: 'Tapt Kund holy dip, Badrinath evening darshan, and visit to Vyas Gufa & Saraswati River at Mana.' },
      { day: 6, title: 'Joshimath, Rishikesh & Return Departure', summary: 'Descend via Narsingh Temple and Rishikesh Triveni Ghat for onward journey.' },
    ],
  },
  {
    id: 'kerala-alleppey-munnar',
    title: 'Kerala Misty Munnar, Thekkady & Alleppey Backwaters',
    subtitle: 'Private kettuvallam houseboat cruise, Kolukkumalai tea estates & spice trails',
    category: 'Coastal & Backwaters',
    region: 'Kochi · Munnar · Thekkady · Alleppey',
    departureHubs: ['Mumbai', 'Pune', 'Bengaluru', 'Kochi'],
    baseDurationDays: 5,
    minDays: 4,
    maxDays: 9,
    basePricePerPerson: 21400,
    bestSeason: 'September – March',
    groupSize: '2 – 16 Travelers',
    image: '/src/assets/images/pkg_kerala_backwaters_1793996272596.jpg',
    fallbackGradient: 'from-emerald-950 via-stone-900 to-stone-950',
    highlights: [
      'Private AC premium wooden houseboat through Alleppey palm canals with onboard chef',
      'Guided tea tasting at Munnar high-range estates & Kathakali cultural evening',
      'Fort Kochi heritage Dutch palace & Chinese fishing nets sunset walk',
    ],
    availableAddOns: [
      {
        id: 'ayurveda-spa',
        label: 'Authentic 90-Min Kerala Abhyanga Ayurveda Session',
        pricePerPerson: 2400,
        description: 'Certified Vaidya consultation and warm herbal oil rejuvenation therapy',
      },
      {
        id: 'canoe-village',
        label: 'Sunrise Shikara & Narrow Canal Country Canoe Ride',
        pricePerPerson: 1350,
        description: 'Explore shallow Kuttanad village waterways unreachable by larger houseboats',
      },
    ],
    itinerary: [
      { day: 1, title: 'Kochi Arrival to Munnar Waterfalls & Tea Slopes', summary: 'Drive from Kochi past Cheeyappara waterfalls into the cool rolling hills of Munnar.' },
      { day: 2, title: 'Eravikulam National Park, Mattupetty & Tea Museum', summary: 'Spot the Nilgiri Tahr, visit Echo Point, and sample freshly processed orthodox single-estate teas.' },
      { day: 3, title: 'Munnar to Thekkady Spice Plantations & Periyar', summary: 'Guided walk through cardamom, pepper, and cinnamon gardens followed by Kalaripayattu martial arts show.' },
      { day: 4, title: 'Embark Private Alleppey Backwater Houseboat', summary: 'Board your wooden Kettuvallam at noon; cruise tranquil lagoons with freshly prepared Karimeen fish/veg Sadhya lunch.' },
      { day: 5, title: 'Fort Kochi Heritage Walk & Departure', summary: 'Disembark after breakfast, explore Jew Town & St. Francis Church in Fort Kochi, and drop at airport.' },
    ],
  },
  {
    id: 'rajasthan-udaipur-jodhpur',
    title: 'Royal Rajasthan: Udaipur Lakes, Jodhpur & Jaisalmer Dunes',
    subtitle: 'Lake Pichola twilight boat ride, Mehrangarh Fort & Sam Thar Desert luxury camp',
    category: 'Royal Heritage',
    region: 'Udaipur · Kumbhalgarh · Jodhpur · Jaisalmer',
    departureHubs: ['Mumbai', 'Pune', 'Ahmedabad', 'Udaipur'],
    baseDurationDays: 6,
    minDays: 4,
    maxDays: 10,
    basePricePerPerson: 26800,
    bestSeason: 'October – March',
    groupSize: '2 – 20 Travelers',
    image: '/src/assets/images/pkg_rajasthan_heritage_1793996274569.jpg',
    fallbackGradient: 'from-amber-900 via-stone-900 to-neutral-950',
    highlights: [
      'Private sunset boat cruise on Lake Pichola past Jag Mandir & City Palace',
      'Jain marble temple architecture at Ranakpur & Kumbhalgarh Great Wall',
      'Swiss luxury tented camp in Jaisalmer with Manganiyar folk music under the stars',
    ],
    availableAddOns: [
      {
        id: 'dune-bashing',
        label: 'Private 4x4 Thar Desert Dune Safari & Sundowner',
        pricePerPerson: 2900,
        description: 'Off-road 4x4 excursion across remote Khuri/Sam dunes with high tea',
      },
      {
        id: 'palace-dinner',
        label: 'Candlelight Heritage Haveli Rooftop Dinner in Udaipur',
        pricePerPerson: 2600,
        description: 'Reserved lake-facing table overlooking the illuminated City Palace',
      },
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Udaipur & Lake Pichola Twilight Cruise', summary: 'Check in to heritage-style haveli, evening boat ride on Lake Pichola, and Bagore Ki Haveli folk dance.' },
      { day: 2, title: 'Udaipur City Palace, Saheliyon Ki Bari & Vintage Cars', summary: 'Guided tour of royal courtyards, crystal gallery, and old city miniature painting studios.' },
      { day: 3, title: 'Udaipur to Jodhpur via Ranakpur Marble Temple', summary: 'Visit the 1,444-pillar Ranakpur Jain Temple en route to the Blue City of Jodhpur.' },
      { day: 4, title: 'Mehrangarh Fort, Jaswant Thada & Drive to Jaisalmer', summary: 'Explore towering Mehrangarh ramparts and blue Brahmin lanes before driving into the Thar Desert.' },
      { day: 5, title: 'Jaisalmer Living Golden Fort & Sam Sand Dunes Camp', summary: 'Walk Patwon Ki Haveli, sunset camel ride, and cultural bonfire night in luxury Swiss tents.' },
      { day: 6, title: 'Kuldhara Abandoned Village & Departure', summary: 'Morning visit to Gadisar Lake and transfer to Jaisalmer / Jodhpur airport or railway station.' },
    ],
  },
  {
    id: 'bali-ubud-nusapenida',
    title: 'Bali Island Signature: Ubud Rice Terraces & Nusa Penida Cliffs',
    subtitle: 'Tegalalang emerald terraces, Uluwatu sunset Kecak dance & private pool villa',
    category: 'International Escapes',
    region: 'Ubud · Kintamani · Nusa Penida · Seminyak',
    departureHubs: ['Mumbai', 'Pune', 'Delhi', 'Bengaluru'],
    baseDurationDays: 6,
    minDays: 5,
    maxDays: 10,
    basePricePerPerson: 44500,
    bestSeason: 'April – October',
    groupSize: '2 – 14 Travelers',
    image: '/src/assets/images/pkg_bali_coastline_1793996275192.jpg',
    fallbackGradient: 'from-teal-950 via-stone-900 to-stone-950',
    highlights: [
      '2 Nights in a private plunge-pool villa in Ubud + 3 Nights beachside resort stay',
      'Full-day fast boat excursion to Nusa Penida (Kelingking Cliff & Crystal Bay)',
      'Mount Batur volcano caldera view lunch & Tirta Empul holy water temple',
    ],
    availableAddOns: [
      {
        id: 'bali-swing',
        label: 'Aloha Ubud Jungle Swing & Luwak Coffee Tasting',
        pricePerPerson: 2400,
        description: 'All-access pass to valley swings, nests & plantation tasting flight',
      },
      {
        id: 'balinese-massage',
        label: '120-Min Royal Balinese Flower Bath & Spa Ritual',
        pricePerPerson: 3600,
        description: 'Couple or solo river-valley spa ritual in Ubud',
      },
    ],
    itinerary: [
      { day: 1, title: 'Denpasar Arrival & Transfer to Ubud Rainforest Villa', summary: 'Private airport meet-and-greet with flower garland and transfer to your Ubud sanctuary.' },
      { day: 2, title: 'Tegalalang Rice Terraces, Kintamani Volcano & Tirta Empul', summary: 'Morning walk across UNESCO-listed subak rice terraces and panoramic lunch facing Mount Batur.' },
      { day: 3, title: 'Ubud Monkey Forest, Waterfalls & Seminyak Transfer', summary: 'Visit Tegenungan waterfall and artisan silver villages before checking into coastal Seminyak.' },
      { day: 4, title: 'Nusa Penida Island Fast-Boat West Coast Tour', summary: 'Speedboat from Sanur to Kelingking T-Rex cliff, Broken Beach, and Angel’s Billabong.' },
      { day: 5, title: 'Tanah Lot Sea Temple & Uluwatu Cliff Kecak Fire Dance', summary: 'Sunset over Indian Ocean limestone cliffs followed by Jimbaran Bay seafood/veg barbecue on the sand.' },
      { day: 6, title: 'Souvenir Shopping & Ngurah Rai Airport Transfer', summary: 'Leisure morning by the beach club and private airport drop.' },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Golden Hour Shikara on Dal Lake',
    location: 'Srinagar, Jammu & Kashmir',
    category: 'Himalayan & Ladakh',
    caption: 'Captured during our October autumn chinar departure from Mumbai. Hand-carved cedarwood shikaras gliding across mirror-still waters.',
    capturedDuring: 'Autumn Kashmir Batch · Oct 2026',
    linkedPackageId: 'kashmir-shikara-alpine',
    image: '/src/assets/images/hero_himalayan_valley_1793996272579.jpg',
    aspectClass: 'md:col-span-2',
  },
  {
    id: 'gal-2',
    title: 'Sunset Kettuvallam Cruise on Vembanad Lake',
    location: 'Alleppey, Kerala',
    category: 'Coastal & Backwaters',
    caption: 'Private upper-deck houseboat charter through palm-lined canals with traditional Sadhya dining onboard.',
    capturedDuring: 'Winter Backwaters Escape · Jan 2026',
    linkedPackageId: 'kerala-alleppey-munnar',
    image: '/src/assets/images/pkg_kerala_backwaters_1793996272596.jpg',
    aspectClass: 'md:col-span-1',
  },
  {
    id: 'gal-3',
    title: 'Twilight Lanterns over Lake Pichola',
    location: 'Udaipur, Rajasthan',
    category: 'Royal Heritage',
    caption: 'Evening courtyard illumination looking across toward the City Palace and Jag Mandir island.',
    capturedDuring: 'Royal Mewar Heritage Tour · Dec 2025',
    linkedPackageId: 'rajasthan-udaipur-jodhpur',
    image: '/src/assets/images/pkg_rajasthan_heritage_1793996274569.jpg',
    aspectClass: 'md:col-span-1',
  },
  {
    id: 'gal-4',
    title: 'Thiksey Monastery Above the Indus Valley',
    location: 'Leh, Ladakh',
    category: 'Himalayan & Ladakh',
    caption: 'Early morning prayer flags fluttering at 11,800 ft before our convoy crossed Khardung La toward Nubra Valley.',
    capturedDuring: 'Ladakh High Passes Batch · Jul 2026',
    linkedPackageId: 'ladakh-monastery-circuit',
    image: '/src/assets/images/pkg_ladakh_monastery_1793996275998.jpg',
    aspectClass: 'md:col-span-1',
  },
  {
    id: 'gal-5',
    title: 'Nusa Penida Limestone Cliffs & Emerald Terraces',
    location: 'Bali, Indonesia',
    category: 'International Escapes',
    caption: 'Sunrise over Kelingking cliff and subak rice terraces curated for our private honeymoon and small-group departures.',
    capturedDuring: 'Bali Signature Escape · May 2026',
    linkedPackageId: 'bali-ubud-nusapenida',
    image: '/src/assets/images/pkg_bali_coastline_1793996275192.jpg',
    aspectClass: 'md:col-span-1',
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    travelerName: ' Kulkarni & Deshmukh Family (14 Members)',
    roleAndCity: 'Multi-Generation Family Group · Pune, Maharashtra',
    tripTaken: 'Kedarnath & Badrinath Do Dham Sacred Yatra',
    travelDate: 'May 2026',
    groupType: 'Senior Citizens & Family Group',
    quote: 'Traveling with four senior parents above 70 to Kedarnath felt daunting until Samyati Tours took over. They coordinated our Phata helicopter slots, arranged ground-floor heated rooms in Guptkashi, and their tour manager walked beside us at every temple halt.',
    outcomeHighlight: 'Zero logistical delays across 6 days · 100% group completed both Dhams comfortably',
    rating: 5,
  },
  {
    id: 'test-2',
    travelerName: 'Rohan Mehta & Ananya Nair',
    roleAndCity: 'Architect & Product Lead · Mumbai, Maharashtra',
    tripTaken: 'Kashmir Valley, Gulmarg & Pahalgam Odyssey',
    travelDate: 'September 2026',
    groupType: 'Customized Private Couple Itinerary',
    quote: 'We used Samyati’s package customizer to upgrade to a 4-star boutique houseboat on Nigeen Lake and added a private Innova Crysta. Every single property matched the photographs promised, and our driver knew the quietest apple orchards in Pahalgam.',
    outcomeHighlight: 'Customized 7-day private route · Saved 18% vs booking luxury stays separately',
    rating: 5,
  },
  {
    id: 'test-3',
    travelerName: 'Vikramaditya & Sneha Joshi',
    roleAndCity: 'Engineering Team Offsite (12 Travelers) · Thane & Mumbai',
    tripTaken: 'Leh Ladakh, Nubra Valley & Pangong Tso Expedition',
    travelDate: 'July 2026',
    groupType: 'Private Friends & Corporate Group',
    quote: 'Our 7-day Ladakh circuit from Leh through Khardung La, Turtuk, and Pangong was executed with military precision. Having backup oxygen cylinders, inner-line permits ready before arrival, and warm Ladakhi homestays made all the difference.',
    outcomeHighlight: '12/12 travelers crossed 17,582 ft passes safely with zero altitude sickness',
    rating: 5,
  },
  {
    id: 'test-4',
    travelerName: 'Dr. Meenal Patwardhan',
    roleAndCity: 'Ophthalmologist · Nashik & Pune',
    tripTaken: 'Kerala Misty Munnar, Thekkady & Alleppey Backwaters',
    travelDate: 'January 2026',
    groupType: 'Women’s Small Group Departure',
    quote: 'The private kettuvallam houseboat in Alleppey and the sunrise canoe ride through Kuttanad canals were unforgettable. Samyati’s attention to clean vegetarian and local coastal cuisine kept everyone delighted throughout the 5 days.',
    outcomeHighlight: '5-day private backwater charter · Rated 5.0/5 on safety & hospitality',
    rating: 5,
  },
];
