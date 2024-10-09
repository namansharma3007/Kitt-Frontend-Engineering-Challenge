import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const openTabSlice = createSlice({
  name: 'openTab',
  initialState: false, // This should be a boolean
  reducers: {
    setOpenTab: (state, action: PayloadAction<boolean>) => {
      return action.payload; // Update the state directly
    },
  },
});

export const { setOpenTab } = openTabSlice.actions;

export default openTabSlice.reducer;