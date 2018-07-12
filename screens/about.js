/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * PLEASE ADD:
 * yarn add react-native-vector-icons
 * yarn add react-native-textinput-effects
 * run: react-native link react-native-vector-icons
 */

 import React, {Component} from 'react';
 import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
 import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
 import {Fumi} from 'react-native-textinput-effects';
 import firebase from 'react-native-firebase';

 var config = {
     apiKey: "AIzaSyCQIFzjQ5RofbMDC490ctjBbstxOCjOvK8",
     authDomain: "advenshare123.firebaseapp.com",
     databaseURL: "https://advenshare123.firebaseio.com/",
     storageBucket: "advenshare123.appspot.com"
 };

 class AboutMeTextInput extends Component{
   render () {
     return (
       <View style={styles.box}>
       <Image style={styles.iconImage} source={this.props.icon}/>
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
     );
   }
 }

 export default class About extends Component<Props> {
   constructor (props, context) {
     super (props, context);
     // store the rel data
     firebase.initializeApp(config);
     this.state = {
       name: '',
       dob: '',
       gender: '',
       homeCountry: '',
       bio: '',
       database: firebase.database(),
       storage: firebase.storage(),
       uid: firebase.auth().currentUser.uid
     };
     changeName = this.changeName.bind(this);
     changeDob = this.changeDob.bind(this);
     changeGender = this.changeGender.bind(this);
     changeHomeCountry = this.changeHomeCountry.bind(this);
     changeBio = this.changeBio.bind(this);
     submitDetails = this.submitDetails.bind(this)
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

  submitDetails = () => {
    this.state.database.ref('users/' + this.state.uid + '/basicInfo').update({
      name: this.state.name,
      dob: this.state.dob,
      gender: this.state.gender,
      homeCountry: this.state.homeCountry,
      bio: this.state.bio
    });
  }

  componentDidMount = () => {
    this.state.database.ref('users/' + this.state.uid + '/basicInfo').once('value').then((snapshot) => {
      this.setState({name: snapshot.child("name").val().toString()}),
      this.setState({dob: snapshot.child("dob").val().toString()}),
      this.setState({gender: snapshot.child("gender").val().toString()}),
      this.setState({homeCountry: snapshot.child("homeCountry").val().toString()}),
      this.setState({bio: snapshot.child("bio").val().toString()})
    });
  }

  render () {

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
      <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
      <Image style = {styles.meIcon} source = {require('../res/meavatar.png')} />
      <Text style = {styles.avatarText}>Hannah Jury</Text>
      <Fumi
        label={'Full Name'}
        labelStyle={{ color: '#a3a3a3' }}
        inputStyle={{ color: 'rgb(116, 156, 237)' }}
        iconClass={FontAwesomeIcon}
        iconName={'id-badge'}
        iconColor={'purple'}
        iconSize={30}
        value={this.state.name}
        onChangeText={(text) => { this.setState({name: text})}}
        onBlur={this.submitDetails}
        />
        <Fumi
          style={styles.input}
          label={'Date of Birth'}
          inputStyle={{ color: 'rgb(116, 156, 237)' }}
          iconClass={FontAwesomeIcon}
          iconName={'calendar'}
          iconColor={'purple'}
          value={this.state.dob}
          onChangeText={(text) => { this.setState({dob: text})}}
          onBlur={this.submitDetails}
        />
        <Fumi style={styles.input}
          label={'Gender'}
          inputStyle={{ color: 'rgb(116, 156, 237)' }}
          iconClass={FontAwesomeIcon}
          iconName={'venus-mars'}
          iconColor={'purple'}
          value={this.state.gender}
          onChangeText={(text) => { this.setState({gender: text})}}
          onBlur={this.submitDetails}
        />
        <Fumi style={styles.input}
          label={'Home Country'}
          inputStyle={{ color: 'rgb(116, 156, 237)' }}
          iconClass={FontAwesomeIcon}
          iconName={'globe'}
          iconColor={'purple'}
          value={this.state.homeCountry}
          onChangeText={(text) => { this.setState({homeCountry: text})}}
          onBlur={this.submitDetails}
        />
        <Fumi
          style={styles.input}
          label={'Bio'}
          inputStyle={{ color: 'rgb(116, 156, 237)' }}
          iconClass={FontAwesomeIcon}
          iconName={'edit'}
          iconColor={'purple'}
          value={this.state.bio}
          onChangeText={(text) => { this.setState({bio: text})}}
          onBlur={this.submitDetails}
        />
      </ScrollView>
     );
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  backgroundImage:{
    backgroundColor: 'rgb(116, 156, 237)',
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  meIcon: {
    height: 150,
    resizeMode:"contain",
    padding: 20,
    width: "100%"
  },
  avatarText: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'rgb(256, 256, 256)',
    fontSize: 28,
    width: "100%",
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
});
