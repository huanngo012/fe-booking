import "./style.scss";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../themes/Theme";
import { paddingScreen } from "../../utils/constant";
import DoctorBody from "./DoctorBody";

const DoctorPage = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const variant1 = isDesktop ? "h3" : "h5";
  const variant2 = isDesktop ? "h5" : "label1";

  return (
    <Box className="hospital__wrapper">
      <Box className="hospital__header">
        <Container className="hospital__header-content" sx={paddingScreen}>
          <Box
            padding="6px 16px"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "30px",
              alignItems: "flex-start",
              gap: "10px",
              backgroundColor: "hsla(0,0%,100%,.85)",
              borderRadius: "30px",
            }}
          >
            <Typography
              variant={variant1}
              color="var(--primary)"
              className="text-title"
            >
              ĐẶT KHÁM TẠI CƠ SỞ
            </Typography>
            <Typography variant={variant2} color="var(--secondary)">
              Đặt khám nhanh chóng, tiết kiệm thời gian, an toàn tiện lợi
            </Typography>
          </Box>
        </Container>
      </Box>
      <Stack alignItems="center" sx={paddingScreen}>
        <DoctorBody />
      </Stack>
    </Box>
  );
};

export default DoctorPage;
