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
import React, { useMemo, useState } from "react";
import Styles from "./manage_blogs.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import { EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { ContentState, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
// const DynamicComponent = dynamic(
//   () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
//   { ssr: false }
// );

const Add_blog = (props) => {
  let PageSize = 4;

  const [datalist, setData] = React.useState([]);
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
  const [blured, setBlured] = React.useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [processType, setProcessType] = React.useState("");

  function htmlToText(html) {
    let temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }

  const DynamicComponent = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    formik.setFieldValue(
      "name",
      htmlToText(stateToHTML(editorState.getCurrentContent()))
    );
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Add Title is required"),
      name: Yup.string().max(255).required("Description is required"),
    }),
    onSubmit: () => {
      // onLoginPress()
      formik.resetForm();
      setEditorState(EditorState.createEmpty());
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
  const accounttype = async (value) => {
    var body = {
      image_url: itemimg,
      title: formik.values.username,
      description: formik.values.name,
      status: value,
    };

    console.log(body, "is___________body");

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_TOPBOX_ADD,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        chartloginuser();
        router.push("/manage_blogs");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };
  const EDITPATT = async (value) => {
    var body = {
      image_url: itemimg,
      title: formik.values.username,
      description: formik.values.name,
      status: value,
      id_topBox: router.query.id,
    };
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_TOPBOX_EDIT,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        chartloginuser();
        router.push("/manage_blogs");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };
  const chartloginuser = async () => {
    setBlogCurrentPage(2);
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {};
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_BLOGS_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data, "mydatvvaLIST");

    if (!!data) {
      if (data.status == true) {
        const blogList = [];
        const activeBlog = [];
        for (let index = 0; index < data.data.blogList.length; index++) {
          const element = data.data.blogList[index];
          console.log(element, "password514");
          const object = {
            id: element.id,
            title: element.title,
            description: element.description,
            logoUrl: element.image_url,
          };
          blogList.push(JSON.parse(JSON.stringify(object)));
        }
        for (let index = 0; index < data.data.activeBlogList.length; index++) {
          const element = data.data.activeBlogList[index];
          console.log(element, "password514");
          const object = {
            id: element.id,
            title: element.title,
            description: element.description,
            logoUrl: element.image_url,
          };
          activeBlog.push(JSON.parse(JSON.stringify(object)));
        }
        setDatalistlogin(activeBlog);
        setData(blogList);
        setBlogCurrentPage(1);
      }
    }
  };

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

    if (!!patternDelete && patternDelete.status == true) {
      setCreateObjectURL(patternDelete.data.image_url);
      formik.setFieldValue("username", patternDelete.data.title);
      formik.setFieldValue("name", patternDelete.data.description);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(patternDelete.data.description)
        )
      );

      setIditem(patternDelete.data.image_url);
      //   setEditorState(patternDelete.data.description);
    } else {
      toast.error("Somethinggg went wrong.");
    }
  };

  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      if (router.query) {
        if (router.query.id) {
          topBox_view(router.query.id);
        }
      }
    }
  }, []);
  return (
    <Box className={Styles.Content_div}>
      <Box className={Styles.listpopuy22}>
        <form onSubmit={formik.handleSubmit}>
          <div className={Styles.listmenuuppohot}>
            <img src={createObjectURL} className={Styles.avtaruplo} />
            <div>
              <IconButton
                className={Styles.iconbtnop}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  type="file"
                  name="myImage"
                  hidden
                  onChange={handleChangeImage}
                />
                <Box className={Styles.deleteBtn}>
                  <Avatar className={Styles.avtaradataedit}>
                    <EditIcon />
                  </Avatar>
                </Box>
              </IconButton>
            </div>
          </div>
          <Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              name="username"
              className={Styles.inputnamelist}
              placeholder="Add Title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
            ></TextField>
          </Box>

          {DynamicComponent && (
            <Box className={Styles.editor_box}>
              <DynamicComponent
                editorState={editorState}
                toolbarClassName={Styles.toolbar_}
                wrapperClassName={Styles.wrapper_}
                editorClassName={Styles.editor_}
                onEditorStateChange={onEditorStateChange}
                onBlur={() => {
                  setBlured(true);
                }}
              />
            </Box>
          )}
          {formik.errors.name && blured ? (
            <p style={{ color: "red" }}>{"Description is required."}</p>
          ) : (
            ""
          )}

          <Grid item md={12} sm={12} xs={12}>
            <Box className={Styles.listboxbtn}>
              {router.query ? (
                router.query.id ? (
                  <>
                    <Button
                      type="submit"
                      className={Styles.listupdetbtn}
                      onClick={() => {
                        EDITPATT("active"), handleCloselist();
                      }}
                    >
                      Publish
                    </Button>
                    <Button
                      type="submit"
                      className={Styles.listupdetbtn3}
                      onClick={() => {
                        EDITPATT("pending"), handleCloselist();
                      }}
                    >
                      Draft
                    </Button>
                    <Button
                      type="submit"
                      className={Styles.listupdetbtn2}
                      onClick={() => {
                        EDITPATT("delete");
                        handleCloselist();
                      }}
                    >
                      Unpublish
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      className={Styles.listupdetbtn}
                      onClick={() => {
                        accounttype("active"), handleCloselist();
                      }}
                    >
                      Publish
                    </Button>
                    <Button
                      type="submit"
                      className={Styles.listupdetbtn3}
                      onClick={() => {
                        accounttype("pending"), handleCloselist();
                      }}
                    >
                      Draft
                    </Button>
                    <Button
                      type="submit"
                      className={Styles.listupdetbtn2}
                      onClick={() => {
                        accounttype("delete"), handleCloselist();
                      }}
                    >
                      Unpublish
                    </Button>
                  </>
                )
              ) : (
                ""
              )}

              {/* {dataeditbtn == "ADD" ? (
                <>
                  {formik.values.username == "" || formik.values.name == "" ? (
                    <>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn}
                        onClick={() => {
                          //  handleNext()
                          accounttype("active"), handleCloselist();
                        }}
                      >
                        Publish
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn3}
                        onClick={() => {
                          // accounttype('pending'),
                          handleCloselist();
                        }}
                      >
                        Draft
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn2}
                        onClick={() => {
                          //   accounttype('delete'),
                          handleCloselist();
                        }}
                      >
                        Unpublish
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn}
                        onClick={() => {
                          //  handleNext()
                          // accounttype('active'),
                          handleCloselist();
                        }}
                      >
                        Publish
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn3}
                        onClick={() => {
                          accounttype("pending"), handleCloselist();
                        }}
                      >
                        Draft
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn2}
                        onClick={() => {
                          accounttype("delete"), handleCloselist();
                        }}
                      >
                        Unpublish
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {formik.values.username == "" || formik.values.name == "" ? (
                    <>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn}
                        onClick={() => {
                          //  handleNext()
                          // accounttype('active'),
                          handleCloselist();
                        }}
                      >
                        Publish
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn3}
                        onClick={() => {
                          // accounttype('pending'),
                          handleCloselist();
                        }}
                      >
                        Draft
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn2}
                        onClick={() => {
                          // accounttype('delete'),
                          handleCloselist();
                        }}
                      >
                        Unpublish
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn}
                        onClick={() => {
                          EDITPATT("active"), handleCloselist();
                        }}
                      >
                        Publish
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn3}
                        onClick={() => {
                          EDITPATT("pending"), handleCloselist();
                        }}
                      >
                        Draft
                      </Button>
                      <Button
                        type="submit"
                        className={Styles.listupdetbtn2}
                        onClick={() => {
                          EDITPATT("delete"), handleCloselist();
                        }}
                      >
                        Unpublish
                      </Button>
                    </>
                  )}
                </>
              )} */}
            </Box>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Add_blog;
