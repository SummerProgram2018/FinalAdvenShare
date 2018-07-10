/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, YellowBox} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, CameraRoll} from 'react-native';
import {TabBarBottom, createStackNavigator, TabNavigator, SwitchNavigator} from 'react-navigation';
import Login from "./screens/login";
import Register from "./screens/register";
import Loading from "./screens/loading";
import Main from "./main";

const LoginTab = createStackNavigator(
  {
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        header: null
      }
    }
  },
  {
     initialRouteName: "Loading",
  }
)

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    console.disableYellowBox = true;
    return (<LoginTab/>);
  }
}
