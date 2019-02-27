import {AsyncStorage} from 'react-native';

export var authSetToken  = (state, token) => {
    AsyncStorage.setItem('token', token);
    return {...state, token};
};

export var authSetUser = (state, user) => {
    AsyncStorage.setItem('user', JSON.stringify(user));
    return {...state, user};
};

export var authClearUser = (state) => {
    AsyncStorage.removeItem('user');

    delete state.user;
    return {...state};
};