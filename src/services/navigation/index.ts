import {
  Constants,
  LayoutComponent,
  Navigation,
  NavigationConstants,
  Options,
} from 'react-native-navigation'
import { gestureHandlerRootHOC as withGestureHandler } from 'react-native-gesture-handler'
import merge from 'lodash/merge'

import { Screen, screens, registeredScreens, componentLayouts } from '@screens'
import { withServices } from '@services'
import { withStores } from '@stores'

import { BottomTabs, Component, Root, Stack } from './layout'
import { getTheme, withThemeModes } from '@ui/theme'
import { defaultOptions, getUniqueId, stripUniqueId } from './options'
import { Hoc, Props } from './types'

export class Nav implements IService {
  private inited = false

  private componentIds: Map<string, Screen> = new Map()

  public constants: NavigationConstants = Constants.getSync()

  public tabs: Array<LayoutComponent> = [
    componentLayouts.Home,
    componentLayouts.Explore,
    componentLayouts.Profile,
  ]

  public activeTab = 0

  init = async (): PVoid => {
    if (!this.inited) {
      await this.registerScreens()
      this.updateDefaultOptions()
      this.registerListeners()

      this.inited = true
    }
  }

  getScreen = <P = Props>(screen: Screen, props?: P): LayoutComponent => {
    const layout = componentLayouts[screen]
    return { ...layout, id: getUniqueId(screen, props) }
  }

  start = async (): PVoid => {
    await this.setTabs()
    await this.getConstants()
  }

  isTab(name: Screen): number {
    return this.tabs.findIndex((tab) => tab.name === name)
  }

  // Navigation methods
  async push<T>(cId: string, name: Screen, passProps?: T, options?: Options): Promise<string> {
    const screenLayout = this.getScreen(name)

    const index = this.isTab(name)
    if (index >= 0) {
      this.activeTab = index
      await Navigation.mergeOptions(cId, {
        bottomTabs: {
          currentTabIndex: this.activeTab,
        },
      })
      return String(this.tabs[index].name)
    }

    return Navigation.push(
      cId,
      Component({
        ...screenLayout,
        passProps,
        options: {
          ...screenLayout.options,
          ...options,
        },
      }),
    )
  }

  async pop(cId: string): Promise<string> {
    return Navigation.pop(cId)
  }

  async show<T>(name: Screen, passProps?: T, options?: Options): PVoid {
    const screenLayout = this.getScreen<T>(name, passProps)
    Navigation.showModal(
      Stack(
        Component({
          ...screenLayout,
          passProps,
          options: {
            ...screenLayout.options,
            ...options,
          },
        }),
      ),
    )
  }

  updateDefaultOptions(componentId = ''): void {
    const options = this.getDefaultOptions()
    Navigation.setDefaultOptions(options)
    if (componentId) {
      Navigation.mergeOptions(
        componentId,
        merge(options, this.getScreen(stripUniqueId(componentId)).options),
      )
    }
  }

  private async setTabs(): PVoid {
    await Navigation.setRoot(
      Root(BottomTabs(this.tabs.map((layoutComponent) => Stack(Component(layoutComponent))))),
    )
  }

  private registerScreens = async () => {
    registeredScreens.forEach((screenInfo) => {
      const { hocs } = screens[screenInfo.name]

      const compose = (...funcs: Hoc[]) =>
        funcs.reduce(
          (a, b) =>
            (...args) =>
              a(b(...args)),
          (arg) => arg,
        )

      Navigation.registerComponent(
        screenInfo.name,
        () =>
          withGestureHandler(
            withStores(
              withServices(
                withThemeModes(
                  hocs ? compose(...hocs)(screenInfo.component) : screenInfo.component,
                ),
              ),
            ),
          ),
        () => screenInfo.component,
      )
    })
  }

  private registerListeners = () => {
    Navigation.events().registerComponentWillAppearListener(
      async ({ componentId, componentName }) => {
        if (!this.componentIds.has(componentId)) {
          this.componentIds.set(componentId, componentName as Screen)
        }

        this.getConstants()
      },
    )
  }

  private getDefaultOptions(): Options {
    const theme = getTheme()
    return {
      ...defaultOptions(),
      statusBar: { style: theme.statusBar },
    }
  }

  private async getConstants() {
    this.constants = Constants.getSync()
    return this.constants
  }
}
