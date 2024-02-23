import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets";
import { path } from "../../utils/constant";

const FailedForm = () => {
  const navigate = useNavigate();
  const { WarningIcon } = images;

  return (
    <Stack direction="column" gap="40px" width="100%" alignItems="center">
      <Stack flexDirection="column" alignItems="center" gap={1}>
        <WarningIcon />
        <Typography variant="h4">Xác thực thất bại</Typography>
        <Typography variant="body2">Vui lòng đăng ký lại</Typography>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        onClick={() => navigate(`${path.LOGIN}?state=signUp`)}
        sx={{
          display: "flex",
          gap: "4px",
          borderRadius: "8px",
          background:
            "linear-gradient(83.63deg,#ff675c 33.34%,#ff8d85 113.91%);",
        }}
      >
        <Typography variant="button1">Trở lại đăng ký</Typography>
      </Button>
    </Stack>
  );
};

export default FailedForm;
