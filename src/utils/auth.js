import * as storage from './storage'

export const getUserFromStore = async () => {
  try {
    const user = await storage.get('user');
    return user;
  } catch(e) {
    return false;
  }
}

export const getBundleFromStore = async () => {
  try {
    const bundle = await storage.get('bundle');
    return bundle;
  } catch(e) {
    return false;
  }
}