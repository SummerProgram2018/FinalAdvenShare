/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Keyboard} from 'react-native';
import {NavigationButton} from '../components/navigation';
import {LoginInput} from '../components/loginInput';
import firebase from 'react-native-firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {keyboard: false}
    pressRegister = this.pressRegister.bind(this)
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    this.setState({keyboard: true})
  }

  keyboardWillHide = (event) => {
    this.setState({keyboard: false})
  }
  
  pressRegister = (user, pass) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user, pass)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => {
        this.setState({ errorMessage: error.message })
        alert(error.message)
      })
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.keyboardShown}>
            <View style = {styles.advenShareLogo}>
              <Image source ={require('../res/AdvenShare.png')} style={styles.logo}/>
            </View>
            {this.state.keyboard ? <View style={{height: 4}}/> : <View style={{height: 20}}/>}
            <View style={{flex: 30}}>
              <LoginInput buttonPress={this.pressRegister} buttonName="REGISTER"/>
            </View>
            <View style= {styles.additionalLinks}>
            </View>
          </View> 
          {this.state.keyboard ? <View/> :
            <View style = {styles.placeHolder}>
              <Image style={styles.backgroundImage} source={require('../res/CloudLogoLogin.png')}/>
              <Button
                title="Already have an account? Login"
                onPress={() => this.props.navigation.navigate('Login')}
              />
            </View>} 
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
