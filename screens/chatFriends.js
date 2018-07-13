/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import firebase from 'react-native-firebase';
import ChatDialog from "./chatDialog";

var config = {
    apiKey: "AIzaSyCQIFzjQ5RofbMDC490ctjBbstxOCjOvK8",
    authDomain: "advenshare123.firebaseapp.com",
    databaseURL: "https://advenshare123.firebaseio.com/",
    storageBucket: "advenshare123.appspot.com"
};

class ChatBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: "",
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.chatBox} onPress={()=>{this.props.navigation.navigate('ChatDialog', {messages: this.props.messages,
                                                                                                           chatId: this.props.chatId,
                                                                                                           userId: this.props.uid})}}>
          <View style={styles.chatIcon}>
            <Text style={styles.nameLetter}>
              C
            </Text>
          </View>
          <View style={styles.chatTextView}>
            <TextInput editable={false} value={this.props.top} style={styles.textInputTop}/>
            <TextInput editable={false} value={this.props.bottom} style={styles.textInputBottom}/>
          </View>
      </TouchableOpacity>
    )
  }
}

export default class ChatFriends extends Component {
  constructor(props) {
    super(props)
    firebase.initializeApp(config);
    this.state = {
      chats: []
    }
  }

  componentDidMount() {
    var chats = [];
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/contacts').once('value').then((snapshot) => {
      snapshot.forEach((contact) => { //Iterate through each user's contacts
        var contactID = (contact.ref.toString().split('/')[6]).toString();
        firebase.database().ref('users/' + contactID).once('value').then((snapshot) => {
          var newChat = {name: "", chatId: "", messages: []}
          newChat.name = snapshot.child('basicInfo/name').val().toString();
          var chatId = snapshot.child('contacts/' + firebase.auth().currentUser.uid + '/chatID').val().toString();
          newChat.chatId = chatId;
          firebase.database().ref('chats/' + chatId + '/').once('value').then((snapshot) => {
            snapshot.forEach((messageID) => {
              var newMessage = {};
              newMessage.senderID = messageID.child('senderID').val().toString();
              newMessage.timeStamp = messageID.child('timeStamp').val().toString();
              newMessage.content = messageID.child('content').val().toString();
              var newMessages = newChat.messages;
              newMessages.unshift(newMessage);
              newChat.messages= newMessages
            })
            chats.push(newChat)
          }).then(() => {
          }).then(() => {
            this.setState({
              chats: chats,
              database: firebase.database(),
              storage: firebase.storage(),
              uid: firebase.auth().currentUser.uid,
            })
          })
        })
        firebase.database().ref('chats/')
      });
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          <View style={{width: "100%", flexDirection: 'row'}}>
            <TouchableOpacity
              style={{height: 30, flex: 1, backgroundColor: 'rgb(116, 156, 237)', alignItems: 'center', justifyContent: 'center'}}
              onPress={() => this.props.navigation.navigate('ChatFriends')}>
              <Text>Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: 30, flex: 1, backgroundColor: 'rgb(116, 156, 237)', alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {this.props.navigation.navigate('ChatDiscover')}}>
              <Text>Discover</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{flex: 1}}>
              { this.state.chats.map((chat) => {
                  return (<ChatBox navigation={this.props.navigation}
                                  top={chat.name}
                                  chatId={chat.chatId}
                                  uid={this.state.uid}
                                  bottom={chat.messages[0].content}
                                  messages={chat.messages.map((message, i) => {
                                    return (message.senderID == this.state.uid ?
                                       { _id: i,
                                         text: message.content,
                                         createdAt: message.timeStamp,
                                         user: {
                                           _id: 1,
                                           name: chat.name
                                         },
                                          sent: true,
                                       }
                                     :
                                       {  _id: i,
                                          text: message.content,
                                          createdAt: message.timeStamp,
                                          user: {
                                            _id: 2,
                                            name: this.state.uid
                                          },
                                          sent: true,
                                        }
                                      )
                                  })}
                          />)
                })
              }
          </ScrollView>
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
  chatBox: {
    padding: 5,
    height: 100,
    flexDirection: 'row',
    borderRadius: 30/2,
    backgroundColor: 'white',
    margin: 10,
    alignItems:'center'
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
  },
  optionsView: {
    backgroundColor: 'transparent',
   }
});
