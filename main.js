import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, CameraRoll} from 'react-native';
import {TabBarBottom, createStackNavigator, TabNavigator} from 'react-navigation';
import Home from "./screens/home";
import Me from "./screens/me";
import Diaries from "./screens/diaries";
import Diary from "./screens/diary";
import Chat from "./screens/chat";
import Plan from "./screens/plan";
import ImageBrowser from "./screens/imageBrowser";
import About from "./screens/about";
import Itinerary from "./screens/Itinerary";
import Favourites from "./screens/favourites";
import firebase from 'react-native-firebase';
import DiaryEntry from "./screens/editDiary";

const HomeTab = createStackNavigator(
  {
    HomeTab: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    }
  }
)

const MeTab = createStackNavigator(
  {
    MeTab: {
      screen: Me,
      navigationOptions: {
        header: null
      }
    },
    About: {
      screen: About
    },
    Itinerary: {
      screen: Itinerary
    },
    Favourites: {
      screen: Favourites
    }
  }
)

const DiaryTab = createStackNavigator(
  {
    DiariesTab: {
      screen: Diaries,
      navigationOptions: {
        header: null
      }
    },
    Diary: {
      screen: Diary
    },
    DiaryEntry: {
      screen: DiaryEntry
    },
    ImageBrowser: {
      screen: ImageBrowser
    },
  },
  {
    initialRouteName: "DiariesTab",
  }
)

const ChatTab = createStackNavigator(
  {
    ChatTab: {
      screen: Chat,
      navigationOptions: {
        header: null
      }
    }
  }
)

const PlanTab = createStackNavigator(
  {
    PlanTab: {
      screen: Plan,
      navigationOptions: {
        header: null
      }
    }
  }
)

const RootTab = TabNavigator (
  {
    Discover: HomeTab,
    Plan: PlanTab,
    Diary: DiaryTab,
    Chat: ChatTab,
    Me: MeTab,
  },
  {
    initialRouteName: "Discover",
    navigationOptions: ({ navigation }) => {
      const { routeName, routes } = navigation.state;
      let params = routes && routes[1] && routes[1].params;
      switch(routeName) {
        case "Discover":
          var icon = require('./res/icons/Discover.png')
          break;
        case "Plan":
          var icon =require('./res/icons/Plan.png')
          break;
        case "Diary":
          var icon = require('./res/icons/Diary.png')
          break;
        case "Chat":
          var icon =require('./res/icons/Chat.png')
          break;
        case "Me":
          var icon = require('./res/icons/Me.png')
      }
      return {
        tabBarIcon: ({ focused, tintColor }) => {
          return (  <Image
                      style={{width: '100%',
                              height: 30,
                              tintColor: tintColor}}
                      source={icon}
                      resizeMode="contain"
                    /> )
        },
        tabBarVisible:
          params && params.hideTabBar != null ? !params.hideTabBar : true,
        swipeEnabled:
          params && params.hideTabBar != null ? !params.hideTabBar : true
      };
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true
  }
)

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {currentUser: null};
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser: currentUser._user.email })
  }

  render() {
    return (<RootTab screenProps={this.state.currentUser}/>);
  }
}
