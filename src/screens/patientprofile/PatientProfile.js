import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Input, SearchBar, Button, Text, Icon, 
    SocialIcon, Card, Avatar,Tile, Overlay } from 'react-native-elements';

import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../../commons/Colors"


export default class PatientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
       
    };
   
  }

  async componentDidMount() {


  }

  

  render() {
  
    return (
        <View style={styles.container}>
            <View style={styles.layoutTop}>
            <ImageBackground source={require("../../../assets/bg_profile.jpg")} style={styles.layoutTop}>          
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
                            <Text style={{flex: 1, flexDirection: "column", alignItems: "center",textAlign: "center"}}>Precribe</Text>
                            <Text style={{flex: 1, flexDirection: "column", alignItems: "center", textAlign: "center"}}>Investigation</Text>
                            <Text style={{flex: 1, flexDirection: "column", alignItems: "center", textAlign: "center"}}>Diet plan</Text>
                    </View>
                </Card>
                <View style={styles.wrapButtonMenu}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="user"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Chief\nComplaints`}</Text>
                    </Card>
                       
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="info-circle"
                            color='blue'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Health\nInfomation`}</Text>
                    </Card>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="heartbeat"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Medication`}</Text>
                    </Card>    
                </View>   
                <View style={[styles.wrapButtonMenu, {marginTop: 10}]}>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="flask"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Lab Result`}</Text>
                    </Card>
                        
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="medkit"
                            color='blue'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Diseases`}</Text>  
                    </Card>
                    <Card containerStyle={styles.cardOptions} wrapperStyle = {styles.cardOptions}>
                        <FontAwesome
                            name="user"
                            color='green'
                            size={24}
                        />
                        <Text style={{color: Colors.black, textAlign: "center"}}>{`Family\nDiseases`}</Text>
                    </Card>    
                </View> 
            </View>
            
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
    width: "100%",
    position: "relative"
    
  },
  layoutTop:{
    flex: 1,
    backgroundColor: Colors.blue,
    width: "100%",
    flexDirection: 'column',
  },
  wrapTopIcon:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 30,
    paddingBottom: 10,
    flex: 1,
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
    marginTop: "-15%"
    
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