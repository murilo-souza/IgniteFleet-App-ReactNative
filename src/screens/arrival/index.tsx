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
import { ButtonIcon } from '../../components/button-icon'
import { X } from 'phosphor-react-native'
import { useObject } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/historic'
import { BSON } from 'realm'
import { Alert } from 'react-native'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa de veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} />
          <Button title="Registrar chegada" />
        </Footer>
      </Content>
    </Container>
  )
}
