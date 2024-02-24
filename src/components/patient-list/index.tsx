import "./style.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import EmptyPage from "../emptyPage";
import { Box, useMediaQuery } from "@mui/material";
import { theme } from "../../themes/Theme";
import Slider, { Settings } from "react-slick";
import CustomSkeleton from "../skeleton";

const PatientList = ({
  payload,
  setPayload,
}: {
  payload?: any;
  setPayload?: any;
}) => {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const { patients, loadingPatient } = useSelector(
    (state: any) => state.patient
  );

  const [patientsSearch, setPatientsSearch] = useState<any>({});
  useEffect(() => {
    setPatientsSearch(patients);
  }, [patients]);

  const slidesToShow = isTablet ? 2 : 1;
  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <Slider className={"record-slider"} {...settings}>
      {!loadingPatient ? (
        patientsSearch?.length > 0 ? (
          patientsSearch?.map((el: any, index: any) => (
            <Box
              key={index}
              padding="10px"
              sx={{
                display: "flex !important",
              }}
              onClick={() =>
                setPayload &&
                setPayload((prev: any) => ({
                  ...prev,
                  patientID: el?._id,
                  patient: el,
                }))
              }
            >
              <Box
                border={
                  payload?.patientID === el?._id
                    ? "2px solid var(--primary)"
                    : ""
                }
                borderRadius={payload?.patientID === el?._id ? "16px" : ""}
                width="100%"
              >
                <PatientCard data={el} />
              </Box>
            </Box>
          ))
        ) : (
          <EmptyPage title="Không có hồ sơ bệnh nhân" />
        )
      ) : (
        [...Array(10)].map((item, index: number) => (
          <CustomSkeleton
            key={index}
            customKey={`skeleton__card-patient-${index}`}
            variant="card-patient"
          />
        ))
      )}
    </Slider>
  );
};

export default PatientList;
