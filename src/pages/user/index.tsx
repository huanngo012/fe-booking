import "./style.scss";
import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { paddingScreen, path, tabsUser } from "../../utils/constant";

import TabProfile from "./TabProfile";
import TabRecord from "./TabRecord";
import { theme } from "../../themes/Theme";
import TabBooking from "./TabBooking";
import { useLocation, useNavigate } from "react-router-dom";
import TabPassword from "./TabPassword";

const UserPage = () => {
  const navigate = useNavigate();
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));

  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleLinkClick = (linkText: string) => {
    setActiveLink(linkText);
  };

  const handleChangeTab = (_: React.SyntheticEvent, path: string) => {
    navigate(path);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [param, setParam] = useState<any>(searchParams?.get("state"));
  useEffect(() => {
    setParam(searchParams?.get("state"));
  }, [searchParams]);

  const handleRenderStep = () => {
    switch (param) {
      case "profile":
        return <TabProfile />;
      case "record":
        return <TabRecord />;
      case "booking":
        return <TabBooking />;
      case "password":
        return <TabPassword />;
      default:
        setParam("profile");
        return <TabProfile />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--white)",
        flex: 1,
        paddingBottom: "30px",
      }}
    >
      <Stack alignItems="center" sx={paddingScreen}>
        <Stack
          flexDirection="column"
          gap="24px"
          maxWidth="var(--max-width)"
          width="100%"
        >
          <Box role="presentation" paddingTop="20px">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                href="/"
                sx={{
                  textDecoration: "none",
                  color:
                    activeLink === "Trang chủ"
                      ? "var(--primary)"
                      : "var(--text-primary)",
                  "&:hover": {
                    color: "var(--blue-700)",
                  },
                }}
                onClick={() => handleLinkClick("Trang chủ")}
              >
                <Typography variant="label2" color="var(---secondary)">
                  Trang chủ
                </Typography>
              </Link>
              <Link
                href={path.HOSPITALS}
                sx={{
                  textDecoration: "none",
                  color: "var(--primary)",
                  "&:hover": {
                    color: "var(--blue-700)",
                  },
                }}
                onClick={() => handleLinkClick("Thông tin tài khoản")}
              >
                <Typography variant="label2" color="var(---secondary)">
                  Thông tin tài khoản
                </Typography>
              </Link>
            </Breadcrumbs>
          </Box>
          <Grid container className="profile__wrapper">
            <Grid
              item
              oversize={3}
              desktop={3}
              tablet={3}
              mobile={3}
              display={isTablet ? "block" : "none"}
              className="profile__left"
            >
              <Box className="profile__tabs">
                {tabsUser.map((tab, index) => (
                  <Box
                    key={index}
                    onClick={(e) =>
                      handleChangeTab(e, `${path.USER}?state=${tab.path}`)
                    }
                    component="button"
                    sx={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={2.5}
                      className={`profile__tabs-item ${
                        param === tab.path && "active"
                      }`}
                    >
                      {tab.icon}
                      <Typography variant="label2">{tab.text}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              oversize={9}
              desktop={9}
              tablet={9}
              mobile={12}
              paddingLeft={isTablet ? "30px" : "0s"}
            >
              <Box>{handleRenderStep()}</Box>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserPage;
