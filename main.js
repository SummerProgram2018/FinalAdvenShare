import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import {TabBarBottom, createStackNavigator, TabNavigator, Header} from 'react-navigation';
import Home from "./screens/home";
import Me from "./screens/me";
import Diaries from "./screens/diaries";
import Diary from "./screens/diary";
import Chat from "./screens/chat";
import Plan from "./screens/plan";
import About from "./screens/about";
import Itinerary from "./screens/Itinerary";
import Favourites from "./screens/favourites";
import firebase from 'react-native-firebase';
import EditDiary from "./screens/editDiary";
import Weather from "./screens/weather"
import Accommodation from "./screens/accommodation"
import Tours from "./screens/tours"
import ChangeCity from "./screens/changeCity"
import Transport from "./screens/transport"
import AddTour from "./screens/addTour"
import AddAccommodation from "./screens/addAccommodation"

const LogoutHeader = props => {
  signOutUser = async () => {
      try {
          await firebase.auth().signOut();
      } catch (e) {
          console.log(e);
      }
  }
  return (
    <View style={{width: '100%', backgroundColor: 'white'}}>
      <Header {...props}/>
      <TouchableOpacity
        style={{right: 10, top: 10, position: 'absolute'}}
        onPress={() => this.signOutUser()}
      >
        <Text style={{fontSize:25, color:'rgb(116, 156, 237)'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

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
      screen: About,
      navigationOptions: {
        header: props => <LogoutHeader {...props}/>
      }
    },
    Itinerary: {
      screen: Itinerary
    },
    Favourites: {
      screen: Favourites
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "transparent"
      },
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
    EditDiary: {
      screen: EditDiary
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
    },
    Accommodation: {
      screen: Accommodation,
    },
    Weather: {
      screen: Weather,
    },
    ChangeCity: {
      screen: ChangeCity,
    },
    Transport: {
      screen: Transport,
    },
    Tours: {
      screen: Tours,
    },
    AddTour: {
      screen: AddTour
    },
    AddAccommodation: {
      screen: AddAccommodation
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

var config = {
    apiKey: "AIzaSyCQIFzjQ5RofbMDC490ctjBbstxOCjOvK8",
    authDomain: "advenshare123.firebaseapp.com",
    databaseURL: "https://advenshare123.firebaseio.com/",
    storageBucket: "advenshare123.appspot.com"
};

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {currentUser: null};
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser: currentUser._user.email })
    firebase.initializeApp(config);
  }

  render() {
    return (<RootTab screenProps={this.state.currentUser}/>);
  }
}
