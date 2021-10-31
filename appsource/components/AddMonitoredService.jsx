import React, {
  useImperativeHandle, forwardRef,
} from 'react';
import {
  Snackbar, Dialog, Portal, Button, Provider,
} from 'react-native-paper';
import { ScrollView } from 'native-base';
import { monitoringTheme } from '../themes/blueberry';

const modalStyle = {
  backgroundColor: 'white',
  padding: 20,
  margin: 15,
};

const AddMonitoredService = forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarText, setSnackBarText] = React.useState('');

  useImperativeHandle(ref, () => ({
    requestModalVisibility(modalState) {
      setVisible(modalState);
    },
  }));

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
            <ScrollView />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { }}>Cancel</Button>
            <Button onPress={() => { }}>Add Service</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => { setSnackBarVisible(false); }}
          action={{
            label: 'Undo',
            onPress: () => {

            },
          }}
        >
          {snackBarText}
        </Snackbar>
      </Portal>
    </Provider>
  );
});

export default AddMonitoredService;
