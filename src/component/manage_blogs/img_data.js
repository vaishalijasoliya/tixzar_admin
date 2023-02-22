import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Styles from './manage_blogs.module.scss'

export const Movie_Box = ({data}) => {
    const router = useRouter();
    const [tabaldata, setTeballist] = React.useState([])
    console.log(data, 'is_____data_of__item')
      return (
        <>
                <Box className={Styles.movie_box}
                    // onClick={() => {
                    //     router.push({
                    //         pathname: './movie_review',
                    //         query: { emailID: item.id }
                    //     });
                    // }}
                >

                    <>
                    <div className={Styles.Llistsffsffs}> 
                        <img
                        width={190}
                        height={115}
                            src={data.logoUrl}
                            className={Styles.Movie_img_} />
                            </div>
                        <Typography className={Styles.Movie_name_}>
                            {data.title}
                        </Typography>
                        <Typography className={Styles.Review_txt11}>
                            {data.description}
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