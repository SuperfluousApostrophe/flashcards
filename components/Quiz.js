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
         currentCard:0,
         quizComplete: false
      }
       this.scoreCard = this.scoreCard.bind(this);
       this.resetQuiz = this.resetQuiz.bind(this);
   }
   incrementCard(){
      console.log(this.state.currentCard);
      let newIndex = this.state.currentCard;  
      newIndex++;
      if(newIndex<this.state.total){
         this.setState({currentCard:newIndex});
      } else {
        this.setState({quizComplete:true});
      }
   }
   scoreCard(result){
      if(result){
         this.setState({correct:(this.state.correct+1)});
      }
      this.incrementCard();
   }
   resetQuiz(){
      this.setState({
         correct:0,
         currentCard:0,
         quizComplete: false
      });
   }
   componentDidMount(){
      const {selectedDeck} = this.props;
      this.setState({total:selectedDeck.cards.length});
      
   }
   render(){
      const {selectedDeck, navigation} = this.props;
      const {quizComplete} = this.state;
      const goBack = navigation.goBack;
         return (
            <View style={styles.container} >
               <Text style={styles.deckListTitle} >Quizzing: {selectedDeck.deckName}</Text>
               {!quizComplete?
                  <QuizItem card={selectedDeck.cards[this.state.currentCard]} scoreCard={this.scoreCard}/>
               :
                  <Results correct={this.state.correct} total={this.state.total} resetQuiz={this.resetQuiz} goBack={goBack}/>
               }
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


function Results({correct, total, resetQuiz, goBack}){
   return (
      <View>
          <View style={{flexDirection:'row', textAlign:'center', alignItems:'center', marginTop:30}}>
            <Text>Results: You got {correct}/{total} Correct!</Text>
         </View>
         <View style={{flexDirection:'row', textAlign:'center', alignItems:'center', marginTop:30}}>
            <TouchableOpacity style={{marginRight:5}} onPress={()=>{resetQuiz()}} >
               <Text style={styles.button}>Start Over</Text>
            </TouchableOpacity>
             <TouchableOpacity  style={{marginLeft:5}} onPress={()=>{goBack()}} >
               <Text style={styles.button}>Back to Deck</Text>
            </TouchableOpacity>
         </View>   
      </View>
   );
}

class QuizItem extends Component{
   constructor(props){
      super(props)
      this.state = {
         showAnswer:false
      }
   }
   showAnswer(){
      this.setState({
         showAnswer:true
      });
   }
   hideAnswer(){
      this.setState({
         showAnswer:false
      });
   }
   render(){
      
      const {card, scoreCard} = this.props;
      const {showAnswer} = this.state;
      return (
         <View >
            <Text style={styles.deckListTitle}>{card.question}</Text>
            {showAnswer?
               <Text style={styles.deckListCardCount}>{card.answer}</Text>
            :
               <TouchableOpacity onPress={()=>{this.showAnswer()}} >
                  <Text style={styles.button}>Show Answer</Text>
               </TouchableOpacity>
            }
            <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
                 <TouchableOpacity style={{marginRight:5}} onPress={()=>{this.hideAnswer(),scoreCard(true)}} >
                    <Text style={styles.button}>Correct</Text>
                 </TouchableOpacity>
                  <TouchableOpacity  style={{marginLeft:5}} onPress={()=>{this.hideAnswer(),scoreCard(false)}}>
                    <Text style={styles.button}>Incorrect</Text>
                 </TouchableOpacity>
              </View>
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
     backgroundColor:'#d3d3d3',
     textAlign:'center'
     
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