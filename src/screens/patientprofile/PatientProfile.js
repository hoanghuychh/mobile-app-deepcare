import React, { Component } from 'react';
import {
  View, ScrollView, StyleSheet, Dimensions, ImageBackground, Platform,
  TouchableOpacity, ActivityIndicator, AsyncStorage
} from 'react-native';
import {
  Input, SearchBar, Button, Text, Icon,
  SocialIcon, Card, Avatar, Tile, Header
} from 'react-native-elements';
import { NavigationEvents } from "react-navigation";
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../../commons/Colors";
import Constants from "../../commons/Constants";
import axios, { setApiToken } from '../../commons/services/axios';
import { Image } from 'react-native';


export default class PatientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoadData: false,
      data_profile: {
        user: {
          name: ''
        }
      },
      name: "",
      date: Date,
      sex: "",
      email: "",
      phone: "",
      address: "",
    };

  }

  async componentDidMount() {


  }
  sa = async (item, name, defaultValue) => {
      item[name] === undefined ? defaultValue :item[name]
      console.log("sa(item)",item[name]);
  }

  loadDataProfile = async () => { 
    let token = await AsyncStorage.getItem(Constants.KEY_STORE_TOKEN);
    let getProfile = await AsyncStorage.getItem(Constants.KEY_STORE_USER_PROFILE);
    let userProfile = JSON.parse(getProfile);
    this.setState({ data_profile: userProfile })
    console.log("1h PatientProfile getProfile " + getProfile + " userProfile: " + JSON.stringify(userProfile))
    console.log("2h", this.state.data_profile.user.name);
    this.sa(this.state.data_profile,'user','');
    console.log('5h',this.state.data_profile.user);
    this.setState({
      name: this.state.data_profile.user.name,
      date: this.state.data_profile.user.date_birth,
      sex: this.state.data_profile.user.sex,
      gmail: this.state.data_profile.user.gmail,
      phone: this.state.data_profile.user.phone,
      address: this.state.data_profile.user.address_string
    })
    console.log("check",this.state.data_profile.user.name,
      this.state.data_profile.user.date_birth,
      this.state.data_profile.user.sex,
      this.state.data_profile.user.email,
      this.state.data_profile.user.phone,
      this.state.data_profile.user.address_string)
    let userID = userProfile.user.user_id;
    token = token === null ? '' : token;
    let xKey = "";
    let config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "x-key": xKey,
        "x-access-token": token,
      }
    };
    const url = "api/v2/user/getUserByUserID/".concat(userID);
    // let response = await axios.get(url, config); 
    // this.setState({isLoading: false});
    console.log("2h PatientProfile response " + JSON.stringify(response.data) + " url: " + url)
    console.log(`3h data_profile in loadDataProfile`, this.state.data_profile)

  }

  onPressBackScreen() {
    alert("back...")
  }

  onPressBtn() {
    alert("onPress...")
  }

  onDidFocus() {
    if (!this.state.isLoadData) {
      this.loadDataProfile();
      this.setState({ isLoadData: true, isLoading: true })
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
          <NavigationEvents
            onDidFocus={payload => {
              console.log(`payload in PatientProfile`, payload);
              this.onDidFocus();
            }}
          />
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.sa()}
          <ScrollView style={{flex:1}}>
            {console.log(this.state.data_profile.user.name)}
            <View style={styles.layoutTop}>
              {/* <Image style={} /> */}
            </View>
            <View style={styles.content}>
              <View style={styles.avatar}>
                <Image style={styles.imageAvatar} />
                <Image style={styles.editAvatar} />
                <Text style={styles.txtName}>{this.state.name}</Text>
              </View>
              <View style={styles.info}>
                <View style={styles.detail}>
                  <Text style={styles.title}></Text>
                  <View style={styles.subDetail}>
                    <View style={styles.date_birth}>
                      <Text style={styles.subTitle}>Ngày sinh</Text>
                      <Text style={styles.userText}>{this.state.date}</Text>
                    </View>
                    <View style={styles.sex}>
                      <Text style={styles.subTitle}>Giới tính</Text>
                      <Text style={styles.userText}>{this.state.sex===1?'Nam':'Nu'}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.title}></Text>
                  <View style={styles.alongSubTitle}>
                    <Text style={styles.subTitle}>Email</Text>
                    <Text style={styles.userText}>{this.state.email}</Text>
                  </View>
                  <View style={styles.subDetail}>
                    <View style={styles.date_birth}>
                      <Text style={styles.subTitle}>Mã SĐT quốc tế</Text>
                      <Text style={styles.userText}>+84</Text>
                    </View>
                    <View style={styles.sex}>
                      <Text style={styles.subTitle}>Điện thoại</Text>
                      <Text style={styles.userText}>{this.state.phone}</Text>
                    </View>
                  </View>
                  <View style={styles.alongSubTitle}>
                    <Text style={styles.subTitle}>Địa chỉ</Text>
                    <Text style={styles.userText}>{this.state.address}</Text>
                  </View>
                </View>
                <Button style={styles.editUser} title="Chỉnh sửa"/>
              </View>
            </View>
          </ScrollView>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    position: "relative"

  },
  layoutTop: {
    width: "100%",
    height: "30%",

  },
  content: {
    width: "95%",
    alignItems: 'center',
  },
  avatar: {
    width: "60%",

  },
  imageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 80,

  },
  editAvatar: {
    width: 13,
    height: 13,
    borderRadius: 26,
  },
  txtName: {
    paddingLeft: 10,
    fontSize: 25,
    color: '#000000',
    fontWeight: 'bold',
  },
  info: {

  },
  detail:{

  },
  subDetail: {

  },
  subTitle: {

  },
  date_birth:{

  },
  userText: {

  },
  sex: {

  },
  alongSubTitle:{

  },
  editUser:{
    
  }
  // wrapHeader: {
  //   position: "absolute",
  //   top: 0,
  //   width: "100%",
  //   flexDirection: 'row',
  //   paddingTop: 10
  // },
  // wrapTopIcon: {
  //   flexDirection: 'row',
  //   alignItems: 'flex-end',
  //   marginLeft: 30,
  //   paddingBottom: 5,
  //   flex: 1.5,
  // },
  // wrapTopName: {
  //   flexDirection: 'column',
  //   paddingLeft: 10,

  // },
  // txtName: {
  //   paddingLeft: 10,
  //   fontSize: 25,
  //   color: Colors.white,
  //   fontWeight: 'bold',
  // },
  // wrapDesInfo: {
  //   flexDirection: "row",
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: 'flex-start',
  //   paddingTop: 40,
  // },
  // textTitleInfo: {
  //   color: Colors.gray_white
  // },
  // textInfo: {
  //   fontWeight: "bold",
  //   color: Colors.white
  // },

  // layout_card: {
  //   alignSelf: 'center',
  //   marginLeft: 30,
  //   marginRight: 30,
  //   marginTop: "-10%"

  // },
  // viewCard: {
  //   flexDirection: 'row',
  //   width: "100%",
  // },

  // layoutOptions: {
  //   flex: 1,
  //   width: "100%",
  //   flexDirection: 'column',
  //   justifyContent: "center",
  //   alignItems: 'center',
  //   backgroundColor: Colors.gray_white
  // },
  // wrapButtonMenu: {
  //   flexDirection: 'row',
  //   width: "100%",
  //   paddingTop: 15,
  //   justifyContent: "center",
  //   alignItems: 'center',
  // },
  // cardOptions: {
  //   width: 100,
  //   height: 100,
  //   backgroundColor: Colors.white,
  //   flexDirection: 'column',
  //   justifyContent: "center",
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },


});