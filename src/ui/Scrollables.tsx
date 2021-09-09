import { FlatList as RNFlatList, ScrollView as RNScrollView } from 'react-native'

export const FlatList = RNFlatList
// eslint-disable-next-line
// @ts-ignore
FlatList.defaultProps = {
  contentInsetAdjustmentBehavior: 'never',
  keyboardShouldPersistTaps: 'handled',
}

export const ScrollView = RNScrollView
// eslint-disable-next-line
// @ts-ignore
ScrollView.defaultProps = {
  contentInsetAdjustmentBehavior: 'never',
  keyboardShouldPersistTaps: 'handled',
}
