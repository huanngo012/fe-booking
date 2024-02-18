import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { images } from "../../assets";
import React from "react";
import { InfoSectionProps } from "./module";
import { paddingScreen } from "../../utils/constant";
import { BsArrowRight } from "react-icons/bs";
import { theme } from "../../themes/Theme";

const InfoSection = React.forwardRef(
  ({ infoIsVisible }: InfoSectionProps, ref) => {
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
    const flexDirection = isDesktop ? "row" : "column";
    const paddingContainer = isTablet ? "15.5px 40px 35.5px" : "10px";
    const widthCard = isTablet ? "33%" : "100%";
    const widthStatisticInfo = isTablet
      ? isDesktop
        ? "16.66%"
        : "25%"
      : "33.33%";

    return (
      <Box className="info__wrapper" sx={paddingScreen} ref={ref}>
        <Box className="info__container" padding={paddingContainer}>
          <Box className="info__top">
            <Stack
              flexDirection={flexDirection}
              alignItems="flex-start"
              gap="16px"
            >
              <Stack
                flexDirection="column"
                flex="4"
                className="reveal fade-left"
              >
                <Box
                  width="170px"
                  component="img"
                  src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F87fec770-22b1-4299-9408-66485cbf4762-medpro-logo.webp&w=256&q=75"
                  alt=""
                />
                <Typography variant={isTablet ? "h3" : "h5"}>
                  Đặt khám nhanh
                </Typography>
              </Stack>
              <Stack
                flexDirection="row"
                gap="4px"
                flex="8"
                className="reveal fade-right"
              >
                <Typography variant={isTablet ? "body2" : "body3"}>
                  <b>Medpro </b>
                  cung cấp dịch vụ đặt lịch khám bệnh và chăm sóc sức khỏe trực
                  tuyến tại các bệnh viện hàng đầu Việt Nam như Bệnh viện Đại
                  học Y Dược TP.HCM, Bệnh viện Chợ Rẫy và Bệnh viện Nhi Đồng,
                  giúp người dùng tự lựa chọn dịch vụ và bác sĩ theo nhu cầu của
                  mình.
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box className="info__bottom reveal fade-in">
            <Box className="info__card" width={widthCard}>
              <Stack flexDirection="column" gap="16px" height="430px">
                <Box
                  maxHeight="300px"
                  borderRadius="16px"
                  component="img"
                  src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F1fa0fe14-3109-4798-85cd-fe818ba1caea-intro-1.webp&w=1920&q=75"
                  alt=""
                />
                <Typography variant={isTablet ? "h5" : "h6"}>
                  Vì thời gian của bạn là vô giá
                </Typography>
                <Typography variant={isTablet ? "body2" : "body3"}>
                  Bệnh nhân chủ động chọn thông tin đặt khám (ngày khám và giờ
                  khám)
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  display: "flex",
                  gap: "8px",
                  borderRadius: "30px",
                }}
              >
                <Typography variant="button2">Xem thêm</Typography>
                <BsArrowRight size="20px" />
              </Button>
            </Box>
            <Box className="info__card" width={widthCard}>
              <Stack flexDirection="column" gap="16px" height="430px">
                <Box
                  maxHeight="300px"
                  borderRadius="16px"
                  component="img"
                  src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ff73049d8-8a7a-4fb9-886c-35b1c8c11b61-intro-2.webp&w=1920&q=75"
                  alt=""
                />
                <Typography variant={isTablet ? "h5" : "h6"}>
                  Vun đắp sức khỏe cho mọi nhà
                </Typography>
                <Typography variant={isTablet ? "body2" : "body3"}>
                  Bệnh nhân sẽ nhận phiếu khám trực tuyến ngay trên phần mềm
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  display: "flex",
                  gap: "8px",
                  borderRadius: "30px",
                }}
              >
                <Typography variant="button2">Xem thêm</Typography>
                <BsArrowRight size="20px" />
              </Button>
            </Box>
            <Box className="info__card" width={widthCard}>
              <Stack flexDirection="column" gap="16px" height="430px">
                <Box
                  maxHeight="300px"
                  borderRadius="16px"
                  component="img"
                  src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ff0697eac-3c5a-492f-858d-2a2395db0a41-intro-3.webp&w=1920&q=75"
                  alt=""
                />
                <Typography variant={isTablet ? "h5" : "h6"}>
                  Vươn tầm tay kéo gần mọi khoảng cách
                </Typography>
                <Typography variant={isTablet ? "body2" : "body3"}>
                  Người dùng chọn và thực hiện thanh toán trên phần mềm
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  display: "flex",
                  gap: "8px",
                  borderRadius: "30px",
                }}
              >
                <Typography variant="button2">Xem thêm</Typography>
                <BsArrowRight size="20px" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          className="statistic_container reveal fade-in"
          padding={paddingContainer}
        >
          <Typography
            variant={isTablet ? "h4" : "h5"}
            textAlign="center"
            color="var(--white)"
          >
            Thống kê
          </Typography>
          <Stack
            flexDirection="row"
            justifyContent="center"
            rowGap="20px"
            flexWrap="wrap"
            marginTop="16px"
          >
            {statisticInfo.map((el, index) => (
              <Stack
                key={index}
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                gap="16px"
                width={widthStatisticInfo}
              >
                <Box component="img" src={el.icon} alt={el.title} width="50%" />
                <Stack flexDirection="column" gap="4px" textAlign="center">
                  <Typography
                    variant={isTablet ? "h4" : "h6"}
                    color="var(--white)"
                  >
                    {el.number}
                  </Typography>
                  <Typography
                    variant={isTablet ? "label1" : "label3"}
                    color="#ddedff"
                  >
                    {el.title}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }
);

export default InfoSection;

const statisticInfo = [
  {
    id: 1,
    title: "Lượt khám",
    icon: images.examinationEars,
    number: "2.2M+",
  },
  {
    id: 2,
    title: "Bệnh viện",
    icon: images.hospital,
    number: "40+",
  },
  {
    id: 3,
    title: "Cơ sở Y tế",
    icon: images.clinic,
    number: "50+",
  },
  {
    id: 4,
    title: "Bác sĩ",
    icon: images.doctor,
    number: "1000+",
  },
  {
    id: 5,
    title: "Lượt truy cập tháng",
    icon: images.location,
    number: "138K+",
  },
  {
    id: 6,
    title: "Lượt truy cập trong ngày",
    icon: images.eye,
    number: "4600+",
  },
];
