import "./style.scss";

import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { sendMailResetPassword } from "../../redux/reducer/Auth";

const ForgotPasswordForm = ({ setPayload }: { setPayload: any }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { loadingSendMail } = useSelector((state: any) => state.auth);

  const forgetPasswordSchema = z.object({
    email: z
      .string()
      .min(1, "Không được bỏ trống.")
      .email({ message: "Email không hợp lệ" }),
  });

  type ForgetPasswordInfo = z.infer<typeof forgetPasswordSchema>;

  const { register, handleSubmit, formState } = useForm<ForgetPasswordInfo>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
  });

  const { errors } = formState;

  const onSubmit = async (data: ForgetPasswordInfo) => {
    if (!loadingSendMail) {
      dispatch(sendMailResetPassword(data));
      setPayload(data);
    }
  };

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      gap="40px"
      width="100%"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack direction="column" gap={1}>
        <Typography variant="h4">Quên mật khẩu</Typography>
        <Typography variant="body2">
          Vui lòng nhập email bạn đã đăng ký. Chúng tôi sẽ gửi hướng dẫn để giúp
          bạn lấy lại mật khẩu.
        </Typography>
      </Stack>
      <Stack direction="column" gap={1} width="100%">
        <Stack direction="row" spacing="4px" alignItems="flex-end">
          <Typography variant="label2">Email</Typography>
          <Typography variant="label2" color="var(--alert)">
            *
          </Typography>
        </Stack>
        <TextField
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register("email")}
          placeholder="Nhập email của bạn"
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        sx={{
          height: "48px",
          padding: "0px 20px",
          flexShrink: "0",
        }}
      >
        <Typography variant="button1">
          {loadingSendMail ? (
            <CircularProgress size={28} sx={{ color: "var(--white)" }} />
          ) : (
            "Gửi yêu cầu"
          )}
        </Typography>
      </Button>
    </Stack>
  );
};

export default ForgotPasswordForm;
