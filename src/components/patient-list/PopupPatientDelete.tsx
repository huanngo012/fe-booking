import "./style.scss";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deletePatient } from "../../redux/reducer/Patient";
import { AppDispatch } from "../../redux/store";
import { theme } from "../../themes/Theme";
import PopUp from "../popup-delete/Popup";

const PopupPatientDelete = ({ id }: { id?: any }) => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const dispatch = useDispatch<AppDispatch>();

  const [openPopUp, setOpenPopUp] = useState(false);

  const handleOpenConfirmPopup = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenPopUp(true);
  };
  const handleCloseConfirmPopUp = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPopUp(false);
  };
  const handleDeleteSchedule = () => {
    id && dispatch(deletePatient(id));
    setOpenPopUp(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpenConfirmPopup}
        sx={{
          display: "flex",
          gap: "4px",
          borderRadius: "8px",
          background:
            "linear-gradient(83.63deg,#ff675c 33.34%,#ff8d85 113.91%);",
        }}
      >
        <Typography variant={isTablet ? "button2" : "button3"}>Xóa</Typography>
      </Button>

      <PopUp
        open={openPopUp}
        handleClose={handleCloseConfirmPopUp}
        title={t("delete-title")}
        message={t("delete-confirm")}
        enableCancelButton
        onClick={handleDeleteSchedule}
      />
    </>
  );
};

export default PopupPatientDelete;
