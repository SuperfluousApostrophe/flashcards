import React, {Component} from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {timeToString} from '../utils/helpers';
import { createDeck } from '../utils/api'

export default class AddDeck extends Component{
   static navigationOptions = ({ navigation }) => ({
      title: `Add a New Deck`,
   });

   constructor(props){
      super(props)
      this.state = {
         deckName:'',
         cards:[], 
         id:'',
         saved:false,
         
      }
   }
   submit(){
      const entry = this.state;
      const key = timeToString();
//      console.log("Key=>"+key);
      entry.id = key;
      createDeck({entry, key}).then(result=>{
         
         this.setState({saved:true});
//         console.log("entry submitted");
//         console.log(result);
      });
      return key;
   }
   render(){
      const {navigation} = this.props
      
      return (
         <View style={styles.container} >
             <View style={styles.screenContentView}>
                  <Text>Give your Deck a Name!</Text>
                  <TextInput 
                     style={styles.textBox} 
                     maxLength={40} 
                     value={this.state.deckName} 
                     onChangeText={(deckName)=>this.setState({deckName})}
                  />
                 <TouchableOpacity onPress={()=>{
                        if(!this.state.saved){
                           let key = this.submit();
                           console.log(this.state.deckName);
   //                        navigation.navigate('Home', {key} );
                        } else {
                           console.log('already saved this deck')
                        }
                     }}>
                    <Text style={styles.button}>{this.state.saved?"Saved":"Save"}</Text>
                 </TouchableOpacity>
            </View>
         </View>
      
    )
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