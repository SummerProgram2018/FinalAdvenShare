/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Animated} from 'react-native';
import DiaryEntry from '../components/diarycomp';
import NavigationButton from '../components/navigation';

import firebase from 'react-native-firebase';
var config = {
    apiKey: "AIzaSyCQIFzjQ5RofbMDC490ctjBbstxOCjOvK8",
    authDomain: "advenshare123.firebaseapp.com",
    databaseURL: "https://advenshare123.firebaseio.com/",
    storageBucket: "advenshare123.appspot.com"
};

const insertText = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de   Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."

// Asks for two views to be sent to it - short view and long view
class EntryBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded    : false,
      animation   : new Animated.Value(90),
      minHeight   : 90,
      expandable  : false,
    };
    this.icons = {
      'up': require('../res/icons/ClickExpand.png'),
      'down': require('../res/icons/ClickExpand.png'),
      'edit': require('../res/icons/ClickPencil.png')
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

  edit() {
    this.props.navigation.navigate('EditDiary', { diary: this.props.diary,
                                                  date: this.props.date,
                                                  entry: this.props.entry})
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
          <Text style={{fontSize: 16, fontWeight: 'bold', height: 20}}>{this.monthIndexToName(this.props.date.month)}</Text>
          <Text style={{fontSize: 36, fontWeight: 'bold', height: 40}}>{this.props.date.day}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', height: 20}}>{this.props.date.year}</Text>
        </View>
        <View style={styles.chatTextView} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
        <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 2}]} onPress={this.edit.bind(this)}>
          <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={this.icons.edit}/>
        </TouchableOpacity>
        {!this.state.exandable ? null :
          <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 22}]} onPress={this.toggle.bind(this)}>
            <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={iconToggle}/>
          </TouchableOpacity>}
      </Animated.View>
    )
  }
}



export default class Diary extends Component {
  constructor(props, context) {
    super(props, context);
    firebase.initializeApp(config);
    this.state = {
      database: firebase.database(),
      storage: firebase.storage(),
      uid: firebase.auth().currentUser.uid,
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
    addDiary = this.addDiary.bind(this);
  }

  componentDidMount() {
    // Do some shit to get the entries from firebase using
    var diary = this.props.navigation.state.params.diary.toString();
      this.state.database.ref('users/' + this.state.uid + '/diaries/' + diary).once('value').then((snapshot) => {
        snapshot.forEach((date) => {
          date.child('objects').forEach((object) => {
            var entries = this.state.entries;

            var day = (date.child('date').val().toString().split('-'))[2]
            var month = (date.child('date').val().toString().split('-'))[1]
            var year = (date.child('date').val().toString().split('-'))[0]

            var entry = {
              entry: object.child('entry').val().toString(),
              alignment: object.child('alignment').val().toString(),
              image: object.child('image').val().toString(),
              location: object.child('location').val().toString(),
              timeStamp: object.child('timeStamp').val().toString(),
              title: object.child('title').val().toString(),
              day: day,
              month: month,
              year: year

            }

            entries.push(entry)
            this.setState({entries: entries})

          })
        })
      })

    alert(JSON.stringify(this.state.entries))

    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({currentDate: {day: day, month: month, year: year}})
  }

  addDiary() {
    var dates = this.state.entries.map(obj => {
      return(obj.date)
    })
    var entry = null;
    for (var i = 0; i < this.state.entries.length; i++) {
      if (JSON.stringify(this.state.currentDate) == JSON.stringify(dates[i])) {
        entry = this.state.entries[i].entry;
      }
    }
    this.props.navigation.navigate('EditDiary', {diary: this.props.navigation.state.params.diary,
                                                 date: this.state.currentDate,
                                                 entry: entry})
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.params.diary}</Text>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
        {this.state.entries.length == 0 ?
          <View style={{flex: 1, alignContent: 'center', justifyContent:'center'}}>
            <Text style={{fontSize:40}}> Record your first entry! </Text>
          </View>
        :
          <ScrollView style={{flex: 1}}>
            {this.state.entries.map((dateEntry, i) => {
                return (<EntryBar
                          date={dateEntry.date}
                          navigation={this.props.navigation}
                          entry={dateEntry.entry}
                        >
                           <DiaryEntry
                            diary={this.props.navigation.state.params.diary}
                            date={dateEntry.date}
                            editable={false}
                            entry={dateEntry.entry}
                          />
                        </EntryBar>)
              })
            }
          </ScrollView>
        }
        <TouchableOpacity style = {styles.addButtonBox} onPress = {addDiary}>
          <Image style={styles.addButton} source={require('../res/icons/plus.png')}/>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  diaryText: {
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  dateText: {
    flex: 1,
    flexWrap: 'wrap',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 270,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summary: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  addButtonBox: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  addButton: {
    alignSelf: 'flex-end',
    flex: 1,
    height: 40,
    width: 40,
  },
  addButton2: {
    height: 40,
    width: 40,
  },
  button: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 50,
  },
  list: {
       justifyContent: 'center',
       flexWrap: 'wrap',
       flexDirection: 'row',
       height: 100,
   },
   cornerDate: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        height: 80,
        width: 80,
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
   diaryView: {
     flex:1,
     backgroundColor:'transparent',
   },
   entryBox : {
     padding: 5,
     flexDirection: 'row',
     backgroundColor: 'rgb(116, 156, 237)',
     margin: 10,
     borderRadius: 4,
     alignItems: 'flex-start'
   },
   chatTextView: {
     backgroundColor: 'transparent',
     flex: 1,
     padding     : 10,
     paddingTop  : 0
   },
   dateIcon: {
     height: 80,
     width: 80,
     backgroundColor: 'transparent',
     marginRight: 0,
     alignItems: 'center',
   },
   textInputTop: {
     flex: 1,
     fontWeight: 'bold',
     fontSize: 20,
     color: '#000'
   },
   textInputBottom: {
     flex: 1,
     fontSize: 20,
     color: 'rgb(77, 77, 77)'
   },
   nameLetter: {
     fontSize: 40,
     color: 'rgb(77, 77, 77)'
   },
   smallTouchable: {
     height: 20,
     width: 20,
     borderRadius: 10,
     position: 'absolute',
     backgroundColor: 'blue'
   }
});
