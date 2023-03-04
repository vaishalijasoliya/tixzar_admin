import styles from "../styles/login.module.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Logo from "./logo";
import { useRouter } from "next/router";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as React from "react";
import ApiServices from "../config/ApiServices";
import ApiEndpoint from "../config/ApiEndpoint";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Newpass = (props) => {
  const [showPasswordlistdata, setShowPasswordlistdata] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [idobj, setIdobjdat] = useState([])
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPasswordlist, setShowPasswordlist] = React.useState(false);

  const handleClickShowPasswordlist = () =>
    setShowPasswordlist((show) => !show);

  const handleMouseDownPasswordlist = (event) => {
    event.preventDefault();
  };
  const router = useRouter();
  // const onLoginPress = () => {
  //   var body = {
  //     newPassword: formik.values.newPassword,
  //     reTypePassword: formik.values.reTypePassword,
  //   };
  //   var headers = {
  //     "Content-Type": "application/json",
  //   };
  //   console.log(body);
  //   var data = (JSON.stringify(body), headers);
  // };
  React.useEffect(() => {
    updateAccessToken(router.query.token);
  }, [router.isReady])
  const onLoginPress = async (value) => {
    var body = {
      id: idobj.id,
      password: formik.values.reTypePassword
    };
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": idobj.tokan,
    };
console.log(headers,'bodybody')
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_PASS_CREATE,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    if (!!data) {
      if (data.status == true) {
        toast.success(data.message);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };
  const updateAccessToken = async (token) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": token
    }

    // console.log(props.profile.accountId,'props.profile.accountId');
    props.props.loaderRef(true)
    var data = await ApiServices.GetApiCall(
      ApiEndpoint.ADMIN_TOKAN_UPDET,
      headers
    );
    props.props.loaderRef(false)
    console.log('updateAccount...', data)
    if (data.status == true) {
      var obg = {
        id: data.userId,
        tokan: token
      }
      setIdobjdat(obg)
      // onLoginPress(obg)
    } else {

    }

  }
  console.log(router.query.token, 'KKKKKKK');

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      reTypePassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string().max(12).min(8).required("Password is required"),
      reTypePassword: Yup.string()
        .max(12)
        .min(8)
        .required("Repassword is required"),
    }),
    onSubmit: () => {
      
      // router.push("/");
      // console.log();
    },
  });

  return (
    <>
      <Grid container className={styles.listcontenatlogin}>
        <Grid item md={5} sm={8} className={styles.listgrifanfbox}>
          <Box className={styles.listboxmailtext22}>
            <Typography>Create new password</Typography>
          </Box>
          <Box className={styles.patretextlog}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Typography>
          </Box>
          <Box className={styles.listinputbox}>
            <form>
              <Typography className={styles.listemailtext}>Password</Typography>
              <Box style={{ display: "flex" }}>
                <TextField
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  id="outlined-required"
                  type={showPassword ? "text" : "password"}
                  helperText={formik.touched.password && formik.errors.password}
                  placeholder="Create New Password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="password"
                  value={formik.values.password}
                  className={styles.Search_Bar_input}
                  InputProps={{
                    endAdornment: (
                      <Button
                        className={styles.menolistlogo}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </Button>
                    ),
                  }}
                />
                {/* <Button className={styles.menolistlogo}
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}


                                </Button> */}
              </Box>
              <Typography className={styles.listemailtext}>
                Retype Password
              </Typography>
              <Box style={{ display: "flex" }}>
                <TextField
                  error={Boolean(
                    formik.touched.reTypePassword &&
                    formik.errors.reTypePassword
                  )}
                  // type="password"
                  helperText={
                    formik.touched.reTypePassword &&
                    formik.errors.reTypePassword
                  }
                  className={styles.Search_Bar_input}
                  id="outlined-required"
                  placeholder="Re-type New Password"
                  variant="outlined"
                  name="reTypePassword"
                  value={formik.values.reTypePassword}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPasswordlist ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <Button
                        className={styles.menolistlogo}
                        onClick={handleClickShowPasswordlist}
                        onMouseDown={handleMouseDownPasswordlist}
                      >
                        {showPasswordlist ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </Button>
                    ),
                  }}
                />
              </Box>
            </form>
          </Box>
          <Box className={styles.listbuttomopen22}>
            <Button onClick={onLoginPress}>Continue</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Newpass;
