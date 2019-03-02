import React from 'react';
import {StyleSheet, Modal, View} from 'react-native';
import {Icon, Text, Input, Button} from 'react-native-elements';

import HeaderBar from '../../commons/components/HeaderBar';
import {CONTAINER_PADDING, COLOR_PRIMARY} from "../../settings";
import firebase from '../../commons/services/firebase';


export default class CreateCircleModal extends React.Component {
    state = {circleName: ''};

    createCircle = () => {
        let circle = {
            name: this.state.circleName
        };

        firebase.database().ref('circles').child('newkey').set(circle);
    };

    render() {
        let {isModalShown, hideModal} = this.props;

        if (!isModalShown) return <View/>;

        return <Modal
            animationType="slide"
            transparent={false}
            visible
        >
            <HeaderBar
                centerComponent={<Text>Create circle</Text>}
                rightComponent={<Icon type="feather" name="chevron-down" onPress={hideModal}/>}
            />

            <View style={styles.container}>
                <Input onChangeText={circleName => this.setState({circleName})} placeholder='Circle name'/>

                <Button onPress={this.createCircle} title={'Create'} style={styles.btnConfirm}/>
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: CONTAINER_PADDING,
        justifyContent: 'space-between'
    },

    btnConfirm: {
        backgroundColor: COLOR_PRIMARY,
        alignSelf: 'flex-end'
    }
});
