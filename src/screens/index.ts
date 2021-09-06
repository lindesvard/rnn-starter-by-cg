import { ScreenOptions } from '@services/navigation/types'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Explore } from '@screens/Explore'
import { withTabBar } from '@ui/TabBar/withTabBar'
import { convertToLayoutComponent, convertToScreens } from '@services/navigation/converters'

export type Screen = 'Home' | 'Explore' | 'Profile'

export const screens: ScreenOptions = {
  Home: {
    title: 'Home',
    component: Home,
    hocs: [withTabBar],
    bottomTab: {
      icon: 'podcast',
      title: 'Hej',
    },
  },
  Explore: {
    title: 'Explore',
    component: Explore,
    hocs: [withTabBar],
    bottomTab: {
      icon: 'clipboard-list',
    },
  },
  Profile: {
    title: 'Profile',
    component: Profile,
    hocs: [withTabBar],
    bottomTab: {
      icon: 'user',
    },
  },
}

export const componentLayouts = convertToLayoutComponent(screens)
export const registeredScreens = convertToScreens(screens)
