import React, {Component} from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { fetchSingleDeck } from '../utils/api'
import { AppLoading} from 'expo'


class ViewDeck extends Component{
   static navigationOptions = ({ navigation }) => ({
      title: 'Viewing Deck',
   });
   constructor(props){
      super(props)
      this.state = {
        isReady: false, 
      }
   }
   componentDidMount(){
       this.setState({isReady:true,});
   }
   render(){
      const {isReady, } = this.state;
      const {navigation, selectedDeck, deckId} = this.props;
      if(!isReady){
         return <AppLoading />
      } else {
         return (
            <View style={styles.container} >
               <Text style={styles.deckListTitle} >{selectedDeck.deckName}</Text>
               <Text style={styles.deckListCardCount}>{selectedDeck.cards.length} Cards</Text>
               <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
                  <TouchableOpacity style={{marginRight:5}} onPress={()=>navigation.navigate('AddCard', {key:deckId})}>
                     <Text style={styles.button}>Add Card</Text>
                  </TouchableOpacity>
                   <TouchableOpacity  style={{marginLeft:5}} >
                     <Text style={styles.button}>Quiz Me!</Text>
                  </TouchableOpacity>
               </View>
            </View>
         );
      }
   }
}

function mapStateToProps (decks, { navigation }) {
   return {
      selectedDeck: decks[navigation.state.params.key],
      deckId: navigation.state.params.key 
   };
}

export default connect(
  mapStateToProps,
)(ViewDeck)


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