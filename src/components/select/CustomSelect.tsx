import React from "react";
import { Select, MenuItem, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CustomSelectProps } from "../module";
import EmptyPage from "../emptyPage";
const CustomSelect = ({
  placeholder,
  value,
  setValue,
  nameKey,
  options,
  disabled = false,
  color = "#c5c8c8",
}: CustomSelectProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Select
        displayEmpty
        defaultValue=""
        disabled={disabled}
        value={value}
        onChange={(e) => {
          setValue((prev: any) => ({ ...prev, [nameKey]: e.target.value }));
        }}
      >
        <MenuItem value="">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="body2">{placeholder}</Typography>
          </Box>
        </MenuItem>
        {options?.length > 0 ? (
          options?.map((item: any, index: any) => (
            <MenuItem key={index} value={item._id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="body2">
                  {t(item.name ? item.name : item.fullName)}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <EmptyPage
                title={t("data-not-found")}
                message={t("please-add-data")}
              />
            </Box>
          </MenuItem>
        )}
      </Select>
    </>
  );
};

export default CustomSelect;
