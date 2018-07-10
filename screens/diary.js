/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';

class DiaryTextInput extends Component{
  render () {
    return (
      <TextInput
      {...this.props} //Inherit any properties passed
      editable = {true}
      maxLength = {100}
      multiline = {true}
      numberOfLines = {10}
      />
    );
  }
}



export default class Diary extends Component<Props> {
  constructor (props, context) {
    super (props, context);
    this.state = {
      text: 'Enter your diary text here',
      savedText: '',
      date: '',
    };
    onPressLearnMore = this.onPressLearnMore.bind(this)
  }

  onPressLearnMore() {
    this.setState({savedText: this.state.savedText + this.state.text + "\n"});
    this.setState({text: ""});
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({date: day + '/' + month + '/' + year});
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        <TextInput
          blurOnSubmit = {false}
          style = {{height: 80, width: 400, borderColor: 'blue', borderWidth: 1}}
          onChangeText = {(text) => this.setState({text})}
          value = {this.state.text}
        />
        <View style={styles.diaryView}>
        <Button
          title = "Save Entry"
          color = "#841584"
          onPress={onPressLearnMore}
          />
        <Text> {this.state.date} </Text>
        <Text style={{backgroundColor: 'transparent'}}> {this.state.savedText} </Text>
        <Image
          source = {require('../res/meavatar.png')}
          style = {{width: '30%', height: 100}}
        />
        </View>
      </View>
    );
  }
}



var styles = StyleSheet.create({
  container:{
    flex:1,
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
});
