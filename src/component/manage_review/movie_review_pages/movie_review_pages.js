import {
  Box,
  Button,
  createTheme,
  Divider,
  Grid,
  Rating,
  InputAdornment,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import Styles from "../manage_review.module.css";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { TabContext, TabPanel } from "@mui/lab";
import { Btn_txt } from "../moview_box";
import FlagCircleRoundedIcon from "@mui/icons-material/FlagCircleRounded";
import ApiServices from "../../../config/ApiServices";
import ApiEndpoint from "../../../config/ApiEndpoint";
import { useRouter, withRouter } from "next/router";
import { toast } from "react-toastify";
import Review_box from "./review_box";

const Movie_review_Pages = (props) => {
  const router = useRouter();
  const [value, setValue] = React.useState("All Reviews");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [datatital, setDatatital] = React.useState("");
  const [description, setDeshcaripsan] = React.useState("");
  const [imgurldata, setImgurldata] = React.useState();
  const [datamenu, setDatamenu] = React.useState([]);
  const [setdata, setSetadata] = React.useState([]);
  const [reset, setRrset] = React.useState([]);
  const [flagedReview, setFlagedReview] = React.useState([]);
  const [allReview, setAllReview] = React.useState([]);

  const [reatiang, setRtiangstar] = React.useState();
  const [datatab, setDatatab] = React.useState("active");
  const [stardata, setStardata] = React.useState(0);
  console.log(stardata, "reatiang");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    if (
      !!props.props.profile &&
      !!props.props.profile.token &&
      router.query.emailID
    ) {
      adminReviewlist(router.query.emailID);
    }
  }, [props.router, stardata]);

  const adminReviewlist = async (value) => {
    let body = {

    };

    if (stardata == 0) {
      body = {
        id_imdb_movie: value,
        // status: datatab,
        // star: stardata,
        // type: "active",
      };
    } else {
      body = {
        id_imdb_movie: value,
        // status: datatab,
        star: stardata,
        // type: "active",
      };
    }

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_REWIEW_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data, 'datadata');
    if (!!data) {
      if (data.status == true) {
        setDatatital(data.data.title);
        setDeshcaripsan(data.data.description);
        setImgurldata(data.data.image_url);
        setRtiangstar(data.data.tixzarRating);
        const Flaged_data = [];
        const All_data = [];
        for (let index = 0; index < data.data.reviewList.length; index++) {
          const element = data.data.reviewList[index];
          const object = {
            id: element.id,
            title: element.userDetails.name,
            description: element.description,
            logoUrl: element.userDetails.profile_photo,
            avg: element.avg,
            status: element.status,
            // type: element.type,
          };

          if (element.status == "flaged") {
            Flaged_data.push(JSON.parse(JSON.stringify(object)));
          }
          All_data.push(JSON.parse(JSON.stringify(object)));
          // accoyty.push(JSON.parse(JSON.stringify(object)));
        }
        setFlagedReview(Flaged_data);
        setAllReview(All_data);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };
  const reviewDelete = async (value) => {
    var body = {
      id_review: value,
    };
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_REVIEW_DELETE,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data, body, "datadata______");

    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        adminReviewlist(router.query.emailID);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };

  const onFilterData = (star) => {
    const value = star;
    console.log(value, "is_value_______");
    // if (typeof value !== "object") {
    //   if (!value || value == "") {
    //     setDatamenu(setdata);
    //   } else {
    //     var filteredData = datamenu.filter((item) => {
    //       console.log(item.name, "filtrer");
    //       let searchValue = item.title.toLowerCase();
    //       return searchValue.includes(value.toString().toLowerCase());
    //     });
    //     setDatamenu(filteredData);
    //   }
    // } else {
    //   setDatamenu(setdata);
    // }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Search_bar_ = (e) => {
    const value = e.target.value;
    console.log(value, "is_value_______");
    if (typeof value !== "object") {
      if (!value || value == "") {
        setDatamenu(setdata);
      } else {
        var filteredData = datamenu.filter((item) => {
          console.log(item.name, "filtrer");
          let searchValue = item.title.toLowerCase();
          return searchValue.includes(value.toString().toLowerCase());
        });
        setDatamenu(filteredData);
      }
    } else {
      setDatamenu(setdata);
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgba(99, 75, 191,0.2)",
      },
      secondary: {
        main: "rgba(255, 0, 0, 0.2)",
      },
    },
  });

  return (
    <Box className="mainView_of_all_pages">
      <Box className={Styles.Movie_review_top_div}>
        <Typography
          className={[Styles.top_movie_txt]}
          sx={{ fontSize: "42px !important" }}
        >
          {datatital}
        </Typography>
        <Button
          className={Styles.Icon_Button}
          size="small"
          href="/Manage_Reviews"
        >
          <img src="./image/Back_icon.svg" />
        </Button>
      </Box>
      <Box className={Styles.Movie_main_box}>
        <Box className={Styles.Movie_details_box}>
          <Grid container>
            <Grid item sm={12} xl={2} lg={2} md={2}>
              <img src={imgurldata} className={Styles.Movie_img_} />
            </Grid>
            <Grid
              item
              sm={12}
              xl={8}
              lg={8}
              md={8}
              padding={"19px"}
              className={Styles.listgroigdesh}
            >
              <Typography className={Styles.Heading_Des}>
                Description
              </Typography>
              <Typography className={Styles.Description_txt}>
                {description}
              </Typography>
            </Grid>
            <Grid item sm={12} xl={2} lg={2} md={2}>
              <Typography className={Styles.Heading_Des}>
                Tixzar Rating
              </Typography>
              <Box className={Styles.Rating_start_box}>
                <StarRoundedIcon
                  fontSize="35px"
                  color="#FFE600"
                  style={{ fontSize: "33px", color: "#FFE600" }}
                />
                <Typography textAlign={"center"} className={Styles.Heading_Des}>
                  {reatiang == null ? "" : parseInt(reatiang.toFixed(2))}/10
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={Styles.Search_div}>
          <TextField
            placeholder="Search"
            className={Styles.Search_Bar_input}
            id="input-with-icon-textfield"
            onChange={(e) => {
              console.log(e.target.value, "is_value____");
              Search_bar_(e);
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
                  onClick={handleClick}
                >
                  <img src="./image/Faders.svg" />
                </Button>
              ),
            }}
            variant="outlined"
          />
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              style: {
                background: "#332E59",
                border: "1px solid white",
              },
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  // bgcolor: 'background.paper',
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                  background: "#332E59",
                  bgcolor: "#332E59",
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <ThemeProvider theme={theme}>
              <Box className={Styles.Menu_Item}>
                <Typography className={Styles.Filter_head}>Category</Typography>
                <Box className={Styles.Btn_rows}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={Styles.Filter_btns}
                  >
                    <Btn_txt data={"Lorem Ipsum"} />
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className={Styles.Filter_btns}
                  >
                    <Btn_txt data={"Lorem"} />
                  </Button>
                </Box>
                <Box className={Styles.Btn_rows}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={Styles.Filter_btns}
                  >
                    <Btn_txt data={"Lorem"} />
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className={Styles.Filter_btns}
                  >
                    <Btn_txt data={"Lorem Ipsum"} />
                  </Button>
                </Box>
              </Box>
              <Divider />
              <Box className={Styles.Menu_Item}>
                <Typography className={Styles.Filter_head}>Reviews</Typography>
                <Box className={Styles.Btn_rows}>
                  <Button

                    onClick={() => {
                      // adminReviewlist(router.query.emailID);
                      setStardata(5);
                      setAnchorEl(null);
                      onFilterData(5);
                    }}
                    color="primary"
                    variant="contained"
                    className={stardata == 5 ? Styles.btn5data : Styles.Filter_btns}
                  >
                    <Btn_txt data={"5 Star"} />
                  </Button>
                  <Button
                    onClick={() => {
                      // adminReviewlist(router.query.emailID);
                      setStardata(4);
                      setAnchorEl(null);
                      onFilterData(4);
                    }}
                    color="primary"
                    variant="contained"
                    className={stardata == 4 ? Styles.btn5data : Styles.Filter_btns}
                  >
                    <Btn_txt data={"4 Star"} />
                  </Button>
                  <Button
                    onClick={() => {
                      // adminReviewlist(router.query.emailID);
                      setStardata(3);
                      setAnchorEl(null);
                      onFilterData(3);
                    }}
                    color="primary"
                    variant="contained"
                    className={stardata == 3 ? Styles.btn5data : Styles.Filter_btns}
                  >
                    <Btn_txt data={"3 Star"} />
                  </Button>
                </Box>
                <Box className={Styles.Btn_rows}>
                  <Button
                    onClick={() => {
                      // adminReviewlist(router.query.emailID);
                      setStardata(2);
                      setAnchorEl(null);
                      onFilterData(2);
                    }}
                    color="primary"
                    variant="contained"
                    className={stardata == 2 ? Styles.btn5data : Styles.Filter_btns}
                  >
                    <Btn_txt data={"2 Star"} />
                  </Button>
                  <Button
                    onClick={() => {
                      // adminReviewlist(router.query.emailID);
                      setStardata(1);
                      setAnchorEl(null);
                      onFilterData(1);
                    }}
                    color="primary"
                    variant="contained"
                    className={stardata == 1 ? Styles.btn5data : Styles.Filter_btns}
                  >
                    <Btn_txt data={"1 Star"} />
                  </Button>
                </Box>
              </Box>
            </ThemeProvider>
          </Menu>
        </Box>

        <Box className={Styles.Content_div}>
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
                  // setStardata("");
                }}
                value={"All Reviews"}
              />
              <Tab
                label="Flaged Reviews"
                className={datatab == "flaged" ? Styles.Tabs_321 : Styles.Tabs_}
                onClick={() => {
                  setDatatab("flaged");
                  // setStardata("");
                }}
                value="flaged"
              />
            </Tabs>
            <TabPanel className={Styles.Tab_panel_22} value={"All Reviews"}>
              {allReview.map((data) => {
                return (
                  <Review_box
                    data={data}
                    status={"All"}
                    userDelete={reviewDelete}
                    props={props}
                  />
                );
              })}
            </TabPanel>
            <TabPanel className={Styles.Tab_panel_22} value={"flaged"}>
              {flagedReview.map((data) => {
                return (
                  <Review_box
                    data={data}
                    status={"flaged"}
                    userDelete={reviewDelete}
                    props={props}
                  />
                );
              })}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(Movie_review_Pages);
