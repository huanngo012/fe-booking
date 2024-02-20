import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import { PatientState } from "../module";

const initialState: PatientState = {
  loadingPatient: false,
  successAction: null,
  errorAction: null,
  patients: [],
};

export const getPatients = createAsyncThunk(
  "patient/getPatients",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiGetPatients(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addPatient = createAsyncThunk(
  "patient/addPatient",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiAddPatient(data);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.message;
  }
);
export const updatePatient = createAsyncThunk(
  "patient/updatePatient",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    const response: any = await apis.apiUpdatePatient(id, data);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.message;
  }
);

export const deletePatient = createAsyncThunk(
  "doctor/deletePatient",
  async (id: string, { rejectWithValue }) => {
    const response: any = await apis.apiDeletePatient(id);
    if (!response.success) {
      return rejectWithValue(response.message);
    }
    return response.message;
  }
);

export const patientSlice = createSlice({
  name: "specialty",
  initialState,
  reducers: {
    resetPatientStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatients.pending, (state) => {
      state.loadingPatient = true;
    });
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.patients = action.payload;
      state.loadingPatient = false;
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.patients = action.payload;
      state.loadingPatient = false;
    });

    //ADD PATIENT
    builder.addCase(addPatient.pending, (state) => {
      state.loadingPatient = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.loadingPatient = false;
      state.successAction = action.payload;
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.loadingPatient = false;
      state.errorAction = action.payload;
    });
    //UPDATE PATIENT
    builder.addCase(updatePatient.pending, (state) => {
      state.loadingPatient = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.loadingPatient = false;
      state.successAction = action.payload;
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.loadingPatient = false;
      state.errorAction = action.payload;
    });
    //DELETE PATIENT
    builder.addCase(deletePatient.pending, (state) => {
      state.loadingPatient = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.loadingPatient = false;
      state.successAction = action.payload;
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.loadingPatient = false;
      state.errorAction = action.payload;
    });
  },
});

export const { resetPatientStatus } = patientSlice.actions;
export default patientSlice.reducer;
