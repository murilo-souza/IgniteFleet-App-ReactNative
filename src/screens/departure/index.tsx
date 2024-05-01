import React, { useRef } from 'react'
import { Container, Content } from './styles'
import { Header } from '../../components/header'
import { LicensePlateInput } from '../../components/license-plate-input'
import { TextAreaInput } from '../../components/text-area-input'
import { Button } from '../../components/button'
import { TextInput } from 'react-native'

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    console.log('ok')
  }

  return (
    <Container>
      <Header title="Sáida" />

      <Content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA1234"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          returnKeyType="next"
        />

        <TextAreaInput
          ref={descriptionRef}
          label="Finalidade"
          placeholder="Vou utilizar o veículo para..."
          onSubmitEditing={handleDepartureRegister}
          returnKeyType="send"
          blurOnSubmit
        />

        <Button title="Registrar saída" onPress={handleDepartureRegister} />
      </Content>
    </Container>
  )
}
