import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import ActionMenu from "../components/action-menu/ActionMenu";

export const BookingColumns = () => {
  const { t } = useTranslation();

  const bookingColumns: GridColDef[] = [
    {
      field: "idRow",
      headerName: t("id"),
      width: 120,
      headerAlign: "center",
      align: "center",
      editable: false,
      sortable: false,
      headerClassName: "table-grid__header",

      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label1" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        let text = params.value;
        return <Typography variant="label1">{text}</Typography>;
      },
    },

    {
      field: "clinicName",
      headerName: "Bệnh viện",
      flex: 1,
      headerAlign: "center",

      editable: false,
      sortable: false,
      headerClassName: "table-grid__header",

      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label1" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        let text = params.value;
        return (
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        );
      },
    },
    {
      field: "specialtyName",
      headerName: "Chuyên khoa",
      flex: 1,
      headerAlign: "center",

      editable: false,
      sortable: false,
      headerClassName: "table-grid__header",

      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label1" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        let text = params.value;
        return (
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        );
      },
    },
    {
      field: "nameDoctor",
      headerName: "Tên bác sĩ",
      flex: 1,
      headerAlign: "center",

      editable: false,
      sortable: false,
      headerClassName: "table-grid__header",

      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label1" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        let text = params.value;
        return (
          <Typography variant="body2" className="truncate_2">
            {text}
          </Typography>
        );
      },
    },
    {
      field: "date",
      headerName: "Giờ khám",
      width: 150,
      headerAlign: "center",

      editable: false,
      sortable: false,
      headerClassName: "table-grid__header",

      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label1" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        let text = params.value;
        return (
          <Typography variant="body2" className="truncate_2">
            {params?.row?.time}, {text}
          </Typography>
        );
      },
    },

    {
      field: "status",
      headerName: t("user.status"),
      width: 120,
      headerAlign: "center",
      align: "center",
      editable: false,
      sortable: false,
      headerClassName: "table-grid__header",
      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label1" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        const text = params.value;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "6px",
              padding: "12px 6px",
              width: "100px",
              backgroundColor: `${
                text === "cancelled"
                  ? "var(--red-100)"
                  : text === "pending"
                    ? "var(--yellow-100)"
                    : text === "confirmed"
                      ? "var(--blue-100)"
                      : text === "leaved"
                        ? "var(--grey-primary-100)"
                        : "var(--green-100)"
              }`,
              color: `${
                text === "cancelled"
                  ? "var(--red-900)"
                  : text === "pending"
                    ? "var(--yellow-900)"
                    : text === "confirmed"
                      ? "var(--blue-900)"
                      : text === "leaved"
                        ? "var(--grey-primary-900)"
                        : "var(--green-900)"
              }`,
            }}
          >
            <Typography variant="body2"> {t(`booking.${text}`)}</Typography>
          </Box>
        );
      },
    },

    {
      field: "action",
      headerName: "",
      type: "number",
      width: 64,
      editable: false,
      sortable: false,
      headerClassName: "table-grid__header",
      renderHeader: (params) => (
        <Typography variant="label3">{params.colDef.headerName}</Typography>
      ),
      renderCell: (params) => {
        return <ActionMenu />;
      },
    },
  ];
  return bookingColumns;
};
