/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button} from 'react-native';
import firebase from 'react-native-firebase';


var config = {
    apiKey: "AIzaSyCQIFzjQ5RofbMDC490ctjBbstxOCjOvK8",
    authDomain: "advenshare123.firebaseapp.com",
    databaseURL: "https://advenshare123.firebaseio.com/",
    storageBucket: "advenshare123.appspot.com"
};


export default class Plan extends Component {
  constructor (props, context) {
    super (props, context);
    firebase.initializeApp(config);
    this.state = {
      database: firebase.database()
    };
     onPressSetupUId = this.onPressSetupUId.bind(this)
  }

  onPressSetupUId(uid) {
    this.state.database.ref('users/').child(uid + '/').child('basicInfo/').set({
      firstName: '',
      surName: '',
      email: '',
      birthDay: 27,
      birthMonth: 1,
      birthYear: 2000,
      homeCountry: '',
      bio: 'Tell people a little about yourself...'
    });
    this.state.database.ref('users/').child(uid + '/').child('diaries/').set({
      China: ['gssgdf', 'gfdsgdsf']
    });
  }

    /*
    {
      "users": {
        "4x1V73rKHgXqaFCc8VXNrO30NJG2": { //UserID
            "basicInfo": {
              "firstName": "Sam",
              "surName": "Eadie",
              "email": "sameadie@gmail.com",
              "birthDay": 27,
              "birthMonth": 4,
              "birthYear": 1998,
              "homeCountry": "Australia",
              "bio": "Tell people a little about yourself..."
              ... //More basic user information
            },
            "diaries": {
              "China": [
                {
                  "caption": "On the train home after a day in Shenyang",
                  "timeDate": "2018-07-06T16:35:43.511Z",
                  "images": ["imageURL1", "imageURL2", ...]
                }, {
                  "caption": "Today we went to the shell museum",
                  "timeDate": "2018-06-28T08:22:12.88Z",
                  "images": ["iMaGeUrL", "iMaGeUrL2", ...],
                }, {
                  ... //More diary entries
                }
              ],
              "Uluru": {
                ... //Diary entries for Uluru
              },
              ... //More diaries
            },
        },
        ... //More users
      },

    //If implementing basic info over server
      "places": {
        "DNUI": {
          "name": "Dalian Neusoft University of Information",
          "basicInfo": {
            "longitude": 42.6,
            "latitude": 225.334,
            "country": 'China',
            "city": 'Dalian',
            "temperature": 28,
            "weather": 'cloudy'
            ...
          }
        },
        "Shell Museum": {
          "name": "Dalian Shell Museum",
          "basicInfo": {
            ...
          }
          ...
        }
        ...
      }
    }
    */


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        </View>
        <Text>Plan</Text>
        <Button
          title = "Send Data"
          color = "#841584"
          onPress={onPressSetupUId('gh435n43kj543543n6432vh')}
          />
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
