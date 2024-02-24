import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { theme } from "../../themes/Theme";
import { renderStartFromNumber } from "../../utils/helper";
import Votebar from "./Votebar";
import CommentCard from "./CommentCard";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

const Comment = ({
  ratings,
  totalRatings,
  clinicID,
  popUpComment,
}: {
  ratings?: any;
  totalRatings?: any;
  clinicID?: any;
  popUpComment?: ReactNode;
}) => {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));

  const { current } = useSelector((state: any) => state.auth);

  ratings.sort((a: any, b: any) =>
    a?.postedBy?._id === current?._id
      ? -1
      : b?.postedBy?._id === current?._id
        ? 1
        : 0
  );

  return (
    <Stack
      flexDirection="column"
      justifyContent="space-around"
      borderRadius="16px"
      sx={{ backgroundColor: "var(--white)" }}
      padding="35px"
      gap="24px"
      height="100%"
    >
      <Typography variant="h5">Đánh giá</Typography>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "var(--divider-color)",
        }}
      />
      <Stack
        flexDirection={isTablet ? "row" : "column"}
        alignItems="center"
        gap="16px"
        width="100%"
      >
        <Stack
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width={isTablet ? "40%" : "100%"}
        >
          <Typography variant="label2">{totalRatings}/5</Typography>
          <Typography>
            {renderStartFromNumber(totalRatings, 24)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </Typography>

          <Typography variant="label2">đánh giá và nhận xét</Typography>
        </Stack>
        <Divider
          orientation={isTablet ? "vertical" : "horizontal"}
          flexItem
          sx={{
            backgroundColor: "var(--divider-color)",
          }}
        />
        <Stack width={isTablet ? "60%" : "100%"}>
          {Array.from(Array(5).keys())
            .reverse()
            .map((el) => (
              <Votebar
                key={el}
                number={el + 1}
                ratingTotal={ratings?.length}
                ratingCount={
                  ratings?.filter((i: any) => i.star === el + 1)?.length
                }
              />
            ))}
        </Stack>
      </Stack>
      {ratings?.some((el: any) => el?.postedBy?._id === current?._id) ? (
        <Stack flexDirection="column" alignItems="center">
          <Typography variant="label1">
            Bạn đã đánh giá bệnh viện này
          </Typography>
        </Stack>
      ) : (
        <Stack flexDirection="column" alignItems="center">
          <Typography variant="label1">Đánh giá bệnh viện này?</Typography>
          {popUpComment}
        </Stack>
      )}
      <Stack flexDirection="column" gap="16px" width="100%">
        {ratings?.map((el: any, index: any) => (
          <CommentCard key={index} data={{ ...el, clinicID }} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Comment;
