/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';

export default class ChangeCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.navigation.state.params.city
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          <TextInput value={this.state.city} onChangeText={(text) => this.setState({city: text})}/>
          <Button title="Change City" onSubmit={this.props.navigation.state.params.changeFunc(this.state.city)}/>
        </View>
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
});
