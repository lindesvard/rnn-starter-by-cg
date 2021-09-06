import { getLocales } from 'react-native-localize'
import i18n from 'i18n-js'

import { sv, en } from './translations'
import { Nav } from '@services/navigation'

export type Locale = 'en' | 'sv'

export class I18n implements IService {
  private inited = false

  private navigation: Nav | null = null

  public translate = i18n.t

  public locale: Locale = 'en'

  constructor({ navigation }: { navigation: Nav }) {
    this.navigation = navigation
  }

  init = async (): PVoid => {
    if (!this.inited) {
      await this.setup()

      this.inited = true
    }
  }

  private setup = async () => {
    const locales = getLocales()
    if (locales.length > 0) {
      this.locale = locales[0].languageCode as Locale
      i18n.translations = { en, sv }
      i18n.locale = this.locale
      i18n.fallbacks = true
    }
  }

  public async changeLocale(locale: Locale): PVoid {
    this.locale = locale
    i18n.locale = this.locale
    await this.navigation?.start()
  }
}
