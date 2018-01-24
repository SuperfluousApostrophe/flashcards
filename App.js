import React, {Component}from 'react';
import { TextInput, StyleSheet, Text, View, Platform, StatusBar, FlatList,TouchableOpacity } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import reducer from './reducers'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
//import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { NavigationActions } from 'react-navigation'
import  AddDeck  from './components/AddDeck.js'
import  AddCard  from './components/AddCard.js'
import  DeckView  from './components/DeckView.js'
import  DeckList  from './components/DeckList.js'

import { fetchAllDecks } from './utils/api'

function FlashCardStatusBar () {
   const backgroundColor ='#d3d3d3';
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle="light-content"  />
    </View>
  )
}


function press(){
   console.log('pressed');
}

export default class App extends React.Component {
   state = {
      
   };   
   
  render() {
    return (
      <View style={{flex: 1}}>
          <FlashCardStatusBar/>
         <MainNavigator />      
      </View>
      
    );
  }
}
//const Tabs = TabNavigator({
//   Home:{
//      screen: DeckList,
//      navigationOptions:{
//         tabBarLabel:'View Decks'
//      }
//   }, 
//   AddDeck:{
//      screen: AddDeck,
//      navigationOptions:{
//         tabBarLabel:'Add Deck'
//      }
//   }
//});
const MainNavigator = StackNavigator({
   Home:{
      screen: DeckList
   },
   AddCard:{
      screen: AddCard,
   },
   DeckView:{
      screen: DeckView
   },
   AddDeck:{
      screen: AddDeck,
      navigationOptions:{
         tabBarLabel:'Add Deck'
      },
   }
   
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
//    justifyContent: 'center',
  },
  screenContentView: {
      alignItems: 'center',
    justifyContent: 'center',
   flex: 1,
   width:'100%',
  },
  deckListItem:{
     paddingLeft:30,
     paddingRight:30,
     paddingTop:15,
     paddingBottom:15,
     marginBottom:15,
     justifyContent: 'center',
     backgroundColor:'#d3d3d3'
  },
  noDecksAvail: {
      alignItems: 'center',
      justifyContent: 'center',
     flex: 1,
     width:'80%',
     fontWeight:'bold',
     textAlign:'center',
     fontSize:40,
     
  },
  deckListTitle:{
      fontSize:40,
      textAlign: 'center',
   },
   deckListCardCount:{
      fontSize:20,
       textAlign: 'center',
   },
   button:{
      paddingLeft:30,
     paddingRight:30,
     paddingTop:15,
     paddingBottom:15,
     marginBottom:15,
     justifyContent: 'center',
     backgroundColor:'#d3d3d3'
   },
   textBox:{
      width:'80%',
      height:50,
     marginBottom:15,
   },
   screenTitle:{
      marginBottom:50,
      fontSize:25,
      fontWeight:"bold",
   }
});
