import styles from '../styles/login.module.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Typography, Button, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Logo from './logo';
import { useRouter } from 'next/router';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import * as React from "react";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Types } from '../constants/actionTypes';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));



const Newpass = (props) => {
    console.log(props.props, 'propsprops');
    const [showPasswordlistdata, setShowPasswordlistdata] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [showPasswordlist, setShowPasswordlist] = React.useState(false);

    const handleClickShowPasswordlist = () => setShowPasswordlist((show) => !show);

    const handleMouseDownPasswordlist = (event) => {
        event.preventDefault();
    };
    const router = useRouter();

    const onLoginPress = async () => {
        var body = {
            'email': formik.values.newPassword,
            'password': formik.values.reTypePassword
        }
        var headers = {
            "Content-Type": "application/json",
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.LOGIN_USER, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data)
        if (!!data) {
            if (data.status == true) {
                data.data.token = data.token
                props.save_user_data({ user: data.data });
                toast.success("Logged In Succesfully")
                router.push('./dashboard')
            } else {
                // setErrorShow(true)
                toast.error(data.message)
            }
        } else {
            toast.error('Something went wrong.')
        }
    }


    const formik = useFormik({
        initialValues: {
            newPassword: '',
            reTypePassword: '',
        },

        validationSchema: Yup.object({
            newPassword: Yup
                .string()
                .min(8)
                .required(
                    'Email is required'),
            reTypePassword: Yup
                .string()
                .required(
                    'Password is required'),
        }),
        onSubmit: () => {
            onLoginPress()
        },
    });

    return (
        <>
            <Grid container className={styles.listcontenatlogin}>
                <Grid item md={5} sm={8} className={styles.listgrifanfbox}>
                    <Box className={styles.listboxmailtext2223}><Typography>Signin</Typography></Box>
                    <Box className={styles.patretextlog}><Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography></Box>
                    <Box className={styles.listinputbox}>


                        <form onSubmit={formik.handleSubmit}>
                            <Typography className={styles.listemailtext}>Email</Typography>
                            <Box style={{ display: 'flex', paddingBottom: '20px' }}>

                                <TextField
                                    error={Boolean(
                                        formik.touched.newPassword && formik.errors.newPassword
                                    )}
                                    id="outlined-required"
                                    type={'text'}
                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                    placeholder="Email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    name="newPassword"
                                    value={formik.values.newPassword}
                                    className={styles.Search_Bar_input}

                                />
                            </Box>
                            <Typography className={styles.listemailtext}>Password</Typography>
                            <Box style={{ display: 'flex' }}>
                                <TextField
                                    error={Boolean(
                                        formik.touched.reTypePassword && formik.errors.reTypePassword
                                    )}
                                    // type="password"
                                    helperText={
                                        formik.touched.reTypePassword && formik.errors.reTypePassword
                                    }
                                    className={styles.Search_Bar_input}
                                    id="outlined-required"
                                    placeholder="Password"
                                    variant="outlined"
                                    name="reTypePassword"
                                    value={formik.values.reTypePassword}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type={showPassword ? 'text' : 'password'}
                            InputProps={{

endAdornment: (
    <Button className={styles.menolistlogo22}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
    >
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}


    </Button>
)
}}

                                />

                            </Box>
                            <a href='/phoneno' className={styles.forgotadatext}>forgot password</a>
                            <Box className={styles.listbuttomopen2223}><Button type='submit'>Continue</Button></Box>
                        </form>
                    </Box>


                </Grid>
            </Grid>
        </>
    )
}
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Newpass);
