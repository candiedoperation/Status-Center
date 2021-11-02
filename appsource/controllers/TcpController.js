import TcpSocket from 'react-native-tcp-socket';

//Controlling Connections Syncrosously due to Limitations of TcpSocket
var connectionQueue = [];
var availableConnections = [];
var rejectedConnections = [];
var currentConnectionIndex = 0;

function TcpController(serviceTelnet) {
    return new Promise((resolve, reject) => {
        var forceConnectionDestruction;
        var TcpConnection = TcpSocket.createConnection({
            host: serviceTelnet.split(":")[0],
            port: serviceTelnet.split(":")[1]
        },
            () => {
                clearTimeout(forceConnectionDestruction);
                resolve();
                TcpConnection.destroy();
            });

        forceConnectionDestruction = setTimeout(() => {
            TcpConnection.destroy();
            reject();
        }, 1500);
    });
}

function RequestConnectionAddition(connectionData) {
    connectionQueue.push(connectionData);
}

function ReRenderRequestHandler() {
    StopConnectionQueue();
    availableConnections.length = 0;
    rejectedConnections.length = 0;    
}

function CheckQueueCompletionStatus(systemUUID) {
    return new Promise((resolve, reject) => {
        if (availableConnections.includes(systemUUID)) {
            resolve(0); //0 for success
        } else if (rejectedConnections.includes(systemUUID)) {
            resolve(1); //1 for Rejection
        } else {
            reject(-1); //-1 for indeterminate
        }
    });
}

function StartConnectionQueue(callback) {
    console.log("Queue Requested");
    if (typeof connectionQueue[currentConnectionIndex] === 'undefined') {
        console.log("Queue Complete");

        currentConnectionIndex = 0;
        connectionQueue.length = 0;
    } else {
        TcpController(connectionQueue[currentConnectionIndex].systemTelnet)
            .then((response) => {
                availableConnections.push(
                    connectionQueue[currentConnectionIndex].systemUUID
                );

                callback(
                    connectionQueue[currentConnectionIndex].systemUUID,
                    0 //Signal 0 for successful connection
                );
            })
            .catch((error) => {
                rejectedConnections.push(
                    connectionQueue[currentConnectionIndex].systemUUID
                );

                callback(
                    connectionQueue[currentConnectionIndex].systemUUID,
                    1 //Signal 1 for error
                );
            }).finally(() => {
                currentConnectionIndex++;
                StartConnectionQueue(callback);
            });
    }
}

function StopConnectionQueue() {
    //Make sure the Index is 1 higher than total indices so that StartConnectionQueue ends loop.
    currentConnectionIndex = connectionQueue.length;
}

export {
    CheckQueueCompletionStatus,
    RequestConnectionAddition,
    StartConnectionQueue,
    StopConnectionQueue,
    ReRenderRequestHandler
}