import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Snackbar, Dialog, Portal, Button, Provider, TextInput } from 'react-native-paper';
import { Flex, ScrollView } from 'native-base';
import * as RNFS from 'react-native-fs';
import { monitoringTheme } from '../themes/blueberry';
import { Platform } from 'react-native';
import { exportStorageData } from '../controllers/StorageController';
import { pick as configPicker } from 'react-native-document-picker';

const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
};

const SettingsDialog = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarText, setSnackBarText] = React.useState('');

    useImperativeHandle(ref, () => ({
        requestModalVisibility(modalState) {
            setVisible(modalState);
        },
    }));

    async function handleConfigExport() {
        try {
            const directoryAccessGranted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]);
            const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

            if (!readGranted || !writeGranted) {
                setSnackBarText('File Access Permission Denied');
                setSnackBarVisible(true);
            } else {
                exportStorageData((storageData) => {
                    const exportDirectory = `${RNFS.ExternalStorageDirectoryPath}/Documents/Status Center Configurations`;
                    const exportPath = `${exportDirectory}/statuscenter-config (${new Date().getTime()}).scconf`;
                    RNFS.mkdir(exportDirectory); //Does not throw if already exists
                    RNFS.writeFile(exportPath, storageData, 'utf8')
                        .then((success) => {
                            setSnackBarText('Configuration Exported to Documents Successfully');
                            setSnackBarVisible(true);
                        })
                        .catch((err) => {
                            console.error(err);
                            setSnackBarText('Configuration Export Failed');
                            setSnackBarVisible(true);
                        });                    
                });
            }
        } catch (error) {
            console.warn(error);
        }
    }

    async function handleConfigImport () {
        configPicker();
    }

    return (
        <Provider theme={monitoringTheme}>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={() => { setVisible(false); }}
                    contentContainerStyle={modalStyle}
                >
                    <Dialog.Title>Settings</Dialog.Title>
                    <Dialog.Content style={{ maxHeight: '75%' }}>
                        <Flex>
                            <Button margin={3} mode="outlined">Import System List</Button>
                            <Button disabled={Platform.OS == "android" ? false : true} margin={3} mode="outlined" onPress={handleConfigExport}>{Platform.OS == "android" ? "Export System List" : "Export (Android Only)"}</Button>
                            <Button margin={3} mode="contained" color="#c6262e">Delete All Systems</Button>
                        </Flex>
                    </Dialog.Content>
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

export default SettingsDialog;