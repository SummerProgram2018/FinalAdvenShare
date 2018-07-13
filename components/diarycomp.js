import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput, Button,
  TouchableOpacity, ScrollView, Modal, Dimensions, CameraRoll, Animated} from 'react-native';
import entryInfo from '../components/diarycomp';
import NavigationButton from '../components/navigation';

const { width } = Dimensions.get('window')

class EntryTile extends Component {
  constructor(props) {
    super(props);
    this.minHeight = 150;
    this.state = {
      height: this.minHeight,
      alignmentHeight: (this.props.slide.alignment == "center" ? 150 : 0),
      slide: this.props.slide/*{title: "Title", text: "Text", image: require('../res/AdvenShare.png'), location: "Location"}*/,
      photos: this.props.photos,
      modalVisible: false,
      photoIndex: null,
      viewWidth: null
    }
    _setViewWidth = this._setViewWidth.bind(this);

    toggle = this.toggle.bind(this)
    // Will have alignment, title, location, image, text
  }

  _setMinHeight(event) {
      testHeight = event.nativeEvent.layout.height - this.state.alignmentHeight;
      this.setState({
          height : testHeight < this.state.height ? this.state.height : testHeight
      });
  }

  _setViewWidth(event) {
    viewWidth = event.nativeEvent.layout.width;
    this.left = 10;
    this.right = 2/3 * (viewWidth - 20) + 10 ;//viewWidth - 35 - viewWidth / 3;
    this.center = 1/2 * viewWidth - (viewWidth / 6);
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
    this.setState({
      viewWidth: event.nativeEvent.layout.width,
      animation: new Animated.Value(x)
    })
    this.textLeftStyle = {
      width: viewWidth * 2/3,
      left: viewWidth/3 + 15
    }
    this.textRightStyle = {
      width: viewWidth * 2/3,
      right: viewWidth/3 + 15,
      left: 0
    }
    this.textCenterStyle = {
      left: 0,
      top: viewWidth / 3 + 30,
      width: viewWidth,
    }
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

    if (this.state.viewWidth == null) {
      // Find the view width before trying to render the rest of the diary entry
      return <View style={{flex: 1}} style={{height: 170 + this.state.alignmentHeight}} onLayout={this._setViewWidth.bind(this)}/>
    } else {
      return (
        <View style={{height: this.state.height + this.state.alignmentHeight, backgroundColor: 'white'}}>
          {this.props.photos != null ?
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
          : null}
          <View style={[styles.entryBox, {flexDirection: entryFlexDirection}]}>
            <View style={[{backgroundColor: 'white', height: this.state.height + this.state.alignmentHeight}, textStyle]} onLayout={this._setMinHeight.bind(this)}>
              <TextInput style = {{fontWeight: 'bold', color: 'black'}} editable={this.props.editable} onChangeText={(text) => this.setTitle(text)}>
                {this.state.slide.title}
              </TextInput>
              <TextInput style = {{color: 'grey', multiline: true}} editable={this.props.editable} onChangeText={(text) => this.setText(text)}>{this.state.slide.text}</TextInput>
            </View>
            <Animated.View style={[styles.newBox, {left:this.state.animation, backgroundColor: 'white', justifyContent: 'center'}]}>
              <Image resizeMode="stretch" style={{height: this.state.viewWidth/3 - 3, width: this.state.viewWidth/3 - 3}} source={this.state.slide.image}/>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{height: 10, width: 10, resizeMode: "contain", marginLeft: 10,marginRight: 10}} source={require('../res/icons/location.png')}/>
                <Text style={{flex: 1}}>{this.state.slide.location}</Text>
              </View>
            </Animated.View>
            {this.props.editable ?
              <View style={{bottom: 0, right: 0, position: 'absolute', flexDirection: 'row'}}>
                <TouchableOpacity  onPress={() => this.toggleModal()}>
                  <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/ClickCamera.png')}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.toggle("left")}>
                  <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/ClickLeft.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.toggle("center")}>
                  <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/ClickCenter.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.toggle("right")}>
                  <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/ClickRight.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.updateSlide(this.state.slide)}>
                  <Image style={{height: 20, width: 20, resizeMode: 'contain'}} source={require('../res/icons/ClickPencil.png')}/>
                </TouchableOpacity>
              </View>
            : null}
          </View>
        </View>
      )
    }
  }

}



export default class DiaryEntry extends Component<Props> {
  constructor (props, context) {
      super (props, context);
      this.state = {
        text: 'Enter your weird Diary text here',
        savedText: '',
        date: '',
        firstImage: false,
        addingImage: false,
        modalVisible: false,
        photos: [],
        index: null,
        loaded: false,
        entry:  this.props.entry /*[{title: "Yo", text: "Hi", image: require('../res/AdvenShare.png'), location: "location", alignment: "left"},
                 {title: "Nah", text: "WOW", image: require('../res/AdvenShare.png'), location: "lolcation", alignment: "right"}]*///this.props.navigation.state.params.entry
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
        <View style={{}}>
          {this.state.entry.map((slide, index) => {
              return ( <EntryTile
                          editable={this.props.editable}
                          slide={slide}
                          updateSlide={(newSlide) => {this.updateSlide(newSlide, index)}}
                        />
                     )
            })
          }
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
  },
  summary: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
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
  button: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 50,
  },
  newBox: {
    backgroundColor: 'transparent',
    position: 'absolute',
    margin: 5
  }
});
