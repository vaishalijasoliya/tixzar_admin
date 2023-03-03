import { Grid } from "@mui/material";
import Signin from "../component/logo.js";

const main = (props) => {
  console.log(props);
  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ height: "100%" }}
        className="Login_page_main"
      >
        <Signin props={props} />
      </Grid>
    </>
  );
};

export default main;
