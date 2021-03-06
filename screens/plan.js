/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Linking} from 'react-native';

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
      buttonLabel: 'Send data',
      city: "Dalian"
    };
     buttonPress = this.buttonPress.bind(this);
     buttonPressLocation = this.buttonPressLocation.bind(this);
     displayCurrentCity = this.displayCurrentCity.bind(this);
     setupNewBlankUserinFirebase = this.setupNewBlankUserinFirebase.bind(this);
     addNewDiaryEntry = this.addNewDiaryEntry.bind(this);
     readBasicInfo = this.readBasicInfo.bind(this);
     readDiaryEntry = this.readDiaryEntry.bind(this);
     readDiaryNames = this.readDiaryNames.bind(this);
     addUserContact = this.addUserContact.bind(this);
     sendMessage = this.sendMessage.bind(this);
     addNewObjectToDiaryEntry = this.addNewObjectToDiaryEntry.bind(this);
     getMessages = this.getMessages.bind(this);

     onPressTours = this.onPressTours.bind(this);
     onPressWeather = this.onPressWeather.bind(this);
     onPressCurrency = this.onPressCurrency.bind(this);
     onPressTransport = this.onPressTransport.bind(this);
     onPressChangeCity = this.onPressChangeCity.bind(this);
     onPressAccommodation = this.onPressAccommodation.bind(this);

     changeCity = this.changeCity.bind(this);

     uploadImageToFirebase = this.uploadImageToFirebase.bind(this);
     downloadImageFromFirebase = this.downloadImageFromFirebase.bind(this);
     getDiaryObjects = this.getDiaryObjects.bind(this);
  }


  changeCity(text) {
    this.setState({city: text})
  }

  /*
    uploadImageToFirebase(file, filename) {

      // Create the file metadata
      var metadata = {
        contentType: 'image/jpeg'
      };

      var storageRef = firebase.storage().ref();

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('images/' + filename).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              alert("Image upload paused")
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              alert("Image upload running")
              break;
          }
        }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            alert("Unauthorized image upload attempted")
            break;

          case 'storage/canceled':
            alert("User cancelled the upload")
            break;

          case 'storage/unknown':
            alert("Unknown error occured")
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          alert('File available at', downloadURL);
        });
      });
    }*/


  /*uploadImageToFirebase() {
    const Blob = RNFetchBlob.polyfill.blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    showImagePicker((response) => {
      if(!response.didCancel) {
        var mime = 'application/octet-stream'
        return (dispatch) => {
          return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : uri
            const sessionId = new Date().getTime()
            let uploadBlob = null
            const imageRef = this.storageRef.child("pleasefuckingupload")
            fs.readFile(uploadUri, 'base64').then((data) => {
              return Blob.build(data, {type: '${mime};BASE64' })
            }).then((blob) => {
              uploadBlob = blob
              return imageRef.put(blob, { contentType: mime })
            }).then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
            }).then((url) => {
              resolve(url)
              storeReference(url, sessionId)
            }).catch((error) => {
              reject(error)
            })
          })
        }
      }
    })
  }*/

  uploadImageToFirebase() {
    this.state.database.ref('users/' + this.state.uid + '/contacts').once('value').then((snapshot) => {
      snapshot.forEach((contact) => { //Iterate through each user's contacts
        var contactID = (contact.ref.toString().split('/')[6]).toString();
        this.state.database.ref('users/' + contactID).once('value').then((snapshot) => {
          alert(snapshot.child('basicInfo/name').val().toString()) //Get the contact's name
          var chatId = snapshot.child('contacts/' + this.state.uid + '/chatID').val().toString();
          alert(chatId) //And their chat IDs
          this.state.database.ref('chats/' + chatId + '/').once('value').then((snapshot) => {
            snapshot.forEach((messageID) => {
              alert('chats/' + chatId + '/' + messageID.val().toString())
              /*this.state.database.ref('chats/' + chatId + '/' + messageID.val().toString()).once('value').then((message) => {*/
                alert(messageID.child('senderID').val().toString() + ': '
                + messageID.child('timeStamp').val().toString() + ': '
                + messageID.child('content').val().toString())
              /*})*/
            })
          })
        });

        this.state.database.ref('chats/')

      });
    })
  }

  downloadImageFromFirebase() {

  }
    /*uploadImageToFirebase() {
      var f2 = new File("../res/AdvenShare.png");
      var file = Uri.fromFile(new File("../res/AdvenShare.png"));
      var reference = this.state.storageRef.child("images/");
      uploadTask = reference.putFile(file);
    }*/
  /*
    downloadImageFromFirebase() {
      this.state.storageRef.child("Dalian Book.JPG").getDownloadURL().then(function(url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        // Or inserted into an <img> element:
        var img = document.getElementById('myimg');
        alert('1')
        img.src = url;
        alert("1")
        uploadImageToFirebase(blob, "reuploadedpleasework.jpg")
        alert("2")
      }).catch(function(error) {
        // Handle any errors
      });
      this.setState({photo: require('../res/meavatar.png')});
    }*/


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

  getDiaryObjects(diary, date) {
    alert('HERE');
    alert('users/' + this.state.uid + '/diaries/' + diary + '/' + date);
    this.state.database.ref('users/' + this.state.uid + '/diaries/' + diary + '/' + date).once('value').then((snapshot) => {
      snapshot.child('objects').forEach((object) => {
        alert(object.child('entry').val().toString())
      })
    })
  }

  /*componentDidMount() {
    // Do some shit to get the entries from firebase using
    var diary = this.props.navigation.state.params.diary.toString();
      this.state.database.ref('users/' + this.state.uid + '/diaries/' + diary).once('value').then((snapshot) => {
        snapshot.forEach((date) => {
          date.child('objects').forEach((object) => {
            var entries = this.state.entries;

            var day = (date.child('date').val().toString().split('-'))[2]
            var month = (date.child('date').val().toString().split('-'))[1]
            var year = (date.child('date').val().toString().split('-'))[0]

            var entry = {
              entry: object.child('entry').val().toString(),
              alignment: object.child('alignment').val().toString(),
              image: object.child('image').val().toString(),
              location: object.child('location').val().toString(),
              timeStamp: object.child('timeStamp').val().toString(),
              title: object.child('title').val().toString(),
              day: day,
              month: month,
              year: year

            }

            entries.push(entry)
            this.setState({entries: entries})

          })
        })
      })

    alert(JSON.stringify(this.state.entries))

    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({currentDate: {day: day, month: month, year: year}})
  } */

  addNewDiaryEntry(diary, title, date) {
    this.state.database.ref('users/' + this.state.uid + '/diaries/' + diary + '/' + date).set({
      title: title,
      date: date,
      objects: []
    });
  }

  addUserContact(userContact) {
    //Add contact to users info
    this.state.database.ref('users/' + this.state.uid + '/contacts/' + userContact).set({
      chatID: userContact + this.state.uid
    });

    //Add user to contacts info
    this.state.database.ref('users/' +  userContact + '/contacts/' + this.state.uid).set({
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


  //URL WOULD BE
  //var key = AqBEYVKLgbe-O9VurDp4gsNPGWjbhyVrZoKo9_nLq2YEqP2eUbK1OF5-1JgIRtBw
  //var url = http://dev.virtualearth.net/REST/v1/Locations/-27.4698,153.0251?
            //includeEntityTypes=PopulatedPlace&key=AqBEYVKLgbe-O9VurDp4gsNPGWjbhyVrZoKo9_nLq2YEqP2eUbK1OF5-1JgIRtBw
  //The documentation is at: https://msdn.microsoft.com/en-us/library/ff701710.aspx

  displayCurrentCity(latitude, longitude) {
    return fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true')
     .then((response) => {response.json()})
     .then((responseJson) => {
       alert(JSON.stringify(responseJson))
       return responseJson.city;
    })
    alert("city: " + responseJson.city)
 }

  buttonPressLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //alert(position.coords.latitude + ' ' +  position.coords.longitude)
        displayCurrentCity(-27.4698, 153.0251)
      }
    );
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
    /**addUserContact("4x1V73rKHgXqaFCc8VXNrO30NJG2");
    sendMessage(this.state.uid, "4x1V73rKHgXqaFCc8VXNrO30NJG2", "Add some more messages", "2018-07-12T01:08:48.56");
    sendMessage(this.state.uid, "4x1V73rKHgXqaFCc8VXNrO30NJG2", "One last message for good luck", "2018-07-12T01:08:49.56");*/
    /*addNewDiaryEntry("China", "Day 5: Great Wall", "2018-07-06");
    addNewDiaryEntry("China", "Day 6: Forbidden City", "2018-07-06");
    addNewDiaryEntry("Mexico", "Lazy Sunday", "2014-05-06");
    addNewDiaryEntry("Greece", "Island Day Trip", "2012-03-01");
    addNewObjectToDiaryEntry("China", "2018-07-06", "Bus trip", "Beijing", "Excited to see the wall", "16:45", "imageURL1", "left");
    addNewObjectToDiaryEntry("China", "2018-07-06", "The Wall from afar", "Great Wall of China", "It's so long", "18:45", "imageURL2", "middle");
    addNewObjectToDiaryEntry("China", "2018-07-06", "The Wall", "Great Wall of China", "I'm on the wall", "20:45", "imageURL3", "right");
    addNewObjectToDiaryEntry("China", "2018-07-07", "Off to the forbidden city", "Beijing", "Excited to see the forbidden city", "9:45", "imageURL21", "left");
    addNewObjectToDiaryEntry("China", "2018-07-07", "Entry line", "The Forbidden City", "The entry line is so long!", "9:49", "imageURL22", "left");
    addNewObjectToDiaryEntry("China", "2018-07-07", "The Forbidden City", "The Forbidden City", "Its so pretty", "10:51", "imageURL23", "left");*/
    /*sendMessage(this.state.uid, "4x1V73rKHgXqaFCc8VXNrO30NJG2", "Message timestamped first but added last to check read sorting", "2018-07-11T01:08:48.56");
    getMessages(this.state.uid, "4x1V73rKHgXqaFCc8VXNrO30NJG2");*/

    /*uploadImageToFirebase();*/
    getDiaryObjects("China", "2018-07-06");

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

  onPressWeather() {
    this.props.navigation.navigate('Weather', {city: this.state.city})
  }

  onPressAccommodation() {
    this.props.navigation.navigate('Accommodation')
  }

  onPressChangeCity() {
    this.props.navigation.navigate('ChangeCity', {city: this.state.city,
            changeFunc: (text) => changeCity(text)})
  }

  onPressTransport() {
    this.props.navigation.navigate('Transport')
  }

  onPressCurrency() {
    var url = "http://hl.anseo.cn/"
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
  }

  onPressTours() {
    this.props.navigation.navigate('Tours')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buttonHolderStyle} title="1"
                          onPress={() => onPressWeather()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/weather.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="3"
              onPress={() => onPressAccommodation()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/accommodation.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="5"
                              onPress={() => onPressChangeCity()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/change.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buttonHolderStyle} title="2"
                          onPress={() => onPressTransport()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/transport.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="4"
                          onPress={() => onPressCurrency()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/currency.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="6"
                          onPress={() => onPressTours()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/tours.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title = {this.state.buttonLabel}
          color = "#841584"
          onPress={buttonPress}
        />
        <Button
          title = "Location"
          color = "#841584"
          onPress={buttonPressLocation}
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
   buttonHolderStyle: {
      margin: 35
   },
   buttonStyle: {
     width: 100,
     height: 100,
     borderRadius: 10,
     resizeMode: 'contain',
   }
});
