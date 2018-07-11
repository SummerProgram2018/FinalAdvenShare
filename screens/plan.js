/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, Alert} from 'react-native';
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
      database: firebase.database(),
      buttonLabel: 'Send data',
      uid: firebase.auth().currentUser.uid
    };
     buttonPress = this.buttonPress.bind(this);
     setupNewBlankUserinFirebase = this.setupNewBlankUserinFirebase.bind(this);
     addNewDiaryEntry = this.addNewDiaryEntry.bind(this);
     readBasicInfo = this.readBasicInfo.bind(this);
     readDiaryEntry = this.readDiaryEntry.bind(this);
  }

  setupNewBlankUserinFirebase() {
    this.state.database.ref('users/' + this.state.uid + '/basicInfo/').set({
      firstName: 'Samuel',
      surName: 'Eadie',
      email: 'samueleadie@gmail.com',
      birthDay: 27,
      birthMonth: 4,
      birthYear: 1998,
      homeCountry: 'Australia',
      bio: "I'm a cool dude"
    });
  }

  addNewDiaryEntry(diary, newCaption, newTimeDate, newImages) {
    this.state.database.ref('users/' + this.state.uid + '/diaries/' + diary + '/').push({
      caption: newCaption,
      timeDate: newTimeDate,
      images: newImages
    });
  }

  readBasicInfo() {
    this.state.database.ref('users/' + this.state.uid + '/basicInfo').once('value').then((snapshot) => {
      alert(snapshot.child("bio").val().toString())

      /*snapshot.forEach((child) => {
        alert(child.getKey() + ": " + child.val().toString())
      });
      Object.keys(snapshot).forEach(function (key, index) {
        alert(key.toString() + ": " + index.val().toString())
      });*/
    })
  }

  readDiaryEntry() {
    this.state.database.ref('users/' + this.state.uid + '/diaries').once('value').then((snapshot) => {
      snapshot.forEach((diary) => {
        diary.forEach((diaryEntry) => {
          alert(diaryEntry.child("caption").val().toString())
        });
      });
    })
  }

  buttonPress() {
    /*setupNewBlankUserinFirebase(this.state.uid);
    addNewDiaryEntry("China", "A different yet still nice caption for this diary entry", "2018-07-06T16:35:43.511Z", ["lruegami", "iMaGeUrL2"]);*/
    readBasicInfo();
    /*readDiaryEntry();*/

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
          title = {this.state.buttonLabel}
          color = "#841584"
          onPress={buttonPress}
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
