import { ReactNode, useEffect, useLayoutEffect, useState } from "react";

import Header from "./header";
import Footer from "./footer";
import { Box, useMediaQuery } from "@mui/material";
import { theme } from "../../themes/Theme";
import { images } from "../../assets";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiRefreshToken } from "../../apis";
import { AppDispatch } from "../../redux/store";
import { login, logout } from "../../redux/reducer/Auth";
import { getPatients } from "../../redux/reducer/Patient";

const { SrollUpIcon } = images;

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showScrollButton, setShowScrollButton] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const rightButtonScrollToTop = isDesktop ? "56px" : "28px";
  const maringTop = isDesktop ? "135px" : "66px";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    });
  }, []);

  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { isLoggedIn, current } = useSelector((state: any) => state.auth);
  const refreshToken = async () => {
    const rs: any = await apiRefreshToken();
    if (rs?.success) {
      dispatch(
        login({
          isLoggedIn: true,
          token: rs.accessToken,
          current: current,
        })
      );
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) {
        refreshToken();
      }
    }, 1500);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(getPatients({}));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        height: "100%",
        background: "#e8f2f7",
      }}
    >
      <Header />
      <Box marginTop={maringTop}></Box>
      {children}
      <Footer />
      {showScrollButton && (
        <SrollUpIcon
          fill="var(--primary)"
          style={{
            position: "fixed",
            bottom: "56px",
            right: rightButtonScrollToTop,
            cursor: "pointer",
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </Box>
  );
};

export default Layout;
