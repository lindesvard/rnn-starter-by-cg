import React, { useEffect, useMemo, useRef } from 'react'
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation'
import { useServices } from '@services'
import { stores, useStores } from '@stores'
import { observer } from 'mobx-react'
import { themeModes } from './colors'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type BaseStyle = ViewStyle | TextStyle | ImageStyle
type NamedStyles<T> = { [P in keyof T]: BaseStyle }
type IncomingStyles<T> = NamedStyles<T> | ((theme: Theme) => NamedStyles<T>)

export { darken, lighten, getColor, isColorDark, isColorLight } from './colors'

export const withThemeModes = (
  Component: NavigationFunctionComponent,
): NavigationFunctionComponent => {
  return observer((props: NavigationComponentProps): React.ReactElement => {
    const { ui } = useStores()
    const { navigation, i18n } = useServices()

    useEffect(() => {
      navigation.updateDefaultOptions(props.componentId)
    }, [ui.themeMode, i18n.locale])

    return <Component {...props} />
  })
}

export const useMode = (): {
  mode: ThemeMode
  isDarkMode: boolean
  isLightMode: boolean
} => {
  const { themeMode: mode } = useStores().ui
  return useMemo(
    () => ({
      mode,
      isDarkMode: mode === 'dark',
      isLightMode: mode === 'light',
    }),
    [mode],
  )
}

export const useTheme = (): Theme => themeModes[useMode().mode]

export const getTheme = (): Theme => themeModes[stores.ui.themeMode]

export function useStyles<T extends NamedStyles<T>>(styles: IncomingStyles<T>): NamedStyles<T> {
  const theme = useTheme()
  return useMemo(() => {
    if (typeof styles === 'function') {
      return styles(theme)
    }
    // TODO: Fix this typing...
    // eslint-disable-next-line
    const obj: any = {}
    for (const className in styles) {
      if (styles[className]) {
        obj[className] = {}
        for (const property in styles[className]) {
          const val = styles[className][property]
          if (typeof val === 'string' && theme[val]) {
            obj[className][property] = theme[val]
          } else {
            obj[className][property] = val
          }
        }
      }
    }
    return obj
  }, [theme, styles])
}
