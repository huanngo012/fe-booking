export interface AuthState {
  loading: boolean;
  loadingSendMail: boolean;
  isLoggedIn: boolean;
  current: any | null;
  token: any | null;
  tokenResetPassword: any | null;
  successAction: any | null;
  errorAction: any | null;
}

export interface AppProps {
  isOpenSidebar: boolean;
  isHoverSidebar: boolean;
}
export interface CommonState {
  isOpenSidebar: boolean;
  isHoverSidebar: boolean;

  open: boolean;
  meesage: string;
  title: string;
  severity: string;
}
export interface UserState {
  loading: boolean;
  successAction: any | null;
  errorAction: any | null;
  users: any;
}
export interface PatientState {
  loading: boolean;
  successAction: any | null;
  errorAction: any | null;
  patients: any;
}
export interface DoctorState {
  loading: boolean;
  successAction: any | null;
  errorAction: any | null;
  doctors: any;
}
export interface ClinicState {
  loading: boolean;
  successAction: any | null;
  errorAction: any | null;
  clinics: any;
  // clinicsTop: any;
}
export interface SpecialtyState {
  loading: boolean;
  successAction: any | null;
  errorAction: any | null;
  specialtys: any;
}
export interface ScheduleState {
  loading: boolean;
  successAction: any | null;
  errorAction: any | null;
  schedules: any;
}
export interface BookingState {
  loading: boolean;
  successAction: any | null;
  errorAction: any | null;
  bookings: any;
}
