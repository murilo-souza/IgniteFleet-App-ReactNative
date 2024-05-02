import React, { useEffect, useState } from 'react'
import { Container, Content } from './styles'
import { HomeHeader } from '../../components/home-header'
import { CarStatus } from '../../components/car-status'
import { useNavigation } from '@react-navigation/native'
import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/historic'
import { Alert } from 'react-native'
import { HistoricCard } from '../../components/historic-card'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const { navigate } = useNavigation()
  const realm = useRealm()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse?._id.toString() })
    } else {
      navigate('departure')
    }
  }

  const historic = useQuery(Historic)

  function fetchVehiclesInUse() {
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

  function fetchHistoric() {
    const response = historic.filtered(
      "status = 'arrival' SORT(created_at DESC)",
    )
    console.log(response)
  }

  useEffect(() => {
    fetchVehiclesInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehiclesInUse())

    return () => realm.removeListener('change', fetchVehiclesInUse)
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />

        <HistoricCard
          data={{ created: '10/04', licensePlate: 'ABC1234', isSync: false }}
        />
      </Content>
    </Container>
  )
}
