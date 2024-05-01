import React from 'react'
import { Container, Content } from './styles'
import { Header } from '../../components/header'
import { LicensePlateInput } from '../../components/license-plate-input'

export function Departure() {
  return (
    <Container>
      <Header title="Sáida" />

      <Content>
        <LicensePlateInput label="Placa do veículo" placeholder="BRA1234" />
      </Content>
    </Container>
  )
}
