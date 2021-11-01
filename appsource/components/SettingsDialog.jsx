import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Snackbar, Dialog, Portal, Button, Provider, TextInput, Subheading } from 'react-native-paper';
import { Flex, ScrollView } from 'native-base';
import * as RNFS from 'react-native-fs';
import * as mime from 'react-native-mime-types';
import { monitoringTheme } from '../themes/blueberry';
import { Platform } from 'react-native';
import { exportStorageData, importStorageData, deleteStorageKey } from '../controllers/StorageController';
import { pick as configPicker, isCancel as isPickCancelled } from 'react-native-document-picker';

const modalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
};

const SettingsDialog = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarText, setSnackBarText] = React.useState('');
    const [serverRootText, setServerRootText] = React.useState('');

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
                    const exportPath = `${exportDirectory}/statuscenter-config (${new Date().getTime()}).json`;
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

    async function handleConfigImport() {
        try {
            const directoryAccessGranted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]);
            const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

            if (!readGranted || !writeGranted) {
                setSnackBarText('File Access Permission Denied');
                setSnackBarVisible(true);
            } else {
                configPicker({
                    allowMultiSelection: false,
                    type: [mime.lookup('json')]
                }).then((pickedConfiguration) => {
                    console.log(pickedConfiguration[0].uri);
                    RNFS.readFile(pickedConfiguration[0].uri, "utf8")
                        .then((storageDB) => {
                            importStorageData(JSON.parse(storageDB),
                                (error) => {
                                    setSnackBarText('Failed to Import Configuration File');
                                    setSnackBarVisible(true);
                                },

                                (response) => {
                                    props.refreshCall();
                                    setVisible(false);
                                    setSnackBarText('Successfully Imported Configuration File');
                                    setSnackBarVisible(true);
                                });
                        })
                        .catch((error) => {
                            setSnackBarText('Failed to Read Configuration File');
                            setSnackBarVisible(true);
                        });
                }).catch((error) => {
                    if (isPickCancelled(error)) {
                        setSnackBarText('Configuration Import Cancelled');
                        setSnackBarVisible(true);
                    } else {
                        console.error(error);
                    }
                });
            }
        } catch (error) {
            console.warn(error);
        }
    }

    function handleDeleteSystems() {
        deleteStorageKey('@services',
            () => {
                props.refreshCall();
                setVisible(false);
                setSnackBarText('Deleted All Services Successfully');
                setSnackBarVisible(true);
            },
            (error) => {
                setSnackBarText('Failed to Delete Services');
                setSnackBarVisible(true);
            })
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
                    <Dialog.Content style={{ maxHeight: '80%' }}>
                        <ScrollView>
                            <Flex>
                                <Subheading>Backup Settings</Subheading>
                                <Button margin={3} mode="outlined" onPress={handleConfigImport}>Import Services List</Button>
                                <Button disabled={Platform.OS == "android" ? false : true} margin={3} mode="outlined" onPress={handleConfigExport}>{Platform.OS == "android" ? "Export Services List" : "Export (Android Only)"}</Button>
                                <Button margin={3} mode="contained" color="#c6262e" onPress={handleDeleteSystems}>Delete All Services</Button>
                            </Flex>
                            <Flex marginTop={3} marginBottom={5}>
                                <Subheading>Status Center Server</Subheading>
                                <TextInput mode="outlined" label="Server Root URL"></TextInput>
                                <Button marginTop={5} mode="contained">Update Server Root URL</Button>
                            </Flex>
                        </ScrollView>
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
