import React from 'react'
import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { ButtonIcon } from '../../components/button-icon'
import { X } from 'phosphor-react-native'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/historic'
import { BSON } from 'realm'
import { Alert } from 'react-native'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const realm = useRealm()
  const { goBack } = useNavigation()
  const historic = useObject<Historic>(Historic, new BSON.UUID(id))

  function handleRemoveVehicleUsage() {
    Alert.alert(
      'Cancelar',
      'Deseja realmente cancelar a utilização do veículo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => removeVehicleUsage() },
      ],
    )
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })
    goBack()
  }

  function handleRegisterArrival() {
    try {
      if (!historic) {
        return Alert.alert(
          'Error',
          'Não foi possível obter os dados para registrar a chegada do veículo',
        )
      }

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso')
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo')
    }
  }

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa de veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar chegada" onPress={handleRegisterArrival} />
        </Footer>
      </Content>
    </Container>
  )
}
