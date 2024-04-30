/* eslint-disable camelcase */
import { ThemeProvider } from 'styled-components/native'
import { SignIn } from './src/screens/sign-in'
import theme from './src/theme'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Loading } from './src/components/loading'
import { StatusBar } from 'react-native'

import { AppProvider, UserProvider } from '@realm/react'
import { REALM_APP_ID } from '@env'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <UserProvider fallback={SignIn}>
          <Routes />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
