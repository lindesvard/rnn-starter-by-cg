import React from 'react'
import { TextStyle } from 'react-native'
import { Text as RNText } from 'react-native'
import { TextProps as RNTextProps } from 'react-native'
import { useTheme } from './designSystem'
import { getMargin, getPadding } from './style'
import type { Margin, Padding, FontSize } from './types'

function getFontSize({ textXS, textS, textL, textXL, text }: FontSize): { fontSize: number } {
  if (textXS) {
    return { fontSize: 10 }
  }
  if (textS) {
    return { fontSize: 12 }
  }
  if (textL) {
    return { fontSize: 18 }
  }
  if (textXL) {
    return { fontSize: 25 }
  }

  return { fontSize: text ?? 14 }
}

type TextProps = RNTextProps & {
  children: React.ReactNode
  color?: keyof Theme
  bold?: boolean
  medium?: boolean
  light?: boolean
} & Padding &
  Margin &
  FontSize

export function Text({
  children,
  color,
  style,
  bold,
  medium,
  light,
  ...props
}: TextProps): React.ReactElement {
  const theme = useTheme()
  return (
    <RNText
      style={{
        color: theme[color ?? 'text'],
        fontWeight: bold ? '700' : medium ? '600' : light ? '200' : '400',
        ...getPadding(props),
        ...getMargin(props),
        ...getFontSize(props),
        ...(typeof style === 'object' ? style : {}),
      }}
      {...props}>
      {children}
    </RNText>
  )
}
