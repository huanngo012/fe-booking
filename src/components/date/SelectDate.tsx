import { Box, Typography } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const SelectDate = ({
  value,
  setValue,
  label,
  highlightedDays,
}: {
  value: any;
  setValue: any;
  label: string;
  highlightedDays?: Array<Date>;
}) => {
  // const CustomDay = (props: PickersDayProps<moment.Moment>) => {
  //   let matchedStyles: any;
  //   if (highlightedDays) {
  //     matchedStyles = highlightedDays.reduce((a, v) => {
  //       const date = moment(props.day);
  //       const isSameDate = date.isSame(v, "day");
  //       return isSameDate ? { backgroundColor: "#004b95" } : a;
  //     }, {});
  //   }

  //   return <PickersDay {...props} sx={{ ...matchedStyles }} />;
  // };

  const shouldDisableDate = (date: any) => {
    if (highlightedDays) {
      const selectedMoment = moment(date);

      // Chuyển đổi các phần tử trong mảng highlightedDays thành đối tượng Moment
      const highlightedDates = highlightedDays.map((day) =>
        moment(day, "YYYY/MM/DD")
      );

      // Kiểm tra xem ngày được chọn có trong mảng highlightedDates không
      return !highlightedDates.some((highlightedDate) =>
        selectedMoment.isSame(highlightedDate, "day")
      );
    }
    return false;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && <Typography variant="body2">{label}</Typography>}
      <DatePicker
        defaultValue={moment(value)}
        format="DD/MM/YYYY"
        disableHighlightToday
        onChange={(e: any) => setValue(new Date(e).getTime())}
        minDate={moment().add(1, "day")}
        // slots={{ day: CustomDay }}
        shouldDisableDate={shouldDisableDate}
        slotProps={{
          day: {
            sx: {
              "&.MuiPickersDay-root.Mui-selected": {
                backgroundColor: "var(--primary)",
              },
            },
          },
          desktopPaper: {
            sx: {
              ".MuiPickersYear-yearButton.Mui-selected": {
                backgroundColor: "var(--primary)",
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default SelectDate;
