import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { fetchSingleDeck } from '../utils/api'
import { AppLoading} from 'expo'


export default class ViewDeck extends Component{
   static navigationOptions = ({ navigation }) => ({
      title: 'Viewing Deck',
   });
   constructor(props){
      super(props)
      this.state = {
        deck:{deckName:'', id:'', cards:[]},
        isReady: false, 
        key:''
      }
   }
   componentDidMount(){
//      BackHandler.addEventListener('hardwareBackPress',()=>{
//         const resetAction = NavigationActions.reset({
//            index: 0,
//            actions: [
//              NavigationActions.navigate({ routeName: 'Home'})
//            ]
//          });
//      
//         this.props.navigation.dispatch(resetAction);
//      });
//      console.log('Component mounted');
      const key = this.props.navigation.state.params.key;
//      console.log(key);
//      this.setState({key:key});
//      console.log(this.state.key);
      fetchSingleDeck(key).then((data)=>{
//         deck = data;
//         console.log('fetched deck');
//         console.log(data);
         this.setState({deck:data, isReady:true, key:key});
      });
   }
   render(){
      const {deck, isReady, key} = this.state;
      const navigation = this.props.navigation;
      if(!isReady){
         return <AppLoading />
      } else {
         return (
            <View style={styles.container} >
               <Text style={styles.deckListTitle} >{deck.deckName}</Text>
               <Text style={styles.deckListCardCount}>{deck.cards.length} Cards</Text>
               <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
                  <TouchableOpacity style={{marginRight:5}} onPress={()=>navigation.navigate('AddCard', {key})}>
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