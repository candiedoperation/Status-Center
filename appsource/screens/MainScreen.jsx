import React, { useRef } from 'react';
import { Provider } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import AddMonitoredService from '../components/AddMonitoredService';
import SystemStatusGroup from '../components/SystemStatusGroup';

const MainScreen = () => {
  const AddServiceModalReference = useRef();

  return (<Provider theme={monitoringTheme}>
    <SystemStatusGroup />
    <AddMonitoredService ref={AddServiceModalReference} />
  </Provider>);
};

export default MainScreen;
