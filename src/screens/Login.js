import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Input, SearchBar, Button, Text, Icon, SocialIcon } from 'react-native-elements';

import DialogLoading from "../components/DialogLoading";
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../commons/Colors";
import Constants from "../commons/Constants";
import axios, {setApiToken} from '../services/axios';

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
        showLoading: false
    };
    this.doLogin = this.doLogin.bind(this);
  }

  async componentDidMount() {


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
    let xKey = "";
    let config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-key": xKey
        }
    };
    this.setState({showLoading: true})
    response = await axios.post('login', requestBody, config );
    let userProfile = response.data;
    console.log("Login response " + JSON.stringify(userProfile));
   
    //save token
    let token = userProfile.token; 
    await AsyncStorage.setItem(Constants.KEY_STORE_TOKEN, token);
    await AsyncStorage.setItem(Constants.KEY_STORE_USER_PFOFILE, JSON.stringify(userProfile));
    this.setState({showLoading: false})
    this.props.navigation.navigate("MainDrawerNavigator");

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
            <DialogLoading loading={this.state.showLoading} />
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