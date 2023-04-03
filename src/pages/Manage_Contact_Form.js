import Nevbar from "../component/user/newbarlist";
import Header from "../component/user/header";
import Grid from "@mui/material/Grid";
import { Types } from "../constants/actionTypes";
import { connect } from "react-redux";
import Manage_Contact_form from "../component/manage_contact/manage_contact_form";

const index = (props) => {
  const data = {
    title: "Manage Contact Form",
    desc: " ",
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
          <Manage_Contact_form props={props} />
        </Grid>
      </Grid>
    </>
  );
};
// export default index;
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
// import Nevbar from '../component/user/newbarlist';
// import Header from '../component/user/header';
// import Paymenttable from '../component/Payments/paymentslist';
// import styles from '../styles/user/index.module.css';
// import Grid from '@mui/material/Grid';
// import { Types } from '../constants/actionTypes';
// import { connect } from 'react-redux';

// const index = (props) => {

//   const data = {
//     title: "Payments",
//     desc: "Morning James, Welcome to Clever Gifts Dashboard ",
// }
//   return (
//     <>
//       <Grid container spacing={0} className={styles.dipal}>
//         <Grid xs={12} sm={4} md={3} className={styles.newbar1} >

//           <Nevbar />
//         </Grid>
//         <Grid xs={12} sm={8} md={9} className={styles.homepeg}>
//          <Header  data={data} props={props}/>
//           <Paymenttable props={props}  />
//         </Grid>
//       </Grid>

//     </>
//   );
// };
// // export default index;
// const mapStateToProps = (state) => ({
//   profile: state.user.profile
// });

// const mapDispatchToProps = (dispatch) => ({
//   save_user_data: (data) =>
//       dispatch({ type: Types.LOGIN, payload: data }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(index);
