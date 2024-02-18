import "./style.scss";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { theme } from "../../themes/Theme";
import PopUp from "../popup-delete/Popup";
import { deleteRatingClinic } from "../../redux/reducer/Clinic";

const PopupDeleteComment = ({ id }: { id?: any }) => {
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
    id && dispatch(deleteRatingClinic(id));
    setOpenPopUp(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="tertiary"
        sx={{
          display: "flex",
          gap: "4px",
          borderRadius: "30px",
        }}
        onClick={handleOpenConfirmPopup}
      >
        <Typography variant={isTablet ? "body2" : "body3"}>Xóa</Typography>
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

export default PopupDeleteComment;
