import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styles from './manageStyle.module.css'
import TextareaAutosize from "@mui/material";
import { toast } from 'react-toastify';
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';

const QandAbox = (props) => {
    const [datalist, setDatalist] = React.useState('')
    console.log(props.data, 'propsphhrops');

    const EDIT_DATA = async (value) => {
        console.log(value.id,'valuevalue')
        var body = {
            'id_faq': value.id,
            'status': value.status,
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.props.profile.token
        }
        props.props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_FAQ_EDIT, JSON.stringify(body), headers);
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

    return (
        <>
            <Box className={styles.QandAbox} >
                <Box className={styles.QuestionDiv}>
                    <Typography className={styles.questiontxt}>
                        {props.data.name}
                    </Typography>
                    <Button className={styles.deleteBtn} onClick={() => {
                        var obj = { id: props.data.id, status: 'cancelled' }
                            EDIT_DATA(obj),
                                setDatalist('cancelled')
                    }} >
                        <img src="./image/dustbin.svg" />
                    </Button>
                </Box>
                <Box className={styles.AnswerDiv}>
                    <Typography className={styles.AnswerTxt}>
                        {props.data.description}
                    </Typography>
                </Box>
                {props.data.status == 'active' ? '' :
                    <Button onClick={() => {
                          var obj = { id: props.data.id, status: 'active' }
                         EDIT_DATA(obj),
                          setDatalist('active') }} 
                          className={styles.btndataandpush}>
                        Publish
                    </Button>}
            </Box>
        </>
    )
}
export default QandAbox 