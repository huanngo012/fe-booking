import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/login";
import NotFoundPage from "../pages/not-found";
import { useSelector } from "react-redux";
import { path } from "../utils/constant";
import HomePage from "../pages/home";
import HospitalPage from "../pages/hospital";
import HospitalDetailPage from "../pages/hospital/detail";
import UserPage from "../pages/user";
import DoctorPage from "../pages/doctor";

const privateRoutes = [
  {
    path: path.USER,
    component: UserPage,
    layout: true,
  },
];

const publicRoutes = [
  { path: path.LOGIN, component: Login, layout: false },
  {
    path: path.HOME,
    component: HomePage,
    layout: true,
  },

  {
    path: path.HOSPITALS,
    component: HospitalPage,
    layout: true,
  },
  {
    path: path.DOCTORS,
    component: DoctorPage,
    layout: true,
  },
  {
    path: path.HOSPITAL_DETAIL,
    component: HospitalDetailPage,
    layout: true,
  },
  { path: path.NOT_FOUND, component: NotFoundPage, layout: false },
];

const IsLogin = () => {
  const { current } = useSelector((state: any) => state.auth);
  return current?.role === 4 ? <Outlet /> : <Navigate to={path.LOGIN} />;
};

export { publicRoutes, privateRoutes, IsLogin };
