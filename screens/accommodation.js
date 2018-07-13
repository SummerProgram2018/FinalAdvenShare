/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, Linking, TouchableOpacity, ScrollView} from 'react-native';

export default class Accomodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: []
    }
    pressSearch = this.pressSearch.bind(this)
  }

  pressSearch() {
    var url = "http://www.ctrip.com/"
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        <ScrollView>
          <View style={{width: "100%", margin:10}}>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>Name</Text>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>Price</Text>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>Location</Text>
          </View>
          <View style={{width: "100%", margin:10}}>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>Name</Text>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>Price</Text>
            <Text style={{fontSize: 30, fontWeight: "bold"}}>Location</Text>
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, width: "100%", flexDirection:'row'}}>
          <TouchableOpacity style={{backgroundColor: 'rgb(116, 156, 237)', flex: 1, height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.props.navigation.navigate('AddAccommodation')}>
            <Text>Add Accommodation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: 'rgb(116, 156, 237)', flex: 1, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={() => pressSearch()}>
            <Text>Find More</Text>
          </TouchableOpacity>
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
  list: {
       justifyContent: 'center',
       flexWrap: 'wrap',
       flex:1,
       flexDirection: 'row',
       height: 100,
   },
});
