import React from 'react';
import { Box } from 'native-base';
import { Provider } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import SystemStatusGroup from '../components/SystemStatusGroup';

const MainScreen = ()  => {
    return (
        <Provider theme={monitoringTheme}>
            <SystemStatusGroup></SystemStatusGroup>
        </Provider>
    );
}

export default MainScreen;