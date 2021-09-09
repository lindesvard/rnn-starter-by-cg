import { getLocales } from 'react-native-localize'
import i18n from 'i18n-js'
import { sv, en } from './translations'
import { makeAutoObservable } from 'mobx'
import { hydrateStore, makePersistable } from 'mobx-persist-store'

export type Locale = 'en' | 'sv'

export const t = i18n.translate.bind(i18n)

export class I18n implements IService {
  private inited = false

  public translate = i18n.t

  public locale: Locale | null = null

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'I18n',
      properties: ['locale'],
    })
  }

  init = async (): PVoid => {
    if (!this.inited) {
      await this.hydrate()
      await this.setup()
      this.inited = true
    }
  }

  private setup = async () => {
    const locales = getLocales()
    if (locales.length > 0) {
      const deviceLocale: Locale = locales[0].languageCode as Locale
      if (this.locale === null) {
        this.locale = deviceLocale
      }

      i18n.translations = { en, sv }
      i18n.locale = this.locale
      i18n.fallbacks = true
    }
  }

  public async changeLocale(locale: Locale): PVoid {
    i18n.locale = locale
    this.locale = locale
  }

  private async hydrate(): PVoid {
    await hydrateStore(this)
  }
}
