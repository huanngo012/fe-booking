import { FaUserCircle } from "react-icons/fa";
import TabProfile from "../pages/user/TabProfile";
import { images } from "../assets";
import TabRecord from "../pages/user/TabRecord";
import { IoMdCalendar } from "react-icons/io";
import TabBooking from "../pages/user/TabBooking";
import TabPassword from "../pages/user/TabPassword";
import { RiLockPasswordLine } from "react-icons/ri";
const { UserRecord } = images;

export const encryptPasswordKey = "73XKXeYyitybbeEmufSzBOD5OZMDcFCo";
export const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const path = {
  HOME: "/",
  LOGIN: "/login",
  USER: "/user",
  HOSPITALS: "/hospitals",
  HOSPITAL_DETAIL: "/hospitals/:id",
  SPECIALTIES: "/specialties",
  DOCTORS: "/doctors",
  NEWS: "/news",
  ABOUT: "/about",
  NOT_FOUND: "*",
};

export const tabsUser = [
  {
    icon: <FaUserCircle size={24} />,
    text: "Thông tin cá nhân",
    component: <TabProfile />,
    path: `profile`,
  },
  {
    icon: <RiLockPasswordLine size={24} />,
    text: "Đổi mật khẩu",
    component: <TabPassword />,
    path: `password`,
  },
  {
    icon: <UserRecord width="24px" height="24px" />,
    text: "Hồ sơ bệnh nhân",
    component: <TabRecord />,
    path: `record`,
  },
  {
    icon: <IoMdCalendar size={24} />,
    text: "Lịch khám",
    component: <TabBooking />,
    path: `booking`,
  },
];

export const paddingScreen = {
  padding: {
    oversize: "0 160px",
    desktop: "0 64px",
    mobile: "0 32px",
  },
};

export const voteOptions = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

export const roleName = [
  {
    _id: 1,
    name: "Admin",
  },
  {
    _id: 2,
    name: "Host",
  },
  {
    _id: 3,
    name: "Bác sĩ",
  },
  {
    _id: 4,
    name: "Bệnh nhân",
  },
];
export const genders = [
  {
    _id: "MALE",
    name: "user.male",
  },
  {
    _id: "FEMALE",
    name: "user.female",
  },
];

export const status = [
  {
    _id: "Đã hủy",
    name: "Đã hủy",
  },
  {
    _id: "Đang xử lý",
    name: "Đang xử lý",
  },
  {
    _id: "Đã xác nhận",
    name: "Đã xác nhận",
  },
  {
    _id: "Đã khám",
    name: "Đã khám",
  },
  {
    _id: "Bỏ khám",
    name: "Bỏ khám",
  },
];

export const statusUser = [
  {
    _id: false,
    name: "user.active",
  },
  {
    _id: true,
    name: "user.block",
  },
];
export const statusPay = [
  {
    _id: false,
    name: "booking.unpaid",
  },
  {
    _id: true,
    name: "booking.paid",
  },
];

export const times = [
  {
    id: 1,
    value: "07:00 - 08:00",
    maxNumber: "",
  },
  {
    id: 2,
    value: "08:00 - 09:00",
    maxNumber: "",
  },
  {
    id: 3,
    value: "09:00 - 10:00",
    maxNumber: "",
  },
  {
    id: 4,
    value: "10:00 - 11:00",
    maxNumber: "",
  },
  {
    id: 5,
    value: "11:00 - 12:00",
    maxNumber: "",
  },
  {
    id: 6,
    value: "13:00 - 14:00",
    maxNumber: "",
  },
  {
    id: 7,
    value: "14:00 - 15:00",
    maxNumber: "",
  },
  {
    id: 8,
    value: "15:00 - 16:00",
    maxNumber: "",
  },
  {
    id: 9,
    value: "16:00 - 17:00",
    maxNumber: "",
  },
  {
    id: 10,
    value: "17:00 - 18:00",
    maxNumber: "",
  },
  {
    id: 11,
    value: "18:00 - 19:00",
    maxNumber: "",
  },
  {
    id: 12,
    value: "19:00 - 20:00",
    maxNumber: "",
  },
  {
    id: 13,
    value: "20:00 - 21:00",
    maxNumber: "",
  },
];
