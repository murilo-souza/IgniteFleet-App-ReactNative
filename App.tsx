/* eslint-disable camelcase */
import './src/libs/dayjs'
import 'react-native-get-random-values'
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
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RealmProvider } from './src/libs/realm'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
