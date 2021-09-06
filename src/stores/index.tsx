import React from 'react'
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation'

import './_hydration'
import { UI } from './ui'
import { Test } from './test'

export const stores = {
  ui: new UI(),
  Test: new Test(),
}
type ContextStores = typeof stores

const StoreContext = React.createContext<ContextStores>(stores)

/* eslint-disable react/display-name */
export const withStores = (Component: NavigationFunctionComponent) => {
  return (props: NavigationComponentProps): React.ReactElement => {
    return (
      <StoreContext.Provider value={stores}>
        <Component {...props} />
      </StoreContext.Provider>
    )
  }
}

export const useStores = (): ContextStores => React.useContext(StoreContext)

export const hydrateStores = async (): PVoid => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores as Stores)[key]

      if (s.hydrate) {
        await s.hydrate()
      }
    }
  }
}
