import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import { BookingState } from "../module";

const initialState: BookingState = {
  loadingBooking: false,
  successAction: null,
  errorAction: null,
  bookings: [],
};

export const getBookings = createAsyncThunk(
  "booking/getBookings",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiGetAllBookings(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiAddBooking(data);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.message;
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookings.pending, (state) => {
      state.loadingBooking = true;
    });
    builder.addCase(getBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
      state.loadingBooking = false;
    });
    builder.addCase(getBookings.rejected, (state, action) => {
      state.bookings = action.payload;
      state.loadingBooking = false;
    });

    //ADD BOOKING
    builder.addCase(addBooking.pending, (state) => {
      state.loadingBooking = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.loadingBooking = false;
      state.successAction = action.payload;
    });
    builder.addCase(addBooking.rejected, (state, action) => {
      state.loadingBooking = false;
      state.errorAction = action.payload;
    });
  },
});

export const { resetBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
