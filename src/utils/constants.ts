import type { ListingType, TransactionType, Furnishing } from '../types';

export const POPULAR_LOCATIONS = [
  'Kalyan',
  'Dombivli',
  'Thane',
  'Navi Mumbai',
  'Andheri',
  'Powai',
];

export const LISTING_TYPES: { value: ListingType; label: string }[] = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'house', label: 'Independent House' },
  { value: 'plot', label: 'Plot' },
  { value: 'shop', label: 'Shop' },
  { value: 'office', label: 'Office' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'agricultural', label: 'Agricultural Land' },
  { value: 'other', label: 'Other' },
];

export const TRANSACTIONS: { value: TransactionType; label: string }[] = [
  { value: 'sell', label: 'Buy / Sell' },
  { value: 'rent', label: 'Rent' },
  { value: 'lease', label: 'Lease' },
];

export const BHK_OPTIONS = [1, 2, 3, 4, 5];

export const FURNISHING_OPTIONS: { value: Furnishing; label: string }[] = [
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'semi-furnished', label: 'Semi Furnished' },
  { value: 'fully-furnished', label: 'Fully Furnished' },
];

export const AMENITIES = [
  'Lift',
  'Security',
  'Parking',
  'Gym',
  'Swimming Pool',
  'Garden',
  'Club House',
  "Children's Play Area",
  'Power Backup',
  'CCTV',
  'Intercom',
  'Rain Water Harvesting',
];

export const BUDGET_RANGES = [
  { label: 'Under ₹50 Lakh', min: 0, max: 5000000 },
  { label: '₹50L – ₹75L', min: 5000000, max: 7500000 },
  { label: '₹75L – ₹1 Cr', min: 7500000, max: 10000000 },
  { label: '₹1 Cr – ₹2 Cr', min: 10000000, max: 20000000 },
  { label: 'Above ₹2 Cr', min: 20000000, max: 999999999 },
];
