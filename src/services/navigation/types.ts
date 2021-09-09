import {
  LayoutComponent,
  NavigationFunctionComponent,
  OptionsTopBarButton,
} from 'react-native-navigation'
import { Screen } from '@screens'
import { Button } from './buttons'

export type Props = Record<string, unknown>

export type ScreenInfo = {
  name: Screen
  component: NavigationFunctionComponent
}

export type RegisteredScreens = Array<ScreenInfo>

export type Hoc = (
  Component: NavigationFunctionComponent<Props>,
) => NavigationFunctionComponent<Props>

export type ScreenOptions = {
  [key in Screen]: {
    title?: string
    component: NavigationFunctionComponent
    hocs?: Array<Hoc>
    identifiers?: Array<string>
    bottomTab?: {
      title?: string
      icon?: string
    }
  }
}

export type LayoutComponents = { [key in Screen]: LayoutComponent }

export type ButtonsOptions = {
  [key in Button]: OptionsTopBarButton
}
