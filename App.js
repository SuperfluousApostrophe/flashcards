import React from 'react';
import { TextInput, StyleSheet, Text, View, Platform, StatusBar, FlatList,TouchableOpacity } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import reducer from './reducers'
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
//import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { submitEntry } from './utils/api'
import { NavigationActions } from 'react-navigation'
import { AddDeck } from './components/AddDeck'

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
      <AddDeck />
      :
         <View style={styles.container} >
            <Text style={styles.noDecksAvail}>You have not added any Decks yet!</Text>
          </View>
    );
}

function AddCard({navigation}){
   return (
      <View style={styles.container} >
         <Text style={styles.screenTitle} >Add a Card</Text>
          <View style={styles.screenContentView}>
            <Text>Enter a Question</Text>
            <TextInput style={styles.textBox} maxLength={40}  />
             <Text>Enter an Answer</Text>
            <TextInput  style={styles.textBox}  maxLength={40} />
            <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('DeckView')}>
               <Text style={styles.button}>Add Card</Text>
            </TouchableOpacity>
            </View>
      </View>        
   );
}
function ViewDeck({navigation}){
   return (
      <View style={styles.container} >
         <Text style={styles.deckListTitle} >Deck Name</Text>
         <Text style={styles.deckListCardCount}>15 Cards</Text>
         <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
            <TouchableOpacity style={{marginRight:5}} onPress={()=>navigation.navigate('AddCard')}>
               <Text style={styles.button}>Add Card</Text>
            </TouchableOpacity>
             <TouchableOpacity  style={{marginLeft:5}} onPress={press}>
               <Text style={styles.button}>Quiz Me!</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}
function press(){
   console.log('pressed');
}
const Tabs = TabNavigator({
   Home:{
      screen: ListOfDecks,
      navigationOptions:{
         tabBarLabel:'View Decks'
      }
   }, 
   
});
const MainNavigator = StackNavigator({
   Home:{
      screen: Tabs
   },
   AddCard:{
      screen: AddCard,
   },
   DeckView:{
      screen: ViewDeck
   },
   
});
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
