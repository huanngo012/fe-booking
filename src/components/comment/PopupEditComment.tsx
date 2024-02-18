import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { voteOptions } from "../../utils/constant";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ratingClinic } from "../../redux/reducer/Clinic";
import { theme } from "../../themes/Theme";

const PopupEditComment = ({ data }: { data?: any }) => {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<any>({});

  const handleClickOpen = () => {
    setOpen(true);
    setPayload(data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(ratingClinic({ ...payload, updatedAt: Date.now() }));
  };

  return (
    <>
      <Button
        variant="outlined"
        color="tertiary"
        sx={{
          display: "flex",
          gap: "4px",
          borderRadius: "30px",
        }}
        onClick={handleClickOpen}
      >
        <Typography variant={isTablet ? "body2" : "body3"}>
          Chỉnh sửa
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"tablet"}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "8px",
            width: "100%",
          },
        }}
      >
        <DialogContent sx={{ padding: "0", height: "70vh" }}>
          <Box className="popup__content">
            <Box className="popup__header">
              <Typography variant="h5">Đánh giá bệnh viện</Typography>
              <IconButton aria-label="close" onClick={handleClose}>
                <IoMdClose size={24} />
              </IconButton>
            </Box>
            <Divider
              sx={{
                borderBottom: "1px solid var(--border-color)",
                width: "100%",
              }}
            />
            <Box className="popup__body">
              <Stack direction="column" gap="16px" width="100%">
                <Textarea
                  value={payload?.comment}
                  aria-label="empty textarea"
                  placeholder="Bình luận"
                  minRows="5"
                  onChange={(e) =>
                    setPayload((prev: any) => ({
                      ...prev,
                      comment: e?.target?.value,
                    }))
                  }
                />
                <Stack flexDirection="column" gap="16px">
                  <Typography variant="label2">
                    Bạn có thích sản phẩm này?
                  </Typography>
                  <Stack
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="16px"
                  >
                    {voteOptions.map((el) => (
                      <Stack
                        flexDirection="column"
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                        padding="16px"
                        justifyContent="center"
                        alignItems="center"
                        gap="8px"
                        sx={{
                          backgroundColor: "var(--grey-neutral-60)",
                          cursor: "pointer",
                        }}
                        key={el.id}
                        onClick={() =>
                          setPayload((prev: any) => ({
                            ...prev,
                            star: el.id,
                          }))
                        }
                      >
                        {Number(payload?.star) && payload?.star >= el.id ? (
                          <AiFillStar color="orange" />
                        ) : (
                          <AiOutlineStar color="var(--grey-neutral-500)" />
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Box>
            <Divider
              sx={{
                borderBottom: "1px solid var(--border-color)",
                width: "100%",
              }}
            />
            <Box className="popup__footer">
              <Button
                variant="contained"
                color="tertiary"
                onClick={handleClose}
                sx={{ width: "100%" }}
              >
                <Typography variant="button2">Hủy</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ width: "100%" }}
              >
                <Typography variant="button2">Bình luận</Typography>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupEditComment;

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
     font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: var(--text-primary);
    background: white;
    border: 1px solid var(--border-color);

    &:hover {
      border-color: var(--primary);
    }

    &:focus {
      outline: 0;
      color: var(--text-primary);
      border-color:1px var(--primary);
    }
  `
);
