import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Provider, Portal, Snackbar } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import AddMonitoredService from '../components/AddMonitoredService';
import SystemStatusGroup from '../components/SystemStatusGroup';
import { ScrollView } from 'native-base';
import SettingsDialog from '../components/SettingsDialog';
import SendReportDialog from '../components/SendReportDialog';

const MainScreen = forwardRef((props, ref) => {
  const AddServiceModalReference = useRef();
  const SystemStatusGroupReference = useRef();
  const SettingsModalReference = useRef();
  const SendReportDialogReference = useRef();
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
    }
  }));

  function showSnackBar(snackBarText) {
    setSnackBarText(snackBarText);
    setSnackBarVisible(true);
  }

  function sendReportToServer(serviceUUID, serviceName) {
    SendReportDialogReference.current.requestModalVisibility(true, serviceUUID, serviceName);
  }

  return (
    <Provider theme={monitoringTheme}>
      <ScrollView height="full">
        <SystemStatusGroup sendReport={sendReportToServer} showsnackbar={showSnackBar} ref={SystemStatusGroupReference} />
      </ScrollView>
      <AddMonitoredService ref={AddServiceModalReference} refreshCall={() => { SystemStatusGroupReference.current.requestDataRefresh() }} />
      <SettingsDialog refreshCall={() => { SystemStatusGroupReference.current.requestDataRefresh() }} ref={SettingsModalReference} />
      <SendReportDialog ref={SendReportDialogReference}></SendReportDialog>
      <Portal>
        <Snackbar visible={snackBarVisible} onDismiss={() => { setSnackBarVisible(false); }}>{snackBarText}</Snackbar>
      </Portal>
    </Provider>
  );
});

export default MainScreen;
