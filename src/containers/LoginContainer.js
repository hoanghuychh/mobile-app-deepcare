import {connect} from 'react-redux';
import Login from "../screens/Login";
import {
    doLoginUserName
} from "../actions/LoginAction";

const mapStateToProps = (state) => {
    return {
        lastError: state.loginReducer.lastError,
        showLoading: state.loginReducer.isLoading,
        userProfile: state.loginReducer.userProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {    
        doLogin: (userData) => {                        
            dispatch(doLoginUserName(userData));
        },
       
    };
}
const LoginContainer =  connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;
