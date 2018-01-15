import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'MEH_FLASHCARD_REACT_NATIVE'

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }));
};
export function fetchSingleDeck(key){
   return fetchAllDecks().then(data=>{
      console.log(data);
      if(data.hasOwnProperty(key)){
         console.log('has key');
         return data[key];
      } else {
         console.log('no key');
         return {};
      }
   });
}
export function fetchAllDecks () {
   return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
      .then(data=>{
         if(data === null) { data = {}; }
         return JSON.parse(data);
  });
};