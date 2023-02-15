import { Box, Button, Typography, Grid } from "@mui/material";
import React, { useState } from "react";
import Styles from './manage_contact.module.css'
import Reply_box from "./reply";
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';


const Manage_Contact_form = (props) => {
    console.log(props.props.profile.token, 'AAAAAAA');
const[data,setData] =React.useState([])
console.log(data,'datadata');
    const Reply_details = [
        {
            User_Image: './image/User.png',
            Name: 'John Smith',
            Description: 'Dolor sit amet, consectetur adipiscing elit. Cras porttitor vestibulum sem, sit amet rhoncus est fringilla quis. Integer auctor leo non congue auctor.',
            Email: 'abc@gmai3465l.com'

        },
        {
            User_Image: './image/User.png',
            Name: 'Adam Smith',
            Description: 'Dolor sit amet, consectetur adipiscing elit. Cras porttitor vestibulum sem, sit amet rhoncus est fringilla quis. Integer auctor leo non congue auctor.',
            Email: 'abc@gma31il.com'

        },
        {
            User_Image: './image/User.png',
            Name: 'John_1 Smith',
            Description: 'Dolor sit amet, consectetur adipiscing elit. Cras porttitor vestibulum sem, sit amet rhoncus est fringilla quis. Integer auctor leo non congue auctor.',
            Email: 'abc@gmai32l.com'

        },
        {
            User_Image: './image/User.png',
            Name: 'John Adam',
            Description: 'Dolor sit amet, consectetur adipiscing elit. Cras porttitor vestibulum sem, sit amet rhoncus est fringilla quis. Integer auctor leo non congue auctor.',
            Email: 'ab123c@gmail.com'

        }
    ]
    const chartloginuser = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
            //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmZlNDIzNzhmZGEzMTg5YjlmNzYwZiIsImlhdCI6MTY3NTgzMjc2MSwiZXhwIjoxNjc2NDM3NTYxfQ.nJjsPWJgmmfFmQcDWDZVHhbfBaXrAGOmSTiferm6VIk'
            //   props.props.profile.token
        }
        var body = {
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_SUPPORT_LIST, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        console.log(data, 'mydatvVVvaLIST');

        if (!!data) {
            if (data.status == true) {
                const accoyty = [];
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
                        email:element.userDetails.email
                    }
                    console.log(object, 'object');

                    accoyty.push(JSON.parse(JSON.stringify(object)))

                }

                // setDatalistlogin(csvall)
                setData(accoyty)
            }
        }
    }
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            chartloginuser()
        }
    }, [])
    return (
        <>
            <Box className="mainView_of_all_pages">
                {data.map((item) => {
                    return (
                        <Reply_box data={item} props={props} />
                    )
                })}

            </Box>
        </>
    )
}
export default Manage_Contact_form