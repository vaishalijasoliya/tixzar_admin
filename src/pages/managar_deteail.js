import Nevbar from '../component/user/newbarlist';
import Header from '../component/user/header';
import Grid from '@mui/material/Grid';
import Promotionlist from '../component/promotion/promotionlist';
import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';
import { useRouter, withRouter } from 'next/router';

const Manager_deteail = (props) => {
  const router = useRouter();
  const data = {
    title: "Manage Details",
  }
  return (
    <>
      <Grid container spacing={0} className='mainDiv'>
        <Grid xs={12} sm={4} md={3} className='gridcontainerdiv'  >
          <Nevbar />
        </Grid>
        <Grid xs={12} sm={8} md={9} className='maenedit' >
        <div style={{background:'#332E59'}}>
          <Header data={data} props={props} />
          </div>
          <Promotionlist props={props} id={router.query.emailID} />
        </Grid>
      </Grid>

    </>
  );
};



const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Manager_deteail);
