import React, {Component} from 'react';
import { connect } from 'react-redux'
import { TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList, Button} from 'react-native'
import {timeToString} from '../utils/helpers';
import { fetchAllDecks } from '../utils/api'
import {receiveDecks} from '../actions/actions.js';

class ListOfDecks extends Component{
   constructor(props){
      super(props)
      this.state = {
      }
   }
   static navigationOptions = ({ navigation }) => {
   return {
      title: 'Deck List',
      headerRight: (<Button title='Add Deck' onPress={()=>(navigation.navigate('AddDeck'))}/>)
   }};
   componentDidMount(){
      const { receiveDecks, } = this.props;
      fetchAllDecks().then((data)=>{
         receiveDecks(data);
      });
   } 
   render(){
      const {decks, navigation} = this.props;
      let deckList = [];
         Object.entries(decks).forEach(([key, value]) => {
            deckList.push(value);
         });
      deckList.reverse();
      return (
         Object.keys(decks).length>0?      
            <View>
               <FlatList 
                  data={deckList} 
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

function mapStateToProps (decks) {
  return {
    decks
  }
}
function mapDispatchToProps (dispatch, { navigation }) {
  return {
      receiveDecks:(data) => dispatch(receiveDecks(data))
  }
}


export default connect(
  mapStateToProps,mapDispatchToProps
)(ListOfDecks)

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