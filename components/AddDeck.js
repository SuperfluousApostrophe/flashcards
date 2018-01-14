import React, {Component} from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
/*export function AddDeck({navigation}){
   return (
      <View style={styles.container} >
          <Text style={styles.screenTitle} >Add A New Deck</Text>
          <View style={styles.screenContentView}>
               <Text>Give your Deck a Name!</Text>
               <TextInput 
                  style={styles.textBox} 
                  maxLength={40}  
               />
              <TouchableOpacity onPress={()=>{
//                     submitEntry();
                     console.log(this.state.deckName);
                     navigation.navigate('AddCard');
                  }}>
                 <Text style={styles.button}>Add Deck</Text>
              </TouchableOpacity>
         </View>
      </View>
      
    );
}*/

export default class AddDeck extends Component{
   
   render(){
      const {navigation} = this.props
   
      return (
         <View style={styles.container} >
             <Text style={styles.screenTitle} >Add A New Deck</Text>
             <View style={styles.screenContentView}>
                  <Text>Give your Deck a Name!</Text>
                  <TextInput 
                     style={styles.textBox} 
                     maxLength={40}  
                  />
                 <TouchableOpacity onPress={()=>{
   //                     submitEntry();
                        console.log(this.state.deckName);
                        navigation.navigate('AddCard');
                     }}>
                    <Text style={styles.button}>Add Deck</Text>
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