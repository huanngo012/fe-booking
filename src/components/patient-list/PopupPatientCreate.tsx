import "./style.scss";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "../../themes/Theme";
import { IoMdClose } from "react-icons/io";
import CustomSelect from "../select/CustomSelect";
import { genders } from "../../utils/constant";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  addPatient,
  getPatients,
  resetPatientStatus,
} from "../../redux/reducer/Patient";
import useNotification from "../../hooks/useNotification";

const PopupPatientCreate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { displayNotification } = useNotification();
  const { loading, successAction, errorAction } = useSelector(
    (state: any) => state.patient
  );

  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const direction = isTablet ? "row" : "column";

  const [payload, setPayload] = useState<any>({});

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPatient = () => {
    dispatch(addPatient(payload));
  };

  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        setPayload({});
        dispatch(getPatients({}));
      }
      displayNotification({
        message: errorAction || successAction,
        severity: successAction ? "success" : "error",
        title: successAction ? "Thành công" : "Thất bại",
      });
      dispatch(resetPatientStatus());
    }
  }, [successAction, errorAction]);
  const infoPatient: any = [
    [
      {
        id: 1,
        label: "Họ tên",
        placeholder: "Nhập họ tên",
        input: true,
        type: "text",
        nameKey: "fullName",
        required: true,
      },
    ],
    [
      {
        id: 2,
        label: "Số điện thoại",
        placeholder: "Nhập số điện thoại",
        input: true,
        type: "number",
        nameKey: "phone",
        required: true,
      },
      {
        id: 3,
        label: "Giới tính",
        placeholder: "Chọn giới tính",
        select: true,
        nameKey: "gender",
        required: true,
        options: genders,
      },
    ],
    [
      {
        id: 4,
        label: "Ngày sinh",
        placeholder: "doctor.position-placeholder",
        date: true,
        nameKey: "dob",
      },
    ],
  ];
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "8px",
          width: "fit-content",
        }}
      >
        <Typography variant={isTablet ? "button2" : "button3"}>
          Thêm hồ sơ
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"tablet"}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            width: "100%",
          },
        }}
      >
        <DialogContent sx={{ padding: "0", height: "600px" }}>
          <Box className="popup__content">
            <Box className="popup__header">
              <Typography variant="h5">Thêm hồ sơ bệnh nhân</Typography>
              <IconButton aria-label="close" onClick={handleClose}>
                <IoMdClose size={24} />
              </IconButton>
            </Box>
            <Divider
              sx={{
                borderBottom: "1px solid var(--border-color)",
                width: "100%",
              }}
            />
            <Box className="popup__body">
              <Stack direction="column" gap="16px" width="100%">
                {infoPatient?.map((el: any, index: any) => (
                  <Stack
                    direction={direction}
                    gap="16px"
                    width="100%"
                    key={index}
                  >
                    {el?.map((el2: any, index: any) => (
                      <Stack gap="8px" width="100%" key={index}>
                        <Stack direction="row" gap="4px">
                          <Typography variant="label3">
                            {t(`${el2?.label}`)}
                          </Typography>
                          {el2?.required && (
                            <Typography variant="label3" color="var(--alert)">
                              *
                            </Typography>
                          )}
                        </Stack>
                        {el2?.select && (
                          <CustomSelect
                            options={el2?.options}
                            placeholder={t(`${el2?.placeholder}`)}
                            value={payload[`${el2?.nameKey}`] || ""}
                            setValue={setPayload}
                            nameKey={el2?.nameKey}
                          />
                        )}
                        {el2?.input && (
                          <TextField
                            type={el2?.type}
                            value={payload[`${el2?.nameKey}`] || ""}
                            placeholder={t(`${el2?.placeholder}`)}
                            onChange={(e) => {
                              setPayload((prev: any) => ({
                                ...prev,
                                [el2?.nameKey]: e.target.value,
                              }));
                            }}
                          />
                        )}
                        {el2?.date && (
                          <DatePicker
                            defaultValue={moment(
                              payload[`${el2?.nameKey}`] || ""
                            )}
                            format="DD/MM/YYYY"
                            onChange={(e: any) => {
                              setPayload((prev: any) => ({
                                ...prev,
                                [el2?.nameKey]: new Date(e).getTime(),
                              }));
                            }}
                          />
                        )}
                      </Stack>
                    ))}
                  </Stack>
                ))}
              </Stack>
            </Box>
            <Divider
              sx={{
                borderBottom: "1px solid var(--border-color)",
                width: "100%",
              }}
            />
            <Box className="popup__footer">
              <Button
                variant="contained"
                color="tertiary"
                onClick={handleClose}
                sx={{ width: "100%" }}
              >
                <Typography variant="button2">Hủy</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPatient}
                sx={{ width: "100%" }}
              >
                <Typography variant="button2">
                  {loading ? (
                    <CircularProgress
                      size={28}
                      sx={{ color: "var(--white)" }}
                    />
                  ) : (
                    "Lưu"
                  )}
                </Typography>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupPatientCreate;
