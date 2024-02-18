import "./style.scss";

import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { images } from "../../assets";
import { path } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { resetPassword } from "../../redux/reducer/Auth";

const ResetPasswordForm = ({
  payload,
  setPayload,
}: {
  payload: any;
  setPayload: any;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: any) => state.auth);

  const [isNewPasswordShowed, setIsNewPasswordShowed] = useState(false);
  const [isConfirmPasswordShowed, setIsConfirmPasswordShowed] = useState(false);

  const resetPasswordSchema = z
    .object({
      newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự."),
      confirmPassword: z.string().min(1, "Không được bỏ trống."),
    })
    .refine((data: any) => data.newPassword === data.confirmPassword, {
      message: "Mật khẩu không trùng khớp.",
      path: ["confirmPassword"],
    });

  type ForgetPasswordInfo = z.infer<typeof resetPasswordSchema>;

  const { register, handleSubmit, formState } = useForm<ForgetPasswordInfo>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const { errors } = formState;

  const onSubmit = (data: ForgetPasswordInfo) => {
    !loading &&
      dispatch(
        resetPassword({ token: payload?.token, password: data?.newPassword })
      );
  };

  useEffect(() => {
    if (!payload?.token) {
      window.history.replaceState({}, document.title, `?state`);
      navigate("/login?state=forgetPassword");
    }
  }, []);

  return (
    <>
      {!payload?.IsSuccess ? (
        <Stack
          direction="column"
          gap="40px"
          width="100%"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction="column" gap={1} alignItems="center">
            <Typography variant="h4">Cập nhật mật khẩu</Typography>
            <Typography variant="body2">
              Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
            </Typography>
          </Stack>
          <Stack direction="column" gap={3} width="100%">
            <Stack direction="column" gap={1} width="100%">
              <Stack direction="row" spacing="4px" alignItems="flex-end">
                <Typography variant="label2">Mật khẩu mới</Typography>
                <Typography variant="label2" color="var(--alert)">
                  *
                </Typography>
              </Stack>
              <TextField
                type={`${isNewPasswordShowed ? "text" : "password"}`}
                autoComplete="false"
                placeholder="Nhập mật khẩu mới"
                error={!!errors.newPassword?.message}
                helperText={errors.newPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ cursor: "pointer", paddingRight: "6px" }}
                      onClick={() => setIsNewPasswordShowed((prev) => !prev)}
                    >
                      {isNewPasswordShowed ? (
                        <BsEye size={20} />
                      ) : (
                        <BsEyeSlash size={20} />
                      )}
                    </InputAdornment>
                  ),
                }}
                {...register("newPassword")}
              />
            </Stack>
            <Stack direction="column" gap={1} width="100%">
              <Stack direction="row" spacing="4px" alignItems="flex-end">
                <Typography variant="label2">Xác nhận mật khẩu mới</Typography>
                <Typography variant="label2" color="var(--alert)">
                  *
                </Typography>
              </Stack>
              <TextField
                type={`${isConfirmPasswordShowed ? "text" : "password"}`}
                autoComplete="false"
                placeholder="Xác nhận mật khẩu mới"
                error={!!errors.confirmPassword?.message}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ cursor: "pointer", paddingRight: "6px" }}
                      onClick={() =>
                        setIsConfirmPasswordShowed((prev) => !prev)
                      }
                    >
                      {isConfirmPasswordShowed ? (
                        <BsEye size={20} />
                      ) : (
                        <BsEyeSlash size={20} />
                      )}
                    </InputAdornment>
                  ),
                }}
                {...register("confirmPassword")}
              />
            </Stack>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{
              height: "48px",
              padding: "0px 20px",
            }}
          >
            <Typography variant="button1">
              {loading ? (
                <CircularProgress size={28} sx={{ color: "var(--white)" }} />
              ) : (
                "Đổi mật khẩu"
              )}
            </Typography>
          </Button>
        </Stack>
      ) : (
        <SuccessForm />
      )}
    </>
  );
};

const SuccessForm = () => {
  const navigate = useNavigate();
  const { CheckCircle } = images;

  return (
    <Stack direction="column" gap="40px" width="100%" alignItems="center">
      <Stack flexDirection="column" alignItems="center" gap={1}>
        <CheckCircle />
        <Typography variant="h4">Mật khẩu đã thay đổi</Typography>
        <Typography variant="body2">
          Mật khẩu của bạn đã được thay đổi thành công.
        </Typography>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        sx={{
          height: "48px",
          padding: "0px 20px",
          width: "fit-content",
        }}
        onClick={() => navigate(path.LOGIN)}
      >
        <Typography variant="button1">Trở lại đăng nhập</Typography>
      </Button>
    </Stack>
  );
};

export default ResetPasswordForm;
