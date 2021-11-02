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

import axios from "axios"
import { fetchService, getStatusCenterURL } from "./StorageController"

function forwardReportToBackend(feedbackData, resolve, reject) {
    getStatusCenterURL(
        (statusCenterURL) => {
            axios.post(`${statusCenterURL}/feedback`, {
                serviceName: feedbackData.serviceName,
                serviceUUID: feedbackData.serviceUUID,
                serviceMessage: feedbackData.serviceMessage,
                feedbackTime: new Date().getTime()
            })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.error(error);
                    reject(error);
                });
        },
        (error) => {
            reject(error);
        }
    );
}

function forwardRestartToBackend(serviceUUID, resolve, reject) {
    fetchService(serviceUUID, (serviceInformation) => {
        getStatusCenterURL(
            (statusCenterURL) => {
                axios.post(`${statusCenterURL}/restart`, {
                    serviceName: serviceInformation.systemName,
                    serviceDesc: serviceInformation.systemDesc,
                    serviceTelnet: serviceInformation.systemTelnet,
                    serviceUUID: serviceUUID,
                    requestTime: new Date().getTime()
                })
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.error(error);
                        reject(error);
                    });
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export { forwardReportToBackend, forwardRestartToBackend }