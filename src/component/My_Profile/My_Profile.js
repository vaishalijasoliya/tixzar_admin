
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
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
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
const ResponsiveAppBar = () => {
    // console.log(props.profile,'listprjjjops');

    // console.log(, "listmenu");
    const [phonedata, setPhonedata] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [age, setAge] = React.useState({});
    const [isoutField, setIsOutField] = useState(false);
    const [imgUpload, setImgupload] = React.useState([])
    const [idItem, setIditem] = React.useState("")
    const [imglist, setImagelist] = useState('')
    const [datelist, setDatelist] = React.useState('')

    console.log(age, 'createObjectURL');
    const handleChangeCountry = (event) => {
        setAge(event.target.value);
    };
    // useEffect(() => {
    //     setData()

    // },[])

    // const setData = async () => {

    //     var headers = {
    //         "Content-Type": "application/json",
    //         "x-access-token": props.profile.token
    //     }

    //     var obj = {
    //         "id_user": props.profile.userData.id
    //     }
    //     props.props.loaderRef(true)
    //     var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.GET_PROFILE, JSON.stringify(obj), headers)
    //     props.props.loaderRef(false)
    //     console.log( patternDelete, 'patternDelete');

    //     if (!!patternDelete && patternDelete.status == true) {

    //         formik.setFieldValue('username', patternDelete.data.name);
    //         formik.setFieldValue('email', patternDelete.data.email)
    //         formik.setFieldValue('phone', patternDelete.data.phone_no)
    //         formik.setFieldValue('Address', patternDelete.data.address)
    //         // formik.setFieldValue('Gender', patternDelete.data.gender)
    //         setPhonedata(patternDelete.data.phone_no)
    //         setAge(patternDelete.data.gender)
    //         setCreateObjectURL(patternDelete.data.profileUrl)
    //     } else {
    //         toast.error('Somethinggg went wrong.')
    //     }
    // }

    // const onLoginPress = async () => {
    //     var body = {
    //         'name': formik.values.username,
    //         'email': formik.values.email,
    //         'phone_no': phonedata,
    //         'birth_date':formik.values.date,
    //         'address': formik.values.Address,
    //         'gender': age,
    //     }
    //     console.log(body, 'body');

    //     var headers = {
    //         "Content-Type": "application/json",
    //         "x-access-token": props.profile.token
    //     }
    //     console.log(props.profile.token, 'TOKAN');

    //     props.props.loaderRef(true)
    //     var data = await ApiServices.PostApiCall(ApiEndpoint.USER_EDIT, JSON.stringify(body), headers);
    //     props.props.loaderRef(false)
    //     console.log(data, 'DATA');

    //     console.log(data.toast, 'listdata');
    //     if (!!data) {
    //         if (data.status == true) {
    //             toast.success(data.message)
    //         }
    //         else {
    //             toast.error(data.message)
    //         }
    //     }
    //     else {
    //         toast.error('Something went wrong.')
    //     }
    // }
    // const uploadpohot = async () => {


    //     var headers = {
    //         "Content-Type": "application/json",
    //         "x-access-token": props.profile.token
    //     }
    //     var body = {
    //         'file':imgUpload,
    //         'name': formik.values.username,
    //         'email': formik.values.email,
    //         'phone_no': phonedata,
    //         'birth_date': formik.values.date,
    //         'address': formik.values.Address,
    //         'gender': age,
    //     }
    //     console.log(body, 'TOKANfffff');

    //     props.props.loaderRef(true)
    //     var data = await ApiServices.PostApiCall(ApiEndpoint.UPLOAD_PROFILE, JSON.stringify(body), headers);
    //     props.props.loaderRef(false)

    //     console.log(data, 'dvdddddd');
    //     if (!!data) {
    //         if (data.status == true) {
    //             toast.success("list")
    //         }
    //         else {
    //             toast.error(data.message)
    //         }
    //     }
    //     else {
    //         toast.error('Something went wrong.')
    //     }
    // }
    // const edituser = () => {
    //     if (phonedata.length < 8) {
    //         setIsOutField(true)
    //     }
    //     else {
    //         onLoginPress()

    //     }
    // }

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
        // uploadItem(e.target.files[0], extension)
        if (e.target.files && e.target.files[0]) {
            const i = e.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    }
    //   const uploadItem = async (file, type) => {

    //     var myHeaders = new Headers();
    //     myHeaders.append("x-access-token", props.profile.token);
    //     var formdata = new FormData();
    //     formdata.append("file", file);
    //     formdata.append("type", type);
    //     var requestOptions = {
    //       method: 'POST',
    //       headers: myHeaders,
    //       body: formdata,
    //       redirect: 'follow'
    //     };
    //     var reader = new FileReader();
    //     props.props.loaderRef(true);
    //     const data = await fetch(ApiEndpoint.UPLOAD_PROFILE, requestOptions)
    //       .then((response) => response.json())
    //       .then(result => {
    //         return result
    //       })
    //       .catch(error => console.log('error', error));
    //     console.log(data, 'datata')
    //     props.props.loaderRef(false)
    //     if (!!data) {
    //       if (data.status == true) {
    //         console.log(data.id, "id")
    //         console.log(data, 'damydata');
    //         setIditem(data.data.id)
    //       }
    //     }
    //     console.log(formdata, "iditems")
    //   }
    // const uploadToServer = async (event) => {
    //     const body = new FormData();
    //     body.append("file", image);
    //     const response = await fetch("/api/file", {
    //         method: "POST",
    //         body
    //     });
    // };

    console.log(gender, 'gender');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            date: '',
            Address: '',
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
            Address: Yup
                .string()
                .required(
                    'Address is required'),
            Gender: Yup
                .string()
                .required(
                    'Duration is required'),
        }),
        onSubmit: () => {
            // onLoginPress()

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
                        {/* <PhoneInput
                            className={styles.poneinput}
                            country={'us'}

                            value={phonedata}
                            onChange={handlePinChange}
                        />
                        {isoutField == true ? <span className={styles.otperr}>Please Enter Valid Mobile-Number</span> : ''} */}
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
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Email</InputLabel>
                        <TextareaAutosize placeholder="Write reply" maxRows={10} minRows={3} className={styles.Reply_text_area} />
                    </Grid>

                </div>
                <Grid item md={12} sm={12} xs={12}>
                <Box className={styles.listboxbtn}>
                <Button className={styles.listupdetbtn}>Update</Button>
                    <Button className={styles.listupdetbtn2}>Cancel</Button>
                </Box>
               

                </Grid>
            </form>
        </Grid>
    )
}
export default ResponsiveAppBar

