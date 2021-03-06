/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
import entryInfo from '../components/diarycomp';
import NavigationButton from '../components/navigation';

import firebase from 'react-native-firebase';
var config = {
    apiKey: "AIzaSyCQIFzjQ5RofbMDC490ctjBbstxOCjOvK8",
    authDomain: "advenshare123.firebaseapp.com",
    databaseURL: "https://advenshare123.firebaseio.com/",
    storageBucket: "advenshare123.appspot.com"
};

// Asks for name and for the navigation information to be passed to it
class DiaryBar extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.chatBox}
        onPress={() => this.props.navigation.navigate('Diary', {diary: this.props.name})}
      >
        <View style={styles.chatIcon}>
          <Text style={styles.nameLetter}>
            C
          </Text>
        </View>
        <View style={styles.chatTextView}>
          <TextInput editable={false} value={this.props.name} style={styles.textInputTop}/>
        </View>
      </TouchableOpacity>
    )
  }
}

export default class Diaries extends Component {
  constructor (props) {
    super(props);
    firebase.initializeApp(config);
    this.state = {
      diaries: [],
      database: firebase.database(),
      storage: firebase.storage(),
      uid: firebase.auth().currentUser.uid,
      newDiaryName: ""
    }
    addDiary = this.addDiary.bind(this);
  }

  componentDidMount() {
    this.state.database.ref('users/' + this.state.uid + '/diaries').once('value').then((snapshot) => {
      snapshot.forEach((diary) => {
        var diaries = this.state.diaries;
        var diaryName = (diary.ref.toString().split('/')[6]).toString();
        diaries.push(diaryName)
        this.setState({diaries: diaries})
      });
    })
  }

  addDiary() {
    if (this.state.newDiaryName == "") {
      alert("Enter a diary name");
    } else {
      // Create a new diary in fireBase
      this.state.database.ref('users/' + this.state.uid + '/diaries/' + this.state.newDiaryName + '/').push({
        caption: "",
        timeDate: "",
        images: []
      });
      this.props.navigation.navigate('Diary', {diary: this.state.newDiaryName})
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        {this.state.diaries.length == 0 ?
          <TouchableOpacity
            style={styles.chatBox2}
            onPress={() => this.props.navigation.navigate('Diary', {diary: "Skip Loading Diaries"})}
          >
              <Text style={{fontSize:40, textAlign:'center', width: '100%'}}> Make some memories! </Text>
          </TouchableOpacity>
        :
          <ScrollView style={{flex: 1}}>
            {this.state.diaries.map((name) => {
                return (<DiaryBar
                          name={name}
                          navigation={this.props.navigation}
                        />)
              })
            }
          </ScrollView>
        }
        <View style={{width:'100%', height: 60, bottom: 5, position: 'absolute', flexDirection: 'row'}}>
          <View style={{width: 60, height: 60, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style = {styles.addButton2} onPress = {addDiary}>
              <Image style={styles.addButton2} source = {require('../res/icons/plus.png')}/>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="New Diary Name"
            onChangeText={(text) => this.setState({newDiaryName: text})}
            value={this.state.newDiaryName}
            style={{flex: 1}}
          />
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  diaryText: {
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  dateText: {
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 270,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summary: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  addButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
  },
  addButton2: {
    height: 40,
    width: 40,
  },
  button: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 50,
  },
  list: {
       justifyContent: 'center',
       flexWrap: 'wrap',
       flexDirection: 'row',
       height: 100,
   },
   cornerDate: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        height: 80,
        width: 80,
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
   diaryView: {
     flex:1,
     backgroundColor:'transparent',
   },
   chatBox: {
     padding: 5,
     height: 100,
     flexDirection: 'row',
     borderRadius: 30/2,
     backgroundColor: 'white',
     margin: 10,
     alignItems:'center'
   },
   chatBox2: {
     width: "100%",
     flex: 1,
     backgroundColor: 'transparent',
     alignItems:'center',
     justifyContent: 'center'
   },
   chatTextView: {
     backgroundColor: 'white',
     flex: 1
   },
   chatIcon: {
     height: 65,
     width: 65,
     borderRadius: 65/2,
     backgroundColor: 'rgb(116, 156, 237)',
     marginRight: 10,
     marginLeft: 10,
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
     color: 'white'
   }
});
