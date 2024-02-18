import axios from "../axios";

export const apiRegister = (data: any) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  });

export const apiLogin = (data: any) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });
export const apiUpdateUser = (data: any) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });
export const apiRefreshToken = () =>
  axios({
    url: "/user/refreshtoken",
    method: "post",
  });

export const apiSendMailResetPassword = (data: any) =>
  axios({
    url: "/user/send-reset-password",
    method: "post",
    data,
  });
export const apiVerifyResetPassword = (data: any) =>
  axios({
    url: "/user/verify-reset-password",
    method: "post",
    data,
  });
export const apiResetPassword = (data: any) =>
  axios({
    url: "/user/reset-password",
    method: "post",
    data,
  });
