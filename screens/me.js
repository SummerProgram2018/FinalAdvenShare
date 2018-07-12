/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 // Sorry for the comments - feel free to delete in your version

import React, {Component} from 'react';
import {TouchableOpacity, Image, Platform, StyleSheet, Text, View, Button} from 'react-native';

//<Me name="Hannah"/>
//this.props.name
class MeMap extends Component {
  render(){
    return (
      <View style={styles.list}>
        <Image style={styles.mapImage} source={require('../res/map.png')}/>
          <View style = {styles.overlay}>
            <Image style = {styles.meIcon} source = {require('../res/meavatar.png')} />
              <Text style = {styles.avatarText}>Hannah Jury</Text>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.locationView} onPress={()=>{alert("Location services are unavailable :)")}}>
                <Image style={styles.locationimage} source={require('../res/icons/location.png')}/>
                <Text style={styles.locationText}>Your Location</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
}
export default class Me extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {text: ""}
  }

  render() {
    return (
        <View style={styles.container}>
          <MeMap/>
          <View styles={styles.buttonList}>
            <TouchableOpacity style={styles.optionsView} onPress={()=>{this.props.navigation.navigate('Itinerary')}}>
              <Image style={styles.image} source={require('../res/icons/Itin.png')}/>
              <Text style={styles.buttonText}>My Itinerary</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionsView} onPress={()=>{this.props.navigation.navigate('About')}}>
              <Image style={styles.image} source={require('../res/icons/About.png')}/>
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionsView} onPress={()=>{this.props.navigation.navigate('Favourites')}}>
              <Image style={styles.image} source={require('../res/icons/star.png')}/>
              <Text style={styles.buttonText}>Favourites</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    backgroundColor: 'rgb(256, 256, 256)',
    flex:1,
  },
  buttonList: {
    flex:1,
  },
  list: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex:1,
  },
  mapImage:{
    backgroundColor: 'rgb(256, 256, 256)',
    flexGrow:1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  optionsView: {
    backgroundColor: 'transparent',
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    width: '100%'
   },
   locationView: {
     backgroundColor: 'transparent',
     flexDirection: 'row',
    },
   image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode:"contain",
    flexDirection: 'row',
    height: 30,
    padding: 20,
   },
   locationimage: {
    resizeMode:"contain",
    height: 20,
    width: 20,
    right:0,
    marginRight: 10,
   },
   buttonText: {
    flex:3,
    fontWeight: 'bold',
    color: 'rgb(116, 156, 237)',
    fontSize: 28,
  },
  avatarText: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color: 'rgb(116, 156, 237)',
    fontSize: 28,
    width: "100%",
  },
  locationText: {
    backgroundColor: 'transparent',
    color: 'rgb(116, 156, 237)',
    fontSize: 20,
    fontWeight:"bold"
  },
  overlay: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  meIcon: {
    height: 150,
    resizeMode:"contain",
    padding: 20,
  },
});
