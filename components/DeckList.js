import React, {Component} from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList, Button} from 'react-native'
import {timeToString} from '../utils/helpers';
import { fetchAllDecks } from '../utils/api'

export default class ListOfDecks extends Component{
   constructor(props){
      super(props)
      this.state = {
         decks:[]
      }
   }
   static navigationOptions = ({ navigation }) => {
   console.log(navigation);
   return {
      title: 'Deck List',
      headerRight: (<Button title='Add Deck' onPress={()=>(navigation.navigate('AddDeck'))}/>)
   }};
   componentDidMount(){
//      console.log('Component mounted');
      fetchAllDecks().then(data=>{
         let deckList = [];
         Object.entries(data).forEach(([key, value]) => {
            deckList.push(value);
         });
//         console.log('got data', deckList);
         this.setState({decks:deckList});
//         console.log(this.state);
      });
   } 
   render(){
      const {decks} = this.state;
      const {navigation} = this.props;
      return (
         decks.length>0?      
            <View>
               <FlatList 
                  data={decks} 
                  renderItem={({item})=>{
                     return DeckListItem({item, navigation});
                  }} 
                  keyExtractor={(item, index) => index} 

               />
            </View>
         :
            <View style={styles.container} >
               <Text style={styles.noDecksAvail}>You have not added any Decks yet!</Text>
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

function DeckListItem({item, navigation}){
//   console.log(item);
   const {deckName, cards, id} = item;
   let cardCount = cards.length;
   return (
      <View style={styles.deckListItem}>
         <TouchableOpacity onPress={()=>navigation.navigate('DeckView',  { key:id })}>
            <Text style={styles.deckListTitle}>{deckName}</Text>
            <Text style={styles.deckListCardCount}>{cardCount} Cards</Text>
         </TouchableOpacity>
         </View>
   );
}