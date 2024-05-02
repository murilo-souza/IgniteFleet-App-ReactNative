import React from 'react'
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'
import { useRoute } from '@react-navigation/native'
import { Header } from '../../components/header'
import { Button } from '../../components/button'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  console.log(id)

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa de veículo</Label>
        <LicensePlate>ABC1234</LicensePlate>

        <Label>Finalidade</Label>
        <Description>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
          temporibus.
        </Description>

        <Footer>
          <Button title="Registrar chegada" />
        </Footer>
      </Content>
    </Container>
  )
}
