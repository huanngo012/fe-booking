import "./style.scss";

import {
  Box,
  Pagination,
  PaginationItem,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { DataGrid } from "@mui/x-data-grid";

import { Theme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { CustomDataGridProps } from "../module";

const CustomDataGrid = (props: CustomDataGridProps) => {
  const { t } = useTranslation();

  const {
    pageSize = 5,
    totalRow = 99,
    rows = [],
    columns = [],
    page = 1,
    setPage,
    slots,
    headerComponent,
    showPagination = true,
    explainName,
  } = props;

  const handleChangePage = (e: any, value: number) => {
    setPage(value);
  };

  const totalPage = Math.ceil(totalRow / pageSize);

  const dataGridCustomStyle: SxProps<Theme> = {
    "&.MuiDataGrid-root": {
      minWidth: rows.length > 0 ? "1000px" : "",
    },
    "& .MuiDataGrid-cell": {
      borderRight: "1px solid var(--grey-primary-80)",
      padding: "0px 16px",
      whiteSpace: "wrap !important",
    },
    "& .MuiDataGrid-virtualScrollerContent": {
      height: "0 !important",
      minHeight: "600px !important",
      width: "auto !important",
    },

    borderRadius: 0,
    border: "none",
  };

  return (
    <Stack direction="column" className="table__wrapper">
      {headerComponent}

      <Box className="table-body">
        <Box className="data-grid__container">
          <Box className="scroll-table">
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={64}
              slots={slots}
              columnHeaderHeight={48}
              sx={dataGridCustomStyle}
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              hideFooter
              hideFooterPagination
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: pageSize,
                    page: page ? page - 1 : -1,
                  },
                },
              }}
            />
          </Box>
          {/* Pagination */}
          {showPagination && (
            <Stack
              direction="row"
              className="pagination"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Stack direction="row" gap={2} alignItems="center">
                <Pagination
                  count={totalPage}
                  page={page}
                  hidePrevButton={page === 1}
                  hideNextButton={page === totalPage}
                  onChange={handleChangePage}
                  shape="rounded"
                  color="primary"
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: PiCaretLeft, next: PiCaretRight }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </Stack>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default CustomDataGrid;
