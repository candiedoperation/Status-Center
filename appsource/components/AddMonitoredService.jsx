import React, {
  useImperativeHandle, forwardRef, useState,
} from 'react';
import {
  Snackbar, Dialog, Portal, Button, Provider, TextInput
} from 'react-native-paper';
import { ScrollView } from 'native-base';
import { monitoringTheme } from '../themes/blueberry';
import { addService } from '../controllers/StorageController';

const modalStyle = {
  backgroundColor: 'white',
  padding: 20,
  margin: 15,
};

const AddMonitoredService = forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');
  const [lastAddedUUID, setLastAddedUUID] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceTelnet, setServiceTelnet] = useState('');
  const [submissionAllowed, setSubmissionAllowed] = useState(false);

  useImperativeHandle(ref, () => ({
    requestModalVisibility(modalState) {
      setVisible(modalState);
    },
  }));

  function CompleteServiceAddition() {
    setSubmissionAllowed(false);
    addService(serviceName, serviceDesc, serviceTelnet, () => {
      setSnackBarText("Service Added Successfully");
      setSnackBarVisible(true);
      props.refreshCall();
      setVisible(false);
      clearSelf();
    });
  }

  function clearSelf() {
    setServiceName("");
    setServiceDesc("");
    setServiceTelnet("");
    setSubmissionAllowed(false);
  }

  function validateFields() {
    if (serviceName.trim() == "" || serviceDesc.trim() == "" || serviceTelnet.trim() == "") {
      setSubmissionAllowed(false);
    } else {
      setSubmissionAllowed(true);
    }
  }

  return (
    <Provider theme={monitoringTheme}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => { setVisible(false); }}
          contentContainerStyle={modalStyle}
        >
          <Dialog.Title>Add a Service</Dialog.Title>
          <Dialog.Content style={{ maxHeight: '75%' }}>
            <ScrollView>
              <TextInput mode="outlined" label="Service Name" value={serviceName} onKeyPress={validateFields} onChangeText={serviceName => setServiceName(serviceName)} />
              <TextInput mode="outlined" label="Service Description" value={serviceDesc} onKeyPress={validateFields} onChangeText={serviceDesc => setServiceDesc(serviceDesc)} />
              <TextInput mode="outlined" label="Location [ADDRESS:PORT]" value={serviceTelnet} onKeyPress={validateFields} onChangeText={serviceTelnet => setServiceTelnet(serviceTelnet)} />
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { setVisible(false); }}>Cancel</Button>
            <Button mode="contained" disabled={!submissionAllowed} marginLeft={5} onPress={CompleteServiceAddition}>Add Service</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => { setSnackBarVisible(false); }}
        >
          {snackBarText}
        </Snackbar>
      </Portal>
    </Provider>
  );
});

export default AddMonitoredService;
