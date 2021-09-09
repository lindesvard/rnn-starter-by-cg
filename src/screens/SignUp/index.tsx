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

export const SignUp: NavigationFunctionComponent<{ email?: string }> = ({ componentId, email }) => {
  const { t, navigation } = useServices()
  const { user } = useStores()

  const form = useForm({
    initialValues: { email: email || '', password: '', password2: '' },
    onSubmit({ email, password, password2 }) {
      if (email && password2 === password) {
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
          {t('auth.signUpTitle')}
        </Text>
        <Text medium textS mb={5}>
          {t('auth.email')}
        </Text>
        <Input {...form.props('email')} placeholder={t('auth.email')} mb={20} />

        <Text medium textS mb={5}>
          {t('auth.password')}
        </Text>
        <Input {...form.props('password')} placeholder={t('auth.password')} mb={20} />

        <Text medium textS mb={5}>
          {t('auth.repeatPassword')}
        </Text>
        <Input
          {...form.props('password2')}
          placeholder={t('auth.repeatPassword')}
          onSubmitEditing={() => form.submitForm()}
        />

        <Box alignItems="center">
          <Button
            width="100%"
            mt={30}
            onPress={() => {
              form.submitForm()
            }}>
            Register
          </Button>
          <Button
            mt={10}
            bg="_white"
            onPress={() => {
              navigation.pop(componentId)
            }}>
            {t('auth.alreadyHaveAccount')}
          </Button>
        </Box>
      </Box>
    </ScrollView>
  )
}
