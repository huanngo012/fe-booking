import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "../../redux/store";
import useNotification from "../../hooks/useNotification";
import { apiLogin } from "../../apis";
import { login } from "../../redux/reducer/Auth";

let CryptoJS = require("crypto-js");

const AuthenticationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { displayNotification } = useNotification();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const encryptedPassword = localStorage.getItem("password");

    if (encryptedPassword) {
      const decryptedPassword = CryptoJS.AES.decrypt(
        JSON.stringify({ encryptedPassword }),
        "jlasdfmnqweo@#$_)dsf123456"
      ).toString(CryptoJS.enc.Utf8);
      const rememberMeFlag = localStorage.getItem("rememberMe");
      if (rememberMeFlag === "true") {
        const savedEmail = localStorage.getItem("email");

        if (savedEmail) {
          setPayload({
            email: savedEmail,
            password: decryptedPassword,
          });
          setRememberMe(true);
        }
      }
    }
  }, []);

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
  const handleRememberMeChange = (e: any) => {
    setRememberMe(e.target.checked);

    if (e.target.checked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", payload.email);

      const encryptedPassword = CryptoJS.AES.encrypt(
        payload.password,
        "jlasdfmnqweo@#$_)dsf123456"
      ).toString();

      localStorage.setItem("password", encryptedPassword);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };
  const handlerSubmit = useCallback(async () => {
    if (!payload.email || !payload.password) {
      displayNotification({
        message: "Vui lòng nhập đầy đủ !!!",
        severity: "error",
        title: t("failed"),
      });
      return;
    }
    const rs: any = await apiLogin(payload);

    if (rs) {
      if (rs?.success) {
        dispatch(
          login({
            isLoggedIn: true,
            token: rs.accessToken,
            current: rs.data,
          })
        );
        navigate("/");
      } else {
        displayNotification({
          message: rs?.message,
          severity: "error",
          title: t("failed"),
        });
        return;
      }
    }
  }, [payload]);

  return (
    <Stack direction="column" alignItems="flex-start" gap="40px" width="100%">
      <Box width="100%" sx={{ textAlign: "center" }}>
        <Typography variant="h4">Đăng nhập</Typography>
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
              <Box width="100%">
                <Stack
                  width="100%"
                  direction="row"
                  spacing="8px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack spacing="8px" direction="row">
                    <Checkbox
                      size="small"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    ></Checkbox>
                    <Typography variant="body2">Nhớ mật khẩu</Typography>
                  </Stack>

                  <Link to="/login?state=forgetPassword">
                    <Typography
                      variant="body2"
                      sx={{ cursor: "pointer" }}
                      color="var(--blue-200)"
                    >
                      Quên mật khẩu
                    </Typography>
                  </Link>
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
                Đăng nhập
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
          <Typography variant="body2">Không có tài khoản?</Typography>
          <Link to="/login?state=signUp">
            <Typography
              variant="body2"
              sx={{
                color: "var(--blue-200)",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Đăng kí
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AuthenticationForm;
