import {
  Alert,
  AlertTitle,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./style.scss";
import { useSelector } from "react-redux";
import useNotification from "../../hooks/useNotification";
import { images } from "../../assets";
import { theme } from "../../themes/Theme";

export default function Toast() {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));

  const { open, message, title, severity } = useSelector(
    (state: any) => state.common
  );
  const { resetNotification } = useNotification();
  const handleCloseToast = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    reason !== "clickaway" && resetNotification();
  };
  const anchorOrigin: any = { vertical: "top", horizontal: "right" };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleCloseToast}
      anchorOrigin={anchorOrigin}
      sx={{ width: isTablet ? "400px" : "300px" }}
    >
      <Alert
        className="toast-alert"
        onClose={handleCloseToast}
        severity={severity}
        iconMapping={{
          success: (
            <img
              className="toast-icon"
              src={images.successIcon}
              alt="success"
            />
          ),
          error: (
            <img className="toast-icon" src={images.alertIcon} alt="error" />
          ),
          warning: (
            <img
              className="toast-icon"
              src={images.warningIcon}
              alt="warning"
            />
          ),
          info: <img className="toast-icon" src={images.infoIcon} alt="info" />,
        }}
      >
        <AlertTitle>
          <Typography variant="h6">{title}</Typography>
        </AlertTitle>
        <Typography variant="body2" className="alert-message">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}
