import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Styles from './manage_review.module.css'
import { Movie_Box } from "./moview_box";
import ApiServices from '../../config/ApiServices'
// import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';

const Manage_review = (props) => {
console.log(props,'propsprops');
const [tabaldata, setTeballist] = React.useState([])
console.log(tabaldata,'tabaldatatabaldata');
   
    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            accounttype()
        }
    }, [])
    const accounttype = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.GetApiCall(ApiEndpoint.ADMIN_MOVIE_REVIEW, headers)

        props.props.loaderRef(false)
        console.log(data, 'datadfsf');

        if (!!data) {
            if (data.status == true) {
                const accoyty = [];

                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    const object = {
                        id: element.id_imdb_movie,
                        logoUrl: element.image_url,
                        title_name: element.title_name
                    }
                    console.log(element, 'elementelement');

                    accoyty.push(JSON.parse(JSON.stringify(object)))
                }
                setTeballist(accoyty)
            }
        }
    }

    return (
        <Box className="mainView_of_all_pages11">
            <Typography className={Styles.top_movie_txt}>
                Movies
            </Typography>
            <Box className={Styles.Movie_main_box}>
                <Grid container columnSpacing={2} rowSpacing={3}>
                    {tabaldata.map((item) => {
                        console.log(item, '_____movie_details')
                        return (
                            <Grid item sm={6} xs={12} md={4} lg={3} xl={2}>
                                <Movie_Box data={item}  />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Box>
    )
}



export default Manage_review