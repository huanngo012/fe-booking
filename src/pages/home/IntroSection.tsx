import {
  Box,
  ClickAwayListener,
  Container,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../themes/Theme";
import Slider, { Settings } from "react-slick";
import { images } from "../../assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { IntroSectionProps } from "./module";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getClinics } from "../../redux/reducer/Clinic";
import { getDoctors } from "../../redux/reducer/Doctor";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constant";
import CustomSkeleton from "../../components/skeleton";

const { LocationIcon } = images;

const IntroSection = React.forwardRef(
  ({ introIsVisible }: IntroSectionProps, ref) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { clinics, loadingClinic } = useSelector(
      (state: any) => state.clinic
    );
    const { doctors, loadingDoctor } = useSelector(
      (state: any) => state.doctor
    );

    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
    const titleSize = isDesktop ? "h3" : "h5";
    const slidesToShow = isTablet ? (isDesktop ? 6 : 4) : 3;
    const heightCard = isTablet ? "160px !important" : "120px !important";
    const paddingCard = isTablet ? "28px 27px 26px" : "15px 13px";
    const sizeImg = isTablet ? "64px" : "32px";

    const settings: Settings = {
      dots: false,
      speed: 1000,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
    };

    const [indexList, setIndexList] = useState(0);

    const typing = () => {
      let search = document.querySelector("#text-input");
      let placeholder = "";
      let x = 0;
      search?.setAttribute("placeholder", "");
      let interval = setInterval(() => {
        placeholder += list[indexList][x];
        x++;
        search?.setAttribute("placeholder", placeholder);
        if (x > list[indexList].length - 1) {
          clearInterval(interval);
          setIndexList(indexList === list.length - 1 ? 0 : indexList + 1);
        }
      }, 200);
    };
    useEffect(() => {
      typing();
    }, [indexList]);

    const [searchLabel, setSearchLabel] = useState("");
    const [clinicsSearch, setClinicsSearch] = useState<any>({});
    const [doctorsSearch, setDoctorsSearch] = useState<any>({});
    const [openSearchRecommendation, setOpenSearchRecommendation] =
      useState(false);
    const handleOpenActionMenu = () => setOpenSearchRecommendation(true);
    const handleCloseActionMenu = () => setOpenSearchRecommendation(false);

    const debounceSearchLabel = useDebounce(searchLabel, 700);

    useEffect(() => {
      if (debounceSearchLabel !== "") {
        dispatch(
          getClinics({
            limit: 3,
            page: 1,
            name: searchLabel,
          })
        );
        dispatch(
          getDoctors({
            limit: 3,
            page: 1,
            fullName: searchLabel,
          })
        );
      }
    }, [debounceSearchLabel]);

    useEffect(() => {
      setClinicsSearch(clinics);
    }, [clinics]);

    useEffect(() => {
      setDoctorsSearch(doctors);
    }, [doctors]);

    return (
      <Box className="intro__wrapper " height="50vh" ref={ref}>
        <Box className="intro__banner">
          <Stack
            flexDirection="column"
            alignItems="center"
            gap="16px"
            textAlign="center"
            padding="16px"
            className="reveal fade-in"
          >
            <Typography variant="h5" color="var(--primary)">
              Nền tảng công nghệ
            </Typography>
            <Typography variant={titleSize} color="var(---secondary)">
              Kết nối người dân với Cơ sở - Dịch vụ Y tế
            </Typography>

            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              position="relative"
              width="100%"
            >
              <ClickAwayListener onClickAway={handleCloseActionMenu}>
                <Box width="100%">
                  <TextField
                    id="text-input"
                    value={searchLabel}
                    onChange={(e) => {
                      setSearchLabel(e.target.value);
                    }}
                    onClick={() => handleOpenActionMenu()}
                    autoComplete="off"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        position: "relative",
                        backgroundColor: "white",
                        borderRadius: "30px",
                        height: "60px",
                        boxShadow: "4px 8px 30px 0 rgba(177,196,218,.35)",
                        padding: "11px 20px",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HiMagnifyingGlass
                            size={24}
                            color="var(--text-tertiary)"
                          />
                        </InputAdornment>
                      ),
                      endAdornment: searchLabel !== "" && (
                        <IoMdClose
                          size={24}
                          color="var(--text-tertiary)"
                          cursor="pointer"
                          onClick={() => {
                            setSearchLabel("");
                          }}
                        />
                      ),
                    }}
                  />
                  {searchLabel !== "" && openSearchRecommendation && (
                    <Stack
                      className="search-recommend-result"
                      maxHeight="350px"
                      direction="column"
                      gap={0.5}
                    >
                      <Stack direction="column" gap={0.5}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          padding="10px"
                          sx={{ backgroundColor: "var(--blue-60)" }}
                        >
                          <Typography variant="label4" color="var(--secondary)">
                            Cơ sở y tế
                          </Typography>
                          <Typography
                            variant="label4"
                            component="i"
                            color="var(--primary)"
                          >
                            Xem tất cả
                          </Typography>
                        </Stack>
                        {!loadingClinic ? (
                          clinicsSearch.success ? (
                            clinicsSearch?.data?.map((el: any, index: any) => (
                              <Box
                                key={index}
                                className="search__card"
                                gap="10px"
                                onClick={() =>
                                  navigate(`${path.HOSPITALS}/${el._id}`)
                                }
                              >
                                <Box
                                  width="40px"
                                  height="40px"
                                  component="img"
                                  src={el.logo}
                                  alt=""
                                />
                                <Stack
                                  flexDirection="column"
                                  gap="4px"
                                  alignItems="flex-start"
                                >
                                  <Typography variant="label4">
                                    {el.name}
                                  </Typography>
                                  <Typography
                                    variant="caption1"
                                    color="var(--text-tertiary)"
                                  >
                                    {el?.address?.detail
                                      ? `${el?.address?.detail},`
                                      : ""}{" "}
                                    {el?.address?.ward
                                      ? `${el?.address?.ward},`
                                      : ""}{" "}
                                    {el?.address?.district
                                      ? `${el?.address?.district},`
                                      : ""}
                                    {el?.address?.province}
                                  </Typography>
                                </Stack>
                              </Box>
                            ))
                          ) : (
                            <Container className="empty__container">
                              <img
                                src={images.emptyIcon}
                                alt="Empty"
                                width="20%"
                              />
                            </Container>
                          )
                        ) : (
                          [...Array(3)].map((item, index: number) => (
                            <CustomSkeleton
                              key={index}
                              customKey={`skeleton__card-search-${index}`}
                              variant="card-search"
                            />
                          ))
                        )}
                      </Stack>
                      <Stack direction="column" gap={0.5}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          padding="10px"
                          sx={{ backgroundColor: "var(--blue-60)" }}
                        >
                          <Typography variant="label4" color="var(--secondary)">
                            Bác sĩ
                          </Typography>
                          <Typography
                            variant="label4"
                            component="i"
                            color="var(--primary)"
                          >
                            Xem tất cả
                          </Typography>
                        </Stack>
                        {!loadingDoctor ? (
                          doctorsSearch.success ? (
                            doctorsSearch?.data?.map((el: any, index: any) => (
                              <Box
                                key={index}
                                className="search__card"
                                gap="10px"
                                onClick={() =>
                                  navigate(`${path.DOCTORS}/${el._id}`)
                                }
                              >
                                <Box
                                  width="40px"
                                  height="40px"
                                  component="img"
                                  src={el?._id?.avatar}
                                  alt=""
                                />
                                <Stack
                                  flexDirection="column"
                                  gap="4px"
                                  alignItems="flex-start"
                                >
                                  <Typography variant="label4">
                                    {el?.position} {el?._id?.fullName}
                                  </Typography>
                                  <Typography
                                    variant="caption1"
                                    color="var(--text-tertiary)"
                                  >
                                    {el?.clinicID?.name}
                                  </Typography>
                                  <Typography
                                    variant="caption1"
                                    color="var(--text-tertiary)"
                                  >
                                    {el?.specialtyID?.name}
                                  </Typography>
                                </Stack>
                              </Box>
                            ))
                          ) : (
                            <Container className="empty__container">
                              <img
                                src={images.emptyIcon}
                                alt="Empty"
                                width="20%"
                              />
                            </Container>
                          )
                        ) : (
                          [...Array(3)].map((item, index: number) => (
                            <CustomSkeleton
                              key={index}
                              customKey={`skeleton__card-search-${index}`}
                              variant="card-search"
                            />
                          ))
                        )}
                      </Stack>
                      <Stack direction="column" gap={0.5}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          padding="10px"
                          sx={{ backgroundColor: "var(--blue-60)" }}
                        >
                          <Typography variant="label2" color="var(--secondary)">
                            Chuyên khoa
                          </Typography>
                          <Typography
                            variant="label3"
                            component="i"
                            color="var(--primary)"
                          >
                            Xem tất cả
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}
                </Box>
              </ClickAwayListener>
            </Stack>
            <Typography variant="body1" color="var(---secondary)">
              Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
            </Typography>
          </Stack>
        </Box>
        <Box
          width="100%"
          margin="-6vh auto auto auto"
          maxWidth="calc(var(--max-width)-160px)"
          sx={{
            padding: {
              oversize: "0 160px",
              tablet: "0 64px",
              mobile: "0",
            },
          }}
          className="reveal fade-in"
        >
          <Slider
            className={isTablet ? "custom-slider" : "custom-slider-1"}
            {...settings}
          >
            {sliderInfo.map((el, index) => (
              <Box key={index} padding="10px">
                <Box
                  className="intro__card"
                  sx={{
                    padding: paddingCard,
                    height: heightCard,
                  }}
                >
                  <Box
                    component="img"
                    src={el.icon}
                    alt={el.name}
                    width={sizeImg}
                    sx={{
                      objectFit: "contain",
                    }}
                  />
                  <Typography
                    variant={isTablet ? "body2" : "body3"}
                    color="var(--secondary)"
                  >
                    {el.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    );
  }
);

export default IntroSection;

const sliderInfo = [
  { id: 1, name: "Đặt khám tại cơ sở", icon: images.booking },
  { id: 2, name: "Đặt khám theo bác sĩ", icon: images.examinationEars1 },
  { id: 3, name: "Tư vấn khám bệnh từ xa", icon: images.consult },
  { id: 4, name: "Đặt lịch xét nghiệm", icon: images.schedule },
  { id: 5, name: "Gói khám sức khỏe", icon: images.insurance },
  { id: 6, name: "Đặt lịch tiêm chủng", icon: images.injection },
  { id: 7, name: "Thanh toán viện phí", icon: images.pay },
];

const list = [
  "Tìm kiếm cơ sở y tế  ",
  "Tìm kiếm chuyên khoa  ",
  "Tìm kiếm bác sĩ  ",
];
