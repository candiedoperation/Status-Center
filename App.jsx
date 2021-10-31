import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import ApplicationInterface from './appsource/components/ApplicationInterface';
import { monitoringTheme } from './appsource/themes/blueberry';

export default function App() {
  return (
    <NativeBaseProvider>
      <PaperProvider theme={monitoringTheme}>
        <ApplicationInterface />
      </PaperProvider>
      <StatusBar style="light" backgroundColor="#002e99" translucent={false} />
    </NativeBaseProvider>
  );
}
