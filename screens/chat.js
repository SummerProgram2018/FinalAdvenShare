/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, ScrollView, TextInput} from 'react-native';
import firebase from 'react-native-firebase';
import {TabBarBottom, createStackNavigator, TabNavigator, Header} from 'react-navigation';
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
  chatBox: {
    padding: 5,
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'red',
    margin: 10,
    alignItems:'center'
  },
  chatTextView: {
    backgroundColor: 'blue',
    flex: 1
  },
  chatIcon: {
    height: 80,
    width: 80,
    borderRadius: 80/2,
    backgroundColor: 'white',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputTop: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000'
  },
  textInputBottom: {
    flex: 1,
    fontSize: 20,
    color: 'rgb(77, 77, 77)'
  },
  nameLetter: {
    fontSize: 40,
    color: 'rgb(77, 77, 77)'
  }
});
