
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button,
  TouchableOpacity, ScrollView, Modal, Dimensions, CameraRoll, Animated} from 'react-native';
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

class EntryTile extends Component {
  constructor(props) {
    super(props);
    this.left = 10;
    this.right = width - 35 - width / 3;
    this.center = this.left + this.right / 2;
    this.minHeight = 150;
    switch(this.props.slide.alignment) {
      case "left":
        var x = this.left;
        break;
      case "right":
        var x = this.right;
        break;
      case "center":
        var x = this.center;
    }
    this.state = {
      animation: new Animated.Value(x),
      height: this.minHeight,
      alignmentHeight: (this.props.slide.alignment == "center" ? 150 : 0),
      slide: this.props.slide/*{title: "Title", text: "Text", image: require('../res/AdvenShare.png'), location: "Location"}*/,
      photos: this.props.photos,
      modalVisible: false,
      photoIndex: null,
    }

    this.textLeftStyle = {
      width: width * 2/3 - 45,
      left: width/3 + 15
    }
    this.textRightStyle = {
      width: width * 2/3 - 60,
      left: 5,
      right: 5
    }
    this.textCenterStyle = {
      left: 5,
      top: width * 1/3 + 20,
      width: width - 40
    }

    toggle = this.toggle.bind(this)
    // Will have alignment, title, location, image, text
  }

  _setMinHeight(event) {
      testHeight = event.nativeEvent.layout.height - this.state.alignmentHeight;
      this.setState({
          height : testHeight < this.state.height ? this.state.height : testHeight
      });
  }

  toggle(alignment) {
    switch(this.state.slide.alignment) {
      case "left":
        var initialValue = this.left;
        break;
      case "right":
        var initialValue = this.right;
        break;
      case "center":
        var initialValue = this.center;
    }
    switch(alignment) {
      case "left":
        var finalValue = this.left;
        break;
      case "right":
        var finalValue = this.right;
        break;
      case "center":
        var finalValue = this.center;
    }

    var newSlide = this.state.slide;
    newSlide.alignment = alignment;
    this.setState({
        slide : newSlide,
        alignmentHeight : (alignment == "center" ? 150 : 0)
    });

    this.state.animation.setValue(initialValue);
    Animated.timing(
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start();
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

  setTitle = (text) => {
    newSlide = this.state.slide;
    newSlide.title = text;
    this.setState({slide: newSlide})
  }

  setText = (text) => {
    newSlide = this.state.slide;
    newSlide.text = text;
    this.setState({slide: newSlide})
  }

  render() {
    var entryFlexDirection = this.state.slide.alignment == "center" ? 'column' : 'row';
    switch(this.state.slide.alignment) {
      case "left":
        var textStyle = this.textLeftStyle;
        break;
      case "right":
        var textStyle = this.textRightStyle;
        break;
      case "center":
        var textStyle = this.textCenterStyle;
    }

    return (
      <View>
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
        <View style={[styles.entryBox, {flexDirection: entryFlexDirection}]}>
          <View style={[{backgroundColor: '#841584', height: this.state.height + this.state.alignmentHeight}, textStyle]} onLayout={this._setMinHeight.bind(this)}>
            <TextInput editable={this.props.editable} onChangeText={(text) => this.setTitle(text)}>
              {this.state.slide.title}
            </TextInput>
            <TextInput editable={this.props.editable} onChangeText={(text) => this.setText(text)}>{this.state.slide.text}</TextInput>
          </View>
          <Animated.View style={[styles.photoBox,{left: this.state.animation}]}>
            <Image resizeMode="contain" style={{height: width/3 - 3, width: width/3 - 3}} source={this.state.slide.image}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{height: 10, width: 10, resizeMode: "contain", marginLeft: 10,marginRight: 10}} source={require('../res/icons/location.png')}/>
              <Text style={{flex: 1}}>{this.state.slide.location}</Text>
            </View>
          </Animated.View>
          {this.props.editable ?
            <View style={{bottom: 0, right: 0, position: 'absolute'}}>
              <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 2}]} onPress={() => this.props.updateSlide(this.state.slide)}>
                <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/star.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 22}]} onPress={() => this.toggle("right")}>
                <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/star.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 42}]} onPress={() => this.toggle("center")}>
                <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/star.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 62}]} onPress={() => this.toggle("left")}>
                <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/star.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallTouchable, {bottom: 2, right: 82}]} onPress={() => this.toggleModal()}>
                <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/star.png')}/>
              </TouchableOpacity>
            </View>
          : null}
        </View>
      </View>
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
        addingImage: false,
        modalVisible: false,
        photos: [],
        index: null,
        loaded: false,
        entry:  [{title: "Yo", text: "Hi", image: require('../res/AdvenShare.png'), location: "location", alignment: "left"},
                 {title: "Nah", text: "WOW", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "right"}]//this.props.navigation.state.params.entry
      };
      onPressLearnMore = this.onPressLearnMore.bind(this)
      sendFireBaseEntry = this.sendFireBaseEntry.bind(this)
      updateSlide = this.updateSlide.bind(this)
      addSlide = this.addSlide.bind(this);
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
          <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
          <Text>{this.props.navigation.state.params.diary} - {this.dateToText(this.props.navigation.state.params.date)}</Text>
          <ScrollView style={{flex: 1}}>
            {this.state.entry.map((slide, index) => {
                return ( <EntryTile
                            alignment="left"
                            photos={this.state.photos}
                            editable={true}
                            slide={slide}
                            updateSlide={(newSlide) => {this.updateSlide(newSlide, index)}}
                          />
                       )
              })
            }
          </ScrollView>
          <TouchableOpacity style = {styles.addButtonBox} onPress = {addSlide}>
            <Image style={styles.addButton} source={require('../res/icons/plus.png')}/>
          </TouchableOpacity>
        </View>
      );
          /*
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
      </View> */
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
      flex: 1,
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
     },
     photoBox: {
       width: width/3,
       height: width/3 + 15,
       backgroundColor: 'red',
       position: 'absolute'
     },
     smallTouchable: {
       height: 20,
       width: 20,
       borderRadius: 10,
       position: 'absolute',
       backgroundColor: 'blue'
     },
     entryBox : {
       padding: 5,
       backgroundColor: 'rgb(116, 156, 237)',
       margin: 10,
       borderRadius: 4,
       alignItems: 'stretch'
     },
     addButtonBox: {
       alignSelf: 'flex-end',
       position: 'absolute',
       bottom: 5,
       left: 5,
     },
  });
