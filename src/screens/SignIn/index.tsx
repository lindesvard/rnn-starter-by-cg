import React from 'react'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { Box } from '@ui/Box'
import { Text } from '@ui/Text'
import { ScrollView } from '@ui/Scrollables'
import { useServices } from '@services'
import { Button } from '@ui/Button'
import { Input } from '@ui/Input'
import { useForm } from '@hooks/useForm'
import { Alert } from 'react-native'
import { useStores } from '@stores'

export const SignIn: NavigationFunctionComponent = ({ componentId }) => {
  const { t, navigation } = useServices()
  const { user } = useStores()

  const form = useForm({
    initialValues: { email: '', password: '' },
    onSubmit({ email, password }) {
      if (email === 'demo' && password === 'demo') {
        user.set({ email })
        navigation.start({ authorized: true, animate: true })
      } else {
        Alert.alert('Sign in failed!', 'We could not find your account')
      }
    },
  })

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box padding-l flex mt={50}>
        <Text textXL bold mb={30}>
          {t('auth.signInTitle')}
        </Text>
        <Text medium textS mb={5}>
          {t('auth.email')}
        </Text>
        <Input {...form.props('email')} placeholder={t('auth.email')} mb={20} />

        <Text medium textS mb={5}>
          {t('auth.password')}
        </Text>
        <Input
          {...form.props('password')}
          placeholder={t('auth.password')}
          onSubmitEditing={() => form.submitForm()}
        />

        <Box alignItems="center">
          <Button
            width="100%"
            mt={30}
            onPress={() => {
              form.submitForm()
            }}>
            Login
          </Button>
          <Button
            mt={10}
            bg="_white"
            onPress={() => {
              navigation.push(componentId, 'SignUp', { email: form.values.email })
            }}>
            {t('auth.noAccount')}
          </Button>
        </Box>
      </Box>
    </ScrollView>
  )
}
