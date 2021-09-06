import React from 'react'
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation'

import { Nav as Navigation } from '@services/navigation'
import { I18n } from '@services/i18n'
import { Api } from '@services/api'
import { Storage } from '@services/storage'

export const navigation = new Navigation()
export const storage = new Storage()
export const i18n = new I18n({ navigation })
export const api = new Api()

export const services = {
  i18n,
  navigation,
  api,
}

export const serviceContext = {
  ...services,
  t: i18n.translate,
}

type ContextServices = typeof serviceContext

const servicesContext = React.createContext<ContextServices>(serviceContext)
const ServicesProvider = servicesContext.Provider

/* eslint-disable react/display-name */
export const withServices = (Component: NavigationFunctionComponent) => {
  return (props: NavigationComponentProps): React.ReactElement => {
    return (
      <ServicesProvider value={serviceContext}>
        <Component {...props} />
      </ServicesProvider>
    )
  }
}

export const useServices = (): ContextServices => React.useContext(servicesContext)

export const initServices = async (): PVoid => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = (services as Services)[key]

      if (s.init) {
        await s.init()
      }
    }
  }
}
