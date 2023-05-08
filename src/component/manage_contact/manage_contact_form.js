import { Box, Button, Typography, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
import Reply_box from "./reply";
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';
import PropTypes from 'prop-types';
import { TabContext, TabPanel } from "@mui/lab";
import Styles from "../managealluser/manageruser.module.css";

const Manage_Contact_form = (props) => {
    console.log(props.props.profile.token, 'AAAAAAA');
    const [data, setData] = React.useState([])
    const [dataDeletion, setdataDeletion] = React.useState([])
    const [dataBug, setBug] = React.useState([])
    const [dataGenerals, setdataGenerals] = React.useState([])
    const [dataOthers, setDataOthers] = React.useState([])
    const [value, setValue] = React.useState(0);
    const [datatab, setDatatab] = React.useState("active");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(data, 'datadata');

    const chartloginuser = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_SUPPORT_LIST, JSON.stringify(body), headers)
        
        console.log(data, 'mydatvVVvaLIST');

        if (!!data) {
            if (data.status == true) {
                const accoyty = [];
                const dataDelete = [];
                const dataBug = [];
                const dataGeneral = [];
                const dataOther = [];
                const csvall = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    console.log(element, 'password514');

                    const object = {
                        id_sender: element.id_sender,
                        description: element.description,
                        status: element.status,
                        id: element.userDetails.id,
                        profile_photo: element.userDetails.profile_photo,
                        user_status: element.userDetails.status,
                        name: element.userDetails.name,
                        email: element.userDetails.email
                    }
                    console.log(object, 'object');
                    if (element.category == 'Data deletion request') {
                        dataDelete.push(JSON.parse(JSON.stringify(object)))

                    } else if (element.category == 'Bug found') {
                        dataBug.push(JSON.parse(JSON.stringify(object)))
                    }
                    else if (element.category == 'General') {
                        dataGeneral.push(JSON.parse(JSON.stringify(object)))
                    }
                    else if (element.category == 'Other') {
                        dataOther.push(JSON.parse(JSON.stringify(object)))
                    }
                    accoyty.push(JSON.parse(JSON.stringify(object)))

                }
                setData(accoyty)
                setdataDeletion(dataDelete);
                setBug(dataBug)
                setdataGenerals(dataGeneral);
                setDataOthers(dataOther)
            }
            props.props.loaderRef(false)
        }
    }
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            chartloginuser()
        }
    }, [])

    console.log(dataDeletion, 'dataDeletion');
    return (
        <>
            <Box className="mainView_of_all_pages">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabContext data={dataDeletion} value={value}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                className={Styles.Tab_Bar_}
                                aria-label="disabled tabs example"
                                centered
                            >
                                <Tab
                                    label="Data deletion request"
                                    className={datatab == "active" ? Styles.Tabs_321 : Styles.Tabs_}
                                    onClick={() => {
                                        setDatatab("active");
                                    }}
                                    value={"Data deletion request"}
                                />
                                <Tab
                                    label="Bug found"
                                    className={datatab == "bugfound" ? Styles.Tabs_321 : Styles.Tabs_}
                                    onClick={() => {
                                        setDatatab("bugfound");
                                    }}
                                    value="Bug found"
                                />
                                <Tab
                                    label="General"
                                    className={datatab == "general" ? Styles.Tabs_321 : Styles.Tabs_}
                                    onClick={() => {
                                        setDatatab("general");
                                    }}
                                    value="General"
                                />
                                <Tab
                                    label="Others"
                                    className={datatab == "Others" ? Styles.Tabs_321 : Styles.Tabs_}
                                    onClick={() => {
                                        setDatatab("Others");
                                    }}
                                    value="Others"
                                />
                            </Tabs>
                            <TabPanel className={Styles.Tab_panel_} value={"Data deletion request"}>
                                {dataDeletion.map((item) => {
                                    return (
                                        <Reply_box data={item} props={props} />
                                    )
                                })}

                            </TabPanel>
                            <TabPanel className={Styles.Tab_panel_} value={"Bug found"}>

                                {dataBug.map((item) => {
                                    return (
                                        <Reply_box data={item} props={props} />
                                    )
                                })}
                            </TabPanel>
                            <TabPanel className={Styles.Tab_panel_} value={"General"}>

                                {dataGenerals.map((item) => {
                                    return (
                                        <Reply_box data={item} props={props} />
                                    )
                                })}
                            </TabPanel>

                            <TabPanel className={Styles.Tab_panel_} value={"Others"}>

                                {dataOthers.map((item) => {
                                    return (
                                        <Reply_box data={item} props={props} />
                                    )
                                })}
                            </TabPanel>
                        </TabContext>
                    </Box>

                        
                </Box>
                    

                {/* {data.map((item) => {
                    return (
                        <Reply_box data={item} props={props} />
                    )
                })} */}

                </Box>
            </>
            )
}
export default Manage_Contact_form





