import { storage } from '@services'
import { configurePersistable } from 'mobx-persist-store'

configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: (key, data) => storage.set(key, data),
    getItem: (key) => storage.getString(key) as string | null,
    removeItem: (key) => storage.delete(key),
  },
})
