import "./style.scss";
import { Stack, Typography } from "@mui/material";
import CustomDataGrid from "../../components/data-grid/CustomDataGrid";
import { BookingColumns } from "../../utils/columns";
import { useEffect, useState } from "react";
import EmptyPage from "../../components/emptyPage";
import CustomSelect from "../../components/select/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getBookings } from "../../redux/reducer/Booking";
import moment from "moment";
import { times } from "../../utils/constant";

const TabBooking = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { bookings } = useSelector((state: any) => state.booking);
  const { patients } = useSelector((state: any) => state.patient);
  const pageSizeDefault = 10;
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [payload, setPayload] = useState<any>({});

  useEffect(() => {
    if (payload?.patientID === "") {
      dispatch(getBookings({ limit: pageSizeDefault, page: page }));
    } else {
      dispatch(
        getBookings({
          limit: pageSizeDefault,
          page: page,
          patientID: payload?.patientID,
        })
      );
    }
  }, [page, payload]);

  useEffect(() => {
    if (bookings?.data) {
      if (pageSizeDefault > bookings?.counts && bookings?.counts > 0) {
        setPageSize(bookings?.counts);
      }

      setRows(
        bookings?.data &&
          bookings?.data?.map((el: any, index: any) => {
            return {
              id: el._id,
              idRow: (page - 1) * pageSize + index + 1,
              clinicName: el?.scheduleID?.doctorID?.clinicID?.name,
              specialtyName: el?.scheduleID?.doctorID?.specialtyID?.name,
              nameDoctor: el?.scheduleID?.doctorID?._id?.fullName,
              status: el?.status,
              date: moment(el?.scheduleID.date).format("DD/MM/yyyy"),
              time: times[el?.time - 1].value,
              isPaid: el?.isPaid,
            };
          })
      );
    }
  }, [bookings]);

  return (
    <CustomDataGrid
      rows={rows}
      columns={BookingColumns()}
      showPagination={rows?.length > 0 ? true : false}
      pageSize={pageSize}
      totalRow={bookings?.counts}
      setPage={setPage}
      page={page}
      slots={
        rows?.length === 0
          ? {
              columnHeaders: () => null,
              noRowsOverlay: () => (
                <EmptyPage title="Bạn chưa có thông tin lịch khám" />
              ),
            }
          : {}
      }
      headerComponent={
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="table-header"
        >
          <Typography variant="label1">Lịch khám</Typography>

          <Stack direction="row" gap={1} alignItems="center">
            <CustomSelect
              options={patients?.data}
              placeholder="Tất cả bệnh nhân"
              value={payload[`patientID`] || ""}
              setValue={setPayload}
              nameKey="patientID"
            />
          </Stack>
        </Stack>
      }
    />
  );
};

export default TabBooking;

const name = [
  {
    _id: 1,
    name: "Ngô Công Huân",
  },
  {
    _id: 2,
    name: "Ngô Minh Huấn",
  },
  {
    _id: 3,
    name: "Nguyễn Tiến Dũng",
  },
];
