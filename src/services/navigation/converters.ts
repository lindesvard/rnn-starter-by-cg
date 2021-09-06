import { LayoutComponent } from 'react-native-navigation'
import { getTypedKeys } from '@utils/help'
import { RegisteredScreens, ScreenOptions, LayoutComponents } from './types'

export function convertToLayoutComponent(screens: ScreenOptions): LayoutComponents {
  return getTypedKeys(screens).reduce<LayoutComponents>((acc, key) => {
    const screen = screens[key]
    const layout: LayoutComponent = {
      name: key,
      id: key,
      options: {
        topBar: {
          title: {
            text: screen.title,
          },
        },
        bottomTab: {
          text: screen.title ?? screen.bottomTab?.title,
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
