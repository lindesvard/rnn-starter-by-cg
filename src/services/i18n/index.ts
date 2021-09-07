import { getLocales } from 'react-native-localize'
import i18n from 'i18n-js'
import { sv, en } from './translations'
import { Nav } from '@services/navigation'
import { Storage } from '@services/storage'

export type Locale = 'en' | 'sv'

export const t = i18n.translate

export class I18n implements IService {
  private key = '@app/locale'

  private inited = false

  private navigation: Nav | null = null

  private storage: Storage | null = null

  public translate = i18n.t

  public locale: Locale = 'en'

  constructor({ navigation, storage }: { navigation: Nav; storage: Storage }) {
    this.navigation = navigation
    this.storage = storage
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
      const savedLocale: Locale | null = this.storage?.getString(this.key) as Locale
      const deviceLocale: Locale = locales[0].languageCode as Locale
      this.locale = savedLocale || deviceLocale
      i18n.translations = { en, sv }
      i18n.locale = this.locale
      i18n.fallbacks = true
    }
  }

  public async changeLocale(locale: Locale): PVoid {
    // Set current locale
    this.locale = locale
    // Save to storage
    this.storage?.set(this.key, this.locale)
    // Set i18n library
    i18n.locale = this.locale
    // Restart the app
    await this.navigation?.start()
  }
}
