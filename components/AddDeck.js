import React, {Component} from 'react';
import { connect } from 'react-redux'
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {timeToString} from '../utils/helpers';
import { createDeck } from '../utils/api'
import { addDeck } from '../actions/actions.js'

class AddDeck extends Component{
   static navigationOptions = ({ navigation }) => ({
      title: `Add a New Deck`,
   });

   constructor(props){
      super(props)
      this.state = {
         deckName:'',
         cards:[], 
         id:'',
         
      }
   }
   componentDidMount(){
      console.log(this.props);
   }
   submit(){
      const { addDeck, navigation } = this.props;
      
      const entry = this.state;
      const key = timeToString();
      entry.id = key;
      createDeck({entry, key}).then(result=>{
         addDeck({[key]:entry});
         this.props.navigation.goBack();
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
                        this.submit();
                        console.log(this.state.deckName);
                     }}>
                    <Text style={styles.button}>{this.state.saved?"Saved":"Save"}</Text>
                 </TouchableOpacity>
            </View>
         </View>
      
    )
   }
}

function mapStateToProps (state, { navigation }) {
   return {};
}

function mapDispatchToProps (dispatch, { navigation }) {

  return {
      addDeck:(data) => dispatch(addDeck(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDeck)




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