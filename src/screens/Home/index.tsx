import React from 'react'
import { ScrollView, Image } from 'react-native'
import { Button } from '@ui/Button'
import { NavigationFunctionComponent } from 'react-native-navigation'
import { Box, Column, Row } from '@ui/Box'
import { Text } from '@ui/Text'
import { stores } from '@stores'
import { useServices } from '@services'

const ARTIST = 'https://i.pravatar.cc/300'
const PORTOFOLIO = [
  {
    artist: 'Lady Gaga',
    song: 'Bad Romance',
  },
  {
    artist: 'Eminem',
    song: 'Mockingbird',
  },
  {
    artist: 'Bob Dylan',
    song: 'Mr. Tambourine Man',
  },
]

export const Home: NavigationFunctionComponent = () => {
  const { t, i18n } = useServices()
  const nextLanguage = i18n.locale === 'en' ? 'sv' : 'en'
  return (
    <Box flex>
      <ScrollView contentInsetAdjustmentBehavior="always">
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
            {['light', 'dark'].map((mode) => (
              <Button
                iconRight="highlighter"
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
              Balance
            </Text>
            <Text color="white" mt={0} text={35} bold>
              $430,230
            </Text>

            <Row alignItems="flex-end" mt={20}>
              {[10, 3, 2, 9, 13, 4, 3, 1, 2, 7, 3, 12, 3].map((earning, index) => (
                <Box key={index} mr={5} alignItems="center">
                  <Box
                    style={{
                      width: 8,
                      height: earning * 10,
                    }}
                    bg="white"
                    br={15}
                  />
                  <Text color="white" mt={10}>
                    ${earning}
                  </Text>
                </Box>
              ))}
            </Row>
          </Box>
          {['My portofolio', 'Trending'].map((title) => (
            <Box mt={30} key={title}>
              <Text mb={10} bold>
                {title}
              </Text>
              <ScrollView
                horizontal
                style={{ marginHorizontal: -20 }}
                contentContainerStyle={{ paddingHorizontal: 20 }}>
                {PORTOFOLIO.map(({ artist, song }) => (
                  <Box bg="screenBg10" padding-m br={15} key={song} mr={10}>
                    <Box alignItems="center" row>
                      <Image
                        source={{ uri: ARTIST }}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                      />
                      <Box ml={10}>
                        <Text textXS medium color="text30" mb={4}>
                          {artist}
                        </Text>
                        <Text textS>{song}</Text>
                      </Box>
                    </Box>
                    <Row justifyContent="space-between" alignItems="flex-end" mt={5}>
                      <Text textS>$139.23</Text>
                      <Text textS bold color="success">
                        +23%
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
