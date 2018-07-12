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
      storage: firebase.storage(),
      uid: firebase.auth().currentUser.uid,
      buttonLabel: 'Send data'
    };
     buttonPress = this.buttonPress.bind(this);
     setupNewBlankUserinFirebase = this.setupNewBlankUserinFirebase.bind(this);
     addNewDiaryEntry = this.addNewDiaryEntry.bind(this);
     readBasicInfo = this.readBasicInfo.bind(this);
     readDiaryEntry = this.readDiaryEntry.bind(this);
     readDiaryNames = this.readDiaryNames.bind(this);
     addUserContact = this.addUserContact.bind(this);
     sendMessage = this.sendMessage.bind(this);
     addNewObjectToDiaryEntry = this.addNewObjectToDiaryEntry.bind(this);
     getMessages = this.getMessages.bind(this);
  }

  setupNewBlankUserinFirebase() {
    this.state.database.ref('users/' + this.state.uid + '/basicInfo/').set({
      name: 'Samuel Eadie',
      gender: "male",
      email: 'samueleadie@gmail.com',
      dob: "27/04/1998",
      homeCountry: 'Australia',
      bio: "I'm a cool dude"
    });
  }

  addNewObjectToDiaryEntry(diary, date, title, place, text, time, imageURL, alignment) {
      this.state.database.ref('users/' + this.state.uid + '/diaries/' + diary + '/' + date + '/objects').push({
        title: title,
        location: place,
        entry: text,
        timeStamp: time,
        image: imageURL,
        alignment: alignment
    });
  }

  addNewDiaryEntry(diary, title, date) {
    this.state.database.ref('users/' + this.state.uid + '/diaries/' + diary + '/' + date).set({
      title: title,
      date: date,
      objects: []
    });
  }

  addUserContact(userContact) {
    this.state.database.ref('users/' + this.state.uid + '/contacts/' + userContact).set({
      chatID: userContact + this.state.uid
    });
  }

  sendMessage(sendID, receiveID, message, time) {
    this.state.database.ref('users/' + this.state.uid + '/contacts/' + receiveID).once('value').then((snapshot) => {
      var chatID = snapshot.child("chatID").val().toString()

      this.state.database.ref('chats/' + chatID + '/').push({
        senderID: sendID,
        content: message,
        timeStamp: time
      });
    })
  }

  getMessages(userID, contactID) {
    var messageConcat = ""

    this.state.database.ref('users/' + userID + '/contacts/' + contactID).once('value').then((snapshot) => {
      var chatID = snapshot.child("chatID").val().toString()

      this.state.database.ref('chats/' + chatID + '/').orderByChild('timeStamp').once('value').then((snapshot) => {
        snapshot.forEach((message) => {
          /*alert("Message: " + message.child('content').val().toString())*/
          messageConcat = messageConcat + message.child('content').val().toString()
          alert("CONCAT:" + messageConcat)
        });
      })
    })
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

  readDiaryNames() {
    this.state.database.ref('users/' + this.state.uid + '/diaries').once('value').then((snapshot) => {
      snapshot.forEach((diary) => {
        alert((diary.ref.toString().split('/')[6]).toString())
      });
    })
  }

  buttonPress() {
    /*alert("button pressed")
    setupNewBlankUserinFirebase(this.state.uid);
    addNewDiaryEntry("China", "A different yet still nice caption for this diary entry", "2018-07-06T16:35:43.511Z", ["lruegami", "iMaGeUrL2"]);*/
    //readBasicInfo();
    /*readDiaryEntry();*/
    /*addNewDiaryEntry("China", "A different yet still nice caption for this diary entry", "2018-07-06T16:35:43.511Z", ["lruegami", "iMaGeUrL2"]);
    addNewDiaryEntry("Mexico", "Tacos and Coronas", "2014-05-06T16:35:43.511Z", ["imageURL", "imageURL2"]);
    addNewDiaryEntry("Greece", "Ancient shit", "2012-03-01T16:35:43.511Z", ["URLtoImage", "URL to an image"]);
    readDiaryNames();*/
    /*addUserContact("IUAS678fdsOID89");
    sendMessage(this.state.uid, "IUAS678fdsOID89", "Add some more messages", "2018-07-12T01:08:48.56");
    sendMessage(this.state.uid, "IUAS678fdsOID89", "One last message for good luck", "2018-07-12T01:08:49.56");
    addNewDiaryEntry("China", "Day 5: Great Wall", "2018-07-06");
    addNewDiaryEntry("China", "Day 6: Forbidden City", "2018-07-06");
    addNewDiaryEntry("Mexico", "Lazy Sunday", "2014-05-06");
    addNewDiaryEntry("Greece", "Island Day Trip", "2012-03-01");
    addNewObjectToDiaryEntry("China", "2018-07-06", "Bus trip", "Beijing", "Excited to see the wall", "16:45", "imageURL1", "left");
    addNewObjectToDiaryEntry("China", "2018-07-06", "The Wall from afar", "Great Wall of China", "It's so long", "18:45", "imageURL2", "middle");
    addNewObjectToDiaryEntry("China", "2018-07-06", "The Wall", "Great Wall of China", "I'm on the wall", "20:45", "imageURL3", "right");
    addNewObjectToDiaryEntry("China", "2018-07-07", "Off to the forbidden city", "Beijing", "Excited to see the forbidden city", "9:45", "imageURL21", "left");
    addNewObjectToDiaryEntry("China", "2018-07-07", "Entry line", "The Forbidden City", "The entry line is so long!", "9:49", "imageURL22", "left");
    addNewObjectToDiaryEntry("China", "2018-07-07", "The Forbidden City", "The Forbidden City", "Its so pretty", "10:51", "imageURL23", "left");*/
    sendMessage(this.state.uid, "IUAS678fdsOID89", "Message timestamped first but added last to check read sorting", "2018-07-11T01:08:48.56");
    getMessages(this.state.uid, "IUAS678fdsOID89");


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
