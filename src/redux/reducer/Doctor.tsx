import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import { DoctorState } from "../module";

const initialState: DoctorState = {
  loading: false,
  successAction: null,
  errorAction: null,
  doctors: [],
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
      state.loading = true;
    });
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
    });
    builder.addCase(getDoctors.rejected, (state, action) => {
      state.errorAction = action.payload;
      state.loading = false;
    });
  },
});

export const { resetDoctorStatus } = doctorSlice.actions;
export default doctorSlice.reducer;
