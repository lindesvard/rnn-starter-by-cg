import React, { useState } from 'react'
import { NavigationComponentProps } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { navigation } from '@services'
import { TouchableHighlight } from 'react-native'
import { Screen, screens } from '@screens'
import { Box } from '@ui/Box'
import { darken, lighten, useMode, useTheme } from '@ui/theme'
import { useNavigationComponentWillAppear } from '@services/navigation/hooks'

export function TabBar({ componentId }: NavigationComponentProps): React.ReactElement {
  const theme = useTheme()
  const { isLightMode } = useMode()
  const [selected, setSelected] = useState<number>(0)
  const bottom = 34 //TODO: Fix this
  const { tabs } = navigation

  useNavigationComponentWillAppear(({ componentName }) => {
    const index = tabs.findIndex((tab) => tab.name === componentName)
    if (index >= 0) setSelected(index || 0)
  }, componentId)

  const tabBarHeight = 60 + bottom

  return (
    <Box
      bg="screenBg"
      row
      shadow
      justifyContent="space-around"
      height={tabBarHeight}
      pb={bottom}
      pt={5}
      style={{
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      {tabs.map((tab, index) => {
        return (
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={isLightMode ? lighten(theme.primary, 4) : darken(theme.primary, 4)}
            key={tab.options?.bottomTab?.text}
            onPress={() => {
              navigation.push(componentId, tab.name as Screen)
            }}
            style={{
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Icon
              name={screens[tab.name as Screen]?.bottomTab?.icon || 'home'}
              size={30}
              color={selected === index ? theme.primary : theme.icon}
            />
          </TouchableHighlight>
        )
      })}
    </Box>
  )
}
