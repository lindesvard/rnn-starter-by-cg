import { ScreenOptions } from '@services/navigation/types'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Explore } from '@screens/Explore'
import { withTabBar } from '@ui/TabBar/withTabBar'
import { convertToLayoutComponent, convertToScreens } from '@services/navigation/converters'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

export type Screen = 'Home' | 'Explore' | 'Profile' | 'SignIn' | 'SignUp'

export const screens: ScreenOptions = {
  Home: {
    title: '[tabs.home]',
    component: Home,
    hocs: [withTabBar],
    bottomTab: {
      icon: 'podcast',
      title: 'Hej',
    },
  },
  Explore: {
    title: '[tabs.explore]',
    component: Explore,
    hocs: [withTabBar],
    bottomTab: {
      icon: 'clipboard-list',
    },
  },
  Profile: {
    title: '[tabs.profile]',
    component: Profile,
    hocs: [withTabBar],
    bottomTab: {
      icon: 'user',
    },
  },
  SignIn: {
    component: SignIn,
    hocs: [],
  },
  SignUp: {
    component: SignUp,
    hocs: [],
  },
}

export const componentLayouts = convertToLayoutComponent(screens)
export const registeredScreens = convertToScreens(screens)
