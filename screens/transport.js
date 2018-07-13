/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking} from 'react-native';


export default class Transport extends Component {
  constructor(props) {
    super(props)
    onPressBike = this.onPressBike.bind(this)
    onPressCar = this.onPressCar.bind(this)
    onPressBus = this.onPressBus.bind(this)
    onPressPlane = this.onPressPlane.bind(this)
    onPressTrain = this.onPressTrain.bind(this)
    onPressShip = this.onPressShip.bind(this)
  }

  visitUrl(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
      }
    });
  }

  onPressBike () {
    this.visitUrl("http://www.ofo.so/")
  }

  onPressPlane() {
    this.visitUrl("https://flight.qunar.com/?kwid=220|2742054419&cooperate=baidu50");
  }

  onPressCar() {
    this.visitUrl("https://www.01zhuanche.com/")
  }

  onPressTrain() {
    this.visitUrl("http://m.elongstatic.com/static/webapp/train/website/train.html")
  }

  onPressBus() {
    this.visitUrl("https://www.didiglobal.com/")
  }

  onPressShip () {
    this.visitUrl("https://www.costachina.com/?mz_ca=2080769&mz_sp=7F30R&mz_kw=9387019&mz_sb=1")
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buttonHolderStyle} title="1"
                          onPress={() => onPressBike()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/transportBike.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="3"
              onPress={() => onPressCar()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/transportCar.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="5"
                              onPress={() => onPressBus()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/transportBus.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.buttonHolderStyle} title="2"
                          onPress={() => onPressPlane()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/transportPlane.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="4"
                          onPress={() => onPressTrain()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/transportTrain.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHolderStyle} title="6"
                          onPress={() => onPressShip()}>
              <Image style={styles.buttonStyle} source={require('../res/icons/transportShip.png')}/>
            </TouchableOpacity>
          </View>
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
   buttonHolderStyle: {
      margin: 35,
      backgroundColor: "#fff",
      borderRadius: 10,
   },
   buttonStyle: {
     width: 100,
     height: 100,
     borderRadius: 10,
     resizeMode: 'contain',
   }
});
