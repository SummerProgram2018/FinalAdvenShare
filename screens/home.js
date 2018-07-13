/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, ScrollView, Animated, TouchableOpacity} from 'react-native';
import DiaryEntry from '../components/diarycomp';

// Asks for two views to be sent to it - short view and long view
class DiscoverBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded    : false,
      animation   : new Animated.Value(90),
      minHeight   : 90,
      expandable  : false,
      favourited  : false
    };
    this.icons = {
      'up': require('../res/icons/ClickExpand.png'),
      'down': require('../res/icons/ClickExpand.png'),
      'explore': require('../res/icons/Me.png'),
      'favourite': require('../res/icons/star.png')
    }
  }

  _setMaxHeight(event){
      this.setState({
          maxHeight   : event.nativeEvent.layout.height,
          exandable   : event.nativeEvent.layout.height > 90 ? true : false
      });
  }

  toggle() {
      let initialValue    = this.state.expanded? this.state.maxHeight : this.state.minHeight,
          finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight;

      this.setState({
          expanded : !this.state.expanded
      });

      this.state.animation.setValue(initialValue);
      Animated.spring(
          this.state.animation,
          {
              toValue: finalValue
          }
      ).start();
  }

  explore() {
    alert('Go to this users profile')
    /*this.props.navigation.navigate('EditDiary', { diary: this.props.diary,
                                                  date: this.props.date,
                                                  entry: this.props.entry})*/
  }

  favourite() {
    if (this.state.favourited) {
      alert("Unfavourite this post")
    } else {
      alert("Favourite this post")
    }
    this.setState({favourited: !this.state.favourited})
  }

  monthIndexToName(index) {
    switch(index) {
      case 1:
        return "Jan"
      case 2:
        return "Feb"
      case 3:
        return "Mar"
      case 4:
        return "Apr"
      case 5:
        return "May"
      case 6:
        return "Jun"
      case 7:
        return "Jul"
      case 8:
        return "Aug"
      case 9:
        return "Sep"
      case 10:
        return "Oct"
      case 11:
        return "Nov"
      case 12:
        return "Dec"
    }
  }

  render() {
    let iconToggle = this.icons['down'];

    if(this.state.expanded){
        iconToggle = this.icons['up'];   //Step 4
    }

    return (
      <Animated.View style={[styles.entryBox,{height: this.state.animation}]}>
        <View style={styles.dateIcon}>
          <Image style={{height: 80, width: 80, resizeMode: 'contain', borderRadius: 40}} source={this.props.person}/>
        </View>
        <View style={styles.chatTextView} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
        <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 2}]} onPress={this.explore.bind(this)}>
          <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={this.icons.edit}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallTouchable, {top: 2, right: 2, backgroundColor: 'transparent'}]} onPress={this.favourite.bind(this)}>
          <Image style={{height: 20, width: 20, resizeMode: 'contain', tintColor: this.state.favourited ? 'rgb(255,215,0)' : 	'rgb(112,138,144)'}} source={this.icons.favourite}/>
        </TouchableOpacity>
        {!this.state.exandable ? null :
          <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 22}]} onPress={this.toggle.bind(this)}>
            <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={iconToggle}/>
          </TouchableOpacity>}
      </Animated.View>
    )
  }
}

export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      entries: [
                 {date: {day: 8, month: 7, year: 2018},
                 entry: [{title: "5", text: "1", image: require('../res/AdvenShare.png'), location: "location", alignment: "left"},
                 {title: "5", text: "2", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "right"},
                 {title: "5", text: "3", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "center"}]},

                 {date: {day: 9, month: 7, year: 2018},
                  entry: [{title: "2", text: "1", image: require('../res/AdvenShare.png'), location: "location", alignment: "left"},
                  {title: "2", text: "2", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "right"}]},

                {date: {day: 10, month: 7, year: 2018},
                 entry: [{title: "3", text: "1", image: require('../res/AdvenShare.png'), location: "location", alignment: "left"},
                 {title: "3", text: "2", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "center"}]},

                {date: {day: 11, month: 7, year: 2018},
                 entry: [{title: "4", text: "1", image: require('../res/AdvenShare.png'), location: "location", alignment: "left"}]},

                {date: {day: 12, month: 7, year: 2018},
                 entry: [{title: "5", text: "1", image: require('../res/AdvenShare.png'), location: "location", alignment: "left"},
                 {title: "5", text: "2", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "center"},
                 {title: "5", text: "3", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "center"}]}
                ],
      currentDate: {day: null, month: null, year: null}
    }
  }

  componentDidMount() {
    // Do some shit to get the entries from firebase using
    // location or friends
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({currentDate: {day: day, month: month, year: year}})
  }

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        {this.state.entries.length == 0 ?
          <View style={{flex: 1, alignContent: 'center', justifyContent:'center'}}>
            <Text style={{fontSize:40}}> Record your first entry! </Text>
          </View>
        :
          <ScrollView style={{flex: 1}}>
            {this.state.entries.map((dateEntry, i) => {
                return (<DiscoverBar
                          date={dateEntry.date}
                          navigation={this.props.navigation}
                          entry={dateEntry.entry}
                          person={require('../res/icons/Me.png')}
                        >
                           <DiaryEntry
                            diary="THIS SHOULD COME FROM FIREBASE"
                            date={dateEntry.date}
                            editable={false}
                            entry={dateEntry.entry}
                          />
                        </DiscoverBar>)
              })
            }
          </ScrollView>
        }
      </View>
    )
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
   entryBox : {
     padding: 5,
     flexDirection: 'row',
     backgroundColor: 'rgb(116, 156, 237)',
     margin: 10,
     borderRadius: 4,
     alignItems: 'flex-start'
   },
   dateIcon: {
     height: 80,
     width: 80,
     backgroundColor: 'transparent',
     marginRight: 0,
     alignItems: 'center',
   },
   chatTextView: {
     backgroundColor: 'transparent',
     flex: 1,
     padding     : 10,
     paddingTop  : 0
   },
   smallTouchable: {
     height: 20,
     width: 20,
     borderRadius: 10,
     position: 'absolute',
     backgroundColor: 'blue'
   }
});
