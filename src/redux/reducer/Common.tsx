import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "../module";

const initialState: CommonState = {
  isOpenSidebar:
    localStorage.getItem("isOpenSidebar") === "true" ? true : false,
  isHoverSidebar: false,
  open: false,
  meesage: "",
  title: "",
  severity: "info",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    changeOpenSidebar: (state, action) => {
      state.isOpenSidebar = action.payload.isOpenSidebar;
      localStorage.setItem("isOpenSidebar", state.isOpenSidebar?.toString());
    },
    hoverSidebar: (state, action) => {
      state.isHoverSidebar = action.payload.isHoverSidebar;
    },
    updateAttribute: (state, action) => {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    },
    addNotification: (state, action) => ({
      ...state,
      ...action.payload,
      open: true,
    }),
    clearNotification: (state) => ({
      ...state,
      open: false,
    }),
  },
});

export const {
  updateAttribute,
  changeOpenSidebar,
  hoverSidebar,
  addNotification,
  clearNotification,
} = commonSlice.actions;
export default commonSlice.reducer;
