import { Box, Button, Typography, Dialog, TextField, TextareaAutosize, Grid } from "@mui/material";
import React from "react";
// import styles from './manageStyle.css'
import styles from './manageStyle.module.css'
// import { QandAbox } from "./QandAboxes";
import QandAbox from './QandAboxes'
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const ManageFaq = (props) => {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [openlist, setOpenlist] = React.useState(false);
    const[datalistloin,setDatalistlogin] =React.useState([])
    console.log(datalistloin,'datalistloin');
    const handleClickOpen = () => {
        setOpenlist(true);
    };

    const handleCloselist = () => {
        setOpenlist(false);
    };
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
    console.log(props, 'propsprops')
  

    const getAccounts = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.GetApiCall(ApiEndpoint.USER_FAQ_LIST, headers)
        props.props.loaderRef(false)
        if (!!data) {
              if (data.status == true) {
                const accoyty = [];
                const csvall = [];
                for (let index = 0; index < data.data.length; index++) {
                  const element = data.data[index];
                  console.log(element, 'password514');
                  const object = {
                    id: element.id,
                    name: element.name,
                    description: element.description,
                    status: element.status,

                  }
                  // console.log(object, 'object');

                  accoyty.push(JSON.parse(JSON.stringify(object)))

                }
                setDatalistlogin(accoyty)
              }
        }
    }
    const accounttype = async () => {
        var body = {
            'name': formik.values.username,
            'description': formik.values.name,
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_FAQ_ADD, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
                getAccounts()
            } else {
                toast.error(data.message)

            }
        } else {
            toast.error('Something went wrong.')
        }

        console.log(data, 'datadata')
    }
 
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            getAccounts()
        }
    }, [])


    return (
        <>
            <Box className='mainView_of_all_pages'>
                {datalistloin.map((item) => {
                    return(
                  <>
                        <QandAbox props={props} data={item} />
                        </>
                    )
                })} 
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={'md'}
                    open={openlist}
                    onClose={handleCloselist}
                >
                    <Box className={styles.listpopuy22}>

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
                            <Button className={styles.Add_question_Btn22} onClick={() => {
                                   accounttype()
                            }}>
                                <Typography className={styles.Add_question_Btn_txt}>
                                    Add Question
                                </Typography>
                            </Button>

                        </Grid>
                    </Box>

                </Dialog>
                <Button className={styles.Add_question_Btn} onClick={() => {
                    handleClickOpen()
                }}>
                    <Typography className={styles.Add_question_Btn_txt}>
                        Add Question
                    </Typography>
                </Button>
            </Box>
        </>
    )
}

export default ManageFaq 