import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Styles from './manage_blogs.module.scss'
import { Movie_Box } from "./img_data";
import ApiServices from '../../config/ApiServices'
import ApiEndpoint from '../../config/ApiEndpoint';

const Manage_review = (props) => {
console.log(props.data,'propsccprops');
const [tabaldata, setTeballist] = React.useState([])
console.log(tabaldata,'tabaldatatabaldata');

    const[datelistdes,setDatalistlogin] =React.useState([])

    React.useEffect(() => {
        if (!!props.props.props.profile && !!props.props.props.profile.token) {
            chartloginuser()
        }
    }, [])
    const chartloginuser = async () => {
        var headers = {
          "Content-Type": "application/json",
          "x-access-token": props.props.props.profile.token
        }
        var body = {
    
        }
        props.props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_BLOGS_LIST,JSON.stringify(body), headers)
        props.props.props.loaderRef(false)
        console.log(data, 'mydatvvaLIST');
    
        if (!!data) {
          if (data.status == true) {
            const accoyty = [];
            const csvall = [];
            for (let index = 0; index < data.data.activeBlogList.length; index++) {
              const element = data.data.activeBlogList[index];
              console.log(element, 'password514');
              const object = {
                id: element.id,
                title: element.title,
                description: element.description,
                logoUrl: element.image_url,
             
              }
              // console.log(object, 'object');
    
              csvall.push(JSON.parse(JSON.stringify(object)))
    
            }
            setDatalistlogin(csvall)
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
                    {datelistdes.map((item) => {
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