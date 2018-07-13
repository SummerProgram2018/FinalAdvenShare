/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';

export default class AddAccommodation extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        <View style={{width: "100%", margin:10}}>
          <TextInput style={{fontSize: 30, fontWeight: "bold"}} value="Name"/>
          <TextInput style={{fontSize: 30, fontWeight: "bold"}} value="Price"/>
          <TextInput style={{fontSize: 30, fontWeight: "bold"}} value="Location"/>
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
