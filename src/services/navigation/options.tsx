import { Options } from 'react-native-navigation'
import { getColor } from '@ui/theme'
import { Screen, screens } from '@screens'
import { Props } from './types'

export const defaultOptions = (): Options => {
  return {
    layout: {
      orientation: ['portrait'],
      componentBackgroundColor: getColor('screenBg'),
      backgroundColor: getColor('screenBg'),
    },
    bottomTabs: {
      tabsAttachMode: 'together',
      visible: false,
    },
    // bottomTab: {
    //   iconColor: getColor('screenBg'),
    //   text: getColor('screenBg'),
    //   selectedIconColor: getColor('screenBg'),
    //   selectedTextColor: getColor('screenBg'),
    // },
    topBar: {
      background: {
        color: getColor('screenBg'),
      },
      backButton: {
        color: getColor('iconDefault'),
      },
      noBorder: true,
      elevation: 0,
      rightButtonColor: getColor('text'),
      leftButtonColor: getColor('text'),
      title: {
        color: getColor('text'),
      },
      largeTitle: {
        visible: false,
        color: getColor('text'),
      },
    },
  }
}

export function getUniqueId<P = Props>(name: Screen, props?: P): string {
  const { identifiers } = screens[name]
  if (!props || !identifiers) {
    return name
  }

  return `${name}__${identifiers
    .map((key) => (props || {})[key])
    .filter((prop) => !!prop)
    .join('_')}`
}

export function stripUniqueId(componentId: string): Screen {
  return componentId.split('__')[0] as Screen
}
