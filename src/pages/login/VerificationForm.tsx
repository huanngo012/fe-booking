import "./style.scss";

import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  sendMailResetPassword,
  verifyResetPassword,
} from "../../redux/reducer/Auth";

const VerificationForm = ({
  payload,
  setPayload,
}: {
  payload: any;
  setPayload: any;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, loadingSendMail } = useSelector((state: any) => state.auth);

  const verificationSchema = z.object({
    otp: z.string().min(1, t("login-page.this-field-required")),
  });

  type ForgetPasswordInfo = z.infer<typeof verificationSchema>;

  const { register, handleSubmit, formState } = useForm<ForgetPasswordInfo>({
    resolver: zodResolver(verificationSchema),
    mode: "onChange",
  });

  const { errors } = formState;

  const resendOTP = async () => {
    if (!loadingSendMail) {
      dispatch(sendMailResetPassword(payload));
    }
  };

  const onSubmit = async (data: ForgetPasswordInfo) => {
    if (!loading) {
      const newData = { ...payload, ...data };
      dispatch(verifyResetPassword(newData));
      setPayload(data);
    }
  };

  useEffect(() => {
    if (!payload?.email) {
      window.history.replaceState({}, document.title, `?state`);
      navigate("/login?state=forgetPassword");
    }
  }, []);

  return (
    <Stack
      direction="column"
      gap="40px"
      width="100%"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="column" gap={1} alignItems="center">
        <Typography variant="h4">Xác thực</Typography>
        <Typography variant="body2">
          Nhập mã ký tự mà bạn đã nhận trong email.
        </Typography>
      </Stack>
      <Stack direction="column" gap={1} width="100%">
        <Stack direction="row" spacing="4px" alignItems="flex-end">
          <Typography variant="label2">OTP</Typography>
          <Typography variant="label2" color="var(--alert)">
            *
          </Typography>
        </Stack>
        <TextField
          error={!!errors.otp?.message}
          helperText={errors.otp?.message}
          {...register("otp")}
          placeholder="Nhập OTP"
        />
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
            "Tiếp tục"
          )}
        </Typography>
      </Button>
      <Stack direction="row" gap={1} justifyContent="center">
        <Typography variant="body2">Không nhận được mã?</Typography>
        <Typography
          variant="body2"
          sx={{
            color: "var(--blue-200)",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => resendOTP()}
        >
          Gửi lại OTP
        </Typography>
      </Stack>
    </Stack>
  );
};

export default VerificationForm;
