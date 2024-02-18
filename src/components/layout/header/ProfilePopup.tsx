import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { images } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../redux/reducer/Auth";
import { AppDispatch } from "../../../redux/store";
import { IoLogOut } from "react-icons/io5";
import { theme } from "../../../themes/Theme";
import { useNavigate } from "react-router-dom";
import { path, tabsUser } from "../../../utils/constant";
const { UserIcon, UserAvatar, defaultAvt } = images;

const ProfilePopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { current } = useSelector((state: any) => state.auth);
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <Stack flexDirection="column" position="relative">
      <ClickAwayListener onClickAway={() => setShowMenu(false)}>
        {isTablet ? (
          <Button
            variant="outlined"
            color="primary"
            sx={{
              display: "flex",
              gap: "4px",
              borderRadius: "30px",
            }}
            onClick={() => setShowMenu(!showMenu)}
          >
            <UserIcon />
            <Typography variant="button2">{current?.fullName}</Typography>
          </Button>
        ) : (
          <Avatar
            sx={{ width: 32, height: 32, cursor: "pointer" }}
            src={current?.avatar || defaultAvt}
            alt="User Avatar"
            onClick={() => setShowMenu(!showMenu)}
          />
        )}
      </ClickAwayListener>
      <Box className="dropdown-list" display={showMenu ? "block" : "none"}>
        <Box className="dropdown-item">
          <UserAvatar />
          <Stack flexDirection="column">
            <Typography variant="body3">Xin chào,</Typography>
            <Typography variant="label1" color="var(--primary)">
              {current?.fullName}
            </Typography>
          </Stack>
        </Box>
        {tabsUser?.map((el, index) => (
          <Box
            key={index}
            className="dropdown-item"
            onClick={() => navigate(`${path.USER}?state=${el.path}`)}
          >
            {el.icon}
            <Typography variant="body1">{el.text}</Typography>
          </Box>
        ))}

        <Box
          className="dropdown-item"
          borderTop="1px solid var(--border-color)"
          onClick={() => dispatch(logout())}
        >
          <IoLogOut size={24} color="var(--red-300)" />
          <Typography variant="body1" color="var(--red-300)">
            Đăng xuất
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default ProfilePopup;
