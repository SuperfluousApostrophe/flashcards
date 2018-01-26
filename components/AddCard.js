import React, {Component} from 'react';
import { connect } from 'react-redux'
import { TextInput, StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import { AppLoading} from 'expo'
import { addCardToDeck } from '../utils/api'
import {addCard, dumpCards} from '../actions/actions.js'

class AddCard extends Component{
   static navigationOptions = ({ navigation }) => ({
      title: `Add a Card`,
   });
   constructor(props){
      super(props);
      this.state = {
         deck:{},
         question:'',
         answer:'',
         isReady:false
      };
   }
   componentDidMount(){
      const {selectedDeck, deckId, } = this.props;
      this.setState({deck:selectedDeck, isReady:true});
   }
   submit(deckId){
       const {navigation, selectedDeck, addCard } = this.props;
      let card = {question:this.state.question, answer:this.state.answer};
      addCardToDeck(deckId, selectedDeck, card).then((result)=>{
         addCard({id:deckId, card:card});
         navigation.goBack();
      });
   }
   render(){
      const {navigation, deckId} = this.props;
      const {isReady, deck} = this.state;
      if(!isReady){
          return <AppLoading />
      } else {
      return(
         <View style={styles.container} >
            <Text style={styles.screenTitle} >{deck.deckName}</Text>
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
//                           console.log(this.state);
                        this.submit(deckId);
                     }
                  }  >
                  <Text style={styles.button}>Add Card</Text>
               </TouchableOpacity>
               </View>
         </View>    
      );
      }
   }
      
};

function mapStateToProps (decks, { navigation }) {
   return {
      decks,
      selectedDeck: decks[navigation.state.params.key],
      deckId: navigation.state.params.key 
   };
}

function mapDispatchToProps (dispatch, { navigation }) {

  return {
      addCard:(data) => dispatch(addCard(data)),
      dumpCards:(data) => dispatch(dumpCards(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCard)



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

