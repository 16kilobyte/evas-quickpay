import { AsyncStorage } from 'react-native';

export const get = async (key) => {
  let item = await AsyncStorage.getItem(key); 
  let parsedItem = await JSON.parse(item) || null;
  return parsedItem
}

export const set = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch(e) {
    console.error('Saving to local storage failed', e)
  }
}