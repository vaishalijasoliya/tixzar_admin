import {
  Box,
  Button,
  createTheme,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  Avatar,
  styled,
} from "@mui/material";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Styles from "./manage_trending_movie.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "rgba(255, 0, 0, 0.2)",
    },
  },
});

const Manage_trending_movie = (props) => {
  console.log(props, "props");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  // const option_open = Boolean()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openlist, setOpenlist] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [datalistlogin, setDatalistlogin] = React.useState([]);
  const [filterScripList, setFilterScripList] = React.useState([]);
  const [userdata, setUserdata] = React.useState([]);
  const [resetdata, setResetdata] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [iddata, setDataid] = React.useState("");
  const [tesxtdata, setTextdata] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [script, setScript] = React.useState("");
  const [editStart_date, setEditStart_date] = React.useState(new Date());
  const [editEnd_date, setEditEnd_Date] = React.useState(new Date());

  const [itemForEdit, setItemForEdit] = React.useState("");
  console.log(itemForEdit, "filterScripList");
  const handleClickOpen = () => {
    setOpenlist(true);
  };

  const handleCloselist = () => {
    setOpenlist(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const moviewReviewList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {};
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_TRENDINGMOVIE_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data, "mydatvvaLIST");

    if (!!data) {
      if (data.status == true) {
        const accoyty = [];
        const csvall = [];
        console.log(data, "password514");

        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          // const object = {
          //   id: element.id_imdb_movie,
          //   title: element.title_name,
          //   tixzarRating: element.tixzarRating,
          //   logoUrl: element.image_url,
          // };
          const object = {
            id: element.id_imdb_movie,
            title: element.title ? element.title : element.title_name,
            logoUrl: element.image_url,
            tixzarRating: element.tixzarRating,
          };
          accoyty.push(JSON.parse(JSON.stringify(object)));
        }
        setDatalistlogin(accoyty);
      }
    }
  };
  const onSearchMovie = async (text) => {
    var body = {
      name: text,
    };
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);

    var accountList = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_MOVIE_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    console.log("getScirp", accountList);

    const lebal = [];
    if (!!accountList) {
      if (accountList.status == true) {
        var accountLableList = [];
        for (let index = 0; index < accountList.data.length; index++) {
          const element = accountList.data[index];
          var obj = {
            id: element.id,
            image: element.image,
            title: element.title,
            crew: element.crew,
          };
          accountLableList.push(JSON.parse(JSON.stringify(obj)));
          console.log(element, "element");
          lebal.push(JSON.parse(JSON.stringify(obj)));
        }
      }
    } else {
    }
    console.log(accountLableList, "accountLableList");
    setFilterScripList(accountLableList);
    setUserdata(accountLableList);
    setResetdata(accountLableList);
  };

  const Search_bar_ = (e) => {
    const value = e.target.value;
    console.log(value, "is_value_______");
    if (typeof value !== "object") {
      if (!value || value == "") {
        setFilterScripList(userdata);
      } else {
        onSearchMovie(value);
      }
    } else {
      setFilterScripList(resetdata);
    }
  };
  
  const EDITPATT = async () => {
    var body = {
      id_imdb_movie: iddata.id,
      position: tesxtdata,
      image_url: iddata.image,
      title: iddata.title,
      start_date: startDate,
      end_date: endDate,
    };
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_TRENDINGMOVIE_EDIT,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        moviewReviewList();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };
  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      moviewReviewList();
      onSearchMovie();
    }
  }, []);
  return (
    <Box className="mainView_of_all_pages">
      <Box className={Styles.Top_box}>
        <ThemeProvider theme={theme}>
          <Button
            className="Btn_grad_"
            onClick={handleClickOpen}
            color="primary"
          >
            <AddRoundedIcon />
            <Typography
              className="Btn_grad_txt"
              style={{
                marginLeft: "10px",
              }}
            >
              Add New Movie
            </Typography>
          </Button>
          {/* ADD_____DIALOG */}
          <Dialog
            fullWidth={fullWidth}
            maxWidth={"md"}
            open={openlist}
            onClose={handleCloselist}
          >
            <Box className={Styles.listpopuy22}>
              <Box className={Styles.Search_div}>
                <TextField
                  placeholder="Search"
                  className={Styles.Search_Bar_input}
                  id="input-with-icon-textfield"
                  onChange={(e) => {
                    onSearchMovie(e.target.value);
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
                        // onClick={handleClick}
                      >
                        <img src="./image/Faders.svg" />
                      </Button>
                    ),
                  }}
                  variant="outlined"
                />
              </Box>
              {!!filterScripList ? (
                <Box className={Styles.listboxpoputdata}>
                  {filterScripList.map((item, idx) => (
                    <Button
                      onClick={() => {
                        var obj = {
                          id: item.id,
                          title: item.title,
                          image: item.image,
                        };
                        setDataid(obj);
                      }}
                      className={
                        item.id == iddata.id
                          ? Styles.listbtoommovi22
                          : Styles.listbtoommovi
                      }
                    >
                      <Avatar
                        className={Styles.avtarmovigo}
                        src={item.image}
                      ></Avatar>
                      <div className={Styles.listdevanfpopup}>
                        <Typography className={Styles.loreamdatago}>
                          {item.title}
                        </Typography>
                        <Typography className={Styles.loreamdatago22}>
                          {item.crew}
                        </Typography>
                      </div>
                    </Button>
                  ))}
                </Box>
              ) : (
                <Box className={Styles.listboxpoputdata}></Box>
              )}

              <Box className={Styles.boxandlistdata}>
                <Box className={Styles.lisysetandnot}>
                  <Typography>Set Position:</Typography>
                  <TextField
                    className={Styles.INPUTDATAPUSH}
                    fullWidth
                    type="number"
                    onChange={(e) => {
                      setTextdata(e.target.value);
                    }}
                  />
                </Box>
                <Box className={Styles.lisysetandnot}>
                  <input
                    type="datetime-local"
                    className={Styles.listdatepikar}
                    onChange={(e) => {
                      // console.log(
                      //   moment(e.target.value).format('YYYY-MM-DD"T"HH-MM-ss"Z"'),
                      //   "time_selected"
                      // );

                      // console.log(e.target.value, "e.target.value");
                      setStartDate(e.target.value);
                    }}
                  />
                  <input
                    type="datetime-local"
                    className={Styles.listdatepikar}
                    onChange={(e) => {
                      console.log(e.target.value, "akkajaja");
                      setEndDate(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box>
                {iddata.id == "" ||
                tesxtdata == "" ||
                startDate == "" ||
                endDate == "" ? (
                  <Button className={Styles.updeatbtoon}>Update</Button>
                ) : (
                  <Button
                    className={Styles.updeatbtoon}
                    onClick={() => {
                      EDITPATT(), handleCloselist();
                    }}
                  >
                    Update
                  </Button>
                )}
              </Box>
            </Box>
          </Dialog>
          {/* EDIT_____DIALOG */}
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            open={openEdit}
            onClose={handleEditClose}
          >
            <Box className={Styles.listpopuy22}>
              <Button
                className={[Styles.listbtoommovi22, Styles.selectedMovie]}
              >
                <Avatar
                  className={Styles.avtarmovigo}
                  src={itemForEdit.logoUrl}
                ></Avatar>
                <div className={Styles.listdevanfpopup}>
                  <Typography className={Styles.loreamdatago}>
                    {itemForEdit.title}
                  </Typography>
                  <Typography className={Styles.loreamdatago22}>
                    {itemForEdit.crew}
                  </Typography>
                </div>
              </Button>
              <Box className={Styles.boxandlistdata}>
                <Box className={Styles.lisysetandnot}>
                  <Typography>Set Position:</Typography>
                  <TextField
                    className={Styles.INPUTDATAPUSH}
                    fullWidth
                    type="number"
                    onChange={(e) => {
                      setTextdata(e.target.value);
                    }}
                  />
                </Box>
                <Box className={Styles.lisysetandnot}>
                  <input
                    type="datetime-local"
                    value={editStart_date}
                    className={Styles.listdatepikar}
                    onChange={(e) => {
                      setEditStart_date(e.target.value);
                    }}
                  />
                  <input
                    type="datetime-local"
                    // value={}
                    className={Styles.listdatepikar}
                    onChange={(e) => {
                      console.log(e.target.value, "akkajaja");
                      // setEndDate(e.target.value);
                      setEditEnd_Date(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box>
                {iddata.id == "" ||
                tesxtdata == "" ||
                startDate == "" ||
                endDate == "" ? (
                  <Button className={Styles.updeatbtoon}>Update</Button>
                ) : (
                  <Button
                    className={Styles.updeatbtoon}
                    onClick={() => {
                      EDITPATT(), handleCloselist();
                    }}
                  >
                    Update
                  </Button>
                )}
              </Box>
            </Box>
          </Dialog>
        </ThemeProvider>
      </Box>

      <Box>
        <TableContainer sx={{ marginTop: " 30px" }}>
          <Table>
            <TableHead>
              <TableRow className={Styles.Table_head_row}>
                <TableCell
                  className={[Styles.Table_head_cell, Styles.Tredding_cell]}
                  style={{ borderTopLeftRadius: "12px" }}
                >
                  Trending
                </TableCell>
                <TableCell
                  className={[
                    Styles.Table_head_cell,
                    Styles.Movie_details_cell,
                  ]}
                >
                  Movie
                </TableCell>
                <TableCell
                  className={[Styles.Table_head_cell, Styles.Tixzr_rating_cell]}
                >
                  Tixzr Rating
                </TableCell>
                <TableCell
                  className={[Styles.Table_head_cell, Styles.Menu_cell]}
                  style={{ borderTopRightRadius: "12px" }}
                ></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {datalistlogin.map((item, index) => (
                <TableRow
                  style={{
                    background: index % 2 == 0 ? "#291E3Dred" : "#332E59",
                  }}
                  className={Styles.Table_row}
                >
                  <TableCell
                    className={[
                      Styles.Table_Body_cell,
                      Styles.Tredding_cell,
                      Styles.Tredding_cell_body,
                    ]}
                  >
                    #{index + 1}
                  </TableCell>
                  <TableCell
                    className={[
                      Styles.Table_Body_cell,
                      Styles.Movie_details_cell,
                      Styles.Movie_details_body,
                    ]}
                  >
                    <div>
                      <img src={item.logoUrl} />
                    </div>{" "}
                    <Typography>{item.title}</Typography>
                  </TableCell>
                  <TableCell
                    className={[
                      Styles.Table_Body_cell,
                      Styles.Tixzr_rating_cell,
                      Styles.Tixzr_rating_cell_body,
                    ]}
                  >
                    <Typography>
                      {item.tixzarRating == null ? "0" : item.tixzarRating}%
                    </Typography>
                  </TableCell>
                  <TableCell
                    className={[Styles.Table_Body_cell, Styles.Menu_cell]}
                  >
                    <Button
                      className={Styles.menuicon}
                      onClick={(event) => {
                        handleClick(event), setItemForEdit(item);
                        setEditStart_date("");
                        setEditEnd_Date("");
                        console.log(item, "is____item_____");
                      }}
                    >
                      <MoreVertIcon />
                    </Button>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      className={Styles.Menu__style}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleEditOpen(), handleClose();
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                    {/* EDIT REVIEW DROP DOWN */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Manage_trending_movie;
