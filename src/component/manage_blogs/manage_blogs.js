import { Box, Button, Dialog, TextareaAutosize, Grid, IconButton, Typography, TextField } from "@mui/material";
import React from "react";
import Styles from './manage_blogs.module.scss'
import { TabContext, TabPanel } from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from "@material-ui/core";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import Databox from './manage_box'

const Movie_review_Pages = (props) => {
  console.log(props, 'sdhbddd');
  const [value, setValue] = React.useState('All Reviews');
  const [datalist, setData] = React.useState([])
  const [fullWidth, setFullWidth] = React.useState(true);
  const [createObjectURL, setCreateObjectURL] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [itemimg, setIditem] = React.useState()
  const [datelistdes, setDatalistlogin] = React.useState([])
  const handleClickOpen = () => {
    setOpenlist(true);
  };
  const handleCloselist = () => {
    setOpenlist(false);
  };
  const [openlist, setOpenlist] = React.useState(false);
  const [dataeditbtn, setDataeditbtn] = React.useState('')
  console.log(dataeditbtn, 'dataeditbtn');
  const [editid, setEditid] = React.useState('')
  console.log(editid, 'userSearch');
  const formik = useFormik({
    initialValues: {
      username: '',
      name: ""
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required(
          'Add Title is required'),
      name: Yup
        .string()
        .max(255)
        .required(
          'Add Title is required'),
    }),
    onSubmit: () => {
      // onLoginPress()

    },
  });
  const handleChangeImage = (e) => {
    console.log(e.target.files[0], "myfile");
    const filetypes = e.target.files[0].type;
    const extension = filetypes.substring(0, 5)
    const lissurl = e.target.files[0].name;
    console.log(extension, "filetypes");
    console.log(lissurl, "myfiletype");
    uploadItem(e.target.files[0], extension)
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setImage(lissurl);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const uploadItem = async (file, type) => {

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", props.props.profile.token);
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("type", type);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    var reader = new FileReader();
    props.props.loaderRef(true);
    const data = await fetch(ApiEndpoint.ADMIN_UPLOAD_FILE, requestOptions)
      .then((response) => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));
    console.log(data, 'datata')
    props.props.loaderRef(false)
    if (!!data) {
      if (data.status == true) {
        console.log(data.id, "id")
        console.log(data, 'damydata');
        setIditem(data.data.itemUrl)
      }
    }
    console.log(formdata, "iditems")
  }
  const accounttype = async (value) => {
    var body = {
      'image_url': itemimg,
      'title': formik.values.username,
      'description': formik.values.name,
      'status': value
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_TOPBOX_ADD, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message)
        chartloginuser()
      } else {
        toast.error(data.message)

      }
    } else {
      toast.error('Something went wrong.')
    }

    console.log(data, 'datadata')
  }
  const EDITPATT = async (value) => {
    var body = {
      'image_url': itemimg,
      'title': formik.values.username,
      'description': formik.values.name,
      'status': value,
      'id_topBox': editid
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_TOPBOX_EDIT, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message)
        chartloginuser()
      } else {
        toast.error(data.message)

      }
    } else {
      toast.error('Something went wrong.')
    }

    console.log(data, 'datadata')
  }
  const chartloginuser = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    var body = {

    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_BLOGS_LIST, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    console.log(data, 'mydatvvaLIST');

    if (!!data) {
      if (data.status == true) {
        const accoyty = [];
        const csvall = [];
        for (let index = 0; index < data.data.blogList.length; index++) {
          const element = data.data.blogList[index];
          console.log(element, 'password514');
          const object = {
            id: element.id,
            title: element.title,
            description: element.description,
            logoUrl: element.image_url,

          }
          accoyty.push(JSON.parse(JSON.stringify(object)))

        }
        for (let index = 0; index < data.data.activeBlogList.length; index++) {
          const element = data.data.activeBlogList[index];
          console.log(element, 'password514');
          const object = {
            id: element.id,
            title: element.title,
            description: element.description,
            logoUrl: element.image_url,

          }
          csvall.push(JSON.parse(JSON.stringify(object)))

        }
        setDatalistlogin(csvall)
        setData(accoyty)
      }
    }
  }
  const setDataview = async (value) => {

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }

    var body = {
      "id_topBox": value
    }
    props.props.loaderRef(true)
    var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.USER_TOPBOX_VIEW, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    console.log(patternDelete.data.image_url, 'patternDelete');

    if (!!patternDelete && patternDelete.status == true) {
      setCreateObjectURL(patternDelete.data.image_url)
      formik.setFieldValue('username', patternDelete.data.title);
      formik.setFieldValue('name', patternDelete.data.description)
      setIditem(patternDelete.data.image_url)
    } else {
      toast.error('Somethinggg went wrong.')
    }
  }
  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      chartloginuser()
    }
  }, [])
  return (
    <Box className={Styles.listboscante}>
      <Box className={Styles.Movie_main_box}>
        <Box className={Styles.Content_div}>

          <TabContext value={value}>
            <div className={Styles.listmenumen}>
              <Grid item xs={12} sm={12} md={8} className={Styles.lisrdatanaftevb}>
              </Grid>
              <Grid item xs={12} sm={12} md={4} display={'flex'} justifyContent={'end'}>
                <div className={Styles.listbtmnanadf}>

                  <Button className='Btn_grad_'
                    onClick={() => { handleClickOpen(), setDataeditbtn('ADD') }}
                    color="primary">
                    <AddRoundedIcon style={{ color: '#ffffff' }} />
                    <Typography className="Btn_grad_txt" style={{
                      marginLeft: '10px'
                    }}>
                      Add New Blog
                      {/* Add New Movie */}
                    </Typography>
                  </Button>
                  <Dialog
                    fullWidth={fullWidth}
                    maxWidth={'md'}
                    open={openlist}
                    onClose={handleCloselist}
                  >
                    <Box className={Styles.listpopuy22}>
                      <form onSubmit={formik.handleSubmit}>

                        <div className={Styles.listmenuuppohot}>
                          <img src={createObjectURL} className={Styles.avtaruplo} />
                          <div>
                            <IconButton className={Styles.iconbtnop} color="primary" aria-label="upload picture" component="label">

                              <input type="file" name="myImage" hidden onChange={handleChangeImage} />
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
                            placeholder='Add Title'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                          ></TextField>
                        </Box>
                        <Box>
                          <TextareaAutosize onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name} name="name"
                            value={formik.values.name} onChange={formik.handleChange}
                            placeholder="Description" maxRows={10} minRows={3}
                            className={Styles.Reply_text_area} />
                        </Box>
                        <Grid item md={12} sm={12} xs={12}>
                          <Box className={Styles.listboxbtn}>
                            {dataeditbtn == 'ADD' ?
                              <>
                                {formik.values.username == '' || formik.values.name == '' ?
                                  <>
                                    <Button type='submit' className={Styles.listupdetbtn} onClick={() => {
                                      //  handleNext()
                                      // accounttype('active'),
                                      handleCloselist()
                                    }}>Publish</Button>
                                    <Button type='submit' className={Styles.listupdetbtn3} onClick={() => {
                                      // accounttype('pending'),
                                      handleCloselist()
                                    }}>Draft</Button>
                                    <Button type='submit' className={Styles.listupdetbtn2} onClick={() => {
                                      // accounttype('delete'),
                                      handleCloselist()
                                    }}>Unpublish</Button>
                                  </>
                                  :
                                  <>
                                    <Button type='submit' className={Styles.listupdetbtn} onClick={() => {
                                      //  handleNext()
                                      // accounttype('active'),
                                      handleCloselist()
                                    }}>Publish</Button>
                                    <Button type='submit' className={Styles.listupdetbtn3} onClick={() => { accounttype('pending'), handleCloselist() }}>Draft</Button>
                                    <Button type='submit' className={Styles.listupdetbtn2} onClick={() => { accounttype('delete'), handleCloselist() }}>Unpublish</Button>
                                  </>
                                }
                              </> :
                              <>
                                {formik.values.username == '' || formik.values.name == '' ?
                                  <>
                                    <Button type='submit' className={Styles.listupdetbtn} onClick={() => {
                                      //  handleNext()
                                      // accounttype('active'),
                                      handleCloselist()
                                    }}>Publish</Button>
                                    <Button type='submit' className={Styles.listupdetbtn3} onClick={() => {
                                      // accounttype('pending'),
                                      handleCloselist()
                                    }}>Draft</Button>
                                    <Button type='submit' className={Styles.listupdetbtn2} onClick={() => {
                                      // accounttype('delete'),
                                      handleCloselist()
                                    }}>Unpublish</Button>
                                  </>
                                  :
                                  <>
                                    <Button type='submit' className={Styles.listupdetbtn} onClick={() => { EDITPATT('active'), handleCloselist() }}>Publish</Button>
                                    <Button type='submit' className={Styles.listupdetbtn3} onClick={() => { EDITPATT('pending'), handleCloselist() }}>Draft</Button>
                                    <Button type='submit' className={Styles.listupdetbtn2} onClick={() => { EDITPATT('delete'), handleCloselist() }}>Unpublish</Button>
                                  </>
                                }
                              </>
                            }
                          </Box>


                        </Grid>
                      </form>
                    </Box>

                  </Dialog>
                </div>
              </Grid>

            </div>
            <TabPanel className={Styles.Tab_panel_22} value={'All Reviews'}>
              {datalist.map((item, idx) => (
                <div className={Styles.listgridmnew}>
                  <Grid item xs={12} sm={12} md={4}>
                    <div className={Styles.Llistsffsffs22}>
                      <img src={item.logoUrl} className={Styles.User_Image} />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} className={Styles.userdataanfdata}>
                    <Typography className={Styles.User_name_bold} >{item.title}</Typography>
                    <Typography className={Styles.Review_txt}>{item.description}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} sx={{ justifyContent: "flex-end", display: 'flex' }}>
                    <Box style={{ justifyContent: 'flex-end', display: 'flex' }}>
                      <Button onClick={() => { setDataview(item.id), setDataeditbtn('EDIT'), setEditid(item.id), handleClickOpen() }} className={Styles.deleteBtn}>
                        <Avatar className={Styles.avtaradataedit}>
                          <EditIcon />
                        </Avatar>
                      </Button>
                    </Box>
                  </Grid>
                </div>
              ))}
            </TabPanel>

          </TabContext>
        </Box>
        <Databox props={props} data={datelistdes} />
      </Box>
    </Box>
  )
}

export default Movie_review_Pages


