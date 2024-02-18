import {
  Box,
  Button,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./style.scss";
import { images } from "../../../assets";
import { Fragment, useEffect, useState } from "react";
import { paddingScreen, path } from "../../../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import LanguagePopUp from "./LanguagePopUp";
import { theme } from "../../../themes/Theme";
import NavbarPopUp from "./NavbarPopUp";
import { useSelector } from "react-redux";

import ProfilePopup from "./ProfilePopup";
const { FacebookIcon, TiktokIcon, YoutubeIcon, PhoneIcon, UserIcon } = images;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const displayDesktop = isDesktop ? "flex" : "none";
  const displayMobile = isDesktop ? "none" : "flex";

  const { isLoggedIn } = useSelector((state: any) => state.auth);

  let oldScrollY = 0;

  const [tab, setTabs] = useState<any>("/");

  const [direction, setDirection] = useState<any>("up");

  const controlDirection = () => {
    if (window.scrollY > oldScrollY) {
      setDirection("down");
    } else {
      setDirection("up");
    }
    oldScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlDirection);
    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, []);

  const handleScroll = (value: string) => {
    const targetElement = document.getElementById(value);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offset = 80;
      window.scrollTo({
        top: targetPosition - offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const pathName = location?.pathname.split("/")?.[1];
    if (pathName === "user") {
      setTabs(false);
      return;
    }
    if (pathName) {
      setTabs(`/${pathName}`);
      return;
    }
    setTabs("/");
  }, [location?.pathname]);

  const handleChangeTab = (event: React.SyntheticEvent, value: string) => {
    setTabs(value);
    navigate(value);
  };

  return (
    <Box className="header__sticky" sx={paddingScreen}>
      <Box className="header__container">
        <Box
          onClick={() => navigate(path.HOME)}
          width="150px"
          component="img"
          src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fheader_logo.svg&w=1920&q=75"
          alt=""
          sx={{ cursor: "pointer" }}
        />
        <Box className="header__menu">
          <Box
            display={displayDesktop}
            className={
              direction === "down"
                ? "header__menu-top-without-network"
                : "header__menu-top"
            }
          >
            <Stack flexDirection="row" alignItems="center">
              {network.map((el, index) => (
                <Fragment key={index}>
                  <Box sx={{ padding: "0 12px", position: "relative" }}>
                    <Link
                      href={el.link}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      target="_blank"
                    >
                      {el.icon}
                      <Typography variant="label2" color="#003553">
                        {el.name}
                      </Typography>
                    </Link>
                  </Box>
                  {index !== network.length - 1 && "|"}
                </Fragment>
              ))}
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              gap="15px"
              height="55px"
              position="relative"
            >
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  gap: "4px",
                  background: "#ffb54a",
                  borderRadius: "30px",
                  ":hover": {
                    background: "#df8e1c",
                  },
                }}
                onClick={() => handleScroll("downloadSection")}
              >
                <PhoneIcon />
                <Typography variant="button2">Tải ứng dụng</Typography>
              </Button>
              {!isLoggedIn ? (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    display: "flex",
                    gap: "4px",
                    borderRadius: "30px",
                  }}
                  onClick={() => navigate(path.LOGIN)}
                >
                  <UserIcon />
                  <Typography variant="button2">Tài khoản</Typography>
                </Button>
              ) : (
                <ProfilePopup />
              )}

              <LanguagePopUp />
            </Stack>
          </Box>
          <Box className="header__menu-bottom">
            <Stack
              flexDirection="row"
              gap="13px"
              minWidth="180px"
              display={displayDesktop}
            >
              <Box
                component="img"
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhp.a16c51cc.svg&w=1920&q=75"
                alt=""
              />
              <Stack flexDirection="column" display={displayDesktop}>
                <Typography variant="label2">Hỗ trợ đặt khám</Typography>
                <Typography variant="h5" color="#ffb54a">
                  1900 2115
                </Typography>
              </Stack>
            </Stack>
            <Stack
              flexDirection="row"
              gap="13px"
              width="100%"
              justifyContent="flex-end"
              alignItems="center"
              display={displayDesktop}
            >
              <Tabs value={tab} onChange={handleChangeTab} defaultValue={tab}>
                {menu?.map((item, index) => (
                  <Tab
                    key={index}
                    value={item?.path}
                    label={
                      <Typography variant="label2">{item?.title}</Typography>
                    }
                  />
                ))}
              </Tabs>
            </Stack>
            <Stack
              flexDirection="row"
              gap="13px"
              width="100%"
              justifyContent="flex-end"
              alignItems="center"
              display={displayMobile}
              position="relative"
            >
              <LanguagePopUp />
              {isLoggedIn && <ProfilePopup />}

              <NavbarPopUp
                tabs={menu}
                handleNav={handleChangeTab}
                activeLink={tab}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

const menu = [
  {
    id: 1,
    title: "Trang chủ",
    path: path.HOME,
  },
  {
    id: 2,
    title: "Cơ sở y tế",
    path: path.HOSPITALS,
  },
  {
    id: 3,
    title: "Chuyên khoa",
    path: path.SPECIALTIES,
  },
  {
    id: 4,
    title: "Bác sĩ",
    path: path.DOCTORS,
  },
  {
    id: 5,
    title: "Tin tức",
    path: path.NEWS,
  },
  {
    id: 6,
    title: "Về chúng tôi",
    path: path.ABOUT,
  },
];

const network = [
  {
    id: 1,
    name: "Tiktok",
    icon: <TiktokIcon fill="#003553" />,
    link: "https://www.tiktok.com/@medprovn",
  },
  {
    id: 2,
    name: "Facebook",
    icon: <FacebookIcon fill="#003553" />,
    link: "https://www.facebook.com/www.medpro.vn",
  },
  {
    id: 1,
    name: "Youtube",
    icon: <YoutubeIcon fill="#003553" />,
    link: "https://www.youtube.com/@medpro-datkhamnhanh",
  },
];
