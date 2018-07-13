/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, Linking} from 'react-native';

export default class Accomodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: []
    }
    pressSearch = this.pressSearch.bind(this)
  }

  pressSearch() {
    var url = "http://www.ctrip.com/"
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        <Button title="Add Accomodation" onPress={() => this.props.navigation.navigate('AddAccommodation')}/>
        <Button title="Find More" onPress={() => pressSearch()}/>
        <Text>Tours</Text>
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
