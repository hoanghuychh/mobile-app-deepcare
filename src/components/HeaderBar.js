import React from 'react';
import {Header} from 'react-native-elements';
import colors from '../commons/Colors';


export default class HeaderBar extends React.Component {
    render() {
        let backgroundColor = this.props?.backgroundColor || colors.white;
        let containerStyle = this.props?.containerStyle || {height: 56, paddingBottom: 28};

        return <Header backgroundColor={backgroundColor} containerStyle={containerStyle} {...this.props} />;
    }
}