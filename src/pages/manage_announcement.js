import { Grid } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Manage_announcement from "../component/manage_announcement/manage_announcement";
import Header from "../component/user/header";
import Nevbar from "../component/user/newbarlist";

const Manageannouncement = (props) => {
  const data = {
    title: " Manage Announcement",
    desc: "",
  };
  return (
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
          <Manage_announcement props={props} />
        </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(Manageannouncement);
