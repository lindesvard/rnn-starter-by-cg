import { initServices, navigation } from '@services'
import { hydrateStores } from '@stores'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['toggling bottomTabs visibility is deprecated on iOS.'])

export const start = async (): PVoid => {
  await hydrateStores()

  await initServices()

  navigation.start()
}
