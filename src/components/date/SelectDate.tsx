import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const SelectDate = ({
  value,
  setValue,
  label,
}: {
  value: any;
  setValue: any;
  label: string;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && <Typography variant="body2">{label}</Typography>}
      <DatePicker
        defaultValue={moment(value)}
        format="DD/MM/YYYY"
        onChange={(e: any) => setValue(new Date(e).getTime())}
        minDate={moment().add(1, "day")}
      />
    </Box>
  );
};

export default SelectDate;
