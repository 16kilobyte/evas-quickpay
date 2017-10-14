import * as storage from './storage'

export const isLoggedIn = async () => {
  let user = await storage.get('user')
}