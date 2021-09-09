import { LayoutComponent } from 'react-native-navigation'
import { getTypedKeys } from '@utils/help'
import { RegisteredScreens, ScreenOptions, LayoutComponents } from './types'
// import Icon from 'react-native-vector-icons/FontAwesome'

export function convertToLayoutComponent(screens: ScreenOptions): LayoutComponents {
  return getTypedKeys(screens).reduce<LayoutComponents>((acc, key) => {
    const screen = screens[key]
    const { title } = screen
    const layout: LayoutComponent = {
      name: key,
      id: key,
      options: {
        topBar: {
          title: {
            text: title,
          },
        },
        bottomTab: {
          text: title ?? screen.bottomTab?.title,
          // icon: screen.bottomTab?.icon
          //   ? Icon.getImageSourceSync(screen.bottomTab?.icon, 20, '#000', 1)
          //   : undefined,
          // selectedIcon: screen.bottomTab?.icon
          //   ? Icon.getImageSourceSync(screen.bottomTab?.icon, 20, '#000')
          //   : undefined,
        },
      },
    }
    return {
      ...acc,
      [key]: layout,
    }
  }, {} as LayoutComponents)
}

export function convertToScreens(screens: ScreenOptions): RegisteredScreens {
  return getTypedKeys(screens).reduce<RegisteredScreens>((acc, key) => {
    const screen = screens[key]
    return [
      ...acc,
      {
        name: key,
        component: screen.component,
      },
    ]
  }, [])
}
