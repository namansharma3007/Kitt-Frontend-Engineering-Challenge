import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FlightInput = {
    fromAirport: {
      name: "",
      city: "",
      code: "",
      country: "",
    },
    toAirport: {
      name: "",
      city: "",
      code: "",
      country: "",
    },
    departureDate: "",
    returnDate: "",
};

const flightInputSlice = createSlice({
  name: 'flightInput',
  initialState,
  reducers: {
    setFromAirport: (state, action: PayloadAction<Airport>) => {
      state.fromAirport = action.payload;
    },
    setToAirport: (state, action: PayloadAction<Airport>) => {
      state.toAirport = action.payload;
    },
    setDepartureDate: (state, action: PayloadAction<string>) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action: PayloadAction<string>) => {
      state.returnDate = action.payload; 
    },
  },
});

// Export actions and reducer
export const { setFromAirport, setToAirport, setDepartureDate, setReturnDate } = flightInputSlice.actions;

export default flightInputSlice.reducer;