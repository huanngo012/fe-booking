import "./style.scss";
import {
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiMagnifyingGlass,
} from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { theme } from "../../themes/Theme";
import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { images } from "../../assets";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paddingScreen, path } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getClinics } from "../../redux/reducer/Clinic";
import useDebounce from "../../hooks/useDebounce";
import EmptyPage from "../../components/emptyPage";
import { apiGetProvinces } from "../../apis";
import unidecode from "unidecode";
import CustomSkeleton from "../../components/skeleton";

const { LocationIcon } = images;

const HospitalPage = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet"));
  const variant1 = isDesktop ? "h3" : "h5";
  const variant2 = isDesktop ? "h5" : "label1";
  const widthCard = isDesktop ? "50%" : "100%";
  const gapCard = isDesktop ? "40px" : "10px";

  const dispatch = useDispatch<AppDispatch>();
  const { clinics, loading } = useSelector((state: any) => state.clinic);

  const pageSizeDefault = 10;

  const [openSearchRecommendation, setOpenSearchRecommendation] =
    useState(false);
  const [keyword, setKeyword] = useState("");
  const [provinces, setProvinces] = useState<any>([]);
  const [province, setProvince] = useState("");
  const [searchedResultList, setSearchedResultList] = useState([]);
  const [page, setPage] = useState<number>(1);

  const handleOpenActionMenu = () => setOpenSearchRecommendation(true);
  const handleCloseActionMenu = () => setOpenSearchRecommendation(false);

  const fetchApiProvince = async () => {
    const response = await apiGetProvinces();
    if (response?.status === 200) {
      setProvinces(response?.data?.results);
    }
  };
  useEffect(() => {
    fetchApiProvince();
  }, []);

  useEffect(() => {
    if (keyword !== "") {
      handleOpenActionMenu();
      const filteredData = provinces.filter((data: any) =>
        unidecode(data.province_name.toLowerCase()).includes(
          unidecode(keyword.toLowerCase())
        )
      );
      setSearchedResultList(filteredData as []);
    } else setSearchedResultList(provinces as []);
  }, [keyword, provinces]);

  const handleChangePage = (e: any, value: number) => {
    setPage(value);
  };

  const [searchLabel, setSearchLabel] = useState("");
  const [clinicsSearch, setClinicsSearch] = useState<any>({});

  const debounceSearchLabel = useDebounce(searchLabel, 700);
  const debounceSearchProvince = useDebounce(province, 700);
  useEffect(() => {
    setPage(1);

    dispatch(
      getClinics({
        limit: pageSizeDefault,
        page: 1,
        name: searchLabel,
        "address.province": province,
      })
    );
  }, [debounceSearchLabel, debounceSearchProvince]);

  useEffect(() => {
    dispatch(
      getClinics({
        limit: pageSizeDefault,
        page: page,
        name: searchLabel,
        "address.province": province,
      })
    );
  }, [page]);

  useEffect(() => {
    setClinicsSearch(clinics);
  }, [clinics]);

  const totalPage = Math.ceil(clinics?.counts / pageSizeDefault);

  return (
    <Box className="hospital__wrapper">
      <Box className="hospital__header">
        <Container className="hospital__header-content" sx={paddingScreen}>
          <Box
            padding="6px 16px"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "30px",
              alignItems: "flex-start",
              gap: "10px",
              backgroundColor: "hsla(0,0%,100%,.85)",
              borderRadius: "30px",
            }}
          >
            <Typography
              variant={variant1}
              color="var(--primary)"
              className="text-title"
            >
              ĐẶT KHÁM TẠI CƠ SỞ
            </Typography>
            <Typography variant={variant2} color="var(--secondary)">
              Đặt khám nhanh chóng, tiết kiệm thời gian, an toàn tiện lợi
            </Typography>
          </Box>
        </Container>
      </Box>
      <Stack alignItems="center" sx={paddingScreen}>
        <Box className="hospital__body">
          <Stack
            flexDirection="row"
            sx={{
              maxWidth: "900px",
              width: "100%",
              margin: "auto",
            }}
          >
            <TextField
              placeholder="Tìm kiếm"
              onChange={(e: any) => setSearchLabel(e.target.value)}
              sx={{
                "&.MuiFormControl-root": {
                  width: "100%",
                },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderTopLeftRadius: "16px",
                  borderBottomLeftRadius: "16px",
                  boxShadow: "4px 8px 30px 0 rgba(177,196,218,.35)",
                  padding: "6px 20px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PiMagnifyingGlass size={24} color="var(--text-tertiary)" />
                  </InputAdornment>
                ),
              }}
            />
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              position="relative"
            >
              {" "}
              <ClickAwayListener onClickAway={handleCloseActionMenu}>
                <Box>
                  <TextField
                    placeholder="Tất cả địa điểm"
                    autoComplete="off"
                    value={keyword || province}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderTopRightRadius: "16px",
                        borderBottomRightRadius: "16px",
                        boxShadow: "4px 8px 30px 0 rgba(177,196,218,.35)",
                        padding: "6px 20px",
                        minWidth: "300px",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon color="var(--text-tertiary)" />
                        </InputAdornment>
                      ),
                      endAdornment:
                        keyword !== "" || province !== "" ? (
                          <IoMdClose
                            size={24}
                            color="var(--text-tertiary)"
                            cursor="pointer"
                            onClick={() => {
                              setKeyword("");
                              setProvince("");
                            }}
                          />
                        ) : (
                          <PiCaretDown
                            size={24}
                            color="var(--text-tertiary)"
                            cursor="pointer"
                          />
                        ),
                    }}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setProvince("");
                    }}
                    onClick={() => handleOpenActionMenu()}
                  />
                  {openSearchRecommendation &&
                    searchedResultList.length !== 0 && (
                      <Stack
                        className="search-recommend-result"
                        padding="12px"
                        direction="column"
                        gap={0.5}
                      >
                        {searchedResultList.map((item: any) => (
                          <MenuItem
                            className="search-recommend-result__item"
                            onClick={() => {
                              setProvince(item.province_name);
                              setKeyword("");
                            }}
                            selected={item.province_name === province}
                          >
                            <Typography variant="body2">
                              {item.province_name}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Stack>
                    )}
                </Box>
              </ClickAwayListener>
            </Stack>
          </Stack>
          <Stack flexDirection="row" flexWrap="wrap" rowGap="20px" width="100%">
            {!loading ? (
              clinicsSearch.success ? (
                clinicsSearch?.data?.map((el: any, index: any) => (
                  <Stack
                    key={index}
                    flex={widthCard}
                    maxWidth={widthCard}
                    padding="0 10px"
                  >
                    <Box className="hospital__card" gap={gapCard}>
                      <Box
                        width="76px"
                        height="76px"
                        component="img"
                        src={el.logo}
                        alt={el.name}
                      />
                      <Stack
                        flexDirection="column"
                        gap="16px"
                        justifyContent="center"
                      >
                        <Typography variant={isTablet ? "h6" : "label1"}>
                          {el.name}
                        </Typography>
                        <Typography
                          variant={isTablet ? "body2" : "body3"}
                          display="flex"
                          alignItems="center"
                          gap="4px"
                          color="var(--text-tertiary)"
                        >
                          <LocationIcon
                            color="var(--text-tertiary)"
                            className="truncate_2"
                          />
                          {el?.address?.detail ? `${el?.address?.detail},` : ""}{" "}
                          {el?.address?.ward ? `${el?.address?.ward},` : ""}{" "}
                          {el?.address?.district
                            ? `${el?.address?.district},`
                            : ""}
                          {el?.address?.province}
                        </Typography>
                        <Stack flexDirection="row" gap="16px">
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              display: "flex",
                              gap: "4px",
                              borderRadius: "30px",
                            }}
                            onClick={() => navigate(`/hospitals/${el._id}`)}
                          >
                            <Typography
                              variant={isTablet ? "button2" : "button3"}
                            >
                              Xem chi tiết
                            </Typography>
                          </Button>
                          {/* <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          display: "flex",
                          gap: "4px",
                          borderRadius: "30px",
                        }}
                        onClick={() => navigate(`/hospitals/${el.id}`)}
                      >
                        <Typography variant={isTablet ? "button2" : "button3"}>
                          Xem chi tiết
                        </Typography>
                      </Button> */}
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                ))
              ) : (
                <EmptyPage title="Không tìm thấy bệnh viện" />
              )
            ) : (
              [...Array(10)].map((item, index: number) => (
                <CustomSkeleton
                  key={index}
                  customKey={`skeleton__card-hospital-${index}`}
                  variant="card-hospital"
                />
              ))
            )}
          </Stack>
          {!loading && clinicsSearch.success && (
            <Pagination
              count={totalPage}
              page={page}
              hidePrevButton={page === 1}
              hideNextButton={page === totalPage}
              onChange={handleChangePage}
              shape="rounded"
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: PiCaretLeft, next: PiCaretRight }}
                  {...item}
                />
              )}
              sx={{
                "&.MuiPagination-root": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default HospitalPage;
