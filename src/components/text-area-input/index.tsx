/* eslint-disable react/display-name */

import { forwardRef } from 'react'
import { Container, Input, Label } from './styles'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

type TextAreaInputProps = TextInputProps & {
  label: string
}

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme()

    return (
      <Container>
        <Label>{label}</Label>
        <Input
          ref={ref}
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          autoCapitalize="sentences"
          {...rest}
        />
      </Container>
    )
  },
)

export { TextAreaInput }
