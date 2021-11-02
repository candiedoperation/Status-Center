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

import React, { useImperativeHandle, forwardRef } from 'react';
import { Snackbar, Dialog, Portal, Button, Provider, TextInput } from 'react-native-paper';
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
    const [sendReportLoading, setSendReportLoading] = React.useState(false);
    const [feedbackText, setFeedbackText] = React.useState("");

    useImperativeHandle(ref, () => ({
        requestModalVisibility(modalState, serviceUUID, serviceName) {
            setServiceUUID(serviceUUID);
            setServiceName(serviceName);
            setVisible(modalState);
        },
    }));

    function handleReportSend() {
        setSendReportDisabled(true);
        setSendReportLoading(true);

        forwardReportToBackend(
            {
                serviceName: serviceName,
                serviceUUID: serviceUUID,
                serviceMessage: feedbackText,
            }, 
            (response) => {
                setVisible(false);
                setFeedbackText("");
                setSendReportDisabled(false);
                setSendReportLoading(false);

                setSnackBarText('Issue has been Reported');
                setSnackBarVisible(true);
            }, 
            (error) => {
                setSendReportDisabled(false);
                setSendReportLoading(false);

                setSnackBarText('Failed to Report Issue');
                setSnackBarVisible(true);
            }
        );
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
                        <Button loading={sendReportLoading} disabled={sendReportDisabled} onPress={handleReportSend} mode="contained">Send Report</Button>
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
