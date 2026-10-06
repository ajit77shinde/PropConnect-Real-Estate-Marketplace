export type UserRole = 'buyer' | 'broker' | 'builder' | 'admin';

export type ListingType =
  | 'apartment'
  | 'villa'
  | 'house'
  | 'plot'
  | 'shop'
  | 'office'
  | 'warehouse'
  | 'commercial'
  | 'agricultural'
  | 'other';

export type TransactionType = 'sell' | 'rent' | 'lease';

export type ListingStatus =
  | 'draft'
  | 'pending'
  | 'active'
  | 'rejected'
  | 'sold'
  | 'rented'
  | 'inactive';

export type Furnishing = 'unfurnished' | 'semi-furnished' | 'fully-furnished';

export type EnquiryStatus =
  | 'new'
  | 'contacted'
  | 'site_visit_scheduled'
  | 'closed'
  | 'lost';

export type PossessionStatus = 'ready' | 'under-construction';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  verified?: boolean;
  createdAt: string;
}

export interface BrokerProfile {
  id: string;
  userId: string;
  firmName: string;
  slug: string;
  about: string;
  city: string;
  state: string;
  locality: string;
  experienceYears: number;
  rating: number;
  verified: boolean;
  whatsapp?: string;
  propertyCount: number;
  logo?: string;
}

export interface BuilderProfile {
  id: string;
  userId: string;
  companyName: string;
  slug: string;
  about: string;
  city: string;
  state: string;
  verified: boolean;
  establishedYear: number;
  projectCount: number;
  logo?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  listingType: ListingType;
  transaction: TransactionType;
  status: ListingStatus;
  price: number;
  maintenance?: number;
  deposit?: number;
  negotiable: boolean;
  bhk?: number;
  bathrooms?: number;
  carpetArea?: number;
  builtUpArea?: number;
  floor?: number;
  totalFloors?: number;
  propertyAge?: number;
  facing?: string;
  parking?: number;
  furnishing?: Furnishing;
  possession: PossessionStatus;
  amenities: string[];
  images: string[];
  reraVerified: boolean;
  verified: boolean;
  featured: boolean;
  state: string;
  city: string;
  area: string;
  locality: string;
  building?: string;
  pincode: string;
  lat?: number;
  lng?: number;
  brokerId?: string;
  builderId?: string;
  projectId?: string;
  enquiryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectUnit {
  id: string;
  bhk: number;
  priceFrom: number;
  priceTo: number;
  carpetAreaFrom: number;
  carpetAreaTo: number;
  available: number;
  total: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  builderId: string;
  description: string;
  city: string;
  state: string;
  locality: string;
  priceFrom: number;
  bhkOptions: number[];
  possessionDate: string;
  rera: string;
  verified: boolean;
  featured: boolean;
  amenities: string[];
  images: string[];
  units: ProjectUnit[];
  enquiryCount: number;
  status: ListingStatus;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  listingId?: string;
  projectId?: string;
  brokerId?: string;
  builderId?: string;
  buyerId?: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  scheduleVisit: boolean;
  visitDate?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface PropertyFilters {
  q?: string;
  location?: string;
  transaction?: TransactionType | '';
  listingType?: ListingType | '';
  bhk?: number | '';
  minPrice?: number | '';
  maxPrice?: number | '';
  minArea?: number | '';
  maxArea?: number | '';
  furnishing?: Furnishing | '';
  parking?: boolean | '';
  possession?: PossessionStatus | '';
  featured?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
