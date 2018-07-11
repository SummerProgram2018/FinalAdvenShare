import React, {Component} from 'react';
import {Platform,
  StyleSheet,
  AppRegistry,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView} from 'react-native';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class AgendaDisplay extends Component {
  render() {
    return (
      <View style={styles.dayBox}>
        <Text style={styles.daytext}>
          {this.props.firstItemInDay}
        </Text>
        <View style={styles.displayBox}>

          <View style={styles.agendaTextView}>
            <TextInput editable={false} value={this.props.time} style={styles.timetext}/>
            <TextInput editable={false} value={this.props.title} style={styles.textInputTop}/>
            <TextInput editable={false} value={this.props.description} style={styles.textInputBottom}/>
          </View>
          <Image style={styles.image} source={this.props.iconName}/>
        </View>
      </View>
    )
  }
}

export default class Itinerary extends Component {
  render() {

    phoneIcon = require('../res/icons/sleep.png');
    coffeeIcon = require('../res/icons/coffee.png');
    friendIcon = require('../res/icons/sleep.png');
    accomIcon = require('../res/icons/accom.png');
    flightIcon = require('../res/icons/plane.png');
    drinkIcon = require('../res/icons/sleep.png');
    tourIcon = require('../res/icons/sleep.png');

    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../res/cloud.png')}/>
      <Agenda
        items={
          {'2018-07-01': [{time: '10:00', iconName: flightIcon, title: 'Flight', description: 'SA828 6hrs no stopover' },
            {time: '15:00', iconName: coffeeIcon, title: 'Coffee Stop', description: 'Top 10 best coffee stops'}],
           '2018-07-02': [],
           '2018-07-03': [{time: '06:00', iconName: flightIcon, title: 'Flight', description: 'SA323 2hrs no stopover' },
             {time: '12:00', iconName: coffeeIcon, title: 'Coffee Stop', description: 'Bullet Proof Coffee'},
             {time: '16:00', iconName: friendIcon, title: 'Catch-up', description: 'Meet with Han from contiki'},
             {time: '19:00', iconName: accomIcon, title: 'Check In', description: 'Check in to Hostel'}],
           '2018-07-04': [],
           '2018-07-05': [],
           '2018-07-06': [{time: '09:00', iconName: tourIcon, title: 'Tour', description: 'Great wall of China Climb' },
             {time: '16:00', iconName: phoneIcon, title: 'Call Home', description: 'Dont forget to call mum!'},
             {time: '19:00', iconName: drinkIcon, title: 'Pub Crawl', description: 'Leo Hostel Pub Crawl'}],
           '2018-07-07': [],
           '2018-07-08': [],
           '2018-07-09': [],
           '2018-07-10': [],
           '2018-07-11': [],
           '2018-07-12': [],
           '2018-07-13': [],
           '2018-07-14': [],
           '2018-07-15': [],
           '2018-07-16': [],
           '2018-07-17': [],
           '2018-07-18': [],
           '2018-07-19': [],
           '2018-07-20': [],
        }}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => {console.log('trigger items loading')}}
        // callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
        // callback that gets called on day press
        onDayPress={(day)=>{console.log('day pressed')}}
        // callback that gets called when day changes while scrolling agenda list
        onDayChange={(day)=>{console.log('day changed')}}
        // initially selected day
        selected={'2018-07-11'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2018-07-01'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2018-12-20'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={10}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={10}
        // specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) =>
          { return (<AgendaDisplay firstItemInDay={firstItemInDay} time={item.time} iconName={item.iconName}
                title={item.title} description={item.description}/>);}}

        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
      //  renderDay={(day, item) => {return (<AgendaDisplay day={day}/>);}}
      //  renderItem={(item, firstItemInDay) => {return (<AgendaDisplay firstItemInDay={firstItemInDay}/>);}}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={() => { return (<View />);}}
        // specify how agenda knob should look like
        renderKnob={() => {return (<View />);}}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData = {() => {return (<View />);}}
        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        refreshControl={null}
        time_proportional={true}
        // agenda theme
        theme={{
        }}
        // agenda container style
        style={{}}
        />
        </View>
    );
  }
}

AppRegistry.registerComponent('Itinerary', () => Itinerary);

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  list: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 100,
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
  dayBox: {
    backgroundColor: 'rgb(248, 248, 248)',
  },
  daytext: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 20,
  },
  displayBox: {
    padding: 5,
    height: 155,
    borderRadius: 9,
    flexDirection: 'row',
    backgroundColor: 'rgb(256, 256, 256)',
    margin: 10,
    alignItems:'center'
  },
  agendaTextView: {
    backgroundColor: 'rgb(256, 256, 256)',
    flex: 1
  },
  timetext: {
    flex:1,
    fontWeight: 'bold',
    color: 'rgb(32, 32, 32)',
    fontSize: 20,
  },
  image: {
   justifyContent: 'center',
   resizeMode:"contain",
   height: 70,
  },
  textInputTop: {
    flex: 1,
    fontSize: 20,
    color: 'rgb(80, 80, 80)'
  },
  textInputBottom: {
    flex: 1,
    fontSize: 15,
    color: 'rgb(128, 128, 128)'
  },
});
