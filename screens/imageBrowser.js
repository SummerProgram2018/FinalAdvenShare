import React, {Component} from 'react';
import {Platform, StyleSheet, Modal, Text, View, Button, Image, CameraRoll, Dimensions, ScrollView} from 'react-native';

const { width } = Dimensions.get('window')

export default class ImageBrowser extends Component {
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
      <View style={styles.container}>
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
   photos: {
     width: 51,
     height: 51,
     resizeMode: 'contain'
   }
});
