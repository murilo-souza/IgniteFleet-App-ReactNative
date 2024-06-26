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
import { useUser, Realm } from '@realm/react'
import {
  getLastAsyncTimestamp,
  saveLastSyncTimestamp,
} from '../../libs/async-storage/sync-storage'

import Toast from 'react-native-toast-message'
import { TopMessage } from '../../components/top-message'
import { CloudArrowUp } from 'phosphor-react-native'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    [],
  )
  const [percentegeToSync, setPercentageToSync] = useState<string | null>(null)

  const { navigate } = useNavigation()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse?._id.toString() })
    } else {
      navigate('departure')
    }
  }

  const realm = useRealm()
  const historic = useQuery(Historic)
  const user = useUser()

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

  async function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      const lastSync = await getLastAsyncTimestamp()

      const formattedHistoric = response.map((item) => {
        return {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at!.getTime(),
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

  async function progressNotification(
    transferred: number,
    transferable: number,
  ) {
    const percentage = (transferred / transferable) * 100

    if (percentage === 100) {
      await saveLastSyncTimestamp()
      await fetchHistoric()
      setPercentageToSync(null)

      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizados',
      })
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado`)
    }
  }

  useEffect(() => {
    fetchVehiclesInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehiclesInUse())

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehiclesInUse)
      }
    }
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user!.id}'`)

      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' })
    })
  }, [realm])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) {
      // eslint-disable-next-line no-useless-return
      return
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification,
    )

    return () => syncSession.removeProgressNotification(progressNotification)
  }, [])

  return (
    <Container>
      {percentegeToSync && (
        <TopMessage title={percentegeToSync} icon={CloudArrowUp} />
      )}
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
