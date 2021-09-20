import React, { Component } from "react";
import { StyleSheet, ScrollView, Vibration, Alert, AppState,AppRegistry, Platform, Linking } from "react-native";
import { createStackNavigator, NavigationActions, createAppContainer } from "react-navigation";

//chatbot
import LoadingScreen from './screens/Login';
import MainDrawerNavigator from "./screens/MainDrawerNavigator"


export default class DeepcareApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
    
  }

  componentWillMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange); 
  };
  

  async componentDidMount() {
    console.log("DeepcareApp componentDidMount... ")
    
  };

  //callback xử lí khi nhấn mở notif từ FCM
  _onOpenNotificationFCM() {
    
  }

  componentWillReceiveProps(props) {
  
  }

  componentWillUnmount() {
    console.log("DeepcareApp componentWillUnmount... ")
    //this.clearTimer();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  //kiểm tra state là background hay là forceground
  _backgroundState(state) {
    return state.match(/inactive|background/);
  }

  //lắng nghe app đi từ background hay forceground
  _handleAppStateChange = async (nextAppState) => {
    if (this._backgroundState(nextAppState)) {
      console.log("DeepcareApp is going background");
    } else if (this._backgroundState(this.state.appState) && (nextAppState === 'active')) {
      console.log("DeepcareApp is coming to foreground");
      this.handlerCheckVersionApp();
      //handle
    }
    this.setState({appState: nextAppState});
  }
    

  //lấy tên màn hình hiện tại 
  getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      console.log("DeepcareApp route.routes...")
      return this.getActiveRouteName(route);
    }
    mRouterName = route.routeName;
    console.log("DeepcareApp routerName..." + mRouterName)
    return route.routeName;
  }
  

  render() {
    return (
      <Container
            onNavigationStateChange={(prevState, currentState) => {
              let curName = this.getActiveRouteName(currentState);
              let prevName = this.getActiveRouteName(prevState);
              console.log("DeepcareApp onNavigationStateChange curName: " + curName + " prevName: " + prevName);
            }}  
          />
    );
  }
}

const AppNavigator = createStackNavigator(
  {
   
    LoadingScreen: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: LoadingScreen
    },
    MainDrawerNavigator: {
      navigationOptions: {
        title: "",
        headerBackTitle: null,
        header: null
      },
      screen: MainDrawerNavigator
    }

  },
  {
    initialRouteName: "LoadingScreen"
  }
  
);

const Container = createAppContainer(AppNavigator);
//export default Container;




