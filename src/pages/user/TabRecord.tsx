import "./style.scss";
import { Stack, Typography } from "@mui/material";
import PopupPatientCreate from "../../components/patient-list/PopupPatientCreate";
import PatientList from "../../components/patient-list";

const TabRecord = () => {
  return (
    <Stack gap="16px">
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography variant="label1">Danh sách hồ sơ bệnh nhân</Typography>
        <PopupPatientCreate />
      </Stack>
      <PatientList />
    </Stack>
  );
};

export default TabRecord;
