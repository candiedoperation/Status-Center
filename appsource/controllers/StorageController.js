import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const addService = (systemName, systemDesc, callback) => { //use addService.then()
    AsyncStorage.getItem('services', (error, response) => {
            if (response == null) {
                initializeStorageKey('services', () => { addService(systemName, systemDesc) });
            } else {
                AsyncStorage.getItem('services', (error, existingServices) => {
                    existingServices = JSON.parse(existingServices);
                    existingServices[uuid.v4()] = { systemName: systemName, systemDesc: systemDesc };
                    AsyncStorage.setItem('services', JSON.stringify(existingServices), callback);                    
                });
            }
        });
}

const fetchServices = new Promise((resolve, reject) => {
    AsyncStorage.getItem('services')
        .then((servicesList) => {
            if (servicesList == null) {
                initializeStorageKey('services', () => { });
                resolve({});
            } else {
                console.log(JSON.parse(servicesList));
                resolve(JSON.parse(servicesList));
            }
        }).catch((error) => {
            reject(error);
        });
});

//deleteStorageKey IS ONLY FOR DEBUGGING PURPOSES
const deleteStorageKey = async (keyIdentifier) => {
    await AsyncStorage.removeItem(keyIdentifier, (error) => {
        console.log(error);
    });
}

const initializeStorageKey = (keyIdentifier, callback) => {
    console.log("INF LOOP WARN: Request to Initialize Storage Key");
    AsyncStorage.setItem(keyIdentifier, JSON.stringify({}), callback);
}

export { addService, fetchServices, deleteStorageKey, initializeStorageKey }