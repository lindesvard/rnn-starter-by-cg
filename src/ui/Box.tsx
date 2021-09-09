import React from 'react'
import { ViewProps } from 'react-native'
import { View } from 'react-native'
import { useTheme } from './theme'
import { getFlex, getMargin, getPadding, getSafeInset, getShadow } from './style'
import type { Flex, Margin, Padding, SafeInset } from './types'

type BoxProps = ViewProps & {
  children?: React.ReactNode
  bg?: keyof Theme
  shadow?: boolean
  br?: number
  height?: number | string
  width?: number | string
} & Padding &
  Margin &
  Flex &
  SafeInset

export function Box({
  children,
  bg,
  style,
  shadow,
  br,
  height,
  width,
  ...props
}: BoxProps): React.ReactElement<BoxProps> {
  const theme = useTheme()

  return (
    <View
      style={{
        height,
        width,
        backgroundColor: bg ? theme[bg] : undefined,
        borderRadius: br,
        ...(shadow ? getShadow() : {}),
        ...getFlex(props),
        ...getPadding(props),
        ...getMargin(props),
        ...getSafeInset(props),
        ...(typeof style === 'object' ? style : {}),
      }}
      {...props}>
      {children}
    </View>
  )
}

export const Column = (props: Omit<BoxProps, 'row'>): React.ReactElement => <Box {...props} />
export const Row = (props: Omit<BoxProps, 'row'>): React.ReactElement => <Box {...props} row />
