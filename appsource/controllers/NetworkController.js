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