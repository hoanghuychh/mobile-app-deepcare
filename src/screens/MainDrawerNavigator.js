import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import MainStackNavigator from './MainStackNavigator';
import SideBar from '../commons/components/SideBar';


const DrawerNavigator = createDrawerNavigator({
    MainStackNavigator: {screen: MainStackNavigator},
}, {
    contentComponent: navigation => <SideBar navigation={navigation.navigation}/>,
});


export default DrawerNavigator;
