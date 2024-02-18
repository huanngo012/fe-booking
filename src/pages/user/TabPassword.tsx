import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetAuthStatus, updateUser } from "../../redux/reducer/Auth";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useNotification from "../../hooks/useNotification";
import { theme } from "../../themes/Theme";

const TabPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { displayNotification } = useNotification();
  const { loading, successAction, errorAction } = useSelector(
    (state: any) => state.auth
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

  const [isOldPasswordShowed, setIsOldPasswordShowed] = useState(false);
  const [isNewPasswordShowed, setIsNewPasswordShowed] = useState(false);
  const [isConfirmPasswordShowed, setIsConfirmPasswordShowed] = useState(false);

  const resetPasswordSchema = z
    .object({
      oldPassword: z.string().min(1, "Không được bỏ trống."),
      newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự."),
      confirmPassword: z.string().min(1, "Không được bỏ trống."),
    })
    .refine((data: any) => data.newPassword === data.confirmPassword, {
      message: "Mật khẩu không trùng khớp.",
      path: ["confirmPassword"],
    });

  type ForgetPasswordInfo = z.infer<typeof resetPasswordSchema>;

  const { register, handleSubmit, formState, reset } =
    useForm<ForgetPasswordInfo>({
      resolver: zodResolver(resetPasswordSchema),
      mode: "onChange",
    });

  const { errors } = formState;

  const onSubmit = (data: ForgetPasswordInfo) => {
    !loading &&
      dispatch(
        updateUser({
          password: data?.oldPassword,
          newPassword: data?.newPassword,
        })
      );
  };

  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        reset();
      }
      displayNotification({
        message: errorAction || successAction,
        severity: successAction ? "success" : "error",
        title: successAction ? "Thành công" : "Thất bại",
      });
      dispatch(resetAuthStatus());
    }
  }, [successAction, errorAction]);

  return (
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
            <Typography variant="label2">Mật khẩu cũ</Typography>
            <Typography variant="label2" color="var(--alert)">
              *
            </Typography>
          </Stack>
          <TextField
            type={`${isOldPasswordShowed ? "text" : "password"}`}
            autoComplete="false"
            placeholder="Nhập mật khẩu cũ"
            error={!!errors.oldPassword?.message}
            helperText={errors.oldPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", paddingRight: "6px" }}
                  onClick={() => setIsOldPasswordShowed((prev) => !prev)}
                >
                  {isOldPasswordShowed ? (
                    <BsEye size={20} />
                  ) : (
                    <BsEyeSlash size={20} />
                  )}
                </InputAdornment>
              ),
            }}
            {...register("oldPassword")}
          />
        </Stack>
        <Stack direction={isDesktop ? "row" : "column"} gap={3} width="100%">
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
                    onClick={() => setIsConfirmPasswordShowed((prev) => !prev)}
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
  );
};

export default TabPassword;
