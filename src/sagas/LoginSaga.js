import {
    LOGIN_DO_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET_LOGIN,

} from "../actions/ActionType";
  //Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from '../commons/Api';
import Constants from "../commons/Constants";
import { AsyncStorage } from "react-native";
import {Translate} from "../commons/configs/language/Language"
import DefineKey from "../commons/configs/language/DefineKey";

function* doLoginUserData(action) {
    try {
        console.log("LoginSaga doLogin...")
        yield put({ type: LOGIN_RESET_LOGIN, hasError: false , lastError: undefined});
        const response = yield Api.doLoginApi(action.userData);
        if (response != null && response.token != null) {
            console.log("from login saga: "+JSON.stringify(response.user));
            yield saveUserProfileLogin(response)
            yield put({ type: LOGIN_SUCCESS, lastError: "", userProfile: response.user});
        } else {
            let error =  Translate(DefineKey.Login_text_login_fail)
            yield put({ type: LOGIN_FAIL, lastError: error, hasError: true });
        }
    } catch (error) {
        let errorText =  Translate(DefineKey.Login_text_login_error_connect)
        yield put({ type: LOGIN_FAIL, lastError: errorText  });
    }

}

//lắng nghe xự kiện user login
export function* watchDoLoginUserData() { 
    yield takeLatest(LOGIN_DO_LOGIN, doLoginUserData);
}


async function saveUserProfileLogin(responseProfile) {
    if(responseProfile !== null) {
        let user = responseProfile.user;
        let token = responseProfile.token;

        saveDataStorage(Constants.KEY_IS_LOGIN_SUCCESS, "true");
        saveDataStorage(Constants.KEY_STORE_TOKEN, token);
        saveDataStorage(Constants.KEY_USER_ID, user.user_id); 
        saveDataStorage(Constants.KEY_STORE_USER_PROFILE, JSON.stringify(responseProfile));
    
    } 
}

async function saveDataStorage(key,value) {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
}

 async function getDataStorage(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log("LoginSaga getDataStorage:" + value) //Display key value
      return value;
    } catch (error) {
      // Error retrieving data
      console.log("error... " + error.message);
      return null;
    }
  }






