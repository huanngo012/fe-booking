import "./style.scss";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { images } from "../../assets";
import { useNavigate } from "react-router-dom";
import { theme } from "../../themes/Theme";
import { useTranslation } from "react-i18next";
import { path } from "../../utils/constant";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const gap = isDesktop ? "56px" : "48px";
  const widthImg = isDesktop ? "500px" : "250px";
  const fontSizeContent = isDesktop ? "h4" : "h5";

  return (
    <Box className="not-found-wrapper" sx={{ gap: gap }}>
      <Box
        component="img"
        src={images.notFoundBg}
        alt="not-found"
        alignSelf="center"
        sx={{ width: widthImg }}
      />
      <Typography variant={fontSizeContent} textAlign="center">
        {t("not-found.not-exist")}
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(path.HOME)}
        sx={{ width: "fit-content" }}
      >
        <Typography variant="button2"> {t("Trang chủ")}</Typography>
      </Button>
    </Box>
  );
};

export default NotFoundPage;
