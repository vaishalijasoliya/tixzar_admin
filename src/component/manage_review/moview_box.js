import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Styles from './manage_review.module.css'
import ApiServices from '../../config/ApiServices'
// import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';


export const Movie_Box = ({data}) => {
    const router = useRouter();
    const [tabaldata, setTeballist] = React.useState([])
    console.log(tabaldata, 'is_____data_of__item')
  
    // const Image_Path = './image/' + data.Img_Path + '.png'
    return (
        <>
                <Box className={Styles.movie_box}
                    onClick={() => {
                        router.push({
                            pathname: './movie_review',
                            query: { emailID: data.id }
                        });
                    }}
                >

                    <>
                        <img
                            src={data.logoUrl}
                            className={Styles.Movie_img_} />
                        <Typography className={Styles.Movie_name_}>
                            {data.title_name}
                        </Typography>
                    </>

                </Box></>)
}


export const Btn_txt = ({ data }) => {
    return (
        <Typography color={'##FFFFFF'} textTransform="capitalize" fontSize={'16px'} >
            {data}
        </Typography>
    )
}