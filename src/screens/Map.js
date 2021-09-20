import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, ImageBackground, Platform , 
    TouchableOpacity, ActivityIndicator, AsyncStorage} from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';

export default class Map extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            apiKey: '',
            sessionId: '',
            token: ''
    
        };
       
      }

    componentDidMount() {
        this.initData();
    }

    initData() {
        let apiKey = "46310102";
        let sessionId = "1_MX40NjMxMDEwMn5-MTU1NTM5MTEyOTA1Nn55QmtVV3pQVnNMbkJaakpoakk3T1hQdTJ-fg";
        let token = "T1==cGFydG5lcl9pZD00NjMxMDEwMiZzaWc9NTM4NTRmNmUzY2M2MDU2YWU1YTQ5OGYwMDQzNmVhMGE5NDNmYzRhMzpzZXNzaW9uX2lkPTFfTVg0ME5qTXhNREV3TW41LU1UVTFOVE01TVRFeU9UQTFObjU1UW10VlYzcFFWbk5NYmtKYWFrcG9ha2szVDFoUWRUSi1mZyZjcmVhdGVfdGltZT0xNTU1MzkxMjEwJnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1NTUzOTEyMTAuMzcyMzc0MTkzNTI0Mw==";

        this.setState({
            apiKey: apiKey,
            sessionId: sessionId,
            token: token
        })
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', }}>
              <OTSession apiKey="46310102" sessionId="2_MX40NjMxMDEwMn5-MTU1NTQwNDE4MDg3M35kT0d6ZUtOTmdlZmRZSDFDeFRpTGludGt-fg" token="T1==cGFydG5lcl9pZD00NjMxMDEwMiZzaWc9OGQ0OGFmYjRjMjQ1OTYwNDllYTZiMGJkNTc2YTVmODhmMzM0MGM3ODpzZXNzaW9uX2lkPTJfTVg0ME5qTXhNREV3TW41LU1UVTFOVFF3TkRFNE1EZzNNMzVrVDBkNlpVdE9UbWRsWm1SWlNERkRlRlJwVEdsdWRHdC1mZyZjcmVhdGVfdGltZT0xNTU1NDA0MjQ2Jm5vbmNlPTAuNjI3MTI5NTU1MTEzMDg5MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTU3OTk2MjQ1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9" style={{flex: 1, flexDirection: "column"}}>
                <OTPublisher style={{ backgroundColor: "blue", width: 100, height: 100 }} />
                <OTSubscriber style={{ backgroundColor: "red", width: 200, height: 200 }} />
              </OTSession>
            </View>
          );
    }
}
