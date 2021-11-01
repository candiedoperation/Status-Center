import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const initializeStorageKey = (keyIdentifier, callback) => {
  console.log('INF LOOP WARN: Request to Initialize Storage Key');
  AsyncStorage.setItem(keyIdentifier, JSON.stringify({}), callback);
};

function addService(systemName, systemDesc, systemTelnet, callback) {
  AsyncStorage.getItem('@services', (error, response) => {
    if (response == null) {
      initializeStorageKey('@services', () => { addService(systemName, systemDesc, systemTelnet); });
    } else {
      AsyncStorage.getItem('@services', (error, existingServices) => {
        existingServices = JSON.parse(existingServices);
        existingServices[uuid.v4()] = { systemName, systemDesc, systemTelnet };
        AsyncStorage.setItem('@services', JSON.stringify(existingServices), callback);
      });
    }
  });
}

function exportStorageData(resolve) {
  AsyncStorage.getAllKeys(async (error, storageKeys) => {
    AsyncStorage.multiGet(storageKeys, (error, storageData) => {
      resolve(JSON.stringify(storageData));
    });
  });
}

function importStorageData(storageData, reject, resolve) {
  AsyncStorage.multiSet(storageData, (error) => {
    if (!error) {
      resolve();
    } else {
      console.log(error);
      reject (error);
    }
  })
}

function fetchServices(resolve) {
  AsyncStorage.getItem('@services', (error, servicesList) => {
    if (servicesList == null) {
      initializeStorageKey('@services', () => { });
      resolve({});
    } else {
      console.log(JSON.parse(servicesList));
      resolve(JSON.parse(servicesList));
    }
  })
};

function fetchService(serviceUUID, resolve) {
  AsyncStorage.getItem('@services', (error, servicesList) => {
    servicesList = JSON.parse(servicesList); //FETCH ACK was used to log used
    resolve(servicesList[serviceUUID]);
  });
}

// deleteStorageKey IS ONLY FOR DEBUGGING PURPOSES
async function deleteStorageKey(keyIdentifier) {
  await AsyncStorage.removeItem(keyIdentifier, (error) => {
    console.log(error);
  });
}

export {
  addService, fetchServices, fetchService, exportStorageData, importStorageData, deleteStorageKey, initializeStorageKey,
};
