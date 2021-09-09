import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'
import {
  Options,
  Layout,
  LayoutStackChildren,
  LayoutRoot,
  LayoutTabsChildren,
  LayoutComponent,
} from 'react-native-navigation'
import { t } from '@services/i18n'
import { componentLayouts, Screen } from '@screens'
// Set of methods which help building RNN layout without long boring code like {stack:component:{...}}

const Root = (root: Layout): LayoutRoot => ({ root })

const BottomTabs = (children?: LayoutTabsChildren[], options?: Options): Layout => ({
  bottomTabs: { children, options },
})

const StackMany = (children?: LayoutStackChildren[], options?: Options): Layout => ({
  stack: { children, options },
})

const Stack = (c: LayoutStackChildren, options?: Options): Layout => StackMany([c], options)

const Component = <P>(component: LayoutComponent<P>): Layout => {
  return {
    component: {
      ...component,
      options: translateOptions(component.name as Screen, component.options),
    },
  }
}

function translateOption(path: string, originalOptions?: Options, options?: Options) {
  const originalText = String(get(originalOptions, path))
  const pattern = /^\[(.*?)\]$/
  if (pattern.test(originalText) && options) {
    return set(options, path, t(originalText.slice(1, -1)))
  }
  return options
}

const POSSIBLE_TRANSLATED_OPTIONS = ['topBar.title.text', 'bottomTab.text']
export function translateOptions(name: Screen, incomingOptions?: Options): Options | undefined {
  let options = cloneDeep(incomingOptions)
  const originalOptions = componentLayouts[name].options
  for (const path of POSSIBLE_TRANSLATED_OPTIONS) {
    options = translateOption(path, originalOptions, options)
  }
  return options
}

export { Root, BottomTabs, Stack, StackMany, Component }
