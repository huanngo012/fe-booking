import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { HospitalSectionProps } from "./module";
import { renderStartFromNumber } from "../../utils/helper";
import { theme } from "../../themes/Theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getClinicsTop } from "../../redux/reducer/Clinic";
import CustomSkeleton from "../../components/skeleton";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";

const HospitalSection = React.forwardRef(
  ({ hospitalIsVisible }: HospitalSectionProps, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { clinicsTop, loadingClinic, totalClinic } = useSelector(
      (state: any) => state.clinic
    );

    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
    const heightImg = isTablet ? (isDesktop ? "200px" : "150px") : "100px";
    const slidesToShow = isTablet ? (isDesktop ? 5 : 4) : 3;
    const settings: Settings = {
      dots: false,
      infinite: false,
      speed: 1000,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
    };

    const getApiClinics = async () => {
      dispatch(getClinicsTop({ limit: 10, page: 1 }));
    };
    useEffect(() => {
      getApiClinics();
    }, []);
    return (
      <Box
        className="hospital-section__wrapper reveal fade-left"
        sx={{
          padding: {
            oversize: "0 160px",
            tablet: "0 64px",
            mobile: "0",
          },
        }}
        ref={ref}
      >
        <Box textAlign="center">
          <Typography variant="h4" color="var(--primary)">
            Bệnh viện tiêu biểu
          </Typography>
          <Typography variant="label1" color="#858585">
            {`Đặt lịch khám với hơn ${totalClinic} bệnh viện trên khắp cả nước`}
          </Typography>
        </Box>
        <Box width="100%">
          <Slider
            className={isTablet ? "custom-slider" : "custom-slider-1"}
            {...settings}
          >
            {!loadingClinic
              ? clinicsTop?.map((el: any, index: any) => (
                  <Box key={index} padding="10px">
                    <Box
                      className="hospital-section__card"
                      onClick={() => navigate(`${path.HOSPITALS}/${el._id}`)}
                    >
                      <Stack width="100%" alignItems="center">
                        <Box
                          width={heightImg}
                          minHeight={heightImg}
                          maxHeight={heightImg}
                          borderRadius="16px"
                          component="img"
                          src={el.logo}
                          alt={el.name}
                          sx={{
                            transition: "all 0.15s ease-in",
                          }}
                        />
                      </Stack>
                      <Box
                        component="span"
                        sx={{ display: "flex", height: "16px" }}
                      >
                        {renderStartFromNumber(el?.totalRatings, 16)?.map(
                          (el, index) => <Box key={index}>{el}</Box>
                        )}
                      </Box>
                      <Typography
                        variant={isTablet ? "label2" : "label3"}
                        className="truncate_2"
                      >
                        {el.name}
                      </Typography>
                      <Typography
                        variant={isTablet ? "body2" : "body3"}
                        color="var(--text-secondary)"
                        className="truncate_2"
                      >
                        {el?.address?.detail ? `${el?.address?.detail},` : ""}{" "}
                        {el?.address?.ward ? `${el?.address?.ward},` : ""}{" "}
                        {el?.address?.district
                          ? `${el?.address?.district},`
                          : ""}
                        {el?.address?.province}
                      </Typography>
                    </Box>
                  </Box>
                ))
              : [...Array(10)].map((item, index: number) => (
                  <CustomSkeleton
                    key={index}
                    customKey={`skeleton__card-hospital-section-${index}`}
                    variant="card-hospital-section"
                  />
                ))}
          </Slider>
        </Box>
      </Box>
    );
  }
);

export default HospitalSection;

const sliderInfo = [
  {
    id: 1,
    name: "Bệnh viện Đại học Y Dược 2",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fa9c2ecbe-fa5a-4216-936b-705c1555b661-leloi.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Bệnh viện Nhi Đồng Thành Phố",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Bệnh viện Chợ Rẫy",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Đặt khám theo bác sĩ",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Đặt khám theo bác sĩ",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Đặt khám theo bác sĩ",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
];
