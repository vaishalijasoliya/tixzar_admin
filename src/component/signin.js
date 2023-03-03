import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import styles from "../styles/login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import ApiServices from "../config/ApiServices";
import ApiEndpoint from "../config/ApiEndpoint";
import { toast } from "react-toastify";
import { Types } from "../constants/actionTypes";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Logo from "./logo";

const Item = styled(Paper)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Signin = (props) => {
  console.log(props, "signinprops");
  const router = useRouter();

  const onLoginPress = async () => {
    var body = {
      user_name: formik.values.username,
      password: formik.values.password,
    };
    var headers = {
      "Content-Type": "application/json",
    };
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.LOGIN_USER,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data);
    if (!!data) {
      if (data.status == true) {
        data.data.token = data.token;
        props.save_user_data({ user: data.data });
        toast.success("Logged In Succesfully");
        router.push("./dashboard");
      } else {
        // setErrorShow(true)
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      onLoginPress();
    },
  });

  return (
    <Grid container className={styles.listcontenatlogin}>
      <Grid item md={5} sm={8} className={styles.listgrifanfbox}>
        <Box className={styles.listboxmailtext}>
          <Typography style={{ textAlign: "center" }}>
            Check your mail
          </Typography>
        </Box>
        <Box className={styles.patretextlog}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Typography>
        </Box>
        <Box className={styles.listbuttomopen}>
          <Button>Open Email</Button>
        </Box>
        <Box className={styles.ategandperegaf}>
          <a href="/" className={styles.listskipanda}>
            Skip
          </a>
          <Typography>, I will confirm later</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
