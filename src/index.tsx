import "./index.css";

import "./i18n";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

import App from "./App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { theme } from "./themes/Theme";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import Loading from "./components/loading";
import Toast from "./components/toast/Toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/vi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
            <Toast />
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </PersistGate>
  </Provider>
);
