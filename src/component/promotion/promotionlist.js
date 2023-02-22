import styles from './promotion.module.scss';
import Grid from '@mui/material/Grid';
import { Types } from '../../constants/actionTypes';
import { connect } from 'react-redux';
import { Typography, Dialog, TextField, TextareaAutosize } from '@material-ui/core';
import { Avatar, Button } from '@mui/material';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import React from "react";
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import { useRouter, withRouter } from 'next/router';
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const index = (props) => {
  console.log(props.id, 'propspazsrops');
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [image, setImage] = useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [openlist, setOpenlist] = React.useState(false);
  const [titaldata, setTexttital] = React.useState('')
  const [dishkaripsan, setDeshkaripsan] = React.useState('')
  const [itemimg, setIditem] = React.useState()

  const handleClickOpen = () => {
    setOpenlist(true);
  };

  const handleCloselist = () => {
    setOpenlist(false);
  };
  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      setDataview(props.id)
    }
  }, [props.router])
  const setDataview = async (value) => {

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }

    var body = {
      "id_movie": value
    }
    props.props.loaderRef(true)
    var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.MOVIE_DETAIL, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    console.log(patternDelete, 'patternDelete');

    if (!!patternDelete && patternDelete.status == true) {
      setCreateObjectURL(patternDelete.data.image)
      setDeshkaripsan(patternDelete.data.plot)
      setTexttital(patternDelete.data.title)
      formik.setFieldValue('username', patternDelete.data.title);
      formik.setFieldValue('name', patternDelete.data.plot)
    }
  }
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
  const EDITPATT = async (value) => {
    var body = {
      'id_imdb_movie': props.id,
      'title': formik.values.username,
      'description': formik.values.name,
      'image_url':itemimg
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_MOVIE_EDIT, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message)
        setDataview()
      } else {
        toast.error(data.message)

      }
    } else {
      toast.error('Something went wrong.')
    }

    console.log(data, 'datadata')
  }

  const handleChangeImage = (e) => {
    console.log(e.target.files[0], "myfile");
    const filetypes = e.target.files[0].type;
    const extension = filetypes.substring(0, 5)
    // setImgupload(extension)
    console.log(extension, "filetypes");
    console.log(e.target.files[0], "myfiletype");
    uploadItem(e.target.files[0], extension)
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  }
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
  return (
    <>
      <Grid container spacing={0} className={styles.lispotfusl} style={{ height: '84vh', padding: '40px' }} >
        {/* <Grid xs={12} sm={4} md={3}> */}
        <Grid item md={3} sm={12} xs={12}>
          <div className={styles.listmenuuppohot1}>
            <img src={createObjectURL} className={styles.avtaruplo} />
            <div>
              <IconButton className={styles.iconbtnop1} onClick={handleClickOpen} color="primary" aria-label="upload picture" component="label">

                {/* <input type="file" name="myImage" hidden 
                onChange={handleChangeImage} 

                /> */}
                <Box className={styles.myimmmglist} >
                  <CameraAltIcon style={{ color: '#ffffff' }} className={styles.cemeraicon} />
                </Box>

              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid item md={9} sm={12} xs={12} className={styles.listtexttypoanf}>
          <Box className={styles.listloevetypo}>
            <Typography>
              {titaldata}
            </Typography>
            <Button onClick={handleClickOpen}><ModeEditIcon /></Button>
          </Box>
          <Box className={styles.listloevetypo}>
            <Typography style={{ fontSize: '20px' }} className={styles.listbtnuudesr}>
              Description
            </Typography>
            <Button onClick={handleClickOpen}><ModeEditIcon /></Button>
          </Box>
          <Box className={styles.texttayoanfdafa}>
            <Typography>{dishkaripsan}</Typography>
          </Box>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={'md'}
            open={openlist}
            onClose={handleCloselist}
          >
            <Box className={styles.listpopuy22}>
              <div className={styles.listmenuuppohot}>
                <img src={createObjectURL} className={styles.avtaruplo1} />
                <div>
                  <IconButton className={styles.iconbtnop} color="primary" aria-label="upload picture" component="label">

                    <input type="file" name="myImage" hidden onChange={handleChangeImage} />
                    <Box className={styles.deleteBtn}>
                      <Avatar className={styles.avtaradataedit}>
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
                  className={styles.inputnamelist}
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
                  className={styles.Reply_text_area} />
              </Box>
              <Grid item md={12} sm={12} xs={12}>
                <Box className={styles.listboxbtn}>
                {formik.values.username == ''|| formik.values.name=='' ?
                  <Button className={styles.listupdetbtn} onClick={() => {  handleCloselist() }}>Update2</Button>:
                  <Button className={styles.listupdetbtn} onClick={() => { EDITPATT(), handleCloselist() }}>Update</Button>}

                  <Button className={styles.listupdetbtn3} onClick={() => { handleCloselist() }}>Cancel</Button>
                </Box>


              </Grid>
            </Box>

          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
