import React, { useEffect, useState } from 'react'
import { Container, Content } from './styles'
import { HomeHeader } from '../../components/home-header'
import { CarStatus } from '../../components/car-status'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/historic'
import { Alert } from 'react-native'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const { navigate } = useNavigation()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse?._id.toString() })
    } else {
      navigate('departure')
    }
  }

  const historic = useQuery(Historic)

  function fetchVehicles() {
    try {
      const vehicles = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicles)
    } catch (error) {
      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar um veículo em uso',
      )

      console.log(error)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />
      </Content>
    </Container>
  )
}
