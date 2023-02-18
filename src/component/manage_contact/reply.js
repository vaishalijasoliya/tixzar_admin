import { Box, Button, createTheme, Grid, TextareaAutosize, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import Styles from './manage_contact.module.css'
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#07A4E7',
        },
    },

});


const Reply_box = (props) => {
    console.log(props, 'datadatabb');
    const [isShow_reply, setIsShow_reply] = React.useState(false)
    const EDITPATT = async (value) => {
        var body = {
            'id_receiver': value,
            'description': formik.values.name
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.props.profile.token
        }
        props.props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_SUPPORT_SEND, JSON.stringify(body), headers);
        props.props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
            } else {
                toast.error(data.message)

            }
        } else {
            toast.error('Something went wrong.')
        }

        console.log(data, 'datadata')
    }



    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required(
                    'description is required'),
        }),
        onSubmit: () => {
            // onLoginPress()

        },
    });
    return (
        <>
            <Box className={Styles.Reply_box__}>
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5}>
                            <img src={props.data.profile_photo} className={Styles.User_Image} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                            <Typography className={Styles.User_name_bold} >{props.data.name}</Typography>
                            <Typography className={Styles.User_Email}>{props.data.email}</Typography>
                            <Typography className={Styles.Review_txt}>{props.data.description}</Typography>
                            {isShow_reply == true ?
                                <form onSubmit={formik.handleSubmit}>
                                    <TextareaAutosize
                                        onBlur={formik.handleBlur}
                                        error={Boolean(formik.touched.name && formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name} name="name"
                                        value={formik.values.name} onChange={formik.handleChange}
                                        maxRows={10} minRows={3}
                                        className={Styles.Reply_text_area}
                                        placeholder="Write reply"
                                    />
                                    {formik.values.name == ''?
                                    <Button className={Styles.send_reply_btn} type='submit' color="primary" onClick={() => {
                                        // setIsShow_reply(false)
                                            // EDITPATT(props.data.id)
                                    }}>
                                        <Typography className={Styles.Reply_Btn_txt}>Send</Typography>
                                    </Button>:<Button className={Styles.send_reply_btn} color="primary" onClick={() => {
                                        setIsShow_reply(false),
                                            EDITPATT(props.data.id)
                                    }}>
                                        <Typography className={Styles.Reply_Btn_txt}>Send</Typography>
                                    </Button>}

                                </form>
                                : null}
                            {
                                isShow_reply == false ? <Button variant='text' color="secondary" className={Styles.Reply_btn_} onClick={() => {
                                    setIsShow_reply(true)
                                }}>
                                    <Typography className={Styles.Reply_Btn_txt}>Reply</Typography>
                                </Button> : null
                            }

                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Box>
        </>
    )
}


export default Reply_box