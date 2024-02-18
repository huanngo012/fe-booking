import { useDispatch } from "react-redux";
import { addNotification, clearNotification } from "../redux/reducer/Common";
const useNotification = () => {
  const dispatch = useDispatch();

  const displayNotification = (notification: any) => {
    dispatch(addNotification(notification));
  };
  const resetNotification = () => {
    dispatch(clearNotification());
  };
  return { displayNotification, resetNotification };
};
export default useNotification;
