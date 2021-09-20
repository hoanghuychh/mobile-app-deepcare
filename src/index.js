import React from 'react';

import {createSwitchNavigator} from 'react-navigation';
import MainDrawerNavigator from './screens/MainDrawerNavigator';
import LoginContainer from './containers/LoginContainer';
import LoginScreen from './screens/Login'
import PatientProfile from './screens/patientprofile/PatientProfile';
import VideoCall from "./screens/Map";
import {AsyncStorage, ActivityIndicator, View} from "react-native";
import axios, {setApiToken} from './commons/services/axios';


class LoadingScreen extends React.Component {
    componentDidMount = async () => {
        let token = await AsyncStorage.getItem('token');
        token = token === null ? '' : token;

        this.props.navigation.navigate(LoginScreen);
    };

    
    render() {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large"/>
        </View>
    }
}

//createSwitchNavigator bỏ qua nút back
const MainNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen,
    LoginScreen: LoginScreen,
    VideoCallScreen: VideoCall,
    MainDrawerNavigator: MainDrawerNavigator,
}, {
    initialRouteName: 'VideoCallScreen'
});

export default MainNavigator;