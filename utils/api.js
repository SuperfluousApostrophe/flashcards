import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'MEH_FLASHCARD_REACT_NATIVE'

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
};
export function fetchAllDecks () {
   return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
      .then(data=>{
         if(data === null) { data = {}; }
         return data;
  });
};