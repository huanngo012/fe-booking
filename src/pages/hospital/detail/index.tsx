import "./style.scss";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PiClock } from "react-icons/pi";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { theme } from "../../../themes/Theme";
import MapBox from "../../../components/map";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import * as apis from "../../../apis";
import { paddingScreen, path } from "../../../utils/constant";
import DoctorBody from "../../doctor/DoctorBody";
import Comment from "../../../components/comment";
import { useDispatch, useSelector } from "react-redux";
import useNotification from "../../../hooks/useNotification";
import { resetClinicStatus } from "../../../redux/reducer/Clinic";
import { AppDispatch } from "../../../redux/store";
import PopupCreateComment from "../../../components/comment/PopupCreateComment";
import Loading from "../../../components/loading";

const HospitalDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { displayNotification } = useNotification();
  const { successAction, errorAction } = useSelector(
    (state: any) => state.clinic
  );

  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const widthLeft = isDesktop ? "30%" : "100%";
  const widthRight = isDesktop ? "70%" : "100%";

  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [payload, setPayload] = useState<any>({});

  const handleLinkClick = (linkText: string) => {
    setActiveLink(linkText);
  };

  const [clinic, setClinic] = useState<any>(null);

  const fetchClinic = async () => {
    if (id) {
      const response: any = await apis.apiGetClinic(id);
      if (response.success) {
        setClinic(response?.data);
        setPayload((prev: any) => ({ ...prev, clinicID: response?.data?._id }));
      } else {
        navigate(path.HOSPITALS);
        return null;
      }
    }
  };

  useEffect(() => {
    fetchClinic();
  }, [id, successAction]);

  const addressClinic = `${clinic?.address?.detail ? `${clinic?.address?.detail}, ` : ""} ${clinic?.address?.ward ? `${clinic?.address?.ward}, ` : ""} ${clinic?.address?.district ? `${clinic?.address?.district}, ` : ""}${clinic?.address?.province} `;

  // useEffect(() => {
  //   if (successAction || errorAction) {
  //     if (successAction) {
  //       setPayload({});
  //     }
  //     displayNotification({
  //       message: errorAction || successAction,
  //       severity: successAction ? "success" : "error",
  //       title: successAction ? "Thành công" : "Thất bại",
  //     });
  //     dispatch(resetClinicStatus());
  //   }
  // }, [successAction, errorAction]);

  return (
    <>
      {clinic ? (
        <Stack
          alignItems="center"
          className="hospital__wrapper"
          sx={paddingScreen}
        >
          <Stack
            flexDirection="column"
            gap="24px"
            maxWidth="var(--max-width)"
            width="100%"
          >
            <Box role="presentation" paddingTop="20px">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color:
                      activeLink === "Trang chủ"
                        ? "var(--primary)"
                        : "var(--text-primary)",
                  }}
                  onClick={() => handleLinkClick("Trang chủ")}
                >
                  <Typography variant="label2" color="var(---secondary)">
                    Trang chủ
                  </Typography>
                </Link>
                <Link
                  to={path.HOSPITALS}
                  style={{
                    textDecoration: "none",
                    color:
                      activeLink === "Bệnh viện"
                        ? "var(--primary)"
                        : "var(--text-primary)",
                  }}
                  onClick={() => handleLinkClick("Bệnh viện")}
                >
                  <Typography variant="label2" color="var(---secondary)">
                    Bệnh viện
                  </Typography>
                </Link>
                <Link
                  to=""
                  style={{
                    textDecoration: "none",
                    color: "var(--primary)",
                  }}
                >
                  <Typography variant="button2">{clinic?.name}</Typography>
                </Link>
              </Breadcrumbs>
            </Box>
            <Stack flexDirection="row" flexWrap="wrap" rowGap="24px">
              <Stack
                flex={widthLeft}
                maxWidth={widthLeft}
                padding="0 10px"
                maxHeight="500px"
              >
                <Stack
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-around"
                  borderRadius="16px"
                  sx={{ backgroundColor: "var(--white)" }}
                  padding="35px"
                  gap="16px"
                  height="100%"
                >
                  <Stack flexDirection="column" alignItems="center" gap="8px">
                    <Box
                      component="img"
                      src={clinic?.logo}
                      alt=""
                      width="150px"
                    />
                    <Typography variant="label1" color="var(--primary)">
                      {clinic?.name}
                    </Typography>
                  </Stack>
                  <Divider
                    sx={{
                      width: "100%",
                      height: "1px",
                      backgroundColor: "var(--divider-color)",
                    }}
                  />
                  <Stack
                    flexDirection="column"
                    alignItems="flex-start"
                    gap="16px"
                  >
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                      color="var(--text-primary)"
                    >
                      <CiLocationOn color="#df8e1c" size={32} />
                      {addressClinic}
                    </Typography>
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                      color="var(--text-primary)"
                    >
                      <PiClock color="#df8e1c" size="20px" />
                      Thứ 2 - Thứ 6 (06:00- 16:30); Thứ 7 (06:00-11:30)
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        display: "flex",
                        gap: "4px",
                        borderRadius: "30px",
                        width: "100%",
                      }}
                    >
                      <Typography variant="label1">Đặt khám ngay</Typography>
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                flex={widthRight}
                maxWidth={widthRight}
                padding="0 10px"
                maxHeight="500px"
              >
                <Slider className="custom-slider-1" {...settings}>
                  {clinic?.images &&
                    clinic?.images?.map((el: any, index: any) => (
                      <Box key={index}>
                        <Box
                          component="img"
                          src={el}
                          alt=""
                          width="100%"
                          height="101%"
                          borderRadius="16px"
                        />
                      </Box>
                    ))}
                </Slider>
              </Stack>
              <Stack
                flex={widthLeft}
                maxWidth={widthLeft}
                padding="0 10px"
                gap="24px"
              >
                <Stack
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-around"
                  borderRadius="16px"
                  sx={{ backgroundColor: "var(--white)" }}
                  padding="35px"
                  gap="24px"
                >
                  <Stack
                    flexDirection="column"
                    alignItems="flex-start"
                    gap="16px"
                  >
                    <Typography
                      variant="h6"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                      color="var(--text-primary)"
                    >
                      Mô tả
                    </Typography>
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                      color="var(--text-primary)"
                    >
                      {clinic?.description}
                    </Typography>
                  </Stack>
                </Stack>
                <MapBox address={addressClinic} />
              </Stack>
              <Stack flex={widthRight} maxWidth={widthRight} padding="0 10px">
                <DoctorBody nameClinic={clinic?.name} />
              </Stack>
            </Stack>
            <Comment
              ratings={clinic?.ratings}
              totalRatings={clinic?.totalRatings}
              clinicID={clinic?._id}
              popUpComment={
                <PopupCreateComment payload={payload} setPayload={setPayload} />
              }
            />
          </Stack>
        </Stack>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HospitalDetailPage;

const settings: Settings = {
  dots: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
};
