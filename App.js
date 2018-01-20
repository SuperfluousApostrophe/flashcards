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

import { fetchAllDecks } from './utils/api'

function DeckListItem({item, navigation}){
   const {title, cardCount} = item;
   return (
      <View style={styles.deckListItem}>
         <TouchableOpacity onPress={()=>navigation.navigate('DeckView')}>
            <Text style={styles.deckListTitle}>{title}</Text>
            <Text style={styles.deckListCardCount}>{cardCount} Cards</Text>
         </TouchableOpacity>
         </View>
   );
}
function FlashCardStatusBar () {
   const backgroundColor ='#d3d3d3';
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle="light-content"  />
    </View>
  )
}
function ListOfDecks({navigation}){
   let decks = [
         {
            title: 'Deck 1',
            cardCount: 15,
            id:0
         },
         {
            title: 'Deck 2',
            cardCount: 4,
            id:1
         },
         {
            title: 'Deck 3',
            cardCount: 8,
            id:2
         },
         {
            title: 'Deck 4',
            cardCount: 15,
            id:3
         },
         {
            title: 'Deck 5',
            cardCount: 53,
            id:4
         }, 
         {
            title: 'Deck 6',
            cardCount: 15,
            id:5
         },
         {
            title: 'Deck 7',
            cardCount: 4,
            id:6
         },
      ];
   return (
     decks.length>0?      
      <View>
         <FlatList 
            data={decks} 
            renderItem={({item})=>{
               return DeckListItem({item, navigation});
            }} 
            keyExtractor={DeckListItem => DeckListItem.id} 
            
         />
      </View>
      :
         <View style={styles.container} >
            <Text style={styles.noDecksAvail}>You have not added any Decks yet!</Text>
          </View>
    );
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
const Tabs = TabNavigator({
   Home:{
      screen: ListOfDecks,
      navigationOptions:{
         tabBarLabel:'View Decks'
      }
   }, 
   AddDeck:{
      screen: AddDeck,
      navigationOptions:{
         tabBarLabel:'Add Deck'
      }
   }
});
const MainNavigator = StackNavigator({
   Home:{
      screen: Tabs
   },
   AddCard:{
      screen: AddCard,
   },
   DeckView:{
      screen: DeckView
   },
   
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
