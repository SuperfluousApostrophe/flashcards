import React, {Component} from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { fetchSingleDeck } from '../utils/api'
import { AppLoading} from 'expo'

export default class AddCard extends Component{
   constructor(props){
      super(props);
      this.state = {
         deck:{},
         question:'',
         answer:'',
         isReady:false
      };
   }
   componentDidlMount(){
      console.log('Component mounted');
      console.log(this.props.navigation.state.params.key);
      fetchSingleDeck(this.props.navigation.state.params.key).then((data)=>{
//         deck = data;
         console.log('fetched deck');
         console.log(data);
         this.setState({deck:data, isReady:true});
      });
   }
   submit(deckId){
      let card = {question:this.state.question, answer:this.state.answer};
      let deck = this.state.deck;
      deck.cards.push(card);
      console.log(deck);
      //now merge
   }
   render(){
      const {navigation} = this.props;
      const deck = this.state.deck;
      const key = navigation.state.params.key;
      const {isReady} = this.state;
      if(isReady){
          return <AppLoading />
      }
      return(
         <View style={styles.container} >
            <Text style={styles.screenTitle} >Add a Card to {deck.deckName}</Text>
             <View style={styles.screenContentView}>
               <Text>Enter a Question</Text>
               <TextInput 
                  style={styles.textBox} 
                  maxLength={40}  
                  value={this.state.question} 
                  onChangeText={(question)=>this.setState({question})}/>
                <Text>Enter an Answer</Text>
               <TextInput  style={styles.textBox}  maxLength={40} value={this.state.answer} 
                  onChangeText={(answer)=>this.setState({answer})} />
               <TouchableOpacity style={styles.container} 
                  onPress={ ()=> {
                        console.log(this.state);
                        this.submit(key);
                        //navigation.navigate('DeckView')
                     }
                  } >
                  <Text style={styles.button}>Add Card</Text>
               </TouchableOpacity>
               </View>
         </View>    
      );
   }
      
};
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

