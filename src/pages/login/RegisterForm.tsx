import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { AppDispatch } from "../../redux/store";
import useNotification from "../../hooks/useNotification";
import { register } from "../../redux/reducer/Auth";
import { path } from "../../utils/constant";

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: any) => state.auth);
  const { displayNotification } = useNotification();

  const [payload, setPayload] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFullNameChange = (e: any) => {
    const fullNameValue = e.target.value;
    setPayload((prev) => ({ ...prev, fullName: fullNameValue }));
  };
  const handleEmailChange = (e: any) => {
    const emailValue = e.target.value;
    setPayload((prev) => ({ ...prev, email: emailValue }));
    if (emailValue.trim() === "") {
      setEmailError("");
    } else if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e: any) => {
    const passwordValue = e.target.value;
    setPayload((prev) => ({ ...prev, password: passwordValue }));

    // Check for empty password
    if (passwordValue.trim() === "") {
      setPasswordError("");
    } else if (passwordValue.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handlerSubmit = useCallback(async () => {
    if (!payload.fullName || !payload.email || !payload.password) {
      displayNotification({
        message: "Vui lòng nhập đầy đủ !!!",
        severity: "error",
        title: "Thất bại",
      });
      return;
    }
    dispatch(register(payload));
  }, [payload]);

  return (
    <Stack direction="column" alignItems="flex-start" gap="40px" width="100%">
      <Box width="100%" sx={{ textAlign: "center" }}>
        <Typography variant="h4">Đăng ký</Typography>
      </Box>
      <Box width="100%">
        <FormControl sx={{ width: "100%" }}>
          <Stack
            width="100%"
            direction="column"
            alignItems="flex-start"
            spacing="32px"
          >
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing="16px"
              width="100%"
            >
              <Box width="100%">
                <Stack direction="column" width="100%" spacing="8px">
                  <Stack direction="row" spacing="4px" alignItems="flex-end">
                    <Typography variant="label2">Họ tên</Typography>
                    <Typography variant="label2" color="var(--alert)">
                      *
                    </Typography>
                  </Stack>
                  <TextField
                    error={Boolean(fullNameError)}
                    helperText={fullNameError}
                    value={payload.fullName}
                    onChange={handleFullNameChange}
                    placeholder="Nhập họ tên của bạn"
                  />
                </Stack>
              </Box>
              <Box width="100%">
                <Stack direction="column" width="100%" spacing="8px">
                  <Stack direction="row" spacing="4px" alignItems="flex-end">
                    <Typography variant="label2">Email</Typography>
                    <Typography variant="label2" color="var(--alert)">
                      *
                    </Typography>
                  </Stack>
                  <TextField
                    error={Boolean(emailError)}
                    helperText={emailError}
                    value={payload.email}
                    onChange={handleEmailChange}
                    placeholder="Nhập email của bạn"
                  />
                </Stack>
              </Box>
              <Box width="100%">
                <Stack direction="column" width="100%" spacing="8px">
                  <Stack direction="row" spacing="4px" alignItems="flex-end">
                    <Typography variant="label2">Mật khẩu</Typography>
                    <Typography variant="label2" color="var(--alert)">
                      *
                    </Typography>
                  </Stack>
                  <TextField
                    value={payload.password}
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu của bạn"
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon
                                sx={{
                                  cursor: "pointer",
                                  fontSize: "20px",
                                }}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                sx={{
                                  cursor: "pointer",
                                  fontSize: "20px",
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
            <Box width="100%">
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "100%", background: "var(--primary)" }}
                onClick={handlerSubmit}
              >
                {loading ? (
                  <CircularProgress size={28} sx={{ color: "var(--white)" }} />
                ) : (
                  "Đăng ký"
                )}
              </Button>
            </Box>
          </Stack>
        </FormControl>

        <Stack
          direction={"row"}
          width="100%"
          justifyContent={"center"}
          gap={"8px"}
          my={"16px"}
        >
          <Typography variant="body2">Đã có tài khoản?</Typography>
          <Link to={path.LOGIN}>
            <Typography
              variant="body2"
              sx={{
                color: "var(--blue-200)",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Đăng nhập
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default RegisterForm;
