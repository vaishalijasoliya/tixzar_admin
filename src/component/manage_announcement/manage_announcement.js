import {
  Box,
  Button,
  Dialog,
  TextareaAutosize,
  Grid,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import React, { useMemo } from "react";
import Styles from "../manage_blogs/manage_blogs.module.scss";
import { TabContext, TabPanel } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@material-ui/core";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
// import Databox from "./manage_box";
import Pagination from "../Pagination/pagination";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

//for select box
// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "label + &": {
//     marginTop: theme.spacing(3),
//   },
//   "& .MuiPaper-root": {
//     width: "200px",
//     minWidth: "200px",
//     maxheight: "400px",
//   },
//   "& .MuiInputBase-input": {
//     borderRadius: 4,
//     position: "relative",
//     fontSize: 16,
//     padding: "16.5px 14px",
//     // transition: theme.transitions.create(['border-color', 'box-shadow']),
//   },
// }));
//**************** */

const datalist = [
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    title: "Loremefeger Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    title: "Loremdvdfff Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    title: "Loremgfgffff Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
];

const Movie_announce_Pages = (props) => {
  let PageSize = 3;

  const [value, setValue] = React.useState("All Announcement");
  // const [datalist, setData] = React.useState([]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [itemimg, setIditem] = React.useState();
  const [datelistdes, setDatalistlogin] = React.useState([]);
  const [blogCurrentPage, setBlogCurrentPage] = React.useState(1);
  const [openlist, setOpenlist] = React.useState(false);
  const [dataeditbtn, setDataeditbtn] = React.useState("");
  const [editid, setEditid] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const allannounceData = useMemo(() => {
    const firstPageIndex = (blogCurrentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return datalist.slice(firstPageIndex, lastPageIndex);
  }, [blogCurrentPage]);
  // console.log(allannounceData, "allannounceDataallannounceData", datalist);

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      latest: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Add Title is required"),
      name: Yup.string().max(255).required("Add Title is required"),
      latest: Yup.string().max(255).required("this is required"),
    }),
    onSubmit: () => {
      onLoginPress()
    },
  });

  const handleChangeImage = (e) => {
    console.log(e.target.files[0], "myfile");
    const filetypes = e.target.files[0].type;
    const extension = filetypes.substring(0, 5);
    const lissurl = e.target.files[0].name;
    console.log(extension, "filetypes");
    console.log(lissurl, "myfiletype");
    uploadItem(e.target.files[0], extension);
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setImage(lissurl);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const handleClickOpen = (text) => {
    // if (text == "add") {
    //   router.push({ pathname: "/manage_announcement" });
    // } else {
    //   router.push({ pathname: "/manage_announcement", query: { id: text } });
    // }
    setOpenlist(true);
  };
  const handleCloselist = () => {
    setOpenlist(false);
  };

  const uploadItem = async (file, type) => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", props.props.profile.token);
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("type", type);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    var reader = new FileReader();
    props.props.loaderRef(true);
    const data = await fetch(ApiEndpoint.ADMIN_UPLOAD_FILE, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));
    console.log(data, "datata");
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        console.log(data.id, "id");
        console.log(data, "damydata");
        setIditem(data.data.itemUrl);
      }
    }
    console.log(formdata, "iditems");
  };
  // const accounttype = async (value) => {
  //   var body = {
  //     image_url: itemimg,
  //     title: formik.values.username,
  //     description: formik.values.name,
  //     latest: formik.values.latest,
  //     status: value,
  //   };
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token,
  //   };
  //   props.props.loaderRef(true);
  //   var data = await ApiServices.PostApiCall(
  //     ApiEndpoint.ADMIN_TOPBOX_ADD,
  //     JSON.stringify(body),
  //     headers
  //   );
  //   props.props.loaderRef(false);
  //   if (!!data) {
  //     if (data.status == true) {
  //       toast.success(data.message);
  //       chartloginuser();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } else {
  //     toast.error("Something went wrong.");
  //   }

  //   console.log(data, "datadata");
  // };
  // const EDITPATT = async (value) => {
  //   var body = {
  //     image_url: itemimg,
  //     title: formik.values.username,
  //     description: formik.values.name,
  //     latest: formik.values.latest,
  //     status: value,
  //     id_topBox: editid,
  //   };
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token,
  //   };
  //   props.props.loaderRef(true);
  //   var data = await ApiServices.PostApiCall(
  //     ApiEndpoint.ADMIN_TOPBOX_EDIT,
  //     JSON.stringify(body),
  //     headers
  //   );
  //   props.props.loaderRef(false);
  //   if (!!data) {
  //     if (data.status == true) {
  //       toast.success(data.message);
  //       chartloginuser();
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } else {
  //     toast.error("Something went wrong.");
  //   }

  //   console.log(data, "datadata");
  // };
  // const chartloginuser = async () => {
  //   setBlogCurrentPage(2);
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token,
  //   };
  //   var body = {};
  //   props.props.loaderRef(true);
  //   var data = await ApiServices.PostApiCall(
  //     ApiEndpoint.ADMIN_BLOGS_LIST,
  //     JSON.stringify(body),
  //     headers
  //   );
  //   props.props.loaderRef(false);
  //   console.log(data, "mydatvvaLIST");

  //   if (!!data) {
  //     if (data.status == true) {
  //       const blogList = [];
  //       const activeBlog = [];
  //       for (let index = 0; index < data.data.blogList.length; index++) {
  //         const element = data.data.blogList[index];
  //         console.log(element, "password514");
  //         const object = {
  //           id: element.id,
  //           title: element.title,
  //           description: element.description,
  //           logoUrl: element.image_url,
  //         };
  //         blogList.push(JSON.parse(JSON.stringify(object)));
  //       }
  //       for (let index = 0; index < data.data.activeBlogList.length; index++) {
  //         const element = data.data.activeBlogList[index];
  //         console.log(element, "password514");
  //         const object = {
  //           id: element.id,
  //           title: element.title,
  //           description: element.description,
  //           logoUrl: element.image_url,
  //         };
  //         activeBlog.push(JSON.parse(JSON.stringify(object)));
  //       }
  //       setDatalistlogin(activeBlog);
  //       // setData(blogList);
  //       setBlogCurrentPage(1);
  //     }
  //   }
  // };
  const topBox_view = async (value) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };

    var body = {
      id_topBox: value,
    };
    props.props.loaderRef(true);
    var patternDelete = await ApiServices.PostApiCall(
      ApiEndpoint.USER_TOPBOX_VIEW,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    // console.log(patternDelete.data.image_url, "patternDelete");

    // if (!!patternDelete && patternDelete.status == true) {
    //   setCreateObjectURL(patternDelete.data.image_url);
    //   formik.setFieldValue("username", patternDelete.data.title);
    //   formik.setFieldValue("name", patternDelete.data.description);
    //   formik.setFieldValue("latest", patternDelete.data.description);
    //   setIditem(patternDelete.data.image_url);
    // } else {
    //   toast.error("Somethinggg went wrong.");
    // }
  };
  // React.useEffect(() => {
  //   if (!!props.props.profile && !!props.props.profile.token) {
  //     chartloginuser();
  //   }
  // }, []);

  // function htmlToText(html) {
  //   let temp = document.createElement("div");
  //   temp.innerHTML = html;
  //   return temp.textContent || temp.innerText || "";
  // }

  // const [latestselect, setlatestselect] = React.useState("");

  // const handleChange = (event) => {
  //   setlatestselect(event.target.value);
  // };

  return (
    <Box className={Styles.listboscante}>
      <Box className={Styles.Movie_main_box}>
        <Box className={Styles.Content_div}>
          <TabContext value={value}>
            <div className={Styles.listmenumen}>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                className={Styles.lisrdatanaftevb}
              ></Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                display={"flex"}
                justifyContent={"end"}
              >
                <div className={Styles.listbtmnanadf}>
                  <Button
                    className="Btn_grad_"
                    onClick={() => {
                      handleClickOpen("add"), setDataeditbtn("ADD");
                    }}
                    color="primary"
                  >
                    <AddRoundedIcon style={{ color: "#ffffff" }} />
                    <Typography
                      className="Btn_grad_txt"
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      Add New Announcement
                      {/* Add New Movie */}
                    </Typography>
                  </Button>
                  <Dialog
                    fullWidth={fullWidth}
                    maxWidth={"md"}
                    open={openlist}
                    onClose={handleCloselist}
                  >
                    <Box className={Styles.listpopuy22}>
                      <form onSubmit={formik.handleSubmit}>
                        {/* <div className={Styles.listmenuuppohot}> */}
                        <img
                          src={createObjectURL}
                          className={Styles.avtaruplo_announce}
                        ></img>
                        <div>
                          <box style={{ display: "block" }}>
                            <IconButton
                              className={Styles.iconbtnop_announce}
                              color="primary"
                              aria-label="upload picture"
                              component="label"
                              style={{
                                display: "block",
                                marginRight: "17pc",
                                top: "23%",
                              }}
                            >
                              <input
                                type="file"
                                name="myImage"
                                hidden
                                onChange={handleChangeImage}
                              />

                              <img src="/uploadimage.png" alt="image" />
                              <Typography
                                style={{
                                  color: "#0799DA",
                                  fontFamily: "Gilroy-Medium",
                                  fontSize: "22px",
                                }}
                              >
                                Upload image
                              </Typography>
                              <Typography
                                style={{
                                  color: "#FFFFFF",
                                  fontFamily: "Gilroy-Medium",
                                  fontSize: "21px",
                                  opacity: 0.3,
                                }}
                              >
                                Or drop your image here
                              </Typography>
                            </IconButton>
                          </box>
                        </div>

                        <Box>
                          <TextField
                            error={Boolean(
                              formik.touched.username && formik.errors.username
                            )}
                            helperText={
                              formik.touched.username && formik.errors.username
                            }
                            name="username"
                            className={Styles.inputnamelist_announce}
                            placeholder="Add Title"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                          ></TextField>

                          <Select
                            sx={{
                              "& .MuiList-root": {
                                border: "2px solid red",
                              },
                            }}

                            error={Boolean(
                              formik.touched.latest && formik.errors.latest
                            )}
                            helperText={
                              formik.touched.latest && formik.errors.latest
                            }
                            name="latest"
                            value={formik.values.latest}
                            // value={latestselect}
                            className={Styles.inputnamelist_announce}

                            // onChange={handleChange}
                            onChange={formik.handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            id="selectitembox"
                          >
                            <MenuItem
                              value=""
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                            >
                              Latest
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={1}
                            >
                              All
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={2}
                            >
                              Movies
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={3}
                            >
                              Documentries
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={4}
                            >
                              Books
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={5}
                            >
                              TV
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={6}
                            >
                              Gaming
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={7}
                            >
                              Culrure
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={8}
                            >
                              Comics
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={9}
                            >
                              Celebrities
                            </MenuItem>
                            <MenuItem
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                                opacity: "0.55",
                                borderBottom:
                                  " 0.5px solid rgba(255, 255, 255, 0.25",
                              }}
                              value={10}
                            >
                              Theater & Plays
                            </MenuItem>
                          </Select>
                        </Box>
                        <Box>
                          <TextareaAutosize
                            onBlur={formik.handleBlur}
                            error={Boolean(
                              formik.touched.name && formik.errors.name
                            )}
                            helperText={
                              formik.touched.name && formik.errors.name
                            }
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            placeholder="Description"
                            maxRows={10}
                            minRows={3}
                            className={Styles.Reply_text_area_announce}
                          />
                        </Box>

                        <Box style={{ display: "flex" }}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox style={{ color: "#FFFFFF" }} />
                              }
                              label="Push Notification"
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                              }}
                            />
                          </FormGroup>

                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox style={{ color: "#FFFFFF" }} />
                              }
                              label="App Notification"
                              style={{
                                color: "#FFFFFF",
                                fontFamily: "Gilroy-Medium",
                              }}
                            />
                          </FormGroup>
                        </Box>

                        <Grid item md={12} sm={12} xs={12}>
                          <Box className={Styles.listboxbtn_announce}>
                            {dataeditbtn == "ADD" ? (
                              <>
                                {formik.values.username == "" ||
                                formik.values.name == "" ||
                                formik.values.latest == "" ? (
                                  <>
                                    <Button
                                      type="submit"
                                      className={Styles.listupdetbtn_announce}
                                      onClick={() => {
                                        //  handleNext()
                                        // accounttype('active'),
                                        // EDITPATT("active");
                                        // handleCloselist();
                                      }}
                                    >
                                      Add Announcement
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      type="submit"
                                      className={Styles.listupdetbtn_announce}
                                      onClick={() => {
                                        //  handleNext()
                                        // accounttype('active'),
                                        // EDITPATT("active");
                                        // handleCloselist();
                                      }}
                                    >
                                      Add Announcement
                                    </Button>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {formik.values.username == "" ||
                                formik.values.name == "" ||
                                formik.values.username == "" ? (
                                  <>
                                    <Button
                                      type="submit"
                                      className={Styles.listupdetbtn_announce}
                                      onClick={() => {
                                        //  handleNext()
                                        // accounttype('active'),
                                        // EDITPATT("active");
                                        // handleCloselist();
                                      }}
                                    >
                                      Add Announcement
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      type="submit"
                                      className={Styles.listupdetbtn_announce}
                                      onClick={() => {
                                        //  handleNext()
                                        // accounttype('active'),
                                        // EDITPATT("active");
                                        // handleCloselist();
                                      }}
                                    >
                                      Add Announcement
                                    </Button>
                                  </>
                                )}
                              </>
                            )}
                          </Box>
                        </Grid>
                      </form>
                    </Box>
                  </Dialog>
                </div>
              </Grid>
            </div>

            <TabPanel
              className={Styles.Tab_panel_22_announce}
              value={"All Announcement"}
            >
              <box style={{ margin: "30px" }}>
                {allannounceData.map((item, idx) => (
                  <div className={Styles.listgridmnew_announce} key={idx}>
                    <Grid item xs={12} sm={12} md={4}>
                      <div className={Styles.Llistsffsffs22}>
                        <img
                          src="/announceimage.png"
                          className={Styles.User_Image}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={8}
                      className={Styles.userdataanfdata_announce}
                    >
                      <Typography className={Styles.User_name_bold}>
                        {item.title}
                      </Typography>
                      <Typography className={Styles.Review_txt}>
                        {ReactHtmlParser(item.description)}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={1}
                      sx={{ justifyContent: "flex-end", display: "flex" }}
                    >
                      <Box
                        style={{ justifyContent: "flex-end", display: "flex" }}
                      >
                        <Button
                          onClick={() => {
                            topBox_view(item.id),
                              setDataeditbtn("edit"),
                              setEditid(item.id),
                              handleClickOpen(item.id);
                          }}
                          className={Styles.deleteBtn}
                        >
                          <Avatar className={Styles.avtaradataedit}>
                            <EditIcon />
                          </Avatar>
                        </Button>
                      </Box>
                    </Grid>
                  </div>
                ))}
                <Pagination
                  className="pagination-bar"
                  currentPage={blogCurrentPage}
                  totalCount={datalist.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setBlogCurrentPage(page)}
                />
              </box>
            </TabPanel>
          </TabContext>
        </Box>
        {/* <Box className="mainView_of_all_pages11">
          <Box className={Styles.Movie_main_box}>
            <Grid container columnSpacing={2} rowSpacing={3}>
                {allannounceData.map((item) => {
                  return (
                    <Grid item sm={6} xs={12} md={4} lg={3} xl={2}>
                      <Movie_announce_Pages data={item} /> 
                    </Grid>
                  );
                })}
              </Grid>
            <Box sx={{ marginTop: "10px" }}>
              <Pagination
                className="pagination-bar"
                currentPage={blogCurrentPage}
                totalCount={datelistdes.length}
                pageSize={PageSize}
                onPageChange={(page) => setBlogCurrentPage(page)}
              />
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Movie_announce_Pages;
