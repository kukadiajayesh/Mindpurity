/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Alert, View, TouchableHighlight} from 'react-native';
import Constants from './Constants';
import Ripple from "react-native-material-ripple";
import HeaderWebView from "./HeaderWebView";
import Urls from './Urls';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  constructor(Props){
    super(Props);
    this.state=({
      selectedButton:1,

    })
  }

  onPressButton(buttonNo){
    //Alert.alert("sldkfs",buttonNo)
    this.setState({selectedButton:buttonNo})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1,alignSelf:'stretch'}} >        
        <HeaderWebView
          url={Urls.BASE_URL}
         />
        </View>
        <View style={{ flexDirection:'row',justifyContent:'space-around',alignSelf:'stretch'}} >
          <Ripple  onPress={this.onPressButton.bind(this,"1")} 
          style={[styles.buttonStyle, this.state.selectedButton == 1 && styles.buttonStyleSelected]} >
              <Text style={styles.textButtonStyle} >LEARN MORE</Text>
          </Ripple >
          <View style={{backgroundColor:Constants.DEFAULT_COLOR_SEPERATOR,width:1}} />
          <Ripple onPress={this.onPressButton.bind(this,"2")}  
          style={[styles.buttonStyle, this.state.selectedButton == 2 && styles.buttonStyleSelected]} >
              <Text style={styles.textButtonStyle}>LOGIN</Text>
          </Ripple>
          <View style={{backgroundColor:Constants.DEFAULT_COLOR_SEPERATOR,width:1}} />
          <Ripple onPress={this.onPressButton.bind(this,"3")}  
          style={[styles.buttonStyle, this.state.selectedButton == 3 && styles.buttonStyleSelected]} >
              <Text style={styles.textButtonStyle}>SIGN UP</Text>
          </Ripple>
        </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },buttonStyle:{
    height:45,
    backgroundColor: Constants.DEFAULT_COLOR,
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },buttonStyleSelected:{
    backgroundColor: Constants.DEFAULT_COLOR_SELECTED,  
  },textButtonStyle:{    
    color:'white',
    fontWeight:'bold',
    fontSize:12
  }
});
