
import Nevbar from '../component/user/newbarlist';
import Header from '../component/user/header';
import Paymenttable from '../component/user/paymenttable';
import styles from '../styles/user/index.module.css';
import Grid from '@mui/material/Grid';
import { Types } from '../constants/actionTypes';
import { connect } from 'react-redux';
import ManageFaq from '../component/manageFAQ/manageFAQ';

const index = (props) => {

  const data = {
    title: "Manage FAQ",
    // desc: "Morning James, Welcome to Clever Gifts Dashboard ",
  }
  return (
    <>

      <Grid container spacing={0} className='mainDiv'>
        <Grid xs={12} sm={4} md={3} className='Gridcontainergrid' >

          <Nevbar />

        </Grid>
        <Grid xs={12} sm={8} md={9} className='maenedit'>
        <div style={{background:'#332E59'}}>
          <Header data={data} props={props} />
          </div>
          <ManageFaq props={props} />
          {/* <Paymenttable props={props} /> */}
          {/* <ManageFaq/> */}
        </Grid>
      </Grid>

    </>
  );
};
// export default index;
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);