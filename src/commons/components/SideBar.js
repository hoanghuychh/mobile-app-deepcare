import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import HeaderBar from './HeaderBar';

import {getInitiative} from '../Utils';
import axios from '../services/axios';


class SideBar extends React.Component {
    logout = async () => {
        this.props.navigation.navigate('LoginScreen');

        await axios.get('session/logout');
    };

    render() {
        return <View>
            <HeaderBar>
                <View></View>
                <Text></Text>
                <View></View>
            </HeaderBar>

            <View>
                <Button  title={'Logout'} onPress={this.logout} />
            </View>
        </View>
    }
}

export default SideBar;