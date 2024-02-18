import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";

const Votebar = ({
  number,
  ratingCount,
  ratingTotal,
}: {
  number: any;
  ratingCount: any;
  ratingTotal: any;
}) => {
  const percentRef = useRef<any>();
  useEffect(() => {
    const percent: any = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingTotal, ratingCount]);
  return (
    <Stack flexDirection="row" alignItems="center" gap="8px">
      <Stack
        flexDirection="row"
        width="10%"
        alignItems="center"
        justifyContent="center"
        gap="4px"
      >
        <Typography variant="label2">{number}</Typography>
        <AiFillStar size={16} color="orange" />
      </Stack>
      <Box width="90%">
        <Box
          sx={{
            width: "100%",
            height: "6px",
            position: "relative",
            zIndex: "10",
            backgroundColor: "var(--border-color)",
            borderRadius: "99999px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: "0",
              backgroundColor: "orange",
              borderRadius: "99999px",
            }}
            ref={percentRef}
          ></Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Votebar;
