import axios from "axios";
const instance = axios.create({
  baseURL: "https://backend-nhom5.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  function (config) {
    let localStorageData: any = window.localStorage.getItem("persist:auth");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData?.token);

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    } else {
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.code === "ERR_NETWORK") return error;
    return error.response?.data;
  }
);

export default instance;
