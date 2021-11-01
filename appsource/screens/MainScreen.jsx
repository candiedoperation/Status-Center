import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Provider, Portal, Snackbar } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import AddMonitoredService from '../components/AddMonitoredService';
import SystemStatusGroup from '../components/SystemStatusGroup';
import { ScrollView } from 'native-base';
import SettingsDialog from '../components/SettingsDialog';

const MainScreen = forwardRef((props, ref) => {
  const AddServiceModalReference = useRef();
  const SystemStatusGroupReference = useRef();
  const SettingsModalReference = useRef();
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');

  useImperativeHandle(ref, () => ({
    requestShowAddServiceDialog(modalState) {
      AddServiceModalReference.current.requestModalVisibility(modalState);
    },
    requestDataRefresh() {
      SystemStatusGroupReference.current.requestDataRefresh();
    },
    requestShowSettingsDialog(modalState) {
      SettingsModalReference.current.requestModalVisibility(modalState);
    },
    requestServiceRemoval(serviceUUID) {

    }
  }));

  function showSnackBar(snackBarText) {
    setSnackBarText(snackBarText);
    setSnackBarVisible(true);
  }

  return (
    <Provider theme={monitoringTheme}>
      <ScrollView height="full">
        <SystemStatusGroup showsnackbar={showSnackBar} ref={SystemStatusGroupReference} />
      </ScrollView>
      <AddMonitoredService ref={AddServiceModalReference} refreshCall={() => { SystemStatusGroupReference.current.requestDataRefresh() }} />
      <SettingsDialog ref={SettingsModalReference} />
      <Portal>
        <Snackbar visible={snackBarVisible} onDismiss={() => { setSnackBarVisible(false); }}>{snackBarText}</Snackbar>
      </Portal>
    </Provider>
  );
});

export default MainScreen;
