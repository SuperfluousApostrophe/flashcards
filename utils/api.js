import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'MEH_FLASHCARD_REACT_NATIVE';

export function createDeck({ entry, key }) {
//   console.log('trying to add new deck');
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }), (err, result)=>{
//     console.log("done?");
//     console.log(err);
//     console.log(result);
  });
};
export function addCardToDeck(key, deck){
//   console.log(deck, key);
   let deckObj = {
      [key]:deck
   };
   return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deckObj));
}
export function fetchSingleDeck(key){
//   console.log('trying to fetch single deck');
   return fetchAllDecks().then(data=>{
//      console.log(data);
      if(data.hasOwnProperty(key)){
//         console.log('has key');
         return data[key];
      } else {
//         console.log('no key');
         return {};
      }
   });
}
export function fetchAllDecks() {
//   console.log('trying to get all decks');
   return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
      .then(data=>{
//         console.log("about to get",data);
         if(data === null) { data = {}; }
//         console.log(data);
         return JSON.parse(data);
  });
};