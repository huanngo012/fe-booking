import moment from "moment";
import { renderStartFromNumber } from "../../utils/helper";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import ActionMenu from "../action-menu/ActionMenu";
import PopupEditComment from "./PopupEditComment";
import PopupDeleteComment from "./PopupDeleteComment";
import { theme } from "../../themes/Theme";

const CommentCard = ({ data }: { data?: any }) => {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  return (
    <Stack flexDirection="row" gap="16px">
      <Box width="35px">
        <Box
          component="img"
          src={
            data?.postedBy?.avatar
              ? data?.postedBy?.avatar
              : "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fumc2%2Fweb%2Flogo.png&w=1920&q=75"
          }
          alt="avatar"
          width="35px"
          height="35px"
          borderRadius="50%"
        />
      </Box>
      <Stack flexDirection="column" flex="1">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="label1">{data?.postedBy?.fullName}</Typography>
          <Typography variant="body3">
            <i> {moment(data?.updatedAt)?.fromNow()}</i>
          </Typography>
        </Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems={isTablet ? "center" : "flex-start"}
          gap="8px"
          padding="8px 16px"
          marginTop="8px"
          sx={{
            border: " 1px solid var(--divider-color)",
            background: "var(--divider-color)",
            borderRadius: "8px",
          }}
        >
          <Stack flexDirection="column" gap="8px">
            <Stack flexDirection="row" alignItems="center" gap="4px">
              <Typography variant="label2" minWidth="80px">
                Đánh giá:
              </Typography>
              <Typography>
                {renderStartFromNumber(data?.star, 16)?.map((el, index) => (
                  <Typography component="span" key={index}>
                    {el}
                  </Typography>
                ))}
              </Typography>
            </Stack>
            <Stack flexDirection="row" alignItems="flex-start" gap="4px">
              <Typography variant="label2" minWidth="80px">
                Nhận xét:
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                {data?.comment}
              </Typography>
            </Stack>
          </Stack>
          <Box minWidth="30px">
            <ActionMenu
              actionList={
                <>
                  <PopupEditComment data={data} />
                  <PopupDeleteComment id={data?.clinicID} />
                </>
              }
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CommentCard;
