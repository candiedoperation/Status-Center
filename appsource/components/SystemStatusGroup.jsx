import { ScrollView } from 'native-base';
import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { List, Provider } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import SystemAccordition from './SystemAccordition';
import { fetchServices } from '../controllers/StorageController';
import { RequestConnectionAddition, ReRenderRequestHandler, StartConnectionQueue, StopConnectionQueue } from '../controllers/TcpController';

const SystemStatusGroup = forwardRef((props, ref) => {
    const [renderUUID, requestReRender] = useState(0);
    const [dbServicesList, setDBServicesList] = useState([]);
    const getRandomId = () => parseInt(Math.random() * 100, 10);

    useImperativeHandle(ref, () => ({
        requestDataRefresh() {
            requestReRender(getRandomId());
        },
    }));

    useEffect(() => {
        fetchServices((servicesList) => {
            console.log("Re-Rendering Elements");
            ReRenderRequestHandler();
            const updatedState = [];

            for (const [uuid, data] of Object.entries(servicesList)) {
                console.log(`${uuid}: ${JSON.stringify(data)}`);
                RequestConnectionAddition({
                    systemUUID: uuid,
                    systemTelnet: data.systemTelnet
                });

                updatedState.push(
                    <SystemAccordition
                        sendReport={props.sendReport}
                        renderRequest={childReRenderRequest} 
                        key={uuid}
                        systemID={uuid} 
                        systemName={data.systemName} 
                        systemDesc={data.systemDesc} 
                        systemTelnet={data.systemTelnet}>
                    </SystemAccordition>
                );
            }

            StartConnectionQueue(() => { props.showsnackbar("Service Status Updated"); });
            setDBServicesList(updatedState);
        });
    }, [renderUUID]);

    function childReRenderRequest () {
        requestReRender(getRandomId());
    }

    return (
        <Provider theme={monitoringTheme}>
            <List.AccordionGroup renderKey={renderUUID} minHeight="full">{dbServicesList}</List.AccordionGroup>
        </Provider>
    );
});

export default SystemStatusGroup;