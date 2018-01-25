import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions/actions.js';

function entries (state = {}, action) {
   const {deck, card} = action;
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
           ...deck
         }
      default :
         return state;
  }
}

export default entries