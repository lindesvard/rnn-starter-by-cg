import React from 'react'
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation'
import { TabBar } from './'

export function withTabBar(Component: NavigationFunctionComponent): NavigationFunctionComponent {
  function WrappedWithTabBar(props: NavigationComponentProps) {
    return (
      <>
        <Component {...props}></Component>
        <TabBar componentId={props.componentId}></TabBar>
      </>
    )
  }

  return WrappedWithTabBar
}
