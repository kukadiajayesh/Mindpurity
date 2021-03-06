/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, Alert, View, ActivityIndicator, AsyncStorage
} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Constants from './Constants';
import Ripple from "react-native-material-ripple";
import HeaderWebView from "./HeaderWebView";
import Urls from './Urls';
import StaticHome from './StaticHome';
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {

  constructor(Props) {
    super(Props);
    this.state = ({
      selectedButton: "1",
      currentUrl: Urls.BASE_URL,
      loading: false,
      isUserLogin: false,
      buttonText1: Constants.BUTTON_TEXT_1,
      buttonText2: Constants.BUTTON_TEXT_2,
      buttonText3: Constants.BUTTON_TEXT_3,
      responseCounter: 1,
      homeClicked: false,
    })

    this.checkingUserLogin()
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  checkingUserLogin = async () => {
    try {

      const isUserLogin = await AsyncStorage.getItem(Constants.PARAM_IS_USER_LOGIN)
      if (isUserLogin != null) {
        // console.log("result: "+isUserLogin);
        if (isUserLogin === 'true') {
          this.setState({
            isUserLogin: true,
            buttonText1: Constants.BUTTON_TEXT_1_LOGIN,
            buttonText2: Constants.BUTTON_TEXT_2_LOGIN,
            buttonText3: Constants.BUTTON_TEXT_3_LOGIN,
          })
        }
      }
    } catch (err) {
      console.log(err);
    }

  }

  onPressButton(buttonNo) {
    //Alert.alert("sldkfs",buttonNo)

    var url = "";

    if (buttonNo === "1") {
      url = Urls.BASE_URL

    } else if (buttonNo === "2") {
      url = Urls.LOGIN_URL
      if (this.state.isUserLogin) {
        url = Urls.MY_ACCOUNT_URL_LOGIN
      }
    } else if (buttonNo === "3") {
      url = Urls.MY_ACCOUNT_URL
      if (this.state.isUserLogin) {
        url = Urls.LOGOUT_URL
      }
    }

    this.setState({
      selectedButton: buttonNo,
      currentUrl: url,
      homeClicked: false,
    })

  }

  onLoadStart = () => {
    this.setState({ loading: true })  
  }

  onLoadEnd = (id) => {
    console.log(id.nativeEvent.url);
    this.setState({ loading: false })
  }

  onLoginUpdate = (isLogin) => {

    if (this.state.responseCounter === 1) {
      if (isLogin === 'true') {
        this.changeUserLogin()
      }
      if (isLogin === 'false') {
        this.changeUserLogout()
      }
      this.setState({ responseCounter: this.state.responseCounter + 1 })
    } else {

      if (isLogin === 'true' && !this.state.isUserLogin) {
        this.changeUserLogin()
      }

      if (isLogin === 'false' && this.state.isUserLogin) {
        this.changeUserLogout()
      }
    }
  }

  changeUserLogin = async () => {
    try {
      await AsyncStorage.setItem(Constants.PARAM_IS_USER_LOGIN, "true")
      this.setState({
        isUserLogin: true,
        buttonText1: Constants.BUTTON_TEXT_1_LOGIN,
        buttonText2: Constants.BUTTON_TEXT_2_LOGIN,
        buttonText3: Constants.BUTTON_TEXT_3_LOGIN,
      })
    } catch (error) {
      console.log(error);
    }
  }

  changeUserLogout = async () => {
    try {
      await AsyncStorage.setItem(Constants.PARAM_IS_USER_LOGIN, "false")
      this.setState({
        isUserLogin: false,
        buttonText1: Constants.BUTTON_TEXT_1,
        buttonText2: Constants.BUTTON_TEXT_2,
        buttonText3: Constants.BUTTON_TEXT_3,
      })
    } catch (error) {
      console.log(error);
    }
  }

  onHomeClicked = (value) => {
    setTimeout(() => {
      this.setState({
        homeClicked: value
      })
    }, Constants.DEFAULT_TOUCH_DELAY);
  }


  onSwipeLeft(gestureState) {
    //this.setState({ myText: 'You swiped right!' });
    //console.log(gestureState)
    //Alert.alert("", "onSwipeRight")
    this.setState({
      homeClicked: true,
      currentUrl: Urls.HOME_URL
    })
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    //console.log(this.state)
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignSelf: 'stretch' }} >
          {this.state.selectedButton === "1" && !this.state.homeClicked && (
            <GestureRecognizer
              onSwipeLeft={(state) => this.onSwipeLeft(state)}
              config={config}
              style={{
                flex: 1
              }}
            >
              <StaticHome
                onHomeClicked={this.onHomeClicked}
              />
            </GestureRecognizer>
          )}

          {((this.state.selectedButton !== "1") || (this.state.selectedButton === "1" && this.state.homeClicked)) && (
            <HeaderWebView
              url={this.state.currentUrl}
              onLoadEnd={this.onLoadEnd}
              onLoadStart={this.onLoadStart}
              onLoginUpdate={this.onLoginUpdate}
            />
          )}
          {((this.state.loading && this.state.selectedButton === "1" && this.state.homeClicked) ||
            (this.state.loading && this.state.selectedButton !== "1" && !this.state.homeClicked)) && (
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', backgroundColor: Constants.DEFAULT_COLOR }} >
                <ActivityIndicator color="white" size="large" />
              </View>
            )}
        </View>
        <View style={{ backgroundColor: Constants.DEFAULT_COLOR_SEPERATOR, height: 1, alignSelf: 'stretch' }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch' }} >
          <Ripple onPress={this.onPressButton.bind(this, "1")}
            style={[styles.buttonStyle, this.state.selectedButton == 1 && styles.buttonStyleSelected]} >
            <Text style={styles.textButtonStyle} >{this.state.buttonText1}</Text>
          </Ripple >
          <View style={{ backgroundColor: Constants.DEFAULT_COLOR_SEPERATOR, width: 1 }} />
          <Ripple onPress={this.onPressButton.bind(this, "2")}
            style={[styles.buttonStyle, this.state.selectedButton == 2 && styles.buttonStyleSelected]} >
            <Text style={styles.textButtonStyle} >{this.state.buttonText2}</Text>
          </Ripple>
          <View style={{ backgroundColor: Constants.DEFAULT_COLOR_SEPERATOR, width: 1 }} />
          <Ripple onPress={this.onPressButton.bind(this, "3")}
            style={[styles.buttonStyle, this.state.selectedButton == 3 && styles.buttonStyleSelected]} >
            <Text style={styles.textButtonStyle} >{this.state.buttonText3}</Text>
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
  }, buttonStyle: {
    height: 50,
    backgroundColor: Constants.DEFAULT_COLOR,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, buttonStyleSelected: {
    backgroundColor: Constants.DEFAULT_COLOR_SELECTED,
  }, textButtonStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  }
});
