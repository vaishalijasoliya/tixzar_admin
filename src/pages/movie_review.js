import { Grid } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import Movie_review_Pages from "../component/manage_review/movie_review_pages/movie_review_pages";
import Header from "../component/user/header";
import Nevbar from '../component/user/newbarlist';
import { useRouter, withRouter } from 'next/router';



const Movie_Review = (props) => {
    const router = useRouter();
    const data = {
        title: "Manage Reviews",
        desc: "",
    }
    return (
        <>
            <Grid container spacing={1} className='mainDiv'>
                <Grid xs={12} sm={4} md={3} className='Gridcontainergrid' >
                    <Nevbar />
                </Grid>
                <Grid xs={12} sm={8} md={9} className='maenedit'>
                <div style={{background:'#332E59'}}>

                    <Header data={data} props={props} />
                    </div>
                    <Movie_review_Pages props={props} ID={router.query.emailID} />
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
