import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Styles from "./manage_blogs.module.scss";
import { Movie_Box } from "./img_data";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";

const Manage_review = (props) => {
  const [datelistdes, setDatalistlogin] = React.useState([]);
  const activeBlob = props.data;

  return (
    <Box className="mainView_of_all_pages11">
      <Typography className={Styles.top_movie_txt}>Live Blogs</Typography>
      <Box className={Styles.Movie_main_box}>
        <Grid container columnSpacing={2} rowSpacing={3}>
          {activeBlob.map((item) => {
            return (
              <Grid item sm={6} xs={12} md={4} lg={3} xl={2}>
                <Movie_Box data={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Manage_review;
