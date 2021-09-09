import tinycolor from 'tinycolor2'
import { stores } from '@stores'

export function getColor(name: string): string {
  return themeModes[stores.ui.themeMode][name]
}

export function isColorDark(color: string): boolean {
  return tinycolor(color).getLuminance() < 0.5
}

export function isColorLight(color: string): boolean {
  return !isColorDark(color)
}

export function darken(color: string, value = 2): string {
  return tinycolor(color)
    .darken(value * 10)
    .toString()
}

export function lighten(color: string, value = 2): string {
  return tinycolor(color)
    .lighten(value * 10)
    .toString()
}

const colors: ThemeColors = {
  primary: '#5331dc',
  secondary: '#ff9d00',
  success: '#4bbd62',
  black: '#000',
  blackish: '#191919',
  white: '#fff',
  whiteish: '#f6f6f6',
}

export const themeModes: Record<ThemeMode, Theme> = {
  light: {
    statusBar: 'dark',
    text: colors.black,
    text30: '#545454',
    screenBg: colors.white,
    screenBg10: colors.whiteish,
    icon: colors.black,
    iconInverted: colors.white,
    border: colors.whiteish,
    _white: colors.white,
    ...colors,
  },
  dark: {
    statusBar: 'light',
    text: colors.white,
    text30: '#868686',
    screenBg: colors.black,
    screenBg10: colors.blackish,
    icon: colors.white,
    iconInverted: colors.black,
    border: colors.blackish,
    _white: colors.black,
    ...colors,
  },
}
