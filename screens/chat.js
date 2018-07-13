/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 *
 * yarn add ract-native-gifted-chat
 * added android:windowSoftInputMode="adjustResize" to android manifest
 *
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, ScrollView, TextInput} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation'
import firebase from 'react-native-firebase';
import ChatFriends from './chatFriends'
import ChatDiscover from './chatDiscover'
import ChatDialog from './chatDialog'


const ChatNav = createStackNavigator(
    {
      ChatFriends: {
        screen: ChatFriends,
        navigationOptions: {
          header: null
        }
      },
      ChatDiscover: {
        screen: ChatDiscover,
        navigationOptions: {
          header: null
        }
      },
      ChatDialog: {
        screen: ChatDialog,
      }
    },
    {
      initialRouteName: "ChatFriends",
    }
)

export default class Chat extends Component {
  render() {
    return (
      <ChatNav/>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
});
