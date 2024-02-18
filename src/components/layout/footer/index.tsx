import "./style.scss";
import { paddingScreen } from "../../../utils/constant";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { theme } from "../../../themes/Theme";

const Footer = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const flexDirectionFooter = isDesktop ? "row" : "column";
  return (
    <Box className="footer__sticky" sx={paddingScreen}>
      <Box className="footer__container" flexDirection={flexDirectionFooter}>
        <Stack flexDirection="column" gap="10px">
          <Box
            width="220px"
            component="img"
            src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d646d4b8.svg&w=1920&q=75"
            alt=""
            marginBottom="10px"
          />

          <Typography variant="label2" minWidth="60px">
            Địa chỉ:{" "}
            <Typography variant="body2" component="span">
              97 Trần Quang Diệu, Phường 14, Quận 3, Tp. Hồ Chí Minh.
            </Typography>
          </Typography>
          <Typography variant="label2">
            Website:{" "}
            <Typography variant="body2" component="span">
              https://pkh.vn
            </Typography>
          </Typography>
          <Typography variant="label2">
            Email:
            <Typography variant="body2" component="span">
              cskh@medpro.vn
            </Typography>
          </Typography>
          <Typography variant="label2">
            Điện thoại:
            <Typography variant="body2" component="span">
              (028) 710 78098
            </Typography>
          </Typography>
        </Stack>
        <Stack flexWrap="wrap" flexDirection="row" width="100%" rowGap="16px">
          <Stack flexDirection="column" maxWidth="33.3333%" flex="33.3333%">
            <Typography variant="label2">Dịch vụ Y tế </Typography>
            <Typography variant="body2">Đặt khám tại cơ sở</Typography>
            <Typography variant="body2">Đặt khám theo bác sĩ</Typography>
            <Typography variant="body2">Tư vấn khám bệnh từ xa</Typography>
            <Typography variant="body2">Đặt lịch xét nghiệm</Typography>
            <Typography variant="body2">Y tế tại nhà</Typography>
            <Typography variant="body2">Thanh toán Viện phí</Typography>
          </Stack>
          <Stack flexDirection="column" maxWidth="33.3333%" flex="33.3333%">
            <Typography variant="label2">Cơ sở y tế </Typography>
            <Typography variant="body2">Bệnh viện công</Typography>
            <Typography variant="body2">Bệnh viện tư</Typography>
            <Typography variant="body2">Phòng khám</Typography>
            <Typography variant="body2">Phòng mạch</Typography>
            <Typography variant="body2">Xét nghiệm</Typography>
          </Stack>
          <Stack flexDirection="column" maxWidth="33.3333%" flex="33.3333%">
            <Typography variant="label2">Hướng dẫn </Typography>
            <Typography variant="body2">Cài đặt ứng dụng</Typography>
            <Typography variant="body2">Đặt lịch khám</Typography>
            <Typography variant="body2">Quy trình hoàn phí</Typography>
            <Typography variant="body2">Câu hỏi thường gặp</Typography>
          </Stack>
          <Stack flexDirection="column" maxWidth="33.3333%" flex="33.3333%">
            <Typography variant="label2">Tin tức </Typography>
            <Typography variant="body2">Tin dịch vụ</Typography>
            <Typography variant="body2">Tin Y Tế</Typography>
            <Typography variant="body2">Y Học thường thức</Typography>
          </Stack>
          <Stack flexDirection="column" maxWidth="33.3333%" flex="33.3333%">
            <Typography variant="label2">Về chúng tôi </Typography>
            <Typography variant="body2">Giới thiệu</Typography>
            <Typography variant="body2">Điều khoản dịch vụ</Typography>
            <Typography variant="body2">Chính sách bảo mật</Typography>
            <Typography variant="body2">Quy định sử dụng</Typography>
          </Stack>
          <Stack flexDirection="column" maxWidth="33.3333%" flex="33.3333%">
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              width="100%"
              gap="13px 16px"
            >
              <Box
                width="100px"
                component="img"
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdadangky.a0a8489c.png&w=1920&q=75"
                alt=""
              />
              <Box
                width="100px"
                component="img"
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbocongthuong.53714ee6.png&w=1920&q=75"
                alt=""
              />
              <Box
                width="100px"
                component="img"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Ficon_ios.svg%3Ft%3D11111111&w=1920&q=75"
                alt=""
              />
              <Box
                width="100px"
                component="img"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Ficon_google_play.svg%3Ft%3D1111111&w=1920&q=75"
                alt=""
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
