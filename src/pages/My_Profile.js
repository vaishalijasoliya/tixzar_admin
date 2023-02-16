import { Grid } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Movie_review_Pages from "../component/My_Profile/My_Profile";
import Header from "../component/user/hederdata2";

const Movie_Review = (props) => {

    const data = {
        title: "Manage Reviews",
        desc: "",
    }
    return (
        <>
            <Grid container spacing={1} className='mainDiv'>
                <Grid xs={12} sm={12} md={12} className='maenedit'>
                    <Header data={data} props={props} />
                    <Movie_review_Pages props={props} />
                </Grid>
            </Grid>

        </>
    )
}



// export default 


const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Movie_Review);
