import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Provider } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import AddMonitoredService from '../components/AddMonitoredService';
import SystemStatusGroup from '../components/SystemStatusGroup';
import { ScrollView } from 'native-base';

const MainScreen = forwardRef((props, ref) => { 
  const AddServiceModalReference = useRef();
  const SystemStatusGroupReference = useRef();

  useImperativeHandle(ref, () => ({
    requestShowAddServiceDialog(modalState) {
      AddServiceModalReference.current.requestModalVisibility(modalState);
    },
    requestDataRefresh() {
      SystemStatusGroupReference.current.requestDataRefresh();
    }
  }));

  return (
    <Provider theme={monitoringTheme}>
      <ScrollView height="full">
      <SystemStatusGroup ref={SystemStatusGroupReference} />
      </ScrollView>
      <AddMonitoredService ref={AddServiceModalReference} refreshCall={() => { window.location.reload() }} />
    </Provider>
  );
});

export default MainScreen;
