import Ionicons from 'react-native-vector-icons/Ionicons'
import { ButtonsOptions } from './types'

const ICON_SIZE = 25

export type Button = 'profile'

export const buttons: ButtonsOptions = {
  profile: {
    id: 'profile',
    icon: Ionicons.getImageSourceSync('settings-outline', ICON_SIZE, 'white'),
  },
}
