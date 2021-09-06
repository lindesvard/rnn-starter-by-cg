import React from 'react'
import { ScrollView } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { Box } from '@ui/Box'
import { Text } from '@ui/Text'

export const Profile: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <Box flex>
      <ScrollView contentInsetAdjustmentBehavior="always" contentContainerStyle={{ flexGrow: 1 }}>
        <Box padding-l justifyContent="center" alignItems="center" flex>
          <Text textXL bold>
            Profile View
          </Text>
        </Box>
      </ScrollView>
    </Box>
  )
}