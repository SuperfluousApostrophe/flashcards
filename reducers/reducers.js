import {RECEIVE_DECKS, ADD_DECK, ADD_CARD, } from '../actions/actions.js';

function entries (state = {}, action) {
   const {deck,id, card} = action;
   switch (action.type) {
      case RECEIVE_DECKS :
         return {
           ...state,
           ...action.decks,
         }
      case ADD_DECK :
         return {
           ...state,
           ...deck
         }
      case ADD_CARD :
         return {
            ...state,
            [id]:{
               ...state[id], 
               cards:[
                  ...state[id].cards.concat(card)
               ]
            }
         }
      default :
         return state;
  }
}

export default entries