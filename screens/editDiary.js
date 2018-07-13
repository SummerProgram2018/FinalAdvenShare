
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button,
  TouchableOpacity, ScrollView, Modal, Dimensions, CameraRoll, Animated} from 'react-native';
import DiaryEntry from '../components/diarycomp';
import NavigationButton from '../components/navigation';

export default class EditDiary extends Component<Props> {
  constructor (props, context) {
      super (props, context);
      this.state = {
        photos: [],
        index: null,
        loaded: false,
        entry:  this.props.navigation.state.params.entry
      };
      onPressLearnMore = this.onPressLearnMore.bind(this)
      sendFireBaseEntry = this.sendFireBaseEntry.bind(this)
      updateSlide = this.updateSlide.bind(this)
      addSlide = this.addSlide.bind(this);
      console.log(this.state.entry)
    }

    sendFireBaseEntry() {
      for (var i in this.state.entry) {
        alert('Sending: ' + JSON.stringify(this.state.entry))
        // Send entries to firebase here
      }
    }

    updateSlide(newSlide, index) {
      newEntry = this.state.entry;
      newEntry[index] = newSlide;
      this.setState({entry: newEntry}, () => {
        sendFireBaseEntry();
      })
    }

    onPressLearnMore() {
      this.setState({savedText: this.state.savedText + this.state.text + "\n"});
      this.setState({text: ""});
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      this.setState({date: day + '/' + month + '/' + year});
      {sendFireBaseEntry()}
    }

    componentDidMount() {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'All' /*Change this line if we want only photos (currently gets video too)*/
      })
      .then((r) => {
        this.setState({photos: r.edges})
      })
    }

    dateToText(date) {
      return (date.day + '/' + date.month + '/' + date.year)
    }

    addSlide() {
      const blankSlide = {title: "Title", text: "Text", image: null, location: "Location", alignment: "left"}
      var entry = this.state.entry;
      entry.push(blankSlide);
      this.setState({entry:entry})
    }

    render () {
      return (
        <View style={styles.container}>
        <ScrollView>
          <DiaryEntry
            editable={true}
            entry={this.props.navigation.state.params.entry}
            updateSlide={(newSlide) => {this.updateSlide(newSlide, index)}}
            navigation={this.props.navigation}
          />
        </ScrollView>
        <TouchableOpacity style = {styles.addButtonBox} onPress = {addSlide}>
          <Image style={styles.addButton} source={require('../res/icons/plus.png')}/>
        </TouchableOpacity>
        </View>
      );
    }
  }


var styles = StyleSheet.create({
    container:{
      flex:1,
      padding:5,
      borderRadius: 5
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
  });
