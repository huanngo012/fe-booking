import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { DownloadSectionProps } from "./module";
import React from "react";
import { paddingScreen } from "../../utils/constant";
import { theme } from "../../themes/Theme";

const DownloadSection = React.forwardRef(
  ({ downloadIsVisible }: DownloadSectionProps, ref) => {
    const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const flexDirection = isTablet ? "row" : "column";
    return (
      <Box display="flex" flexDirection="column" ref={ref}>
        <Box className="booking__wrapper">
          <Stack
            flexDirection={flexDirection}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            sx={paddingScreen}
            paddingTop="32px !important"
          >
            <Stack
              flexDirection="column"
              gap="16px"
              alignItems={isTablet ? "flex-start" : "center"}
              className="reveal fade-left"
            >
              <Typography
                variant={isTablet ? "h4" : "h6"}
                color="var(--primary)"
              >
                Đặt khám nhanh - Lấy số thứ tự trực tuyến
              </Typography>
              <Typography
                variant={isTablet ? "label1" : "label2"}
                color="var(--secondary)"
              >
                Bệnh nhân chủ động chọn thông tin đặt khám nhanh (ngày khám, giờ
                khám và cơ sở y tế). Bệnh nhân sẽ nhận lấy số thứ tự trực tuyến
                ngay trên phần mềm
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: "flex",
                  gap: "8px",
                  borderRadius: "30px",
                }}
              >
                <Typography variant={isTablet ? "label1" : "label2"}>
                  Đặt lịch ngay
                </Typography>
              </Button>
            </Stack>
            <Box
              width="50%"
              component="img"
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F6f37a10e-b338-4143-aa24-175529dad219-doctor.webp&w=1920&q=75"
              alt=""
            />
          </Stack>
          <Box className="booking__rectangle"></Box>
        </Box>
        <Box
          className="download__wrapper"
          sx={paddingScreen}
          id="downloadSection"
        >
          <Stack
            flexDirection="column"
            alignItems="center"
            gap="28px"
            maxWidth="var(--max-width)"
            margin="auto"
          >
            <Stack
              flexDirection="column"
              alignItems="center"
              gap="16px"
              className="reveal fade-in"
            >
              <Typography variant={isTablet ? "h4" : "h6"}>
                Tải ứng dụng Đặt khám nhanh{" "}
                <Typography
                  variant={isTablet ? "h4" : "h6"}
                  component="span"
                  color="var(--primary)"
                  sx={{ textTransform: "uppercase" }}
                >
                  Medpro
                </Typography>
              </Typography>
              <Stack
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap="16px"
              >
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
            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              width="100%"
              position="relative"
              display={isDesktop ? "flex" : "none"}
            >
              <Stack
                flexDirection="column"
                alignItems="center"
                justifyContent="space-around"
                gap="56px"
                flex="4"
                position="relative"
                right="4%"
                className="reveal fade-left"
              >
                <Stack
                  flexDirection="row"
                  justifyContent="flex-end"
                  gap="12px"
                  paddingRight="30px"
                >
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="label2" color="var(--secondary)">
                      Lấy số thứ tự khám nhanh trực tuyến
                    </Typography>
                    <Typography variant="body2" color="var(--text-secondary)">
                      Đăng ký khám / tái khám nhanh theo ngày.
                      <br /> Đăng ký khám theo bác sĩ chuyên khoa.
                      <br /> Tái khám theo lịch hẹn
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fbae71420-d9ef-48b7-91a9-0151c50c73da-fcf47d13-a9c5-4be8-aa6c-4d4e9b162c19-icon_dang_ky.svg.svg&w=1920&q=75"
                    alt=""
                    width="60px"
                  />
                </Stack>
                <Stack
                  flexDirection="row"
                  justifyContent="flex-end"
                  gap="12px"
                  paddingRight="90px"
                >
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="label2" color="var(--secondary)">
                      Tư vấn sức khỏe từ xa
                    </Typography>
                    <Typography variant="body2" color="var(--text-secondary)">
                      Tư vấn sức khỏe từ xa, cuộc gọi video với các bác sĩ
                      chuyên môn
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F9762607b-d91a-4c94-a673-bbc516680154-2.svg&w=1920&q=75"
                    alt=""
                    width="60px"
                  />
                </Stack>
                <Stack
                  flexDirection="row"
                  justifyContent="flex-end"
                  gap="12px"
                  paddingRight="30px"
                >
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="label2" color="var(--secondary)">
                      Tra cứu kết quả cận lâm sàng
                    </Typography>
                    <Typography variant="body2" color="var(--text-secondary)">
                      Tra cứu kết quả cận lâm sàng trực tuyến dễ dàng và tiện
                      lợi
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F770cc02d-88f4-4e82-b26a-493b35810a28-3.svg&w=1920&q=75"
                    alt=""
                    width="60px"
                  />
                </Stack>
              </Stack>
              <Box
                component="img"
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fellipse.a457aed3.png&w=1920&q=75"
                alt=""
                sx={{
                  position: "absolute",
                  width: "40%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                className="reveal fade-in"
              />
              <Box
                component="img"
                src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F30d7a0da-2878-48ec-84d5-8d2a6c0efa18-bg-phone.webp&w=1920&q=75"
                alt=""
                position="relative"
                flex="3"
                className="reveal fade-in"
              />
              <Stack
                flexDirection="column"
                alignItems="center"
                justifyContent="space-around"
                gap="56px"
                flex="4"
                position="relative"
                left="4%"
                className="reveal fade-right"
              >
                <Stack
                  flexDirection="row"
                  justifyContent="flex-start"
                  gap="12px"
                  paddingLeft="30px"
                >
                  <Box
                    component="img"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F000a18f1-7158-4631-bd03-db97a76fc203-4.svg&w=1920&q=75"
                    alt=""
                    width="60px"
                  />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="label2" color="var(--secondary)">
                      Thanh toán viện phí
                    </Typography>
                    <Typography variant="body2" color="var(--text-secondary)">
                      Đa dạng hệ thống thanh toán trực tuyến.
                      <br /> Hỗ trợ các ví điện tử thịnh hành hiện nay
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  flexDirection="row"
                  justifyContent="flex-start"
                  gap="12px"
                  paddingLeft="90px"
                >
                  <Box
                    component="img"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F4fff6c05-f49b-4f4a-a532-f2de15060877-5.svg&w=1920&q=75"
                    alt=""
                    width="60px"
                  />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="label2" color="var(--secondary)">
                      Chăm sóc Y tế tại nhà
                    </Typography>
                    <Typography variant="body2" color="var(--text-secondary)">
                      Dịch vụ Y tế tại nhà (điều dưỡng, xét nghiệm) chuyên
                      nghiệp, đáp ứng các nhu cầu chăm sóc Y tế tại nhà phổ
                      thông
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  flexDirection="row"
                  justifyContent="flex-start"
                  gap="12px"
                  paddingLeft="30px"
                >
                  <Box
                    component="img"
                    src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F02a98830-d4c2-41ec-a16a-5403e43f4e13-6.svg&w=1920&q=75"
                    alt=""
                    width="60px"
                  />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="label2" color="var(--secondary)">
                      Mạng lưới Cơ sở hợp tác
                    </Typography>
                    <Typography variant="body2" color="var(--text-secondary)">
                      Mạng lưới kết nối với các bệnh viện, phòng khám, phòng
                      mạch rộng khắp phủ sóng toàn quốc
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  }
);

export default DownloadSection;
