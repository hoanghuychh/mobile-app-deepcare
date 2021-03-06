import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET_LOGIN
  } from "../actions/ActionType";
  
  export const _INITIAL_STATE_ = {
    userProfile: {},
    isLoading: false,
    lastError: null,
  };
  
  export const loginReducer = (state = _INITIAL_STATE_, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        console.log(`login successfull-hoanghuychh`)
        return {
          ...state,
          userProfile: action.userProfile,
          lastError: "",
          isLoading: false,
          appointment_count: action.appointment_count
        };
      case LOGIN_FAIL:
        console.log(`login LOGIN_FAIL-hoanghuychh`)
        return {
          ...state,
          userProfile: {},
          lastError: action.lastError,
          isLoading: false
        };
      case LOGIN_RESET_LOGIN:
        console.log(`login LOGIN_RESET_LOGIN-hoanghuychh`)
        return {
          ...state,
          userProfile: {},
          lastError: null,
          isLoading: true
        }; 
      default:
        return state; //state does not change
    }
    
  };
  