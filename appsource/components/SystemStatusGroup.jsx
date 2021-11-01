import { ScrollView } from 'native-base';
import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { List, Provider } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import SystemAccordition from './SystemAccordition';
import { fetchServices } from '../controllers/StorageController';

const SystemStatusGroup = forwardRef((props, ref) => {
    const [renderUUID, requestReRender] = useState(0);
    const [dbServicesList, setDBServicesList] = useState([]);
    const getRandomId = () => parseInt(Math.random() * 100, 10);

    useImperativeHandle(ref, () => ({
        requestDataRefresh() {
            console.log("Re-Rendering Elements");
            requestReRender(getRandomId());
        },
    }));

    useEffect(() => {
        fetchServices((servicesList) => {
            const updatedState = [];
            for (const [uuid, data] of Object.entries(servicesList)) {
                console.log(`${uuid}: ${JSON.stringify(data)}`);
                updatedState.push(<SystemAccordition key={uuid} systemID={uuid} systemName={data.systemName} systemDesc={data.systemDesc} systemTelnet={data.systemTelnet}></SystemAccordition>);
            }

            setDBServicesList(updatedState);
            props.showsnackbar("Service Status Updated");
        });
    }, [renderUUID])

    return (
        <Provider theme={monitoringTheme}>
            <List.AccordionGroup renderKey={renderUUID} minHeight="full">{dbServicesList}</List.AccordionGroup>
        </Provider>
    );
});

export default SystemStatusGroup;