/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import { Container, Input, Label } from './styles'
import { useTheme } from 'styled-components/native'
import { TextInput, TextInputProps } from 'react-native'

type LicensePlateInputProps = TextInputProps & {
  label: string
}
const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme()

    return (
      <Container>
        <Label>{label}</Label>
        <Input
          ref={ref}
          {...rest}
          maxLength={7}
          autoCapitalize="characters"
          placeholderTextColor={COLORS.GRAY_400}
        />
      </Container>
    )
  },
)

export { LicensePlateInput }
