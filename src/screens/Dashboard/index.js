import React from 'react';
import {View} from 'react-native';
import {Icon, Text} from 'react-native-elements';

import CreateCircleModal from './CreateCircleModal';
import HeaderBar from '../../commons/components/HeaderBar';


export default class Dashboard extends React.Component {
    state = {isModalShown: false, messages: []};

    componentDidMount() {

    }

    showModal = () => {
        this.setState({isModalShown: true});
    };

    hideModal = () => {
        this.setState({isModalShown: false});
    };

    render() {
        let {isModalShown} = this.state;

        return <View>
            <HeaderBar>
                <Icon onPress={() => this.props.navigation.openDrawer()} type="feather" name="menu"/>
                <Text style={{fontSize: 24}}>Amcoming</Text>
                <Icon type="feather" name="plus" onPress={this.showModal}/>
            </HeaderBar>

            <CreateCircleModal isModalShown={isModalShown} hideModal={this.hideModal} />

            <View>
                <Text>testes</Text>
            </View>
        </View>
    }
}
