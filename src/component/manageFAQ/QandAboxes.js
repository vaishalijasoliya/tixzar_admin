import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styles from './manageStyle.module.css'
import TextareaAutosize from "@mui/material";
import { toast } from 'react-toastify';
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';

const QandAbox = (props) => {
    const [datalist, setDatalist] = React.useState({})
    console.log(datalist.name, 'propsphhrops');

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
                setDatalist(props.data)
            } else {
                toast.error(data.message)

            }
        } else {
            toast.error('Something went wrong.')
        }
    }
    React.useEffect(() => {
        if (!!props.props.props.profile && !!props.props.props.profile.token) {
            setDatalist(props.data)
        }
    }, [])
    return (
        <>
           
        </>
    )
}
export default QandAbox 