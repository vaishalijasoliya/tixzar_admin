import {
  Box,
  Button,
  createTheme,
  Grid,
  Rating,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import Styles from "../manage_review.module.css";
import FlagCircleRoundedIcon from "@mui/icons-material/FlagCircleRounded";
import ApiServices from "../../../config/ApiServices";
import ApiEndpoint from "../../../config/ApiEndpoint";
import { toast } from "react-toastify";

const Review_box = ({ data, status, userDelete, props }) => {
  // const reviewDelete = async (value) => {
  //   var body = {
  //     id_review: value,
  //   };
  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token,
  //   };
  //   props.props.loaderRef(true);
  //   var data = await ApiServices.PostApiCall(
  //     ApiEndpoint.ADMIN_REVIEW_DELETE,
  //     JSON.stringify(body),
  //     headers
  //   );
  //   props.props.loaderRef(false);
  //   console.log(data, body, "datadata______");

  //   if (!!data) {
  //     if (data.status == true) {
  //       toast.success(data.message);
  //       adminReviewlist(router.query.emailID);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } else {
  //     toast.error("Something went wrong.");
  //   }
  // };

  console.log(data, "prorrfff____");
  const [value, setValue] = React.useState(2);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF0000",
      },
      secondary: {
        main: "rgba(255, 0, 0, 0.2)",
      },
    },
  });
  const Rating_avg = data.avg / 2;

  return (
    <Box
      className={
        data.status == "flaged"
          ? [Styles.Review_box_, Styles.Review_box_Active]
          : Styles.Review_box_
      }
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5}>
          <img src={data.logoUrl} className={Styles.User_Image} />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Typography className={Styles.User_name_bold}>
            {data.title}
          </Typography>
          <Typography className={Styles.Review_txt}>
            {data.description}
          </Typography>
          <Box
            className={Styles.Rating_start_box}
            style={{ justifyContent: "flex-start" }}
          >
            <Rating
              className={Styles.Rating_star}
              value={Rating_avg}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              readOnly
            />
            <Typography className={Styles.Rating_number}>
              {parseFloat(Rating_avg.toFixed(2))}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={1}
          lg={1.5}
          xl={1.5}
          sx={{ justifyContent: "flex-end", display: "flex" }}
        >
          <Box style={{ justifyContent: "flex-end", display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // columnGap: "10px",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                className={Styles.deleteBtn}
                onClick={() => {
                  userDelete(data.id);
                  // reviewDelete(data.id);
                }}
              >
                <img src="./image/dustbin.svg" />
              </Button>

              <ThemeProvider theme={theme}>
                {data.status == "flaged" ? (
                  <FlagCircleRoundedIcon color="primary" />
                ) : null}
              </ThemeProvider>
            </div>
          </Box>
        </Grid>
      </Grid>
      {/* {data.status ? (
        data.status == "flaged" ? (
          <Grid container>
            <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} />
            <Grid
              item
              xs={12}
              sm={12}
              md={10.5}
              lg={10.5}
              xl={10.5}
              sx={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ThemeProvider theme={theme}>
                <Box>
                  <Button
                    className={Styles.Flaged_button}
                    variant="contained"
                    color="secondary"
                  >
                    <Typography
                      color={"#FF0000"}
                      textTransform="capitalize"
                      fontSize={"16px"}
                    >
                      Click Here
                    </Typography>
                  </Button>
                  <Button
                    className={Styles.Flaged_button}
                    style={{ marginLeft: "5px" }}
                    variant="contained"
                    color="secondary"
                  >
                    <Typography
                      color={"#FF0000"}
                      textTransform="capitalize"
                      fontSize={"16px"}
                    >
                      Click Here
                    </Typography>
                  </Button>
                </Box>
                <FlagCircleRoundedIcon color="primary" />
              </ThemeProvider>
            </Grid>
          </Grid>
        ) : (
          ""
        )
      ) : (
        ""
      )} */}
    </Box>
  );
};

export default Review_box;
