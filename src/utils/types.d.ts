interface IService {
  init: () => PVoid
}
type Services = Record<string, IService>

interface IStore {
  hydrate?: () => PVoid
}
type Stores = Record<string, IStore>

type PVoid = Promise<void>
type AnyObj = Record<string, unknown>

type ThemeColors = Record<string, string>
type ThemeMode = 'light' | 'dark'
type Theme = {
  statusBar: 'light' | 'dark' | undefined
  text: string
  screenBg: string
  screenBg10: string
} & ThemeColors

// SERVICES
type AppType = 'one_screen' | 'three_tabs'

// SCREENS
// Props
type ExampleScreenProps = {
  value?: number
}

// API
// Responses
type CounterGetResponse = {
  value: number
}
