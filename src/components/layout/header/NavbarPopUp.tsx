import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { theme } from "../../../themes/Theme";
import { path } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/reducer/Auth";

interface NavbarPopUpProps {
  tabs?: { title: string; path: string }[];
  handleNav?: any;
  activeLink?: string | null;
}

const NavbarPopUp = ({ tabs, handleNav, activeLink }: NavbarPopUpProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const widthPopUp = isTablet ? "50%" : "100%";
  const anchorRefNav = React.useRef(null);
  const [openNav, setOpenNav] = useState(false);
  const handleToggleNav = () => {
    setOpenNav((prevOpen) => !prevOpen);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };
  const getTransformValue = () => {
    const value: string = `${window.scrollY + 56}px`;
    document.documentElement.style.setProperty("--transform-value", value);
  };
  useEffect(() => {
    window.addEventListener("scroll", getTransformValue);
    return () => {
      window.removeEventListener("scroll", getTransformValue);
    };
  }, []);

  return (
    <Badge
      sx={{ cursor: "pointer", display: { mobile: "flex", desktop: "none" } }}
      ref={anchorRefNav}
      onClick={handleToggleNav}
    >
      <FiMenu size={24} />
      <Popper
        open={openNav}
        anchorEl={anchorRefNav.current}
        sx={{
          padding: "32px",
          zIndex: "1000",
          boxShadow: "none !important",
          width: widthPopUp,
        }}
      >
        <ClickAwayListener onClickAway={handleCloseNav}>
          <Paper
            sx={{
              padding: "12px",
              borderRadius: "8px",
              boxShadow: "0px 1px 8px 0px rgba(30, 32, 32, 0.12) !important",
            }}
          >
            <MenuList
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
              id="menu-list-grow"
            >
              {tabs?.map((el, index) => {
                return (
                  <MenuItem
                    onClick={(e) => handleNav(e, el.path)}
                    key={index}
                    sx={{
                      borderRadius: "8px",
                    }}
                    selected={activeLink === el.path}
                  >
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      width={"100%"}
                      gap={"4px"}
                    >
                      <Typography id="asdsada" variant="body2">
                        {el.title}
                      </Typography>
                    </Stack>
                  </MenuItem>
                );
              })}
            </MenuList>
            <Divider
              sx={{
                borderBottom: "1px solid var(--border-color)",
                width: "100%",
                marginBottom: "16px",
              }}
            />
            {isLoggedIn ? (
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  gap: "4px",
                  width: "100%",
                  background:
                    "linear-gradient(83.63deg,#ff3f33 33.34%,#ff675c 113.91%);",
                }}
                onClick={() => dispatch(logout())}
              >
                <Typography variant="button2">Đăng xuất</Typography>
              </Button>
            ) : (
              <Stack flexDirection="row" alignItems="center" gap="16px">
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    display: "flex",
                    gap: "4px",
                    width: "100%",
                  }}
                  onClick={() => navigate(`${path.LOGIN}?state=signUp`)}
                >
                  <Typography variant="button2">Đăng ký</Typography>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    display: "flex",
                    gap: "4px",
                    width: "100%",
                  }}
                  onClick={() => navigate(path.LOGIN)}
                >
                  <Typography variant="button2">Đăng nhập</Typography>
                </Button>
              </Stack>
            )}

            <Divider
              sx={{
                borderBottom: "1px solid var(--border-color)",
                width: "100%",
                margin: "16px 0",
              }}
            />
            <Stack flexDirection="column" alignItems="center" gap="16px">
              <Typography variant="label1">Tải ứng dụng</Typography>
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
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Badge>
  );
};

export default NavbarPopUp;
