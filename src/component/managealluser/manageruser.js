import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Styles from "./manageruser.module.css";
import { TabContext, TabPanel } from "@mui/lab";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import { Table_Row } from "./review_data";
import Pagination from "../Pagination/pagination";

function createData(name, calories, fat) {
  return { name, calories, fat };
}
let PageSize = 10;

const Movie_review_Pages = (props) => {
  const [value, setValue] = React.useState("All Reviews");
  const [userSearchmenu, setDatalistlogin] = React.useState([]);
  const [datatab, setDatatab] = React.useState("active");
  const [all_review_list, setAll_review_list] = React.useState([]);
  const [flaged_review_list, setFlaged_review_list] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFlaged, setCurrentPageFlaged] = React.useState(1);
  const [reviewSearch, setReviewSearch] = React.useState([]);
  const [flagedSearch, setFlagedSearch] = React.useState([]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPageFlaged - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return flaged_review_list.slice(firstPageIndex, lastPageIndex);
  }, [currentPageFlaged, flaged_review_list]);

  let allReviewData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return all_review_list.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, all_review_list]);

  const adminUserList = async () => {
    setCurrentPage(2);
    setCurrentPageFlaged(2);

    let body = {
      type: undefined,
    };

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_USER_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        const Flaged_data_list = [];
        const All_data_list = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          const object = {
            followers: element.followers,
            reviews: element.reviews,
            id: element.userDetails.id,
            name: element.userDetails.name,
            status: element.userDetails.status,
            profile_photo: element.userDetails.profile_photo,
          };
          if (object.status == "flaged") {
            Flaged_data_list.push(object);
          }
          All_data_list.push(object);
        }
        setFlaged_review_list(Flaged_data_list);
        setAll_review_list(All_data_list);
        setFlagedSearch(Flaged_data_list);
        setCurrentPage(1);
        setCurrentPageFlaged(1);
        setDatalistlogin(All_data_list);
        setReviewSearch(All_data_list);
        // setDatalistlogin(accoyty);
      } else {
        // setDatalistlogin("");
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };
  const userDelete = async (value) => {
    var body = {
      id_user: value,
    };
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_USER_DELETE,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        adminUserList();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };

  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      adminUserList();
    }
  }, []);

  const flaged_search = (e) => {
    var value = e.target.value;
    if (typeof value !== "object") {
      if (!value || value == "") {
        setFlaged_review_list(flagedSearch);
        PageSize = 10;
      } else {
        var filteredData = flagedSearch.filter((item) => {
          let searchValue = item.name.toLowerCase();
          return searchValue.includes(value.toString().toLowerCase());
        });

        if (filteredData.length == 0) {
          PageSize = 1;
        } else PageSize = filteredData.length;
        setFlaged_review_list(filteredData);
      }
    }
  };

  const all_search = (e) => {
    var value = e.target.value;
    if (typeof value !== "object") {
      if (!value || value == "") {
        setAll_review_list(reviewSearch);
        PageSize = 10;
      } else {
        var filteredData = reviewSearch.filter((item) => {
          let searchValue = item.name.toLowerCase();
          return searchValue.includes(value.toString().toLowerCase());
        });

        if (filteredData.length == 0) {
          PageSize = 1;
        } else PageSize = filteredData.length;
        setAll_review_list(filteredData);
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="mainView_of_all_pages">
      <Box className={Styles.Movie_main_box}>
        <TextField
          placeholder="Search"
          className={"Search_Bar_input"}
          id="input-with-icon-textfield"
          //   console.log(e.target.value, "is_value____");
          onChange={(e) => {
            if (datatab == "active") {
              all_search(e);
            } else if (datatab == "flaged") {
              flaged_search(e);
            }

            // setPage(0);
            // var value = e.target.value;
            // if (typeof value !== "object") {
            //   if (!value || value == "") {
            //     setAll_review_list(reviewSearch);
            //     PageSize = 10;
            //   } else {
            //     var filteredData = reviewSearch.filter((item) => {
            //       let searchValue = item.name.toLowerCase();
            //       return searchValue.includes(value.toString().toLowerCase());
            //     });

            //     if (filteredData.length == 0) {
            //       PageSize = 1;
            //     } else PageSize = filteredData.length;
            //     setAll_review_list(filteredData);
            //   }
            // }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src="./image/MagnifyingGlass.svg" />
              </InputAdornment>
            ),
            endAdornment: (
              <Button
                size="small"
                style={{
                  minWidth: "35px",
                }}
              >
                <img src="./image/Faders.svg" />
              </Button>
            ),
          }}
          variant="outlined"
        />
        <Box className={Styles.Content_div} sx={{ marginTop: "10px" }}>
          <TabContext value={value}>
            <Tabs
              value={value}
              onChange={handleChange}
              className={Styles.Tab_Bar_}
              aria-label="disabled tabs example"
              centered
            >
              <Tab
                label="All Reviews"
                className={datatab == "active" ? Styles.Tabs_321 : Styles.Tabs_}
                onClick={() => {
                  setDatatab("active");
                }}
                value={"All Reviews"}
              />
              <Tab
                label="Flaged Reviews"
                className={datatab == "flaged" ? Styles.Tabs_321 : Styles.Tabs_}
                onClick={() => {
                  setDatatab("flaged");
                }}
                value="Flaged Reviews"
              />
            </Tabs>
            <TabPanel className={Styles.Tab_panel_} value={"All Reviews"}>
              <TableContainer component={Paper} className={Styles.listmeneuet}>
                <Table
                  sx={{ minWidth: 500 }}
                  className={Styles.tebaldata}
                  aria-label="custom pagination table"
                >
                  <TableBody>
                    {allReviewData.map((item, idx) => (
                      // <Review_box data={item} userDelete={userDelete} />
                      <Table_Row item={item} userDelete={userDelete} />
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  className={Styles.pagination_bar}
                  currentPage={currentPage}
                  totalCount={all_review_list.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </TableContainer>
            </TabPanel>
            <TabPanel className={Styles.Tab_panel_} value={"Flaged Reviews"}>
              <TableContainer component={Paper} className={Styles.listmeneuet}>
                <Table
                  sx={{ minWidth: 500 }}
                  className={Styles.tebaldata}
                  aria-label="custom pagination table"
                >
                  <TableBody>
                    {currentTableData.map((item, idx) => (
                      <Table_Row item={item} userDelete={userDelete} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                className="pagination-bar"
                currentPage={currentPageFlaged}
                totalCount={flaged_review_list.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPageFlaged(page)}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default Movie_review_Pages;
