{/*Need to make it so that this file makes the blue box for diary summary */}
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity} from 'react-native';

export class entryInfo extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      caption: "",
      date: "",
      images: [],
    };
  }
  render() {
    return (
      <View>
      <Image style={{height: 80, width: 350}} source = {require('../res/icons/BoxMyDiary.png')}/>
      <Text style={styles.dateText}> {this.state.date} </Text>
      <Text style={styles.diaryText}> "This is my diary entry something something lol hey adrian's waterproof again" </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  summary: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
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
  addButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
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
});
