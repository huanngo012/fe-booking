import CommonReducer from "../reducer/Common";
import AuthReducer from "../reducer/Auth";
import PatientReducer from "../reducer/Patient";
import ClinicReducer from "../reducer/Clinic";
import DoctorReducer from "../reducer/Doctor";
import BookingReducer from "../reducer/Booking";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const commonConfig = {
  key: "auth",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "current"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof AuthReducer>>(
      userConfig,
      AuthReducer
    ),
    common: CommonReducer,
    clinic: ClinicReducer,
    doctor: DoctorReducer,
    patient: PatientReducer,
    booking: BookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
