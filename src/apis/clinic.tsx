import axios from "../axios";

export const apiGetAllClinics = (params?: any) =>
  axios({
    url: "/clinic/",
    method: "get",
    params,
  });

export const apiGetClinic = (id: string) =>
  axios({
    url: `/clinic/${id}`,
    method: "get",
  });
export const apiCountClinic = () =>
  axios({
    url: `/clinic/count`,
    method: "get",
  });

export const apiRatingClinic = (data: string) =>
  axios({
    url: `/clinic/rating`,
    method: "put",
    data,
  });
export const apiDeleteRatingClinic = (id: string) =>
  axios({
    url: `/clinic/rating/${id}`,
    method: "delete",
  });
