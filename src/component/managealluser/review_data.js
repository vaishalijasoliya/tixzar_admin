import {
  Box,
  Button,
  createMuiTheme,
  createTheme,
  Grid,
  TableCell,
  TableRow,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import Styles from "./manageruser.module.css";
import FlagCircleRoundedIcon from "@mui/icons-material/FlagCircleRounded";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
    secondary: {
      main: "rgba(255, 0, 0, 0.2)",
    },
  },
});

export const Review_box = ({ data }) => {
  console.log(data, "is___data____");
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
  return (
    <Box className={Styles.Review_box_}>
      <Grid container>
        <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5}>
          <img src={data.User_Photo} className={Styles.User_Image} />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Typography className={Styles.User_name_bold}>{data.name}</Typography>
          <Typography>{data.Description_txt}</Typography>
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
            <Button className={Styles.deleteBtn}>
              <img src="./image/dustbin.svg" />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export const Table_Row = ({ item, userDelete }) => {
  console.log(item, "is____item______");

  const Border_is = "1px solid red";

  const styles_first = {
    // border: "1px solid black",
    borderBottom: Border_is,
    borderTop: Border_is,
    borderLeft: Border_is,
    borderRadius: "10px 0px 0px 10px",
  };

  const styles_second = {
    borderBottom: Border_is,
    borderTop: Border_is,
    width: 200,
  };

  const styles_last = {
    borderBottom: Border_is,
    borderTop: Border_is,
    borderRight: Border_is,
    borderRadius: "0px 10px 10px 0px",
  };

  const styles_general = {
    width: 200,
    borderBottom: "0px",
  };

  return (
    <TableRow key={item.name} className={Styles.tabalrodata}>
      <TableCell
        style={
          item.status == "flaged"
            ? styles_first
            : { borderBottom: "0px", borderRadius: "10px 0px 0px 10px" }
        }
      >
        <Box className={Styles.listdatatebal}>
          <div className={Styles.listdatatbala}>
            <img src={item.profile_photo} className={Styles.User_Image} />
          </div>
          <div className={Styles.typotdanfr}>
            <Typography className={Styles.User_name_bold}>
              {item.name}
            </Typography>
            <Typography className={Styles.listtypoandtext}>
              {item.Description_txt}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell
        style={item.status == "flaged" ? styles_second : styles_general}
        align="left"
      >
        <Typography className={Styles.listtypoangyo}>
          {item.reviews.toString().length == 5
            ? "10K"
            : item.reviews.toString().length == 6
            ? "100K"
            : item.reviews.toString().length >= 7
            ? "1M"
            : item.reviews}
        </Typography>
        <Typography className={Styles.reviewdata}>Reviews Given</Typography>
      </TableCell>
      <TableCell
        style={item.status == "flaged" ? styles_second : styles_general}
        align="left"
      >
        <Typography className={Styles.listtypoangyo}>
          {item.followers.toString().length == 5
            ? "10K"
            : item.followers.toString().length == 6
            ? "100K"
            : item.followers.toString().length >= 7
            ? "1M"
            : item.followers}
        </Typography>
        <Typography className={Styles.reviewdata}>Followers</Typography>
      </TableCell>
      <TableCell
        style={item.status == "flaged" ? styles_last : styles_general}
        align="left"
        className={Styles.Last_table_cell}
      >
        <div style={{ textAlign: "center" }}>
          <ThemeProvider theme={theme}>
            <Button
              className={Styles.deleteBtn}
              onClick={() => {
                userDelete(item.id);
              }}
            >
              <img src="./image/dustbin.svg" />
            </Button>
            <div>
              {item.status == "flaged" ? (
                <FlagCircleRoundedIcon
                  style={{ marginTop: "15px" }}
                  color="primary"
                />
              ) : null}
            </div>
          </ThemeProvider>
        </div>
      </TableCell>
    </TableRow>
  );
};
