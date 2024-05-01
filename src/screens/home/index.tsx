import React from 'react'
import { Container, Content } from './styles'
import { HomeHeader } from '../../components/home-header'
import { CarStatus } from '../../components/car-status'

export function Home() {
  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus />
      </Content>
    </Container>
  )
}
