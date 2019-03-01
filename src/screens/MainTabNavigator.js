import React from 'react';
import {createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import SideBar from '../components/SideBar';
import MapScreen from './Map';
import PatientProfile from "./patientprofile/PatientProfile";
import DashboardScreen from './Dashboard';


let genRoute = (module, icon, header) => ({
    screen: module,
    navigationOptions: ({navigation}) => ({
        tabBarVisible: icon !== 'clash',
        tabBarIcon: (params) => {
            let {tintColor} = params;

            return <Icon color={tintColor} type='font-awesome' name={icon} />
        },
    })
});

const RouteConfigs = {
    DashboardScreen: genRoute(DashboardScreen, 'home'),
    MapScreen: genRoute(MapScreen, 'map'),
    PatientProfile: genRoute(PatientProfile, 'user')
};

const BottomTabNavigatorConfig = {
    initialRouteName: 'DashboardScreen',
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
    }
};

const BottomTabNavigator = createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);


// const DrawerNavigator = createDrawerNavigator({
//     App: {screen: BottomTabNavigator},
// }, {
//     contentComponent: navigation => <SideBar navigation={navigation.navigation}/>
// });


export default BottomTabNavigator;
