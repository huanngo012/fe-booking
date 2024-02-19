import "./style.scss";

import { Box, Stack } from "@mui/system";
import { Skeleton, useMediaQuery } from "@mui/material";

import { CustomSkeletonProps, SkeletonProps } from "../module";
import { theme } from "../../themes/Theme";

// Main function
const CustomSkeleton = ({ customKey, variant }: CustomSkeletonProps) => {
  switch (variant) {
    case "card-hospital":
      return <CardHospitalSkeleton customKey={customKey} />;
    case "card-hospital-section":
      return <CardHospitalSectionSkeleton customKey={customKey} />;
    default:
      return <></>;
  }
};

export default CustomSkeleton;

const CardHospitalSkeleton = ({ customKey }: SkeletonProps) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

  const widthCard = isDesktop ? "50%" : "100%";
  const gapCard = isDesktop ? "40px" : "10px";
  return (
    <Stack
      key={customKey}
      flex={widthCard}
      maxWidth={widthCard}
      padding="0 10px"
    >
      <Box className="hospital__card" gap={gapCard}>
        <Skeleton height={76} width={76} />
        <Stack
          flexDirection="column"
          gap="16px"
          justifyContent="center"
          width="100%"
        >
          <Skeleton height={24} width="100%" />
          <Skeleton height={48} width="100%" />
          <Stack flexDirection="row" gap="16px">
            <Skeleton height={40} width="25%" />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
const CardHospitalSectionSkeleton = ({ customKey }: SkeletonProps) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));

  const heightImg = isTablet ? (isDesktop ? "200px" : "150px") : "100px";
  return (
    <Box key={customKey} padding="10px">
      <Box className="hospital-section__card">
        <Skeleton height={heightImg} width={heightImg} />
        <Box component="span" sx={{ display: "flex", height: "16px" }}>
          <Skeleton width={16} />
          <Skeleton width={16} />
          <Skeleton width={16} />
          <Skeleton width={16} />
          <Skeleton width={16} />
        </Box>
        <Skeleton height={24} width="100%" />
        <Skeleton height={48} width="100%" />
      </Box>
    </Box>
  );
};
