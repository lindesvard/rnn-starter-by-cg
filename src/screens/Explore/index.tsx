import React from 'react'
import { ScrollView } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { Box } from '@ui/Box'
import { Text } from '@ui/Text'

export const Explore: NavigationFunctionComponent = ({ componentId }) => {
  return (
    <Box flex>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box padding-l justifyContent="center" alignItems="center" flex>
          <Text textXL bold>
            Explore View
          </Text>
        </Box>
      </ScrollView>
    </Box>
  )
}
