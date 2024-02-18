import "./style.scss";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import { theme } from "../../themes/Theme";
import { FaBirthdayCake, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import moment from "moment";
import { IoMaleFemale } from "react-icons/io5";
import PopupPatientEdit from "./PopupPatientEdit";
import PopupPatientDelete from "./PopupPatientDelete";

const PatientCard = ({ data }: { data: any }) => {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const paddingCard = isTablet ? "28px 27px 26px" : "15px 13px";

  return (
    <Box
      className="record__card"
      sx={{
        padding: paddingCard,
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      }}
    >
      <Stack flexDirection="row" gap="16px" alignItems="center">
        <FaUserCircle />
        <Box>
          <Typography
            variant="label2"
            color="var(--primary)"
            sx={{ textTransform: "uppercase" }}
          >
            {data.fullName}
          </Typography>
        </Box>
      </Stack>
      <Stack flexDirection="row" gap="16px" alignItems="center">
        <Stack flexDirection="row" gap="16px" alignItems="center">
          <FaBirthdayCake />
          <Typography variant="label2">Ngày sinh</Typography>
        </Stack>
        <Typography variant="body2">
          {moment(data.dob).format("DD/MM/yyyy")}
        </Typography>
      </Stack>
      <Stack flexDirection="row" gap="16px" alignItems="center">
        <Stack flexDirection="row" gap="16px" alignItems="center">
          <FaPhoneAlt />
          <Typography variant="label2">Số điện thoại</Typography>
        </Stack>
        <Typography variant="body2">{data.phone}</Typography>
      </Stack>
      <Stack flexDirection="row" gap="16px" alignItems="center">
        <Stack flexDirection="row" gap="16px" alignItems="center">
          <IoMaleFemale />
          <Typography variant="label2">Giới tính</Typography>
        </Stack>
        <Typography variant="body2">
          {data.gender === "MALE" ? "Nam" : "Nữ"}
        </Typography>
      </Stack>
      <Stack flexDirection="row" gap="16px" alignItems="center">
        <PopupPatientEdit data={data} />
        <PopupPatientDelete id={data._id} />
      </Stack>
    </Box>
  );
};

export default PatientCard;
