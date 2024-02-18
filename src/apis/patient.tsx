import axios from "../axios";

export const apiGetPatients = (params: any) =>
  axios({
    url: "/patient",
    method: "get",
    params,
  });
export const apiAddPatient = (data: any) =>
  axios({
    url: "/patient",
    method: "post",
    data,
  });
export const apiUpdatePatient = (id: string, data: any) =>
  axios({
    url: `/patient/${id}`,
    method: "put",
    data,
  });

export const apiDeletePatient = (id: string) =>
  axios({
    url: `/patient/${id}`,
    method: "delete",
  });
