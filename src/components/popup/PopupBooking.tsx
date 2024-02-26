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
  Typography,
  styled,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { useEffect, useState } from "react";
import { path, times } from "../../utils/constant";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { GrDocumentUser } from "react-icons/gr";
import { SlQuestion } from "react-icons/sl";
import { GiConfirmed } from "react-icons/gi";

import {
  FaUserCircle,
  FaBirthdayCake,
  FaPhoneAlt,
  FaRegTrashAlt,
} from "react-icons/fa";
import { getBase64 } from "../../utils/helper";
import { MdDriveFolderUpload } from "react-icons/md";
import PatientList from "../patient-list";
import PopupPatientCreate from "../patient-list/PopupPatientCreate";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import useNotification from "../../hooks/useNotification";
import { addBooking, resetBookingStatus } from "../../redux/reducer/Booking";
import { useNavigate } from "react-router-dom";

const PopupBooking = ({ schedule, time }: { schedule?: any; time?: any }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { displayNotification } = useNotification();
  const { loading, successAction, errorAction } = useSelector(
    (state: any) => state.booking
  );
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [payload, setPayload] = useState<any>({});

  const handleClickOpen = () => {
    if (isLoggedIn) {
      setOpen(true);
      setPayload((prev: any) => ({
        ...prev,
        time: time,
        scheduleID: schedule?._id,
      }));
    } else {
      navigate(path.LOGIN);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleContinue = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleSave = () => {
    dispatch(addBooking(payload));
  };

  const handleRenderStep = (step: number) => {
    switch (step) {
      case 0:
        return <RecordStep payload={payload} setPayload={setPayload} />;
      case 1:
        return <ReasondStep payload={payload} setPayload={setPayload} />;
      case 2:
        return <ConfirmStep payload={payload} schedule={schedule} />;
    }
  };

  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        setPayload({});
        setCurrentStep(0);
      }
      displayNotification({
        message: errorAction || successAction,
        severity: successAction ? "success" : "error",
        title: successAction ? "Thành công" : "Thất bại",
      });
      dispatch(resetBookingStatus());
    }
  }, [successAction, errorAction]);

  return (
    <>
      <Button
        variant={"outlined"}
        sx={{
          flexShrink: "0",
        }}
        onClick={handleClickOpen}
      >
        <Typography variant="label3">{times[time]?.value}</Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"oversize"}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            width: "1000px",
          },
        }}
      >
        <DialogContent sx={{ padding: "0", height: "800px" }}>
          <Box className="popup__content">
            <Box className="popup__header">
              <Typography variant="h5">Đặt lịch</Typography>
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
              <Stack direction="column" gap="16px" width="100%" height="100%">
                <Stack direction="row" gap="4px" alignItems="flex-start">
                  {steps?.map((el, index) => (
                    <Box
                      key={index}
                      className={`progress-steps ${
                        currentStep === index && "active"
                      } ${index < currentStep && "complete"}`}
                    >
                      <Stack direction="row" gap="2px" alignItems="center">
                        <Box className="progress-step">
                          {index < currentStep ? (
                            <IoMdCheckmark color="var(--white)" />
                          ) : (
                            el?.icon
                          )}
                        </Box>
                        {index !== steps.length - 1 && (
                          <Box className="progress-step__line"></Box>
                        )}
                      </Stack>

                      <Typography
                        variant="label3"
                        className="progress-step__name"
                      >
                        {el?.name}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                {handleRenderStep(currentStep)}
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
                onClick={currentStep === 0 ? handleClose : handleBack}
                sx={{ width: "100%" }}
              >
                <Typography variant="button2">
                  {currentStep === 0 ? "Hủy" : "Quay lại"}
                </Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  (currentStep === 0 && !payload?.patientID) ||
                  (currentStep === 1 && !payload?.description)
                }
                onClick={
                  currentStep === steps?.length - 1
                    ? handleSave
                    : handleContinue
                }
                sx={{ width: "100%" }}
              >
                <Typography variant="button2">
                  {loading ? (
                    <CircularProgress
                      size={28}
                      sx={{ color: "var(--white)" }}
                    />
                  ) : currentStep === steps?.length - 1 ? (
                    "Lưu"
                  ) : (
                    "Tiếp tục"
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

export default PopupBooking;

const RecordStep = ({
  payload,
  setPayload,
}: {
  payload?: any;
  setPayload: any;
}) => {
  return (
    <>
      <Stack
        flexDirection="column"
        sx={{
          height: "100%",
        }}
      >
        <Stack alignItems="flex-end" padding="10px">
          <PopupPatientCreate />
        </Stack>
        <Stack
          justifyContent="center"
          height="100%"
          sx={{
            height: "100%",
            borderRadius: "16px",
            background: "#e8f2f7",
          }}
        >
          <PatientList payload={payload} setPayload={setPayload} />
        </Stack>
      </Stack>
    </>
  );
};
const ReasondStep = ({
  payload,
  setPayload,
}: {
  payload?: any;
  setPayload: any;
}) => {
  const [hoverElm, setHoverElm] = useState(null);
  const handlePreviewDescriptionImg = async (files: any) => {
    const imagesPreview: any = [];
    for (let file of files) {
      const base64Image = await getBase64(file);
      imagesPreview.push({
        name: file.name,
        path: base64Image,
      });
    }
    setPayload((prev: any) => ({ ...prev, descriptionImg: imagesPreview }));
  };
  return (
    <>
      <Stack gap="8px" width="100%">
        <Stack direction="row" gap="4px">
          <Typography variant="label2">Lý do khám</Typography>
          <Typography variant="label2" color="var(--alert)">
            *
          </Typography>
        </Stack>
        <Textarea
          aria-label="empty textarea"
          placeholder="Bình luận"
          minRows="5"
          value={payload?.description || ""}
          onChange={(e: any) =>
            setPayload((prev: any) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </Stack>
      <Stack width="100%" spacing="8px" direction="row">
        <label
          htmlFor="descriptionImg"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography variant="label2">Ảnh mô tả:</Typography>
          <MdDriveFolderUpload size={24} cursor="pointer" />
        </label>
        <input
          type="file"
          id="descriptionImg"
          multiple
          onChange={(e) => handlePreviewDescriptionImg(e.target.files)}
          style={{ display: "none" }}
        />
      </Stack>
      {payload?.descriptionImg?.length > 0 && (
        <Stack
          direction="row"
          sx={{
            display: "flex",
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
          {payload?.descriptionImg?.map((el: any, index: any) => (
            <Box
              key={index}
              onMouseEnter={() => setHoverElm(el.name)}
              onMouseLeave={() => setHoverElm(null)}
              sx={{
                position: "relative",
                maxWidth: "100%",
                flexShrink: 0,
                padding: " 0 20px",
              }}
            >
              <img
                key={index}
                src={el.path}
                alt=""
                style={{
                  width: "200px",
                  height: "200px",
                  maxWidth: "100%",

                  display: "block",
                }}
              />
              {hoverElm === el?.name && (
                <Box
                  className="overlay"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    setPayload((prev: any) => ({
                      ...prev,
                      descriptionImg: prev.descriptionImg?.filter(
                        (item: any) => item?.name !== el.name
                      ),
                    }))
                  }
                >
                  <FaRegTrashAlt />
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      )}
    </>
  );
};
const ConfirmStep = ({
  payload,
  schedule,
}: {
  payload?: any;
  schedule: any;
}) => {
  return (
    <>
      <Stack gap="8px" width="100%">
        <Typography variant="label1">Thông tin lịch khám</Typography>
        <Box
          className="record__card"
          sx={{
            padding: "20px",
          }}
        >
          <Stack flexDirection="row" alignItems="flex-start" gap="8px">
            <Typography variant="label2" minWidth="115px">
              Bệnh viện:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {schedule?.doctorID?.clinicID?.name}
            </Typography>
          </Stack>
          <Stack flexDirection="row" alignItems="flex-start" gap="8px">
            <Typography variant="label2" minWidth="115px">
              Chuyên khoa:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {schedule?.doctorID?.specialtyID?.name}
            </Typography>
          </Stack>
          <Stack flexDirection="row" alignItems="flex-start" gap="8px">
            <Typography variant="label2" minWidth="115px">
              Bác sĩ:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {schedule?.doctorID?._id?.fullName}
            </Typography>
          </Stack>
          <Stack flexDirection="row" alignItems="flex-start" gap="8px">
            <Typography variant="label2" minWidth="115px">
              Thời gian khám:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {times[payload?.time]?.value}
              {", "} {moment(schedule?.date).format("DD/MM/yyyy")}
            </Typography>
          </Stack>
          <Stack flexDirection="row" alignItems="flex-start" gap="8px">
            <Typography variant="label2" minWidth="115px">
              Giá khám:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {schedule?.cost}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Stack gap="8px" width="100%">
        <Typography variant="label1">Thông tin bệnh nhân</Typography>
        <Box
          className="record__card"
          sx={{
            padding: "20px",
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
                {payload?.patient?.fullName}
              </Typography>
            </Box>
          </Stack>
          <Stack flexDirection="row" gap="16px" alignItems="center">
            <Stack flexDirection="row" gap="16px" alignItems="center">
              <FaBirthdayCake />
              <Typography variant="label2">Ngày sinh</Typography>
            </Stack>
            <Typography variant="body2">
              {moment(payload?.patient?.dob).format("DD/MM/yyyy")}
            </Typography>
          </Stack>
          <Stack flexDirection="row" gap="16px" alignItems="center">
            <Stack flexDirection="row" gap="16px" alignItems="center">
              <FaPhoneAlt />
              <Typography variant="label2">Số điện thoại</Typography>
            </Stack>
            <Typography variant="body2">{payload?.patient?.phone}</Typography>
          </Stack>
          <Stack flexDirection="row" gap="16px" alignItems="center">
            <Stack flexDirection="row" gap="16px" alignItems="center">
              <IoMaleFemale />
              <Typography variant="label2">Giới tính</Typography>
            </Stack>
            <Typography variant="body2">
              {payload?.patient?.gender === "MALE" ? "Nam" : "Nữ"}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Stack gap="8px" width="100%">
        <Typography variant="label1">Lý do khám</Typography>
        <Box
          className="record__card"
          sx={{
            padding: "20px",
          }}
        >
          <Stack flexDirection="row" alignItems="flex-start" gap="8px">
            <Typography variant="label2" minWidth="115px">
              Lý do khám:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {payload?.description}
            </Typography>
          </Stack>
          {payload?.descriptionImg?.length > 0 && (
            <Stack
              direction="row"
              sx={{
                display: "flex",
                maxWidth: "100%",
                overflowX: "auto",
              }}
            >
              {payload?.descriptionImg?.map((el: any, index: any) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    maxWidth: "100%",
                    flexShrink: 0,
                    padding: " 0 20px",
                  }}
                >
                  <img
                    key={index}
                    src={el.path}
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      maxWidth: "100%",

                      display: "block",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  );
};

const steps = [
  {
    id: 1,
    name: "Hồ sơ ",
    icon: <GrDocumentUser size={24} className="progress-step__icon" />,
  },
  {
    id: 2,
    name: "Lý do khám",
    icon: <SlQuestion size={24} className="progress-step__icon" />,
  },
  {
    id: 3,
    name: "Xác nhận ",
    icon: <GiConfirmed size={24} className="progress-step__icon" />,
  },
];

const sliderInfo = [
  {
    id: 1,
    name: "Bệnh viện Đại học Y Dược 2",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fa9c2ecbe-fa5a-4216-936b-705c1555b661-leloi.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Bệnh viện Nhi Đồng Thành Phố",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Bệnh viện Chợ Rẫy",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Đặt khám theo bác sĩ",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Đặt khám theo bác sĩ",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
  {
    id: 2,
    name: "Đặt khám theo bác sĩ",
    totalRatings: 4,
    icon: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F7768fe90-c5fb-4a30-841a-7fa8d00bc93b-trungvuong.webp&w=1920&q=75",
  },
];

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
     font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: var(--text-primary);
    background: white;
    border: 1px solid var(--border-color);

    &:hover {
      border-color: var(--primary);
    }

    &:focus {
      outline: 0;
      color: var(--text-primary);
      border-color:1px var(--primary);
    }
  `
);

const scheduleInfo = [
  {
    id: 1,
    name: "Bệnh viện",
    nameKey: "Đại học Y Dược",
    icon: "",
  },
  {
    id: 1,
    name: "Chuyên khoa",
    nameKey: "Da liễu",
    icon: "",
  },
  {
    id: 1,
    name: "Bác sĩ",
    nameKey: "Ngô Công Huân",
    icon: "",
  },
  {
    id: 1,
    name: "Thời gian khám",
    nameKey: "12:00-13:00, 12/12/2024",
    icon: "",
  },
  {
    id: 1,
    name: "Giá khám",
    nameKey: "150,000",
    icon: "",
  },
];
