/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Linking, TextInput, Button} from 'react-native';


export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.navigation.state.params.city
    }
    searchWeather = this.searchWeather.bind(this);
  }

  openUrl(idString) {
    url = "http://m.weather.com.cn/mweather/" + idString + ".shtml";
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
  }

  searchWeather() {
    switch(this.state.city) {
      case "北京":
        this.openUrl("101010100");
        break;
      case "上海":
        this.openUrl("101020100");
        break;
      case "天津":
        this.openUrl("101030100");
        break;
      case "沈阳":
        this.openUrl("101070101");
        break;
      case "Dalian":
        this.openUrl("101070201");
        break;
      default:
        alert("Invalid city name")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          <TextInput value={this.state.city} onChangeText={(text) => this.setState({city: text})}/>
          <Button title="Lookup Weather" onPress={() => searchWeather()}/>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundImage:{
    backgroundColor: 'transparent',
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  list: {
       justifyContent: 'center',
       flexWrap: 'wrap',
       flex:1,
       flexDirection: 'row',
       height: 100,
   },
});
