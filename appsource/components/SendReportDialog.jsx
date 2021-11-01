import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { Snackbar, Dialog, Portal, Button, Provider, TextInput, Subheading } from 'react-native-paper';
import { Flex, ScrollView } from 'native-base';
import { forwardReportToBackend } from '../controllers/NetworkController';
import { monitoringTheme } from '../themes/blueberry';

const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
};

const SendReportDialog = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarText, setSnackBarText] = React.useState('');
    const [serviceUUID, setServiceUUID] = React.useState('');
    const [serviceName, setServiceName] = React.useState('');
    const [sendReportDisabled, setSendReportDisabled] = React.useState(true);
    const [feedbackText, setFeedbackText] = React.useState("");

    useImperativeHandle(ref, () => ({
        requestModalVisibility(modalState, serviceUUID, serviceName) {
            setServiceUUID(serviceUUID);
            setServiceName(serviceName);
            setVisible(modalState);
        },
    }));

    function handleReportSend() {

    }

    function handleFeedbackButtonBehavior() {
        if (feedbackText.trim() == "" || feedbackText == undefined) { setSendReportDisabled(true) }
        else { setSendReportDisabled(false) }
    }

    return (
        <Provider theme={monitoringTheme}>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={() => { setVisible(false); }}
                    contentContainerStyle={modalStyle}
                >
                    <Dialog.Title>{`Report ${serviceName}`}</Dialog.Title>
                    <Dialog.Content>
                        <TextInput 
                            value={feedbackText} 
                            onKeyPress={handleFeedbackButtonBehavior} 
                            onChangeText={(updateText) => { setFeedbackText(updateText) }} 
                            multiline={true} 
                            mode="outlined"
                            maxLength={300}
                            right={<TextInput.Affix text={`${feedbackText.length}/300`} />}
                            label="Feedback">
                        </TextInput>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { setVisible(false); setFeedbackText("") }}>Cancel</Button>
                        <Button disabled={sendReportDisabled} onPress={handleReportSend} mode="contained">Send Report</Button>
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

export default SendReportDialog;
