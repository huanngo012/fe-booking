import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import { ClinicState } from "../module";

const initialState: ClinicState = {
  loading: false,
  successAction: null,
  errorAction: null,
  clinics: [],
};

export const getClinics = createAsyncThunk(
  "clinic/clinicsFetch",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiGetAllClinics(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const ratingClinic = createAsyncThunk(
  "clinic/ratingClinic",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiRatingClinic(data);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.message;
  }
);
export const deleteRatingClinic = createAsyncThunk(
  "clinic/deleteRatingClinic",
  async (id: string, { rejectWithValue }) => {
    const response: any = await apis.apiDeleteRatingClinic(id);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.message;
  }
);

export const clinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    resetClinicStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClinics.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClinics.fulfilled, (state, action) => {
      state.clinics = action.payload;
      state.loading = false;
    });
    builder.addCase(getClinics.rejected, (state, action) => {
      state.errorAction = action;
      state.clinics = action.payload;
      state.loading = false;
    });
    //rating
    builder.addCase(ratingClinic.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(ratingClinic.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload;
    });
    builder.addCase(ratingClinic.rejected, (state, action) => {
      state.loading = false;
      state.errorAction = action.payload;
    });

    // delete rating
    builder.addCase(deleteRatingClinic.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(deleteRatingClinic.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload;
    });
    builder.addCase(deleteRatingClinic.rejected, (state, action) => {
      state.loading = false;
      state.errorAction = action.payload;
    });
  },
});

export const { resetClinicStatus } = clinicSlice.actions;
export default clinicSlice.reducer;
