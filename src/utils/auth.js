import * as storage from './storage'

export const getUserFromStore = () => {
  return new Promise( async (resolve, reject) => {
    try {
      const user = await storage.get('user');
      resolve(user);
    } catch(e) {
      resolve(false);
    }
  });
}

export const getBundleFromStore = () => {
  return new Promise( async (resolve, reject) => {
    try {
      const bundle = await storage.get('bundle');
      return bundle;
    } catch(e) {
      return false;
    }
  });
}