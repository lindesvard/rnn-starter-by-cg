import React from 'react'
import { ScrollView } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { Box, Row } from '@ui/Box'
import { Text } from '@ui/Text'
import { useStyles } from '@ui/theme'

export const Profile: NavigationFunctionComponent = ({ componentId }) => {
  // Get colors as function
  const styles1 = useStyles((theme) => ({
    box: {
      backgroundColor: theme.primary,
    },
  }))
  // Get colors as string
  const styles2 = useStyles({
    box: {
      backgroundColor: 'primary',
    },
  })

  return (
    <Box flex>
      <ScrollView contentInsetAdjustmentBehavior="always" contentContainerStyle={{ flexGrow: 1 }}>
        <Box padding-l justifyContent="center" alignItems="center" flex>
          <Text textXL bold>
            Profile View
          </Text>

          <Row>
            <Box br={10} width={70} height={70} style={styles1.box} m={5} />
            <Box br={10} width={70} height={70} style={styles2.box} m={5} />
          </Row>
        </Box>
      </ScrollView>
    </Box>
  )
}
