import { Grid } from "@mui/material";
import Newpass from "../component/updatepass";
import style from "../styles/login.module.css";
import { useRouter } from "next/router";

const Password = (props) => {
  const router = useRouter();

  return (
    <Grid
      container
      spacing={1}
      style={{ height: "100%" }}
      className="Login_page_main"
    >
      <Newpass props={props} />
    </Grid>
  );
};

export default Password;
