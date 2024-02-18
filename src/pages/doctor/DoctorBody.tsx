import "./style.scss";
import {
  Box,
  ClickAwayListener,
  InputAdornment,
  MenuItem,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
} from "@mui/material";
import {
  PiCaretDown,
  PiCaretLeft,
  PiCaretRight,
  PiMagnifyingGlass,
} from "react-icons/pi";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Fragment, useEffect, useState } from "react";
import { getDoctors } from "../../redux/reducer/Doctor";
import { CiLocationOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Highlighter from "react-highlight-words";
import DoctorCard from "../../components/doctor-card";
import useDebounce from "../../hooks/useDebounce";
import EmptyPage from "../../components/emptyPage";

const DoctorBody = ({ nameClinic }: { nameClinic?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctors } = useSelector((state: any) => state.doctor);
  const pageSizeDefault = 10;
  const [openSearchRecommendation, setOpenSearchRecommendation] =
    useState(false);
  const [keyword, setKeyword] = useState("");
  const [province, setProvince] = useState("");
  const [searchedResultList, setSearchedResultList] = useState([]);
  const [page, setPage] = useState<number>(1);

  const handleOpenActionMenu = () => setOpenSearchRecommendation(true);
  const handleCloseActionMenu = () => setOpenSearchRecommendation(false);

  const handleChangePage = (e: any, value: number) => {
    setPage(value);
  };

  const [searchLabel, setSearchLabel] = useState("");
  const [doctorsSearch, setDoctorsSearch] = useState<any>({});

  const debounceSearchLabel = useDebounce(searchLabel, 700);
  const debounceSearchProvince = useDebounce(province, 700);
  useEffect(() => {
    setPage(1);

    dispatch(
      getDoctors({
        limit: pageSizeDefault,
        page: 1,
        nameClinic: nameClinic,
        fullName: searchLabel,
      })
    );
  }, [debounceSearchLabel, debounceSearchProvince, nameClinic]);

  useEffect(() => {
    dispatch(
      getDoctors({
        limit: pageSizeDefault,
        page: page,
        fullName: searchLabel,
        nameClinic: nameClinic,
      })
    );
  }, [page]);

  useEffect(() => {
    setDoctorsSearch(doctors);
  }, [doctors]);

  const totalPage = Math.ceil(doctors?.counts / pageSizeDefault);

  return (
    <Box className="hospital__body">
      <Stack
        flexDirection="row"
        sx={{
          maxWidth: "700px",
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
        <Stack direction="row" gap={1} alignItems="center" position="relative">
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
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CiLocationOn color="var(--text-tertiary)" size="20px" />
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
              {openSearchRecommendation && searchedResultList.length !== 0 && (
                <Stack
                  className="search-recommend-result"
                  direction="column"
                  gap={0.5}
                >
                  {searchedResultList.map((item: any) => (
                    <MenuItem
                      className="search-recommend-result__item"
                      onClick={() => {
                        setProvince(item.stationName);
                        setKeyword("");
                      }}
                      selected={item.stationName === province}
                    >
                      <Highlighter
                        className="highlight-box"
                        highlightClassName="highlight-words"
                        searchWords={[...keyword.split(" ")]}
                        autoEscape={true}
                        textToHighlight={item.stationName}
                      />
                    </MenuItem>
                  ))}
                </Stack>
              )}
            </Box>
          </ClickAwayListener>
        </Stack>
      </Stack>
      <Stack flexDirection="row" flexWrap="wrap" rowGap="20px" maxWidth="100%">
        {doctorsSearch?.data?.length > 0 ? (
          doctorsSearch?.data?.map((el: any, index: any) => (
            <Fragment key={index}>
              <DoctorCard data={el} />
            </Fragment>
          ))
        ) : (
          <EmptyPage title="Không tìm thấy bác sĩ" />
        )}
      </Stack>
      {doctorsSearch?.data?.length > 0 && totalPage && (
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
  );
};

export default DoctorBody;
