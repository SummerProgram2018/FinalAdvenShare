/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
import entryInfo from '../components/diarycomp';
import NavigationButton from '../components/navigation';

class DiaryTextInput extends Component{
  render () {
    return (
      <TextInput
      {...this.props} //Inherit any properties passed
      editable = {true}
      maxLength = {100}
      multiline = {true}
      numberOfLines = {10}
      />
    );
  }
}



class DiaryEntry extends Component<Props> {
  constructor (props, context) {
      super (props, context);
      this.state = {
        text: 'Enter your diary text here',
        savedText: '',
        date: '',
      };
      onPressLearnMore = this.onPressLearnMore.bind(this)
      sendFireBaseEntry = this.sendFireBaseEntry.bind(this)
    }

    sendFireBaseEntry() {
      alert(
        'Sending caption, date, images[] to fireBase',
        [
          {text: 'Ok', onPress: () => console.log('Ok pressed')},
        ],
        {cancelable: false}
      )
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

    render () {
      return (
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          <TextInput
            blurOnSubmit = {false}
            style = {{height: 80, width: 400, borderColor: 'blue', borderWidth: 1}}
            onChangeText = {(text) => this.setState({text})}
            value = {this.state.text}
          />
          <View style={styles.button}>
          <Button
            title = "Save Entry"
            color = "#841584"
            onPress={onPressLearnMore}
            />
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ImageBrowser')}>
              <Text>HI</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
          <Text> {this.state.date} </Text>
          <Text style={{backgroundColor: 'transparent'}}> {this.state.savedText} </Text>
          <Image
            source = {require('../res/meavatar.png')}
            style = {{width: '30%', height: 100}}
          />
          </View>
        </View>
      );
    }
  }

export default class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      searchText: 'Search',
      numEntries: 0,
      date: 'whoops',
    };
      onPressEdit = this.onPressEdit.bind(this)
  }

  onPressEdit() {
    this.setState({adding: true});
  }

  componentDidMount() {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({date: day + '/' + month + '/' + year});
    //Use this.props.navigation.state.params.diary to poll firebase for data
    //Populate the state using this data
  }

  render () {
    return(
      <View>
      <Text>{this.props.navigation.state.params.diary}</Text>
      {this.state.adding ? <DiaryEntry navigation={this.props.navigation}/> :
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          <View style = {styles.list}>
          <TextInput
            blurOnSubmit = {false}
            style = {{height: 40, width: 400, backgroundColor: 'transparent', borderColor: 'blue', borderWidth: 1}}
            onChangeText = {(searchText) => this.setState({searchText})}
            value = {this.state.searchText}
          />
          </View>
          <View style = {styles.list}>
            <Image style={{height: 80, width: 350}} source = {require('../res/icons/BoxMyDiary.png')}/>
            <Text style={styles.dateText}> {this.state.date} </Text>
            <Text style={styles.diaryText}> "This is my diary entry something something lol hey adrian's waterproof again" </Text>
          </View>
          <View style = {styles.list}>
            <TouchableOpacity style = {styles.addButton} onPress = {onPressEdit}>
              <Image style={styles.addButton} source = {require('../res/icons/plus.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      }
      </View>
    )
  }
}


class DiaryBar extends Component {
  render() {
    return (
      <View style={styles.chatBox}>
        <View style={styles.chatIcon}>
          <Text style={styles.nameLetter}>
            C
          </Text>
        </View>
        <View style={styles.chatTextView}>
          <TextInput editable={false} value={this.props.name} style={styles.textInputTop}/>
        </View>
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
  addButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
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
   chatBox: {
     padding: 5,
     height: 100,
     flexDirection: 'row',
     backgroundColor: 'red',
     margin: 10,
     alignItems:'center'
   },
   chatTextView: {
     backgroundColor: 'blue',
     flex: 1
   },
   chatIcon: {
     height: 80,
     width: 80,
     borderRadius: 80/2,
     backgroundColor: 'white',
     marginRight: 10,
     alignItems: 'center',
     justifyContent: 'center'
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
   }
});
