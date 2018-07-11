/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
 import {TouchableOpacity, Image, Platform, StyleSheet, Text, View, Button} from 'react-native';

 class weekDayDropDown extends Component{
   render () {
     return (
       <View style={styles.prettyboxView}>
        <View style={styles.dateView}>

        <View style={styles.weekdayView}>
          <TextInput
           {...this.props} //Inherit any properties passed
           style={styles.text}
           maxLength = {100}
           multiline = {true}
           numberOfLines = {8}
           onChangeText = {this.props.onChangeFunction}
           value = {this.props.textValue}
         />
         </View>
         </View>
       </View>
     );
   }
 }

export default class Itinerary extends Component {
  constructor (props, context) {
    super (props, context);
    // store the rel data
    this.state = {
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      day6: '',
      day7: '',
    };
    changeName = this.changeName.bind(this);
    changeDob = this.changeDob.bind(this);
    changeGender = this.changeGender.bind(this);
    changeHomeCountry = this.changeHomeCountry.bind(this);
    changeBio = this.changeBio.bind(this);
 }

 changeName = (name) => {
   this.setState({name});
 }
 changeDob = (dob) => {
   this.setState({dob});
 }
 changeGender = (gender) => {
   this.setState({gender});
 }
 changeHomeCountry = (homeCountry) => {
   this.setState({homeCountry});
 }
 changeBio = (bio) => {
   this.setState({bio});
 }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.list}>
            <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  prettyBoxView: {
    backgroundColor: 'rgb(116, 156, 237)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: '90%'
   },
   dateView: {
     flex: 1,
     width: 60,
     resizeMode: 'contain',
   },
   weekdayView:  {
     width: '100%',
   },
   textStyle: {
     flex:4,
     fontWeight: 'bold',
     color: 'rgb(256, 256, 256)',
     fontSize: 28,
     marginTop: 0,
     width: "100%",
   }
});
