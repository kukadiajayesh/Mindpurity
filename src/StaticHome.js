/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Alert, View, FlatList,Image } from 'react-native';
import Constants from './Constants';
import Ripple from "react-native-material-ripple";
import Urls from './Urls';

const data = [
  {
    id:"1",
    // icon: require('assets/images/news_icon.png'),
    title: "7 Day, Fully Guided Meditation & Visualization Program"
  },
  {
    id:"2",
    title: "7 Day, Fully Guided Meditation & Visualization Program"
  },
  {
    id:"3",
    title: "7 Day, Fully Guided Meditation & Visualization Program"
  },
  {
    id:"4",
    title: "7 Day, Fully Guided Meditation & Visualization Program"
  }
]

export default class StaticHome extends Component {

  constructor(Props) {
    super(Props);
    this.state = ({
      currentUrl: Urls.BASE_URL
    })
  }


  onPressButton(buttonNo) {
    //Alert.alert("sldkfs",buttonNo)

  }

  onLoadStart = () => {
    this.setState({ loading: true })
  }

  render() {
    //console.log(this.state.currentUrl)
    return (
      <View style={styles.container}>
        <Image
          soruce={require('../assets/images/logo_color.png')}
          style={{ resizeMode: 'contain',flex:1,backgroundColor:'gray'}}
        />
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20, marginTop: 20 }} >WELCOME TO YOUR JOURNEY</Text>
        <FlatList 
          data={data}
          style={{flex:1}}
          keyExtractor={(item)=>item.id}
          renderItem={(item)=>{
            <Ripple onPress={()=>{

            }} >
                <View style={{flexDirection:'row',flex:1,padding:10,marginBottom:10}} >
                <Image 
                    soruce={item.icon}
                    style={{resizeMode: 'contain',height:50,width:50,alignSelf:'center'}}
                    />
                <Text style={styles.textButtonStyle} >{item.title}</Text>
                </View>
            </Ripple>
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? Constants.IOS_DEFAULT_PADDING_TOP : 0
  },
  textButtonStyle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 15
  }
});
