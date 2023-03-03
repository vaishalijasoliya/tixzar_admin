import Mobile from "../component/monumber";
// import App from "../component/phone";
import style from "../styles/login.module.css";
import { connect } from "react-redux";
import { Types } from "/src/constants/actionTypes";
import { Grid } from "@mui/material";

const Phone = (props) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ height: "100%" }}
        className="Login_page_main"
      >
        <Mobile props={props} />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Phone);
