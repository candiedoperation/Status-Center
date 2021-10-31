import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import React from 'react';
import App from './App';
import { monitoringTheme } from './appsource/themes/blueberry';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';

function AppEnvironment() {
    return (
        <NativeBaseProvider>
            <PaperProvider theme={monitoringTheme}>
                <App />
            </PaperProvider>
            <StatusBar style="light" backgroundColor="#002e99" translucent={false} />
        </NativeBaseProvider>
    );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppEnvironment);
