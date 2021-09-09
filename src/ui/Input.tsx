import React, { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useStyles, useTheme } from './theme'
import { getMargin } from './style'
import type { Margin } from './types'

type InputProps = TextInputProps & Margin

export function Input(props: InputProps): React.ReactElement<InputProps> {
  const theme = useTheme()
  const [focus, setFocus] = useState(false)
  const styles = useStyles({
    input: {
      width: '100%',
      height: 45,
      backgroundColor: 'screenBg10',
      borderWidth: 1,
      borderColor: focus ? 'primary' : 'screenBg10',
      borderRadius: 8,
      padding: 10,
      color: 'text',
      ...getMargin(props),
    },
  })

  return (
    <TextInput
      {...props}
      style={styles.input}
      autoCapitalize="none"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      placeholderTextColor={theme.text30}
    />
  )
}
