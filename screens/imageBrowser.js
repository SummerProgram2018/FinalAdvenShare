import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, CameraRoll} from 'react-native';

export default class ImageBrowser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false,
      photos: [],
      index: null
    }
    getPhotos = this.getPhotos.bind(this)
    componentDidMount = this.componentDidMount.bind(this)
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 4,
      assetType: 'All' /*Change this line if we want only photos (currently gets video too)*/
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  componentDidMount() {
    this.getPhotos();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.photos}
          source={this.state.photos}
        />
        <Text>Image Browser</Text>
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
   photos: {
     width: 51,
     height: 51,
     resizeMode: 'contain'
   }
});
