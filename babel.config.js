/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

function getAliasesFromTsConfig() {
  const dirs = fs.readdirSync('./src').filter((dir) => !dir.includes('.'))
  return dirs.reduce((aliases, dir) => {
    return { ...aliases, [`@${dir}`]: `./src/${dir}` }
  }, {})
}

const baseConfig = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: getAliasesFromTsConfig(),
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./src'],
      },
    ],
  ],
}

module.exports = (api) => {
  api.cache(true)

  return {
    ...baseConfig,
    plugins: [...baseConfig.plugins, 'react-native-reanimated/plugin'],
  }
}
