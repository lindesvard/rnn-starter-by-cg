import type { Padding, FlexStyle, Margin, Flex } from './types'

type StylePadding = {
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
}
type StyleMargin = {
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
}
type Shadow = {
  shadowColor: string
  shadowOffset: {
    width: number
    height: number
  }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}

export const getShadow = (): Shadow => ({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 9,
  },
  shadowOpacity: 0.48,
  shadowRadius: 11.95,
  elevation: 18,
})

export function getFlex({ justifyContent, alignItems, flex, row }: Flex): Partial<FlexStyle> {
  const style: Partial<FlexStyle> = {}
  if (justifyContent) {
    style.justifyContent = justifyContent
  }
  if (alignItems) {
    style.alignItems = alignItems
  }
  if (flex) {
    style.flex = typeof flex === 'number' ? flex : flex ? 1 : undefined
  }
  if (row) {
    style.flexDirection = row ? 'row' : 'column'
  }
  return style
}

export function getPadding(
  props: Padding,
  defaultValue?: Partial<StylePadding>,
): StylePadding | { padding: number } {
  if (props['padding-s']) {
    return { padding: 5 }
  }
  if (props['padding-m']) {
    return { padding: 10 }
  }
  if (props['padding-l']) {
    return { padding: 20 }
  }
  const style = {
    paddingLeft: props.pl ?? props.p ?? defaultValue?.paddingLeft ?? 0,
    paddingRight: props.pr ?? props.p ?? defaultValue?.paddingRight ?? 0,
    paddingTop: props.pt ?? props.p ?? defaultValue?.paddingTop ?? 0,
    paddingBottom: props.pb ?? props.p ?? defaultValue?.paddingBottom ?? 0,
  }
  return style
}

export function getMargin(
  props: Margin,
  defaultValue?: Partial<StyleMargin>,
): StyleMargin | { margin: number } {
  if (props['margin-s']) {
    return { margin: 5 }
  }
  if (props['margin-s']) {
    return { margin: 10 }
  }
  if (props['margin-s']) {
    return { margin: 20 }
  }
  const style = {
    marginLeft: props.ml ?? props.m ?? defaultValue?.marginLeft ?? 0,
    marginRight: props.mr ?? props.m ?? defaultValue?.marginRight ?? 0,
    marginTop: props.mt ?? props.m ?? defaultValue?.marginTop ?? 0,
    marginBottom: props.mb ?? props.m ?? defaultValue?.marginBottom ?? 0,
  }
  return style
}
