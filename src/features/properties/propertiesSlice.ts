import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Listing, PropertyFilters, ListingStatus } from '../../types';
import { listings as seedListings } from '../../data/mockData';

interface PropertiesState {
  items: Listing[];
  filters: PropertyFilters;
  selectedId: string | null;
}

const initialState: PropertiesState = {
  items: [...seedListings],
  filters: {},
  selectedId: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<PropertyFilters>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = {};
    },
    addListing(state, action: PayloadAction<Listing>) {
      state.items.unshift(action.payload);
    },
    updateListing(state, action: PayloadAction<Listing>) {
      const idx = state.items.findIndex((l) => l.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    setListingStatus(
      state,
      action: PayloadAction<{ id: string; status: ListingStatus }>,
    ) {
      const item = state.items.find((l) => l.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
        item.updatedAt = new Date().toISOString().slice(0, 10);
      }
    },
    deleteListing(state, action: PayloadAction<string>) {
      state.items = state.items.filter((l) => l.id !== action.payload);
    },
    duplicateListing(state, action: PayloadAction<string>) {
      const original = state.items.find((l) => l.id === action.payload);
      if (!original) return;
      const copy: Listing = {
        ...original,
        id: `l-${Date.now()}`,
        title: `${original.title} (Copy)`,
        status: 'draft',
        enquiryCount: 0,
        featured: false,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      state.items.unshift(copy);
    },
  },
});

export const {
  setFilters,
  clearFilters,
  addListing,
  updateListing,
  setListingStatus,
  deleteListing,
  duplicateListing,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;

export function filterListings(
  items: Listing[],
  filters: PropertyFilters,
): Listing[] {
  return items.filter((l) => {
    if (l.status !== 'active' && !filters.featured) {
      // public listing views only show active unless admin/broker context
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const hay = `${l.title} ${l.locality} ${l.city} ${l.area} ${l.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      if (
        !l.city.toLowerCase().includes(loc) &&
        !l.locality.toLowerCase().includes(loc) &&
        !l.area.toLowerCase().includes(loc)
      )
        return false;
    }
    if (filters.transaction && l.transaction !== filters.transaction)
      return false;
    if (filters.listingType && l.listingType !== filters.listingType)
      return false;
    if (filters.bhk && l.bhk !== filters.bhk) return false;
    if (filters.minPrice !== '' && filters.minPrice != null && l.price < Number(filters.minPrice))
      return false;
    if (filters.maxPrice !== '' && filters.maxPrice != null && l.price > Number(filters.maxPrice))
      return false;
    if (filters.minArea !== '' && filters.minArea != null && (l.carpetArea ?? 0) < Number(filters.minArea))
      return false;
    if (filters.maxArea !== '' && filters.maxArea != null && (l.carpetArea ?? 0) > Number(filters.maxArea))
      return false;
    if (filters.furnishing && l.furnishing !== filters.furnishing) return false;
    if (filters.parking === true && !(l.parking && l.parking > 0)) return false;
    if (filters.possession && l.possession !== filters.possession) return false;
    if (filters.featured && !l.featured) return false;
    return true;
  });
}
