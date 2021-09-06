import React from 'react'
import { TouchableHighlightProps, ViewStyle } from 'react-native'
import { TouchableHighlight } from 'react-native'
import { darken, useTheme } from './designSystem'
import { getFlex, getMargin, getPadding, getShadow } from './style'
import { Text } from './Text'
import type { Flex, Icons, Margin, Padding } from './types'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Box } from './Box'

type ButtonProps = TouchableHighlightProps & {
  children?: React.ReactNode
  bg?: keyof Theme
  row?: boolean
  shadow?: boolean
  br?: number
  width?: number
  small?: boolean
  iconLeft?: Icons
  iconRight?: Icons
} & Padding &
  Margin &
  Flex

export function Button({
  children,
  bg = 'primary',
  style,
  shadow,
  br,
  width,
  small,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps): React.ReactElement {
  const height = small ? 30 : 45
  const padding = small ? 10 : 20
  const theme = useTheme()
  const iconProps = { color: 'white', size: small ? 12 : 16 }
  return (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor={darken(theme[bg])}
      style={{
        height,
        minWidth: width,
        backgroundColor: theme[bg],
        borderRadius: br ?? (height ? height / 2 : 0),
        ...(shadow ? getShadow() : {}),
        ...getPadding(props, { paddingLeft: padding, paddingRight: padding }),
        ...getMargin(props),
        ...getFlex(props),
        ...(typeof style === 'object' ? style : {}),
      }}
      {...props}>
      <Box row alignItems="center">
        {iconLeft && <Icon name={iconLeft} {...iconProps} />}
        <Text
          medium
          color="white"
          textS={small}
          ml={iconLeft ? (small ? 5 : 10) : 0}
          mr={iconRight ? (small ? 5 : 10) : 0}>
          {children}
        </Text>
        {iconRight && <Icon name={iconRight} {...iconProps} />}
      </Box>
    </TouchableHighlight>
  )
}

Button.defaultProps = {
  bg: 'primary',
  alignItems: 'center',
  justifyContent: 'center',
  width: 70,
}
