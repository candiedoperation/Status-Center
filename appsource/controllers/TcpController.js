import TcpSocket from 'react-native-tcp-socket';

//Controlling Connections Syncrosously due to Limitations of TcpSocket
var connectionQueue = [];
var completedConnections = [];
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

function CheckQueueCompletionStatus(systemUUID) {
    return new Promise((resolve, reject) => {
        if (completedConnections.includes(systemUUID)) {
            resolve ();
        } else {
            reject ();
        }
    });
}

function StartConnectionQueue(callback) {
    if (typeof connectionQueue[currentConnectionIndex] === 'undefined') {
        console.log("Queue Complete");
        currentConnectionIndex = 0;
        connectionQueue.length = 0;
        completedConnections.length = 0;
    } else {
        TcpController(connectionQueue[currentConnectionIndex].systemTelnet)
            .then((response) => {
                completedConnections.push(
                    connectionQueue[currentConnectionIndex].systemUUID
                );

                callback(
                    connectionQueue[currentConnectionIndex].systemUUID,
                    0 //Signal 0 for successful connection
                );
            })
            .catch((error) => {
                callback(
                    connectionQueue[currentConnectionIndex].systemUUID,
                    1 //Signal 1 for error
                )
            }).finally(() => {
                currentConnectionIndex++;
                StartConnectionQueue(callback);
            });
    }
}

function StopConnectionQueue() {
    //Make sure the Index is 1 higher than total indices so that StartConnectionQueue ends loop.
    currentConnectionIndex = connectionQueue.length();
}

export {
    TcpController,
    CheckQueueCompletionStatus,
    RequestConnectionAddition,
    StartConnectionQueue,
    StopConnectionQueue
}