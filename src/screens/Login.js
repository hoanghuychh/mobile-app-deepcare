import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Input, SearchBar, Button, Text, Icon, SocialIcon } from 'react-native-elements';

import DialogLoading from "../commons/components/DialogLoading";
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../commons/Colors";
import Constants from "../commons/Constants";
import axios, {setApiToken} from '../commons/services/axios';

import { Translate } from "../commons/configs/language/Language";
import DefineKey from "../commons/configs/language/DefineKey";
import WarningDialog from "../commons/components/WarningDialog";

const TYPE_CHANGE_USER = "TYPE_CHANGE_USER";
const TYPE_CHANGE_PASS = "TYPE_CHANGE_PASS";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userName: "",
        password: "",
        errorPassword: "",
        errorUserName: "",
        showLoading: false,
        warningdialogvisible: false,
        errTitle: "",
        errContent: "",
    };
    this.onOpenDialogWarning = this.onOpenDialogWarning.bind(this);
    this.onWarningOk = this.onWarningOk.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  async componentDidMount() {


  }

  componentWillReceiveProps(props) {
    let errorLogin = props.lastError;
    if (errorLogin === "") {
        console.log(`Login userProfile = ${JSON.stringify(props.userProfile)}`)
        let userId = props.userProfile.user_id;
        
        this.redirectToMainScreen(userId);
    } else {
      if (errorLogin != null && errorLogin !== "") {
        let errTitle = Translate(DefineKey.DialogWarning_text_title);
        this.onOpenDialogWarning(errTitle, errorLogin);
      }
    }
  }

  redirectToMainScreen(userId) {
      this.props.navigation.navigate("MainDrawerNavigator");
  }

  onOpenDialogWarning(errTitle, errContent) {
    this.setState({
      warningdialogvisible: true,
      errTitle: errTitle,
      errContent: errContent
    });
    // this.refs.dialogWarning.showModal();
  }
  onWarningOk() {
    this.setState({ warningdialogvisible: false });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  doLogin = async() =>{
    let userName = this.state.userName;
    let password = this.state.password;
    if(userName == null || userName === "") {
        let errorName = "Invalid field userName!";
        let errorPassword = "Invalid field passWord!";
        this.setState({errorUserName: errorName})
        return;
    }
    if(password == null || password === "") {
        let errorPassword = "Invalid field passWord!";
        this.setState({errorPassword: errorPassword})
        return;
    }
    var requestBody = {};
    if(this.validateEmail(userName)) {
        requestBody = { email: userName, password: password, phone: "" };
    } else {
        requestBody = { email: "", password: password, phone: userName };
    }
    this.props.doLogin(requestBody);

  }

  doSignIn() {
      alert("signIn")
  }

  doForgotPass() {
    alert("doForgotPass...")
  }

  onChangeUserName(type, text) {
    if(type === TYPE_CHANGE_USER) {
        this.setState({errorUserName: "", userName: text})
    } else {
        this.setState({errorPassword: "", password: text})
    }
    
  }

  render() {
  
    return (
        <View style={styles.container}>
            <Text style ={styles.txtLogin}>Login</Text>
            <Text style = {styles.titleInput}>Username</Text>
            <Input
                leftIcon={
                <FontAwesome
                    name="user"
                    color='black'
                    size={24}
                />
                }
                containerStyle={styles.inputContainerStyle}
                placeholder="type your username..."
                shake={true}
                errorMessage = {this.state.errorUserName}
                onChangeText={userName => this.onChangeUserName(TYPE_CHANGE_USER, userName)}
                value={this.state.userName}
            />
            <Text style = {styles.titleInput}>Password</Text>
            <Input
                leftIcon={
                <Icon
                    name="lock"
                    color='black'
                    size={24}
                />
                }
                containerStyle={styles.inputContainerStyle}
                placeholder="type your password..."
                shake={true}
                errorMessage = {this.state.errorPassword}
                onChangeText={password => this.onChangeUserName(TYPE_CHANGE_PASS, password)}
                value={this.state.password}
            />
            <Text style = {styles.titleForgot} onPress={this.doForgotPass}>Forgot password?</Text>
            <Button
                buttonStyle = {styles.btnLogin}
                onPress={this.doLogin}
                title="LOGIN"
                containerStyle={{width: '100%'}}
            />
            <Text style ={styles.textOrSignUp}>Or Sign Up Using</Text>
            <View style = {styles.groupSocial}>
                <SocialIcon             
                    type='facebook'
                />
                <SocialIcon    
                    type='twitter'
                />
                <SocialIcon
                    type='google-plus-official'
                />
                <SocialIcon     
                    type='instagram'
                />
            </View>
            <View style={styles.groupButtom}>
                <Text style ={styles.textOrSignUp}>Have not account yet?</Text>
                <Text style ={styles.textSignUp} onPress={this.doSignIn}>SIGN UP</Text>
            </View>
            <DialogLoading loading={this.props.showLoading} />
            <WarningDialog titleDialog={this.state.errTitle} contentDialog={this.state.errContent} onOk={this.onWarningOk.bind()} textOk={Translate(DefineKey.DialogWarning_text_ok)} visible={this.state.warningdialogvisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  },
  txtLogin: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 35,
    marginBottom: 30
  },
  titleInput: {
    marginTop: 15,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingLeft: 15
  },
  inputContainerStyle: {
    width: "100%"
  },
  titleForgot:{
    textAlign: "right",
    alignSelf: "flex-end",
    marginTop: 10,
    paddingRight: 10,
  },
  btnLogin: {
      width: "80%",
      alignSelf: "center",
      justifyContent: "center",
      marginTop: 15
  },
  textOrSignUp: {
      marginTop: 20,
  },
  groupSocial: {
      flexDirection: 'row',
      marginTop: 10
  },
  groupButtom:{
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textSignUp: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 10
},

});