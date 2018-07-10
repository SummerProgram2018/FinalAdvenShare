import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Keyboard} from 'react-native';

// Feed a function of username and password to this bad boy
export class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    handleUsername = this.handleUsername.bind(this);
    handlePassword = this.handleUsername.bind(this);
  }
     
   //Updated onChangeText, displays input
   handleUsername = (text) => {
      this.setState({ username: text })
   }

   //Updated onChangeText, displays input
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   
   render() {
     return (
        <View style={styles.inputsContainer}>
          <View style={{flex: 4}}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "#ffffff"
               placeholder = "E-mail"
               placeholderTextColor = "#749ced"
               autoCapitalize = "none"
               buttonColor = "#ffffff"
               onChangeText = {this.handleUsername}/>
            <TextInput style = {styles.input}
               underlineColorAndroid = "#ffffff"
               placeholder = "Password"
               placeholderTextColor = "#749ced"
               autoCapitalize = "none"
               buttonColor = "#ffffff"
               secureTextEntry = {true}
               onChangeText = {this.handlePassword}/>
          </View>
          <View style={styles.submitButton}>
            <View style={{width: 100, marginTop: 10}}>
              <Button
                onPress = {() => {
                  if (this.state.username == '' || this.state.password == '') {
                    alert("Please enter a username and password")
                  } else {
                    this.props.buttonPress(this.state.username, this.state.password);
                  }
                }}
                title={this.props.buttonName}
                color="#CCCCCC"
              />
            </View>
          </View> 
         </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:10,
  },
  backgroundImage:{
    backgroundColor: 'transparent',
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    flex: 1,
    height: '100%',
    //justifyContent: 'center',
  },
  keyboardShown:{
    flex:5,
    backgroundColor: 'rgb(172, 196, 245)'
  },
  list: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex:1,
    flexDirection: 'row',
    height: 100,
   },
   advenShareLogo: {
    flex: 10,
    width: "100%",
    marginTop: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignContent: 'center'
   },
   logo: {
     resizeMode: 'contain',
     justifyContent: 'center',
     width: "100%",
     flex: 1
   },
   logInTextBox: {
    flex: 5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    width: "100%",
    alignContent: 'center'
   },
   logInText: {
     textAlign: 'center',
     color: '#000000',
     fontSize: 20,
   },
   logInEntry: {
    flex: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    backgroundColor: "rgb(109, 191, 235)",
    justifyContent: 'center',
    resizeMode: 'contain',
    borderColor: '#000000',
    borderWidth: 0.5,
   },
   additionalLinks: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  placeHolder: {
    flex: 2,
    backgroundColor: 'rgb(172, 196, 245)'
  },
  inputsContainer: {
    height: 165,
    marginLeft: 30,
    marginRight: 30,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgb(109, 191, 235)",
    alignItems: 'stretch',
    resizeMode: 'contain',
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  input: {
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 40,
    borderRadius: 5,
    fontSize: 10
  },
  submitButton: {
    flex: 2,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});