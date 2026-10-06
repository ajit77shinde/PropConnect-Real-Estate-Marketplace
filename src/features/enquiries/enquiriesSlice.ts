import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Enquiry, EnquiryStatus } from '../../types';
import { enquiries as seed } from '../../data/mockData';

interface EnquiriesState {
  items: Enquiry[];
}

const initialState: EnquiriesState = {
  items: [...seed],
};

const enquiriesSlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    addEnquiry(state, action: PayloadAction<Enquiry>) {
      state.items.unshift(action.payload);
    },
    updateEnquiryStatus(
      state,
      action: PayloadAction<{ id: string; status: EnquiryStatus }>,
    ) {
      const item = state.items.find((e) => e.id === action.payload.id);
      if (item) item.status = action.payload.status;
    },
  },
});

export const { addEnquiry, updateEnquiryStatus } = enquiriesSlice.actions;
export default enquiriesSlice.reducer;
