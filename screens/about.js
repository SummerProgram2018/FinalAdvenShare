 import React, {Component} from 'react';
 import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';

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
     firebase.initializeApp(config);
     this.state = {
       name: "",
       dob: "",
       gender: "",
       homeCountry: "",
       bio: "",
       database: firebase.database(),
       storage: firebase.storage(),
       uid: firebase.auth().currentUser.uid
     };
     changeName = this.changeName.bind(this);
     changeDob = this.changeDob.bind(this);
     changeGender = this.changeGender.bind(this);
     changeHomeCountry = this.changeHomeCountry.bind(this);
     changeBio = this.changeBio.bind(this);
     submitDetails = this.submitDetails.bind(this);
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
     nameIcon = require('../res/meavatar.png');
     dobIcon = require('../res/icons/gender.png');
     genderIcon = require('../res/icons/gender.png');
     homeCountryIcon = require('../res/icons/location.png');
     bioIcon = require('../res/icons/gender.png');

     return (
       <View style={styles.container}>
        <ScrollView>
         <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
         <Image style = {styles.meIcon} source = {require('../res/meavatar.png')} />
         <Text style = {styles.avatarText}>Hannah Jury</Text>

         <AboutMeTextInput
            onChangeFunction={this.changeName}
            onBlur={this.submitDetails}
            textValue={this.state.name}
            icon={nameIcon}
         />
         <AboutMeTextInput
            onChangeFunction={this.changeDob}
            onBlur={this.submitDetails}
            textValue = {this.state.dob}
            icon={dobIcon}
         />
         <AboutMeTextInput
            onChangeFunction={this.changeGender}
            onBlur={this.submitDetails}
            textValue = {this.state.gender}
            icon={genderIcon}
         />
         <AboutMeTextInput
            onChangeFunction={this.changeHomeCountry}
            onBlur={this.submitDetails}
            textValue = {this.state.homeCountry}
            icon={homeCountryIcon}
         />
         <AboutMeTextInput
            onChangeFunction={this.changeBio}
            onBlur={this.submitDetails}
            textValue = {this.state.bio}
            icon={bioIcon}
         />
        </ScrollView>
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
  meIcon: {
    height: 150,
    resizeMode:"contain",
    padding: 20,
    width: "100%"
  },
  avatarText: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'rgb(116, 156, 237)',
    fontSize: 28,
    width: "100%",
  },
  box: {
    height: 60,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    margin: 20,
    flexDirection: 'row'
  },
  iconImage:{
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  text: {
    flex: 1,
    fontSize: 20,
    padding:10,
    width: "100%",
    color: 'rgb(116, 156, 237)',
  },
});
