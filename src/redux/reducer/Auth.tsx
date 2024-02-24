import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../../apis";
import { AuthState } from "../module";

const initialState: AuthState = {
  loading: false,
  loadingSendMail: false,
  isLoggedIn: false,
  current: null,
  token: null,
  tokenResetPassword: null,
  successAction: null,
  errorAction: null,
};

export const getCurrent = createAsyncThunk(
  "user/getCurrent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apis.apiGetCurrent();
      return response;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiUpdateUser(data);
    if (!response?.success) {
      return rejectWithValue(response?.data);
    }
    return response?.data;
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiRegister(data);
    if (!response?.success) {
      return rejectWithValue(response?.message);
    }
    return response?.message;
  }
);
export const sendMailResetPassword = createAsyncThunk(
  "user/sendMailResetPassword",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiSendMailResetPassword(data);
    if (!response?.success) {
      return rejectWithValue(response?.message);
    }
    return response?.message;
  }
);
export const verifyResetPassword = createAsyncThunk(
  "user/verifyResetPassword",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiVerifyResetPassword(data);
    if (!response?.success) {
      return rejectWithValue(response?.message);
    }
    return response;
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data: any, { rejectWithValue }) => {
    const response: any = await apis.apiResetPassword(data);
    if (!response?.success) {
      return rejectWithValue(response?.data);
    }
    return response?.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.current = action.payload.current;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
    },
    resetAuthStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
    });
    builder.addCase(getCurrent.rejected, (state, action) => {
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.loading = false;
    });
    //Update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = "Cập nhật thông tin người dùng thành công";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.errorAction = action.payload;
    });
    //Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.errorAction = action.payload;
    });
    //Send mail reset password
    builder.addCase(sendMailResetPassword.pending, (state) => {
      state.loadingSendMail = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(sendMailResetPassword.fulfilled, (state, action) => {
      state.loadingSendMail = false;
      state.successAction = action.payload;
    });
    builder.addCase(sendMailResetPassword.rejected, (state, action) => {
      state.loadingSendMail = false;
      state.errorAction = action.payload;
    });
    //Verify reset password
    builder.addCase(verifyResetPassword.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(verifyResetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.tokenResetPassword = action.payload?.tokenResetPassword;
      state.successAction = action.payload?.message;
    });
    builder.addCase(verifyResetPassword.rejected, (state, action) => {
      state.loading = false;
      state.errorAction = action.payload;
    });
    //Reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.successAction = null;
      state.errorAction = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.successAction = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.errorAction = action.payload;
    });
  },
});

export const { login, logout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
