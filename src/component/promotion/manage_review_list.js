import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Styles from "../manage_review/manage_review.module.css";
import { Movie_Box } from "./moview_box_list";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";

const Manage_review = (props) => {
  console.log(props, "propsprops");
  const [tabaldata, setTeballist] = React.useState([]);
  console.log(tabaldata, "tabaldatatabaldata");

  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      movieList();
    }
  }, []);

  const movieList = async () => {
    var body = {};
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    props.props.loaderRef(true);

    var accountList = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_MOVIE_LIST,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);

    console.log("getScirp", accountList);

    const lebal = [];
    if (!!accountList) {
      if (accountList.status == true) {
        var accountLableList = [];
        for (let index = 0; index < accountList.data.length; index++) {
          const element = accountList.data[index];
          console.log(element, "elementelement");
          const object = {
            id: element.id,
            logoUrl: element.image,
            title_name: element.title,
          };
          lebal.push(JSON.parse(JSON.stringify(object)));
        }
      }
    } else {
    }
    setTeballist(lebal);
  };
  return (
    <Box className="mainView_of_all_pages11">
      <Typography className={Styles.top_movie_txt}>Movies</Typography>
      <Box className={Styles.Movie_main_box}>
        <Grid container columnSpacing={2} rowSpacing={3}>
          {tabaldata.map((item) => {
            console.log(item, "_____movie_details");
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
