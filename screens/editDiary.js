
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button,
  TouchableOpacity, ScrollView, Modal, Dimensions, CameraRoll} from 'react-native';
import entryInfo from '../components/diarycomp';
import NavigationButton from '../components/navigation';

const { width } = Dimensions.get('window')

export class ImageBrowser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false,
      photos: [],
      index: null,
      loaded: false,
    }
    toggleModal = this.toggleModal.bind(this);
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  componentDidMount() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All' /*Change this line if we want only photos (currently gets video too)*/
    })
    .then((r) => {
      this.setState({ photos: r.edges, modalVisible: true })
    })
  }

  render() {
    return (
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <Button
            title="Close"
            onPress={this.toggleModal}
          />
          <ScrollView style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {this.state.photos.map((p, i) => {
              return (
                <Image style={{width: width/3, height:width/3}}
                  source={{uri: p.node.image.uri}}
                />
              )
            })}
          </ScrollView>
        </Modal>
    )
  }
}




export default class DiaryEntry extends Component<Props> {
  constructor (props, context) {
      super (props, context);
      this.state = {
        text: 'Enter your diary text here',
        savedText: '',
        date: '',
        firstImage: false,
        editable: false,
        addingImage: false,
        modalVisible: false,
        photos: [],
        index: null,
        loaded: false,

      };
      onPressLearnMore = this.onPressLearnMore.bind(this)
      sendFireBaseEntry = this.sendFireBaseEntry.bind(this)
      toggleModal = this.toggleModal.bind(this);
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

    setIndex = (index) => {
      if (index === this.state.index) {
        index = null
      }
      this.setState({ index })
    }

    toggleModal = () => {
      this.setState({ modalVisible: !this.state.modalVisible });
    }

    componentDidMount() {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'All' /*Change this line if we want only photos (currently gets video too)*/
      })
      .then((r) => {
        this.setState({ photos: r.edges, modalVisible: true })
      })
    }

    render () {
      return (
        <View>
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
            <TouchableOpacity onPress={()=>this.setState({addingImage: true})}>
              <Text>HI</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
          <Text> {this.state.date} </Text>
          <Text style={{backgroundColor: 'transparent'}}> {this.state.savedText} </Text>
          {!this.state.addingImage ? null :
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => console.log('closed')}
            >
              <Button
                title="Close"
                onPress={this.toggleModal}
              />
              <ScrollView style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {this.state.photos.map((p, i) => {
                  return (
                    <Image style={{width: width/3, height:width/3}}
                      source={{uri: p.node.image.uri}}
                    />
                  )
                })}
              </ScrollView>
            </Modal>
          }
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
     },
     photos: {
       width: 51,
       height: 51,
       resizeMode: 'contain'
     }
  });
