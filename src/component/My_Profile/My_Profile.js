
import styles from './My_Profile.module.scss'
import Grid from '@mui/material/Grid';
import { Box, Typography, TextareaAutosize } from '@material-ui/core';
import { Avatar, Button } from '@mui/material';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
const ResponsiveAppBar = (props) => {
    console.log(props.props.profile.id,'listprjjjops');

    // console.log(, "listmenu");
    const [phonedata, setPhonedata] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [age, setAge] = React.useState({});
    const [isoutField, setIsOutField] = useState(false);
    const [imgUpload, setImgupload] = React.useState([])
    const [imglist, setImagelist] = useState('')
    const [datelist, setDatelist] = React.useState('')
    const [itemimg, setIditem] = React.useState('')

    console.log(itemimg, 'itemimg');
    const handleChangeCountry = (event) => {
        setAge(event.target.value);
    };
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            setData(props.props.profile.id)
        }
      }, [])

    const setData = async (value) => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }

        var obj = {
            "userId":value
        }
        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.USER_PROFILE_VIEW, JSON.stringify(obj), headers)
        props.props.loaderRef(false)
        console.log(patternDelete,'patternDelete');
        if (!!patternDelete && patternDelete.status == true) {

            formik.setFieldValue('username', patternDelete.data.userDetails.name);
            formik.setFieldValue('email', patternDelete.data.userDetails.user_name)
            formik.setFieldValue('lastname', patternDelete.data.userDetails.email)
            formik.setFieldValue('pohoneno', patternDelete.data.userDetails.phone_number)
            formik.setFieldValue('Gender', patternDelete.data.userDetails.address)
            setCreateObjectURL(patternDelete.data.userDetails.profile_photo)
            // setPhonedata(patternDelete.data.phone_no)
            // setAge(patternDelete.data.gender)
            // setCreateObjectURL(patternDelete.data.profileUrl)
        } else {
            toast.error('Somethinggg went wrong.')
        }
    }

    const onLoginPress = async () => {
        if(itemimg == ''){
            var body = {
                'name': formik.values.username,
                'user_name': formik.values.email,
                'phone_number': formik.values.pohoneno,
                'address':formik.values.Gender,
            }
        }else{
            var body = {
                'name': formik.values.username,
                'user_name': formik.values.email,
                'phone_number': formik.values.pohoneno,
                'address':formik.values.Gender,
                'id_item_profile': itemimg,
            }
        }
       
        console.log(body, 'bodvvvy');

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.USER_PROFILE_EDIT, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
        else {
            toast.error('Something went wrong.')
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
            setIditem(data.data.id)
          }
        }
        console.log(formdata, "iditems")
      }

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    console.log(createObjectURL, 'createObjectURL');

    const handlePinChange = phonedata => {
        setPhonedata(phonedata);
    };
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };
    const handleChangeImage = (e) => {
        console.log(e.target.files[0], "myfile");
        const filetypes = e.target.files[0].type;
        const extension = filetypes.substring(0, 5)
        setImgupload(extension)
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
            email: '',
            pohoneno: '',
            lastname: '',
            Gender: ''
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(255)
                .required(
                    'First Name is required'),
            email: Yup
                .string()
                .max(255)
                .required(
                    'Last Name is required'),
            lastname: Yup
                .string()
                .max(255)
                .required(
                    'Email is required'),
            pohoneno: Yup
                .string()
                .max(255)
                .required(
                    'Phone Number is required'),
            Gender: Yup
                .string()
                .required(
                    'Address is required'),
        }),
        onSubmit: () => {
            onLoginPress()

        },
    });
    return (
        <Grid container className={styles.cantenar_list}>
            <form onSubmit={formik.handleSubmit} className={styles.formedit}>

                <Grid item md={12} sm={12} xs={12}>
                    <div className={styles.listmenuuppohot}>
                        <Avatar src={createObjectURL} className={styles.avtaruplo} />
                        <IconButton className={styles.iconbtnop} color="primary" aria-label="upload picture" component="label">

                            <input type="file" name="myImage" hidden onChange={handleChangeImage} />
                            <Avatar className={styles.myimmmglist} >
                                <AddIcon style={{ color: '#ffffff' }} className={styles.cemeraicon} />
                            </Avatar>

                        </IconButton>
                    </div>
                </Grid>
                <div className={styles.inputoplist}>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">First Name</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            name="username"
                            className={styles.inputnamelist}
                            placeholder='First Name'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        ></TextField>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Last Name</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            name="email"
                            className={styles.emailinput}
                            placeholder='Last Name'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        ></TextField>
                    </Grid>
                </div>
                <div className={styles.pohelistmenu}>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Email</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.lastname && formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                            name="lastname"
                            className={styles.emailinput}
                            placeholder='Email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                        ></TextField>
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Phone Number</InputLabel>

                        <TextField
                            error={Boolean(formik.touched.pohoneno && formik.errors.pohoneno)}
                            helperText={formik.touched.pohoneno && formik.errors.pohoneno}
                            name="pohoneno"
                            className={styles.emailinput}
                            placeholder='Phone Number'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.pohoneno}
                        ></TextField>
                    </Grid>
                </div>
                <div className={styles.futtorlist}>
                    <Grid item md={12} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Address</InputLabel>
                        <TextareaAutosize 
                         error={Boolean(formik.touched.Gender && formik.errors.Gender)}
                            helperText={formik.touched.Gender && formik.errors.Gender}
                            name="Gender"
                            // className={styles.inputnamelist}
                            // placeholder='First Name'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.Gender}
                         placeholder="Write reply" 
                         maxRows={10} minRows={3} className={styles.Reply_text_area} />
                    </Grid>

                </div>
                <Grid item md={12} sm={12} xs={12}>
                <Box className={styles.listboxbtn}>
                <Button  type='submit' 
                // onClick={()=>{onLoginPress()}} 
                className={styles.listupdetbtn}>Update</Button>
                    <Button className={styles.listupdetbtn2}>Cancel</Button>
                </Box>
               

                </Grid>
            </form>
        </Grid>
    )
}
export default ResponsiveAppBar

