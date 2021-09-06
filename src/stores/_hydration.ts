import { MMKV } from 'react-native-mmkv'
import { configurePersistable } from 'mobx-persist-store'

configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: MMKV.set,
    getItem: (key: string) => Promise.resolve(MMKV.getString(key) ?? null),
    removeItem: MMKV.delete,
  },
})
