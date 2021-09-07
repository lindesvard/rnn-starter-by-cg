import tinycolor from 'tinycolor2'
import { stores } from '@stores'

export function getColor(name: string): string {
  return themeModes[stores.ui.themeMode][name]
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
  secondary: '#eba12a',
  success: '#4bbd62',
  black: '#000',
  blackish: '#232323',
  white: '#fff',
  whiteish: '#efefef',
}

export const themeModes: Record<ThemeMode, Theme> = {
  light: {
    statusBar: 'dark',
    text: colors.black,
    text30: '#545454',
    screenBg: colors.white,
    screenBg10: colors.whiteish,
    iconDefault: colors.black,
    iconInverted: colors.white,
    ...colors,
  },
  dark: {
    statusBar: 'light',
    text: colors.white,
    text30: '#868686',
    screenBg: colors.black,
    screenBg10: colors.blackish,
    iconDefault: colors.white,
    iconInverted: colors.black,
    ...colors,
  },
}
