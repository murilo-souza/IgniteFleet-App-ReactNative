import React, { useEffect, useState } from 'react'
import { Container, Content, Label, Title } from './styles'
import { HomeHeader } from '../../components/home-header'
import { CarStatus } from '../../components/car-status'
import { useNavigation } from '@react-navigation/native'
import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/historic'
import { Alert, FlatList } from 'react-native'
import { HistoricCard, HistoricCardProps } from '../../components/historic-card'
import dayjs from 'dayjs'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    [],
  )

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
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )
      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format(
            '[Saída em] DD/MM/YYYY [às] HH:mm',
          ),
        }
      })
      setVehicleHistoric(formattedHistoric)
    } catch (error) {
      console.log(error)

      Alert.alert('Histórico', 'Não foi possível carregar o histórico')
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })
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

        <Title>Histórico</Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum registro de utilização</Label>}
        />
      </Content>
    </Container>
  )
}
