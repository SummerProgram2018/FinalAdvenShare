import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput,
  Button} from 'react-native';

export default class Diary extends Component<Props> {
  constructor (props, context) {
    super (props, context);
    this.state = {
      numEntries = 0,
      lastDate = ''
    };

    onPressAddEntry () {
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      fullDate = {date: day + '/' + month + '/' + year};
      this.setState({numEntries: numEntries + 1});
    }

    render () {
      return(

      )
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
