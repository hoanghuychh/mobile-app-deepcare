import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import HeaderBar from './HeaderBar';

import {getInitiative} from '../services/utils';
import {listen} from "../react-redux-auto";
import $store from '../store';
import axios from '../services/axios';


class SideBar extends React.Component {
    logout = async () => {
        this.props.navigation.navigate('LoginScreen');

        await axios.get('session/logout');
        $store.authClearUser();
    };

    render() {
        return <View>
            <HeaderBar>
                <View></View>
                <Text>{$store.auth.user.name} ({getInitiative($store.auth.user.name)})</Text>
                <View></View>
            </HeaderBar>

            <View>
                <Button  title={'Logout'} onPress={this.logout} />
            </View>
        </View>
    }
}

export default listen('auth')(SideBar);