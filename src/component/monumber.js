import styles from "../styles/login.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import ApiEndpoint from "../config/ApiEndpoint";
import ApiServices from "../config/ApiServices";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Mobile = (props) => {
  const router = useRouter();
  const onLoginPress = async () => {
    var body = {
      email: formik.values.email,
    };
    var headers = {
      "Content-Type": "application/json",
    };
    console.log(ApiEndpoint.ADMIN_FORGOT_PASSWORD, "is_______api");
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.ADMIN_FORGOT_PASSWORD,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data, "datadata");
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        console.log(formik.values.email, "emaillist");

        router.push({
          pathname: "./codevrfy",
          query: { email: data.data.id },
        });
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().min(10).required("Email digit Number"),
    }),
    onSubmit: () => {
      onLoginPress();
    },
  });

  return (
    <>
      <Grid container className={styles.listcontenatlogin}>
        <Grid item md={5} sm={8} className={styles.listgrifanfbox}>
          <Box className={styles.listboxmailtext2223}>
            <Typography>Reset Password</Typography>
          </Box>
          <Box className={styles.patretextlog}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Typography>
          </Box>
          <Box className={styles.listinputbox}>
            <Typography className={styles.listemailtext}>Email</Typography>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              type="text"
              helperText={formik.touched.email && formik.errors.email}
              className={styles.Search_Bar_input}
              onBlur={formik.handleBlur}
              placeholder="Enter Your Email"
              onChange={formik.handleChange}
              name="email"
              value={formik.values.email}
              variant="outlined"
            />
          </Box>
          <Box className={styles.listbuttomopen22}>
            <Button onClick={onLoginPress}>Continue</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Mobile;
