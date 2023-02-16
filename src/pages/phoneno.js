import Mobile from "../component/monumber";
// import App from "../component/phone";
import style from '../styles/login.module.css'
import { connect } from 'react-redux';
import { Types } from '/src/constants/actionTypes';

const Phone = (props) => {


    return (

        <>
                        <Mobile props = {props} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Phone);
