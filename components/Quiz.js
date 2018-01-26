import React, {Component} from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'

class Quiz extends Component{
   static navigationOptions = ({ navigation }) => ({
      title: 'Flashcard Quiz',
   });
   constructor(props){
      super(props)
      this.state = {
         correct:0,
         total:0, 
         currentCard:0
      }
   }
   incrementCard(){
      console.log(this.state);
//      let newIndex = this.state.currentCard;
//      console.log(newIndex);
//      this.setState({currentCard:newIndex});
   }
   componentDidMount(){
      const {selectedDeck} = this.props;
      this.setState({total:selectedDeck.cards.length});
      
   }
   render(){
      const {selectedDeck} = this.props;
//      console.log(`SelectedDeck (${selectedDeck.cards.length})`,selectedDeck.cards);
         return (
            <View style={styles.container} >
               <Text style={styles.deckListTitle} >Quizzing: {selectedDeck.deckName}</Text>
               <QuizItem card={selectedDeck.cards[this.state.currentCard]} increment={this.incrementCard}/>
               <Results correct={this.state.correct} total={this.state.total} />
            </View>
         );
   }
}

function mapStateToProps (decks, { navigation }) {
   return {
      selectedDeck: decks[navigation.state.params.key],
   };
}

export default connect(
  mapStateToProps,
)(Quiz)


function Results({correct, total}){
   return (
      <View>
         <Text style={styles.deckListTitle} >Results: You got {correct}/{total} Correct!</Text>
         <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
            <TouchableOpacity style={{marginRight:5}} >
               <Text style={styles.button}>Start Over</Text>
            </TouchableOpacity>
             <TouchableOpacity  style={{marginLeft:5}} >
               <Text style={styles.button}>Back to Deck</Text>
            </TouchableOpacity>
         </View>   
      </View>
   );
}
function QuizItem({card, increment}){
   return (
      <View >
            <Text style={styles.deckListTitle}>{card.question}</Text>
            <Text style={styles.deckListCardCount}>{card.answer}</Text>
         <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
               <TouchableOpacity>
                  <Text style={styles.button}>Show Answer</Text>
               </TouchableOpacity>
         </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
               <TouchableOpacity style={{marginRight:5}} onPress={()=>increment()} >
                  <Text style={styles.button}>Correct</Text>
               </TouchableOpacity>
                <TouchableOpacity  style={{marginLeft:5}} >
                  <Text style={styles.button}>Incorrect</Text>
               </TouchableOpacity>
            </View>
      </View>
   );
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