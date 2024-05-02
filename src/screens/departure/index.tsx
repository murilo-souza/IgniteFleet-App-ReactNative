import React, { useRef, useState } from 'react'
import { Container, Content } from './styles'
import { Header } from '../../components/header'
import { LicensePlateInput } from '../../components/license-plate-input'
import { TextAreaInput } from '../../components/text-area-input'
import { Button } from '../../components/button'
import { Alert, ScrollView, TextInput } from 'react-native'
import { licensePlateValidate } from '../../utils/license-plate-validate'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/historic'
import { useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  const realm = useRealm()
  const user = useUser()
  const { goBack } = useNavigation()

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert(
          'Placa inválida',
          'Por favor, insira uma placa válida',
        )
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus()
        return Alert.alert(
          'Finalidade',
          'Por favor, informa a finalidade da utilização do veículo',
        )
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso')

      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo')
      setIsRegistering(false)
    }
  }

  return (
    <Container>
      <Header title="Sáida" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title="Registrar saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}
