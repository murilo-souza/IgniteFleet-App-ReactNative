import React from 'react'
import { Container, Input, Label } from './styles'
import { useTheme } from 'styled-components/native'
import { TextInputProps } from 'react-native'

type LicensePlateInputProps = TextInputProps & {
  label: string
}

export function LicensePlateInput({ label, ...rest }: LicensePlateInputProps) {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        {...rest}
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={COLORS.GRAY_400}
      />
    </Container>
  )
}
