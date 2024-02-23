import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets";
import { path } from "../../utils/constant";

const SuccessForm = () => {
  const navigate = useNavigate();
  const { CheckCircle } = images;

  return (
    <Stack direction="column" gap="40px" width="100%" alignItems="center">
      <Stack flexDirection="column" alignItems="center" gap={1}>
        <CheckCircle />
        <Typography variant="h4">Xác thực thành công</Typography>
        <Typography variant="body2">Bạn có thể đăng nhập</Typography>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        onClick={() => navigate(path.LOGIN)}
        sx={{
          display: "flex",
          gap: "4px",
          borderRadius: "8px",
          background:
            "linear-gradient(83.63deg,#7cdead 33.34%,#9de7c2 113.91%);",
        }}
      >
        <Typography variant="button1">Trở lại đăng nhập</Typography>
      </Button>
    </Stack>
  );
};

export default SuccessForm;
