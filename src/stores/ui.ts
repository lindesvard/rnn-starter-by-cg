import { makeAutoObservable } from 'mobx'
import { hydrateStore, makePersistable } from 'mobx-persist-store'
import { Appearance } from 'react-native'

export class UI implements IStore {
  themeMode: ThemeMode = 'light'

  setThemeMode = (v: ThemeMode): void => {
    this.themeMode = v
  }

  toggleThemeMode = (): void => {
    this.themeMode = (() => {
      if (this.themeMode === 'light') return 'dark'
      return 'light'
    })()
  }

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'UI',
      properties: ['themeMode'],
    })

    Appearance.addChangeListener(({ colorScheme }) => {
      this.setThemeMode(colorScheme || 'light')
    })
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this)
  }
}
