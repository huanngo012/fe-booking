import axios from "../axios";

export const apiGetAllSpecialtys = (params?: any) =>
  axios({
    url: "/specialty",
    method: "get",
    params,
  });

export const apiGetSpecialty = (id: string) =>
  axios({
    url: `/specialty/${id}`,
    method: "get",
  });
export const apiCountSpecialty = () =>
  axios({
    url: `/specialty/count`,
    method: "get",
  });
export const apiAddSpecialty = (data: any) =>
  axios({
    url: "/specialty",
    method: "post",
    data,
  });
export const apiUpdateSpecialty = (id: string, data: any) =>
  axios({
    url: `/specialty/${id}`,
    method: "put",
    data,
  });
export const apiDeleteSpecialty = (id: string) =>
  axios({
    url: `/specialty/${id}`,
    method: "delete",
  });
