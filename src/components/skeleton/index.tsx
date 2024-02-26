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
    case "card-doctor":
      return <CardDoctorSkeleton customKey={customKey} />;
    case "card-schedule":
      return <CardScheduleSkeleton customKey={customKey} />;
    case "card-patient":
      return <CardPatientSkeleton customKey={customKey} />;
    case "card-search":
      return <CardSearchSkeleton customKey={customKey} />;
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

const CardPatientSkeleton = ({ customKey }: SkeletonProps) => {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const paddingCard = isTablet ? "28px 27px 26px" : "15px 13px";
  return (
    <Box
      key={customKey}
      padding="10px"
      sx={{
        display: "flex !important",
      }}
    >
      <Box width="100%">
        <Box
          className="record__card"
          sx={{
            padding: paddingCard,
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          }}
        >
          <Skeleton height={24} width="100%" />
          <Skeleton height={24} width="100%" />
          <Skeleton height={24} width="100%" />
          <Skeleton height={24} width="100%" />
          <Stack flexDirection="row" gap="16px" alignItems="center">
            <Skeleton height={48} width="100%" />
            <Skeleton height={48} width="100%" />
          </Stack>
        </Box>
      </Box>{" "}
    </Box>
  );
};
const CardSearchSkeleton = ({ customKey }: SkeletonProps) => {
  return (
    <Box key={customKey} className="search__card" gap="10px">
      <Skeleton height="40px" width="40px" />
      <Stack
        flexDirection="column"
        gap="4px"
        alignItems="flex-start"
        width="100%"
      >
        <Skeleton height={18} width="100%" />
        <Skeleton height={18} width="100%" />
      </Stack>
    </Box>
  );
};

const CardDoctorSkeleton = ({ customKey }: SkeletonProps) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const gapCard = isDesktop ? "40px" : "10px";
  return (
    <Stack key={customKey} padding="0 10px" width="100%">
      <Stack flex="100%" maxWidth="100%" padding="0 10px">
        <Box className="hospital__card" gap={gapCard}>
          <Skeleton height={76} width={76} />
          <Stack
            flexDirection="column"
            gap="16px"
            justifyContent="center"
            width="100%"
          >
            <Skeleton height={24} width="100%" />
            <Skeleton height={24} width="100%" />
            <Skeleton height={48} width="100%" />
            <Skeleton height={24} width="100%" />
            <Stack flexDirection="row" gap="16px">
              <Skeleton height={40} width="25%" />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
const CardScheduleSkeleton = ({ customKey }: SkeletonProps) => {
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  return (
    <Stack
      key={customKey}
      flexDirection="row"
      flexWrap={isTablet ? "wrap" : "nowrap"}
      rowGap="24px"
      gap="24px"
      sx={{ overflow: "auto" }}
      width="100%"
    >
      <Skeleton height="80px" width="115px" />
      <Skeleton height="80px" width="115px" />
      <Skeleton height="80px" width="115px" />
      <Skeleton height="80px" width="115px" />
      <Skeleton height="80px" width="115px" />
      <Skeleton height="80px" width="115px" />
      <Skeleton height="80px" width="115px" />
    </Stack>
  );
};
