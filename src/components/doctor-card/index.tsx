import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import "./style.scss";
import { images } from "../../assets";
import SelectDate from "../date/SelectDate";
import { theme } from "../../themes/Theme";
import PopupBooking from "../popup/PopupBooking";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { apiGetAllSchedules } from "../../apis";
import moment from "moment";

const { LocationIcon } = images;

const DoctorCard = ({ data }: { data?: any }) => {
  const navigate = useNavigate();

  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));

  const gapCard = isDesktop ? "40px" : "10px";

  const [date, setDate] = useState(moment().add(1, "day").valueOf());
  const [schedule, setSchedule] = useState<any>({});

  const getScheduleByDoctorID = async () => {
    const response: any = await apiGetAllSchedules({
      doctorID: data?._id?._id,
      date: date,
    });
    if (response?.success) {
      setSchedule(response?.data[0]);
    } else {
      setSchedule({});
    }
  };
  useEffect(() => {
    getScheduleByDoctorID();
  }, [date]);

  return (
    <Stack flex="100%" maxWidth="100%" padding="0 10px">
      <Box className="hospital__card" gap={gapCard}>
        <Box
          width="76px"
          height="76px"
          component="img"
          src={
            data?._id?.avatar
              ? data?._id?.avatar
              : data?.gender === "MALE"
                ? "https://res.cloudinary.com/dc4o6u6wm/image/upload/v1708694374/booking/bsNam"
                : "https://res.cloudinary.com/dc4o6u6wm/image/upload/v1708694374/booking/bsNu"
          }
          alt=""
        />
        <Stack
          flexDirection="column"
          gap="16px"
          justifyContent="center"
          sx={{
            overflow: "hidden",
          }}
        >
          <Typography variant="h6">{data?._id?.fullName}</Typography>
          <Typography
            variant="body2"
            display="flex"
            alignItems="center"
            gap="4px"
            color="var(--text-tertiary)"
          >
            <LocationIcon color="var(--text-tertiary)" />
            Chuyên khoa: {data?.specialtyID?.name}
          </Typography>
          <Stack maxWidth="270px">
            <SelectDate label="Chọn ngày:" value={date} setValue={setDate} />
          </Stack>
          {schedule?.timeType ? (
            <Stack
              flexDirection="row"
              flexWrap={isTablet ? "wrap" : "nowrap"}
              rowGap="24px"
              gap="24px"
              sx={{ overflow: "auto" }}
            >
              {schedule?.timeType?.map((data: any, index: any) => (
                <Fragment key={index}>
                  <PopupBooking schedule={schedule} time={data?.time} />
                </Fragment>
              ))}
            </Stack>
          ) : (
            <Typography variant="label1">
              Bác sĩ hiện không có lịch khám
            </Typography>
          )}

          <Stack flexDirection="row" gap="16px">
            <Button
              variant="contained"
              color="primary"
              sx={{
                display: "flex",
                gap: "4px",
                borderRadius: "30px",
              }}
            >
              <Typography variant="button2">Đặt khám ngay</Typography>
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                display: "flex",
                gap: "4px",
                borderRadius: "30px",
              }}
              onClick={() => navigate(`/hospitals/${data.id}`)}
            >
              <Typography variant="button2">Xem chi tiết</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default DoctorCard;
