import TcpSocket from 'react-native-tcp-socket';
import { fetchService } from './StorageController';

function checkServiceAvailability(serviceUUID, callback) {
    fetchService(serviceUUID, (serviceInformation) => {
        console.log(serviceInformation);
        const TcpConnection = TcpSocket.createConnection({
            host: serviceInformation.systemTelnet.split(":")[0],
            port: serviceInformation.systemTelnet.split(":")[1],
            localAddress: "10.0.2.16"
        }, () => {
            TcpConnection.destroy ();
        });

        TcpConnection.on('connect', () => { callback (0) }); //0 for successfull connetion
        TcpConnection.on('error', () => { callback (1) }); //1 for Connection Refused
    });
}

export { checkServiceAvailability }