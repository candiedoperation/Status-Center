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
      reject(error);
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
}

function fetchService(serviceUUID, resolve) {
  AsyncStorage.getItem('@services', (error, servicesList) => {
    servicesList = JSON.parse(servicesList); //FETCH ACK was used to log used
    resolve(servicesList[serviceUUID]);
  });
}

function deleteService(serviceUUID, resolve) {
  AsyncStorage.getItem('@services', (error, servicesList) => {
    servicesList = JSON.parse(servicesList);
    servicesList = delete servicesList[serviceUUID];
    servicesList = JSON.stringify(servicesList);

    AsyncStorage.setItem('@services', servicesList, (error) => {
      if (!error) {
        resolve();
      }
    })
  });
}

function setStatusCenterURL(statusCenterURL, resolve, reject) {
  if (statusCenterURL.endsWith("/") == true) { statusCenterURL = statusCenterURL.slice(0, -1) }
  AsyncStorage.setItem('@url', statusCenterURL, (error) => {
    if (!error) {
      resolve();
    } else {
      reject(error);
    }
  });
}

function getStatusCenterURL(resolve, reject) {
  AsyncStorage.getItem('@url', (error, statusCenterURL) => {
    if (!error) {
      resolve(statusCenterURL);
    } else {
      console.error(error);
      reject(error);
    }
  });
}

// deleteStorageKey IS ONLY FOR DEBUGGING PURPOSES
function deleteStorageKey(keyIdentifier, resolve, reject) {
  AsyncStorage.removeItem(keyIdentifier, (error) => {
    if (!error && resolve) {
      resolve();
    } else {
      reject(error);
    }
  });
}

export {
  addService,
  fetchServices,
  fetchService,
  exportStorageData,
  importStorageData,
  deleteStorageKey,
  deleteService,
  setStatusCenterURL,
  getStatusCenterURL,
  initializeStorageKey,
};
