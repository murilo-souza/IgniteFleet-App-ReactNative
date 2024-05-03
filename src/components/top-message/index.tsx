import React from 'react'
import { Container, Title } from './styles'
import { IconBoxProps } from '../button-icon'
import { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  title: string
  icon?: IconBoxProps
}

export function TopMessage({ title, icon: Icon }: Props) {
  const { COLORS } = useTheme()

  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 5

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={24} color={COLORS.GRAY_100} />}
      <Title>{title}</Title>
    </Container>
  )
}
