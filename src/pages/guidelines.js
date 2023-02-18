import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';
import Nevbar from '../component/user/newbarlist';
import Header from '../component/user/header';
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
                    <div style={{ background: '#332E59' }}>
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
