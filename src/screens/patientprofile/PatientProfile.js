import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, ImageBackground, Platform , 
    TouchableOpacity, ActivityIndicator, AsyncStorage} from 'react-native';
import { Input, SearchBar, Button, Text, Icon, 
    SocialIcon, Card, Avatar,Tile, Header } from 'react-native-elements';
import { NavigationEvents } from "react-navigation";
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../../commons/Colors";
import Constants from "../../commons/Constants";
import axios, {setApiToken} from '../../services/axios';


export default class PatientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
       isLoading: false,
       isLoadData: false,
       //data profile

    };
   
  }

  async componentDidMount() {


  }

  loadDataProfile = async () => {
   let token = await AsyncStorage.getItem(Constants.KEY_STORE_TOKEN);
   let getProfile = await AsyncStorage.getItem(Constants.KEY_STORE_USER_PFOFILE);
   let userProfile = JSON.parse(getProfile);
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
    let response = await axios.get(url, config);
    this.setState({isLoading: false});
    console.log("PatientProfile response " + JSON.stringify(response.data) + " url: " + url )

  }

  onPressBackScreen() {
      alert("back...")
  }

  onPressBtn() {
    alert("onPress...")
  }

  onDidFocus() {
    if(!this.state.isLoadData) {
        this.setState({isLoadData: true, isLoading: true })
        this.loadDataProfile();
    }
  }

  render() {
      if(this.state.isLoading) {
        return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
            <ActivityIndicator size="large"/>
        </View>
          );
      } else {
    return (
        <View style={styles.container}>
            <NavigationEvents
                onDidFocus={payload => {
                    this.onDidFocus();
                }}
               
            />
            <View style={styles.layoutTop}>
            <ImageBackground source={require("../../../assets/bg_profile.jpg")} style={styles.layoutTop}>   
                <View style={styles.wrapHeader}>
                    <FontAwesome
                        name='chevron-left'
                        color={Colors.white}
                        size={25}
                        onPress={() => this.onPressBackScreen()}
                    />  
                    <Text style={{flex: 1,color:Colors.white, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "center", 
                    fontSize: 20, fontWeight: "bold"}}>Current Patient</Text>     
                </View>
                <View style = {styles.wrapTopIcon}>
                    <Avatar
                        size={100}
                        rounded
                        activeOpacity={0.7}
                        source={{
                            uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }}
                    />
                    <View style = {styles.wrapTopName}>
                        <Text style={styles.txtName}>Nguyễn Văn Tiến</Text>
                        <Text style ={{color: Colors.gray_white, paddingLeft: 10}}>Developer</Text>
                    </View>
                </View>

                <View style={styles.wrapDesInfo}>
                    <View style={{flexDirection: "column", marginRight: 20}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textTitleInfo}>Gender : </Text>
                            <Text style={styles.textInfo}>Male : </Text>
                        </View>
                        <View style={{flexDirection: "row", marginTop: 5}}>
                            <Text style={styles.textTitleInfo}>Mob : </Text>
                            <Text style={styles.textInfo}>0963 002 860</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "column", marginLeft: 20}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.textTitleInfo}>Age : </Text>
                            <Text style={styles.textInfo}>28 Years</Text>
                        </View>
                        <View style={{flexDirection: "row", marginTop: 5}}>
                            <Text style={styles.textTitleInfo}>Type : </Text>
                            <Text style={styles.textInfo}>Old Patient</Text>
                        </View>
                    </View>
                </View>
                </ImageBackground>
            </View>
           
            <View style={styles.layoutOptions}>
                <Card containerStyle={styles.layout_card} wrapperStyle = {styles.viewCard}>
                    <View style={styles.viewCard}>
                            <Text style={{flex: 1, flexDirection: "column", alignItems: "center", textAlign: "center"}}>Precribe</Text>
                            <Text style={{flex: 1, flexDirection: "column", alignItems: "center", textAlign: "center"}}>Investigation</Text>
                            <Text style={{flex: 1, flexDirection: "column", alignItems: "center", textAlign: "center"}}>Diet plan</Text>
                    </View>
                </Card>
                <View style={styles.wrapButtonMenu}>
                    <TouchableOpacity onPress={() => this.onPressBackScreen()}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions} >
                        <FontAwesome
                            name="user"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Chief\nComplaints`}</Text>
                    </Card>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onPressBackScreen()}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="info-circle"
                            color='blue'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Health\nInfomation`}</Text>
                    </Card>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onPressBackScreen()}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="heartbeat"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Medication`}</Text>
                    </Card>  
                    </TouchableOpacity>  
                </View>   
                <View style={[styles.wrapButtonMenu]}>
                    <TouchableOpacity onPress={() => this.onPressBackScreen()}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="flask"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Lab Result`}</Text>
                    </Card>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onPressBackScreen()}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="medkit"
                            color='blue'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Diseases`}</Text>  
                    </Card>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onPressBackScreen()}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="user"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Family\nDiseases`}</Text>
                    </Card>    
                    </TouchableOpacity>
                </View> 
            </View>
            
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
  layoutTop:{
    flex: 1,
    backgroundColor: Colors.blue,
    width: "100%",
    flexDirection: 'column',
  },
  wrapHeader:{
    position: "absolute", 
    top: 0,
    width: "100%",
    flexDirection: 'row',
    paddingTop: 10
  },
  wrapTopIcon:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 30,
    paddingBottom: 5,
    flex: 1.5,
  },
  wrapTopName:{
    flexDirection: 'column',
    paddingLeft: 10,
    
  },
  txtName:{
    paddingLeft: 10, 
    fontSize: 25, 
    color: Colors.white,
    fontWeight: 'bold',
  },
  wrapDesInfo:{
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  textTitleInfo: {
    color: Colors.gray_white
},
  textInfo: {
      fontWeight: "bold",
      color: Colors.white
  },
  
  layout_card: {
    alignSelf: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: "-10%"
    
 },
 viewCard:{
    flexDirection: 'row',
    width: "100%",
 },

 layoutOptions:{
    flex: 1,
    width: "100%",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Colors.gray_white
 },
 wrapButtonMenu:{
    flexDirection: 'row',
    width: "100%",
    paddingTop: 15,
    justifyContent: "center",
    alignItems: 'center',
 },
 cardOptions: {
    width: 100,
    height: 100,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 5,
 },
 

});