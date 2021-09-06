import React, { useEffect, useMemo } from 'react'
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation'
import { useServices } from '@services'
import { stores, useStores } from '@stores'
import { observer } from 'mobx-react'
import { themeModes } from './colors'

export { darken, lighten, getColor } from './colors'

export const configureDesignSystem = (): void => {}

export const withThemeModes = (
  Component: NavigationFunctionComponent,
): NavigationFunctionComponent => {
  return observer((props: NavigationComponentProps): React.ReactElement => {
    const { ui } = useStores()
    const { navigation } = useServices()

    useEffect(() => {
      navigation.updateDefaultOptions(props.componentId)
    }, [ui.themeMode])

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
