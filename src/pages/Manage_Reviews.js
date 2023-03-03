import { connect } from "react-redux";
import { Types } from "/src/constants/actionTypes";
import Nevbar from "../component/user/newbarlist";
import Header from "../component/user/header";
import styles from "../styles/user/index.module.css";
import Grid from "@mui/material/Grid";
import Manage_review from "../component/manage_review/manage_review";

const SubAdmin = (props) => {
  const data = {
    title: "Manage Reviews",
    desc: "",
  };
  return (
    <>
      <>
        <Grid
          container
          spacing={0}
          xs={12}
          xl={12}
          lg={12}
          sm={12}
          className="mainDiv"
        >
          <Grid xs={12} sm={4} md={3} className="Gridcontainergrid">
            <Nevbar />
          </Grid>
          <Grid xs={12} sm={8} md={9} className="maenedit">
            <div style={{ background: "#332E59" }}>
              <Header data={data} props={props} />
            </div>
            <Manage_review props={props} />
          </Grid>
        </Grid>
      </>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(SubAdmin);
