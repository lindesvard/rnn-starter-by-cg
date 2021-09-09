import { Options } from 'react-native-navigation'
import { getColor } from '@ui/theme'
import { Screen, screens } from '@screens'
import { Props } from './types'

export function defaultOptions(): Options {
  return {
    layout: {
      orientation: ['portrait'],
      componentBackgroundColor: getColor('screenBg'),
      backgroundColor: getColor('screenBg'),
    },
    bottomTabs: {
      backgroundColor: getColor('screenBg'),
      tabsAttachMode: 'together',
      visible: false,
    },
    bottomTab: {
      iconColor: getColor('icon'),
      textColor: getColor('icon'),
      selectedIconColor: getColor('primary'),
      selectedTextColor: getColor('primary'),
    },
    topBar: {
      background: {
        color: getColor('screenBg'),
      },
      backButton: {
        color: getColor('icon'),
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

export function getRootAnimation(animate?: boolean): Options {
  if (animate) {
    return {
      animations: {
        setRoot: {
          enabled: !!animate,
          alpha: {
            from: 1,
            to: 0,
            duration: 1000,
          },
        },
      },
    }
  }

  return {}
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
