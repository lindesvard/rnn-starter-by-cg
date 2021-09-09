import React from 'react'
import { ScrollView, Image } from 'react-native'
import { Button } from '@ui/Button'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { Box, Column, Row } from '@ui/Box'
import { Text } from '@ui/Text'
import { stores } from '@stores'
import { useServices } from '@services'
import { Icons } from '@ui/types'

const AVATAR = 'https://i.pravatar.cc/300'
const ITEMS = [
  {
    user: 'Joe Doe',
    title: 'Pluto',
    label: 'Manga',
  },
  {
    user: 'Lisa Lane',
    title: 'Day & Night',
    label: 'Dance',
  },
  {
    user: 'Dustin Lore',
    title: 'World of light',
    label: 'Music',
  },
]

const MODES: Array<{ mode: ThemeMode; icon: Icons }> = [
  { mode: 'light', icon: 'sun' },
  { mode: 'dark', icon: 'moon' },
]

export const Home: NavigationFunctionComponent = () => {
  const { t, i18n } = useServices()
  const nextLanguage = i18n.locale === 'en' ? 'sv' : 'en'
  return (
    <Box flex>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Column padding-l>
          <Text mb={20}>
            {t('selectedLanguage')} <Text bold>{t('language')}</Text>
          </Text>
          <Row mb={20}>
            <Button
              small
              onPress={() => i18n.changeLocale(nextLanguage)}
              bg="secondary"
              iconLeft="home">
              {t('switchLanguage', { language: nextLanguage })}
            </Button>
          </Row>
          <Row>
            {MODES.map(({ icon, mode }) => (
              <Button
                iconRight={icon}
                mr={15}
                key={mode}
                onPress={() => {
                  stores.ui.setThemeMode(mode as ThemeMode)
                }}>
                {mode}
              </Button>
            ))}
          </Row>
          <Box br={15} bg="primary" padding-l mt={30} shadow>
            <Text color="white" bold>
              Activities
            </Text>
            <Text color="white" mt={0} text={35} bold>
              302,020
            </Text>

            <Row alignItems="flex-end" mt={20}>
              {[10, 3, 2, 9, 13, 4, 3, 1, 2, 7, 3, 12, 3].map((day, index) => (
                <Box key={index} mr={5} alignItems="center">
                  <Box width={8} height={day * 10} bg="white" br={15} mx={5} />
                  <Text color="white" mt={10}>
                    {day}
                  </Text>
                </Box>
              ))}
            </Row>
          </Box>
          {['You might like', 'Trending'].map((title) => (
            <Box mt={30} key={title}>
              <Text mb={10} bold>
                {title}
              </Text>
              <ScrollView
                horizontal
                style={{ marginHorizontal: -20 }}
                contentContainerStyle={{ paddingHorizontal: 20 }}>
                {ITEMS.map(({ user, title, label }) => (
                  <Box bg="screenBg10" padding-m br={15} key={title} mr={10} width={150}>
                    <Row alignItems="center">
                      <Image
                        source={{ uri: AVATAR }}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                      />
                      <Box ml={10}>
                        <Text textXS medium color="text30" mb={4}>
                          {user}
                        </Text>
                        <Text textS>{title}</Text>
                      </Box>
                    </Row>
                    <Row justifyContent="space-between" alignItems="flex-end" mt={10}>
                      <Text textS>{label}</Text>
                      <Text textS bold color="success">
                        Hot
                      </Text>
                    </Row>
                  </Box>
                ))}
              </ScrollView>
            </Box>
          ))}
        </Column>
      </ScrollView>
    </Box>
  )
}
