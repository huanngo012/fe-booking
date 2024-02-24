import { useEffect, useRef, useState } from "react";
import { convertPdfToImages } from "../../utils/helper";
import { ActionButton, UpdateUser } from "./module";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { images } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { login, resetAuthStatus, updateUser } from "../../redux/reducer/Auth";
import useNotification from "../../hooks/useNotification";

const saveUserData: any = {
  fullName: "",
  avatar: "",
  address: "",
};

const TabProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { displayNotification } = useNotification();
  const { token, current, loading, successAction, errorAction } = useSelector(
    (state: any) => state.auth
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarRef = useRef<HTMLImageElement | null>(null);
  const [isClickChange, setIsClickChange] = useState(false);
  const [typeBtnAction, setTypeBtnAction] = useState<ActionButton>("default");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const handleSetCurrent = () => {
    setFullName(current?.fullName);
    setAddress(current?.address);
    setIsClickChange(false);
  };

  useEffect(() => {
    handleSetCurrent();
  }, [current]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type !== "application/pdf") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(img, 0, 0);
            avatarRef.current &&
              (avatarRef.current.src = canvas.toDataURL(file.type));
          }
        };
      };
      reader.readAsDataURL(file);
    } else if (file) {
      let resolver = () => {};
      convertPdfToImages(file).then((url: any) => {
        const img = document.createElement("img");
        const sizeW = img.width,
          sizeH = img.height;
        img.onload = function (event) {
          // Dynamically create a canvas element
          const canvas = document.createElement("canvas");
          canvas.width = sizeW;
          canvas.height = sizeH;
          const ctx = canvas.getContext("2d");
          // Actual resizing
          ctx && ctx.drawImage(img, 0, 0, sizeW, sizeH);
          resolver();
        };
        if (avatarRef.current && url) avatarRef.current.src = url;
      });
    }
  };

  const handleOpenFileDialog = () => {
    fileInputRef?.current?.click();
    setTypeBtnAction("change-avatar");
  };
  const handleUpdateUser = (type: UpdateUser) => {
    if (current) {
      switch (type) {
        case "change-info":
          saveUserData.fullName = fullName;
          saveUserData.address = address;
          saveUserData.avatar = current.avatar;
          dispatch(updateUser(saveUserData));
          break;
        case "delete-avatar":
          saveUserData.fullName = current.fullName;
          saveUserData.address = current.address;
          saveUserData.avatar = images.defaultAvt;
          dispatch(updateUser(saveUserData));
          break;
        case "change-avatar":
          if (avatarRef.current?.src) {
            saveUserData.fullName = current.fullName;
            saveUserData.address = current.address;
            saveUserData.avatar = avatarRef.current.src;
            dispatch(updateUser(saveUserData));
          }
          break;
      }
    }
  };
  const handleRenderUpdateAvatarActionButtons = (action: ActionButton) => {
    switch (action) {
      case "default":
        return (
          <>
            {/* <Button
              variant="contained"
              sx={{
                display: "flex",
                gap: "4px",
                borderRadius: "8px",
                background:
                  "linear-gradient(83.63deg,#ff675c 33.34%,#ff8d85 113.91%);",
              }}
              onClick={() => setTypeBtnAction("delete-avatar")}
            >
              Xóa
            </Button> */}
            <Button
              variant="contained"
              sx={{
                display: "flex",
                gap: "4px",
                borderRadius: "8px",
                background:
                  "linear-gradient(83.63deg,#7cdead 33.34%,#9de7c2 113.91%);",
              }}
              onClick={handleOpenFileDialog}
            >
              Thay ảnh đại diện
            </Button>
          </>
        );
      case "delete-avatar":
        return (
          <>
            <Button
              variant="outlined"
              style={{ border: "1px solid var(--border-color)" }}
              onClick={() => setTypeBtnAction("default")}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleUpdateUser("delete-avatar")}
            >
              {loading ? (
                <CircularProgress size={28} sx={{ color: "var(--white)" }} />
              ) : (
                "Xác nhận xóa"
              )}
            </Button>
          </>
        );
      case "change-avatar":
        return (
          <>
            <Button
              variant="outlined"
              style={{ border: "1px solid var(--border-color)" }}
              onClick={() => setTypeBtnAction("default")}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => handleUpdateUser("change-avatar")}
            >
              {loading ? (
                <CircularProgress size={28} sx={{ color: "var(--white)" }} />
              ) : (
                "Lưu"
              )}
            </Button>
          </>
        );
    }
  };

  useEffect(() => {
    if (successAction || errorAction) {
      if (successAction) {
        dispatch(
          login({
            isLoggedIn: true,
            token: token,
            current: { ...current, ...saveUserData },
          })
        );
        handleSetCurrent();
        setTypeBtnAction("default");
      }
      displayNotification({
        message: errorAction || successAction,
        severity: successAction ? "success" : "error",
        title: successAction ? "Thành công" : "Thất bại",
      });
      dispatch(resetAuthStatus());
    }
  }, [successAction, errorAction]);
  return (
    <Stack flexDirection="column" gap="16px">
      <Stack flexDirection="column" alignItems="center" gap="8px">
        <img
          src={current?.avatar || images.defaultAvt}
          className="avatar-profile"
          alt="avatar"
          ref={avatarRef}
        />
        <Stack flexDirection="row" gap="8px">
          {handleRenderUpdateAvatarActionButtons(typeBtnAction)}
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: "var(--divider-color)" }} />
      <Stack flexDirection="row" gap="8px" alignItems="center">
        <Typography variant="label1" flexShrink="0" minWidth="60px">
          Email:
        </Typography>
        {isClickChange ? (
          <TextField
            value={current?.email}
            disabled={true}
            InputProps={{
              readOnly: loading,
            }}
          />
        ) : (
          <Typography variant="body1">{current?.email}</Typography>
        )}
      </Stack>
      <Divider sx={{ borderColor: "var(--divider-color)" }} />
      <Stack flexDirection="row" gap="8px" alignItems="center">
        <Typography variant="label1" flexShrink="0" minWidth="60px">
          Họ tên:
        </Typography>
        {isClickChange ? (
          <TextField
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            InputProps={{
              readOnly: loading,
            }}
          />
        ) : (
          <Typography variant="body1">{fullName}</Typography>
        )}
      </Stack>
      <Divider sx={{ borderColor: "var(--divider-color)" }} />
      <Stack flexDirection="row" gap="8px" alignItems="center">
        <Typography variant="label1" flexShrink="0" minWidth="60px">
          Địa chỉ:
        </Typography>
        {isClickChange ? (
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputProps={{
              readOnly: loading,
            }}
          />
        ) : (
          <Typography variant="body1">{address ? address : "- - -"}</Typography>
        )}
      </Stack>
      <Divider sx={{ borderColor: "var(--divider-color)" }} />
      <Stack
        flexDirection="row"
        gap="16px"
        width="100%"
        justifyContent="flex-end"
      >
        {isClickChange ? (
          <>
            <Button
              variant="contained"
              disabled={loading}
              onClick={() => handleSetCurrent()}
              sx={{
                display: "flex",
                gap: "4px",
                borderRadius: "8px",
                background:
                  "linear-gradient(83.63deg,#ff675c 33.34%,#ff8d85 113.91%);",
              }}
            >
              {loading ? (
                <CircularProgress size={28} sx={{ color: "var(--white)" }} />
              ) : (
                "Hủy"
              )}
            </Button>

            <Button
              variant="contained"
              disabled={loading}
              onClick={() => handleUpdateUser("change-info")}
            >
              {loading ? (
                <CircularProgress size={28} sx={{ color: "var(--white)" }} />
              ) : (
                "Lưu"
              )}
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsClickChange((prev) => !prev);
            }}
          >
            Thay đổi
          </Button>
        )}
      </Stack>

      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept="image/*,application/pdf"
        onChange={handleImageChange}
        onDrop={() => setTypeBtnAction("default")}
      />
    </Stack>
  );
};

export default TabProfile;
