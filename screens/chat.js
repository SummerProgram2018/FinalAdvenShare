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


export class ChatBox extends Component {
  render() {
    return (
      <View style={styles.chatBox}>
        <View style={styles.chatIcon}>
          <Text style={styles.nameLetter}>
            C
          </Text>
        </View>
        <View style={styles.chatTextView}>
          <TextInput editable={false} value="Top" style={styles.textInputTop}/>
          <TextInput editable={false} value="Bottom" style={styles.textInputBottom}/>
        </View>
      </View>
    )
  }
}

const FriendsTab = createStackNavigator(
  {
    Friends: {
      screen: ChatFriends,
      navigationOptions: {
        header: null
      }
    }
  }
)

const DiscoverTab = createStackNavigator(
  {
    Discover: {
      screen: ChatDiscover,
      navigationOptions: {
        header: null
      }
    }
  }
)


const ChatNav = TabNavigator(
    {
      Chat: FriendsTab,
      Discover: DiscoverTab,
    },
    {
      initialRouteName: "Chat",
      tabBarPosition: 'top'
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
