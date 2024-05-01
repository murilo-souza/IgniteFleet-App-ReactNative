import React from 'react'
import { Container, Content } from './styles'
import { HomeHeader } from '../../components/home-header'
import { CarStatus } from '../../components/car-status'
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const { navigate } = useNavigation()

  function handleRegisterMovement() {
    navigate('departure')
  }

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  )
}
