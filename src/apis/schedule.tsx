import axios from "../axios";

export const apiGetAllSchedules = (params?: any) =>
  axios({
    url: "/schedule/",
    method: "get",
    params,
  });
export const apiGetAllSchedulesByHost = (params?: any) =>
  axios({
    url: "/schedule/host",
    method: "get",
    params,
  });

export const apiGetSchedule = (id: string) =>
  axios({
    url: `/schedule/${id}`,
    method: "get",
  });
export const apiGetScheduleByDoctorID = (id: string) =>
  axios({
    url: `/schedule/doctor/${id}`,
    method: "get",
  });

export const apiAddSchedule = (data: any) =>
  axios({
    url: "/schedule/",
    method: "post",
    data,
  });
export const apiUpdateSchedule = (id: string, data: any) =>
  axios({
    url: `/schedule/${id}`,
    method: "put",
    data,
  });
export const apiDeleteSchedule = (id: string) =>
  axios({
    url: `/schedule/${id}`,
    method: "delete",
  });
