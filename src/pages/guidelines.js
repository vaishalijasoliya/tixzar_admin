import Link from "next/link";
import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { makeStyles, StylesContext } from '@mui/styles';
import Image from 'next/image'
import { blue } from "@mui/material/colors";
import { useRouter, withRouter } from "next/router";
import ApiServices from '/src/config/ApiServices';
import ApiEndpoint from '/src/config/ApiEndpoint';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';
import DashboardLayout from "./guidelines/layout";
import Home from "./guidelines/Guidelines";
import Nevbar from '../component/user/newbarlist';
import Header from '../component/user/header';
import styles from '../styles/user/index.module.css';
import Grid from '@mui/material/Grid';
import Manage_trending_movie from "../component/manage_trending_movie/Manage_trending_movie";


const SubAdmin = (props) => {
    const data = {
        title: "Manage Trending Movies",
    }
    return (
        <>


            {/* <Usercount /> */}
            <Grid container spacing={0} className='mainDiv'>
                <Grid xs={12} sm={4} md={3} className='Gridcontainergrid' >
                    <Nevbar />
                </Grid>
                <Grid xs={12} sm={8} md={9} className='maenedit'>
                <div style={{background:'#332E59'}}>
                    <Header data={data} props={props} />
                    </div>
                    <Manage_trending_movie props={props} />
                </Grid>
            </Grid>
        </>
    )

}

const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(SubAdmin);
