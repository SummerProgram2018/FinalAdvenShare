/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 *
 * yarn add react-native-gifted-chat
 *
 */
import React, {Component} from 'react';
import {createStackNavigator, TabNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
var config = {
    apiKey: "AIzaSyCQIFzjQ5RofbMDC490ctjBbstxOCjOvK8",
    authDomain: "advenshare123.firebaseapp.com",
    databaseURL: "https://advenshare123.firebaseio.com/",
    storageBucket: "advenshare123.appspot.com"
};

export default class ChatDialog extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
    this.state = {
      database: firebase.database(),
      storage: firebase.storage(),
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
  //  this.onReceive = this.onReceive.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  //  this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: this.props.navigation.state.params.messages,
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /* onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./oldMessages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  } */

  onSend(messages = []) {
    console.log("\n\n\n\n\n\nMESSSSSAGE IS HERE")
    console.log(messages)
    console.log("senderID: " + this.props.navigation.state.params.userId)
    console.log("chatID: " + this.props.navigation.state.params.chatId)
    console.log("content: " + messages[0].text)
    console.log("timeStamp: " + new Date() )
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    var chatID = this.props.navigation.state.params.chatId;
    var sendID = this.props.navigation.state.params.userId;
    var message = messages[0].text;
    var currentDate = Date();
    var listDate = currentDate.split(' ');
    var listTime = listDate[4].split(':');
    var month = new Date().getMonth() + 1;
    if (month < 10) {
      var formattedMonth = "0" + month;
    }
    var formattedTimeStamp = listDate[3]+'-'+formattedMonth+'-'+listDate[2]+'T'+listTime[0]+':'+listTime[1]+':'+listTime[2];
    console.log(formattedTimeStamp)
    this.state.database.ref('chats/' + chatID + '/').push({
      senderID: sendID,
      content: message,
      timeStamp: formattedTimeStamp
    });

    // for demo purpose
    //this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }
 /*
  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Me',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  } */

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: 1, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
