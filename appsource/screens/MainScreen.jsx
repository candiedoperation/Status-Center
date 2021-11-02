/*
    Status Center
    Copyright (C) 2021  Atheesh Thirumalairajan

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
