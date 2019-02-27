import React from 'react';

import {createSwitchNavigator} from 'react-navigation';
import MainDrawerNavigator from './screens/MainDrawerNavigator';
import LoginScreen from './screens/Login';
import {AsyncStorage, ActivityIndicator, View} from "react-native";
import $store from '../src/store';
import axios, {setApiToken} from './services/axios';


class LoadingScreen extends React.Component {
    componentDidMount = async () => {
        let token = await AsyncStorage.getItem('token');
        token = token === null ? '' : token;

        // Get the stored session or init a new one if token is not valid
        let resp = await axios.get('session/init?token=' + token);
        let session = resp.data;
        token = session.id;

        // Update token for axios
        setApiToken(token);

        $store.authSetToken(token);

        let {user} = session;

        if (!user) screen = 'LoginScreen';
        else {
            $store.authSetUser(user);
            screen = 'MainDrawerNavigator';
        }

        this.props.navigation.navigate(screen);
    };

    
    render() {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large"/>
        </View>
    }
}


const MainNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    MainDrawerNavigator: MainDrawerNavigator,
}, {
    initialRouteName: 'LoadingScreen'
});

export default MainNavigator;