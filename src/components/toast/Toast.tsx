import { Alert, AlertTitle, Snackbar, Typography } from "@mui/material";
import "./style.scss";
import { useSelector } from "react-redux";
import useNotification from "../../hooks/useNotification";
import { images } from "../../assets";

export default function Toast() {
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
      sx={{ width: "300px" }}
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
