import React from 'react'
import { ScrollView } from 'react-native'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { Box } from '@ui/Box'
import { Text } from '@ui/Text'
import { useServices } from '@services'
import { useStores } from '@stores'
import { Button } from '@ui/Button'

export const Profile: NavigationFunctionComponent = () => {
  const { navigation, t } = useServices()
  const { user } = useStores()

  return (
    <Box flex>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box padding-l justifyContent="center" alignItems="center" flex>
          <Text textXL bold>
            {t('hi')} {user.name}
          </Text>
          <Button
            mt={10}
            bg="primary"
            onPress={() => {
              user.clear()
              navigation.start({ authorized: false, animate: true })
            }}>
            {t('auth.logout')}
          </Button>
        </Box>
      </ScrollView>
    </Box>
  )
}
