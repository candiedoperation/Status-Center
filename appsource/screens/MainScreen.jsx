import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Provider } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import AddMonitoredService from '../components/AddMonitoredService';
import SystemStatusGroup from '../components/SystemStatusGroup';

const MainScreen = forwardRef((props, ref) => {
  const AddServiceModalReference = useRef();

  useImperativeHandle(ref, () => ({
    requestShowAddServiceDialog(modalState) {
      AddServiceModalReference.current.requestModalVisibility(modalState);
    },
  }));

  return (
    <Provider theme={monitoringTheme}>
      <SystemStatusGroup />
      <AddMonitoredService ref={AddServiceModalReference} />
    </Provider>
  );
});

export default MainScreen;
