import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import { DoctorState } from "../module";

const initialState: DoctorState = {
  loadingDoctor: false,
  successAction: null,
  errorAction: null,
  doctors: [],
  counts: 0,
};

export const getDoctors = createAsyncThunk(
  "doctor/doctorsFetch",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiGetAllDoctors(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const doctorSlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {
    resetDoctorStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDoctors.pending, (state) => {
      state.loadingDoctor = true;
    });
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.loadingDoctor = false;
      state.doctors = action.payload.data;
      state.counts = action.payload.counts;
    });
    builder.addCase(getDoctors.rejected, (state, action: any) => {
      state.loadingDoctor = false;
      state.doctors = action.payload.data;
      state.counts = action.payload.counts;
    });
  },
});

export const { resetDoctorStatus } = doctorSlice.actions;
export default doctorSlice.reducer;
