import React, {Component} from 'react';
import {TouchableOpacity, Image, Platform, StyleSheet, Text, View, Button} from 'react-native';


export class NavigationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {pressStatus: true };
  }
  render() {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity
          onPressIn={() => {this.setState({pressStatus: false})}}
          onPressOut={() => this.setState({pressStatus: true}, () => {this.props.navigation.navigate(this.props.navKey)})}
          activeOpacity={0.8}
        >
        </TouchableOpacity>
      </View>
    );
  }
}

/*
export default class BottomBar extends Component {
  render() {
    return (
      <View style={styles.bottomBar}>
        <NavigationButton
          navigation ={this.props.navigation}
          navKey='Home'
          src={require('./res/icons/Discover.png')}>
        </NavigationButton>
        <NavigationButton
          navigation ={this.props.navigation}
          navKey='Plan'
          src={require('./res/icons/Plan.png')}>
        </NavigationButton>
        <NavigationButton
          navigation ={this.props.navigation}
          navKey='Diary'
          src={require('./res/icons/Diary.png')}>
        </NavigationButton>
        <NavigationButton
          navigation ={this.props.navigation}
          navKey='Chat'
          src={require('./res/icons/Chat.png')}>
        </NavigationButton>
        <NavigationButton
          navigation ={this.props.navigation}
          navKey='Me'
          src={require('./res/icons/Me.png')}>
        </NavigationButton>
      </View>
    );
  }
} */

var styles = StyleSheet.create(
  {
    container:{
      flex:1,
    },
    list: {
         justifyContent: 'center',
         flexWrap: 'wrap',
         flex:1,
         flexDirection: 'row',
         height: 100,
     },
     bottomBar: {
         backgroundColor:'transparent',
         flexDirection: 'row',
         width: '100%',
         height: 50,
         bottom: 0
     },
     buttons: {
       backgroundColor:'transparent',
       flex: 1,
     },
     image: {
       width: '100%',
       marginTop: 5,
       marginBottom: 5,
       height: 45,
       resizeMode: 'contain',
       tintColor: 'rgb(102, 102, 102)'
     },
     imagePressed: {
       width: '100%',
       marginTop: 5,
       marginBottom: 5,
       height: 45,
       resizeMode: 'contain',
       tintColor: 'rgb(116, 156, 237)'
     },
});
