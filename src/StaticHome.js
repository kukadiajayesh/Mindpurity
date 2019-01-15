/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Alert, View, ScrollView, FlatList, Image, Button, Dimensions } from 'react-native';
import Constants from './Constants';
import Ripple from "react-native-material-ripple";
import Urls from './Urls';

export default class StaticHome extends Component {

  constructor(Props) {
    super(Props);

    var data = [
      {
        id: "1",
        icon: require('../assets/images/lotus_flower.png'),
        title: "7 Day, Fully Guided Meditation & Visualization Program"
      },
      {
        id: "2",
        icon: require('../assets/images/sleep2.png'),
        title: "Completely Control Anxiety, Depression, Anger, Fear"
      },
      {
        id: "3",
        icon: require('../assets/images/video_content.png'),
        title: "Sleep Better, Relax More & Calm Your Mind"
      },
      {
        id: "4",
        icon: require('../assets/images/anxiety.png'),
        title: "100+ Tibetan Mindfulness, Relaxation & Nature Audio"
      },
      {
        id: "5",
        icon: require('../assets/images/audio.png'),
        title: "Frequency and Binaural Therapy Audio"
      },
      {
        id: "6",
        icon: require('../assets/images/body.png'),
        title: "Yoga and Body Videos"
      }
    ]

    this.state = ({
      currentUrl: Urls.BASE_URL,
      data: data
    })
  }


  onPressButton(buttonNo) {
    //Alert.alert("sldkfs",buttonNo)

  }

  onLoadStart = () => {
    this.setState({ loading: true })
  }

  render() {
    const { width, height } = Dimensions.get('screen')

    //console.log(this.state.currentUrl)
    return (
      <ScrollView >
        <View style={styles.container}>
          <Image
            source={require('../assets/images/logo_color.png')}
            style={{ resizeMode: 'contain', height: 55, marginTop: 25, alignSelf: 'center' }}
          />
          <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 20, marginTop: 30, textAlign: 'center', color: Constants.DEFAULT_COLOR }} >WELCOME TO YOUR JOURNEY</Text>

          <RowItem
            item={this.state.data[0]}
          />
          <RowItem
            item={this.state.data[1]}
          />
          <RowItem
            item={this.state.data[2]}
          />
          <RowItem
            item={this.state.data[3]}
          />
          <RowItem
            item={this.state.data[4]}
          />
          <RowItem
            item={this.state.data[5]}
          />

          <View style={styles.clickButtonContainer}>
            <Image
              style={{
                alignSelf: 'center',
                width: 300,
                height: 65,
                resizeMode: 'stretch'
              }}
              source={require('../assets/images/left_arrow.png')}
            />
            <Text style={{ alignSelf:'center',position: 'absolute', color: 'white', fontSize: 12, fontWeight: 'bold' }} >SWIPE TO TRY MINDPURITY FOR FREE</Text>
            {/* <Text style={{ top: 35, position: 'absolute', color: 'white', margin:0,left: 20, fontSize: 13, fontWeight: 'bold' }} >SWIPE TO TRY MINDPURITY FOR FREE</Text> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

class RowItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Ripple onPress={() => { }} >
        <View style={{ flexDirection: 'row', padding: 5, }} >
          <Image
            source={this.props.item.icon}
            style={{ marginLeft: 15, resizeMode: 'contain', height: 30, width: 30 }}
          />
          <Text style={styles.textButtonStyle} >{this.props.item.title}</Text>
        </View>
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textButtonStyle: {
    color: '#333',
    flex: 1,
    paddingLeft: 15,
    fontSize: 13,
    alignSelf: 'center'
  }, clickButtonContainer: {
    marginTop:10,
    justifyContent:'center'
  }
});
