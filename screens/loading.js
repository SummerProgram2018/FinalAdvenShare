/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import firebase from 'react-native-firebase';

export default class Loading extends Component<Props> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Register')
    })
  }
  
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.list}>
            <Image style={styles.backgroundImage} source={require('../res/Loading.png')}/>
            <Text>Loading</Text>
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
    resizeMode: 'stretch',
    flex: 1,
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
       alignItems: 'stretch',
   },
});