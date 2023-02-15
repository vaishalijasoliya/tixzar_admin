import React, { useContext } from "react";
import styles from "../../styles/notification.module.css";
import { Avatar, Grid, Typography } from "@mui/material";
import Nevbar from "../user/nawbar";
import Header from "../user/header";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import moment from "moment";
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@material-ui/core";

const List = (props) => {
  const data = {
    title: "Manage FAQ",
  };

  console.log(props, "useloist");

  // const [supportListData, setSupportListData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [resData, setResData] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [userSearch, setUserSearch] = React.useState([]);
  const [supportListData, setSupportListData] = React.useState([]);
  //   const [countUser, setCountuser] = React.useState(20);
  const [notifyArr, setNotifyarr] = React.useState([]);

  return (
    <>
      <div className={styles.body}>
        <Grid container spacing={0}>
          <Grid item md={12} sm={12} xs={12} className={styles.listgridandsms}>
            <div className={styles.listdataindivnoti}>
              <Box className={styles.listboxtypouo}>
                <div >
                  <Typography className={styles.listtexyheding}>Proin sodales facilisis imperdiet. Praesent fermentum imperdiet nisi, et sagittis dolor iaculis eget.</Typography>
                  <Typography className={styles.intesxpereo}>In hac habitasse platea dictumst. Phasellus ac dolor quis orci ornare efficitur in sit amet nisi. Cras placerat lectus vel lacinia aliquet. Nullam ac mauris sed tortor blandit hendrerit viverra ac mauris. Quisque pharetra mauris arcu, vitae elementum erat vestibulum at. </Typography>
                </div>
                <div>
                  <DeleteIcon className={styles.deletebtn} />
                </div>
              </Box>
              <Box className={styles.listboxtypouo}>
                <div >
                  <Typography className={styles.listtexyheding}>Proin sodales facilisis imperdiet. Praesent fermentum imperdiet nisi, et sagittis dolor iaculis eget.</Typography>
                  <Typography className={styles.intesxpereo}>In hac habitasse platea dictumst. Phasellus ac dolor quis orci ornare efficitur in sit amet nisi. Cras placerat lectus vel lacinia aliquet. Nullam ac mauris sed tortor blandit hendrerit viverra ac mauris. Quisque pharetra mauris arcu, vitae elementum erat vestibulum at. </Typography>
                </div>
                <div>
                  <DeleteIcon className={styles.deletebtn} />
                </div>
              </Box> <Box className={styles.listboxtypouo}>
                <div >
                  <Typography className={styles.listtexyheding}>Proin sodales facilisis imperdiet. Praesent fermentum imperdiet nisi, et sagittis dolor iaculis eget.</Typography>
                  <Typography className={styles.intesxpereo}>In hac habitasse platea dictumst. Phasellus ac dolor quis orci ornare efficitur in sit amet nisi. Cras placerat lectus vel lacinia aliquet. Nullam ac mauris sed tortor blandit hendrerit viverra ac mauris. Quisque pharetra mauris arcu, vitae elementum erat vestibulum at. </Typography>
                  <Button className={styles.btnpushing}>
                    Publish</Button>
                </div>
                <div>
                  {/* <DeleteIcon className={styles.deletebtn} /> */}
                </div>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default List;
