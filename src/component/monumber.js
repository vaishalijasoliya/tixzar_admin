import styles from '../styles/login.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { Container, height, width } from '@mui/system';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Logo from './logo';
import 'react-phone-input-2/lib/style.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Phone from './phone';
import { useRouter } from 'next/router';



const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center'
}));


const Mobile = (props) => {

    console.log(props, 'propsPhonse');
    const router = useRouter();

    const onLoginPress = async () => {
        var body = {
            'phone': formik.values.phone,
            // 'password': formik.values.password
        }
        var headers = {
            "Content-Type": "application/json",
        }

        var data = (JSON.stringify(body), headers)

        console.log(data)

    }
    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: Yup.object({
            phone: Yup
                .number()
                .max(10)
                .min(10)
                .required(
                    'Enter your 10 digit Number'),
        }),
        onSubmit: () => {
            onLoginPress()
        },
    })


    return (

        <>
            <Grid container className={styles.listcontenatlogin}>
                <Grid item md={5} sm={8} className={styles.listgrifanfbox}>
                    <Box className={styles.listboxmailtext}><Typography>Reset Password</Typography></Box>
                    <Box className={styles.patretextlog}><Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography></Box>
                    <Box className={styles.listinputbox}>
                        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                        <Typography className={styles.listemailtext}>Email</Typography>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            type="email"
                            helperText={formik.touched.email && formik.errors.email}
                            // id="outlined-basic"
                            // label="Your Email"
                            className={styles.Search_Bar_input}
                            onBlur={formik.handleBlur}
                            placeholder='Enter Your Email'
                            onChange={formik.handleChange}
                            name="email"
                            value={formik.values.email}
                            variant="outlined"
                        // focused={false}

                        />
                    </Box>
                    <Box className={styles.listbuttomopen22}><Button>Continue</Button></Box>
                    {/* <Box className={styles.ategandperegaf}>
          <a href="#" className={styles.listskipanda}>Skip</a>
          <Typography>, I will confirm later</Typography>
        </Box> */}
                </Grid>
            </Grid>

        </>
    )
}

export default Mobile


