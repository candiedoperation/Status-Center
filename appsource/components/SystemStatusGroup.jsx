import { ScrollView } from 'native-base';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { List, Provider } from 'react-native-paper';
import { monitoringTheme, statusColors } from '../themes/blueberry';
import SystemAccordition from './SystemAccordition';
import { fetchServices } from '../controllers/StorageController';
import { addService } from '../controllers/StorageController';

const getRandomId = () => parseInt(Math.random() * 100, 10);

const SystemStatusGroup = forwardRef((props, ref) => {
    const [renderUUID, requestReRender] = useState(0);
    const [dbServicesList, setDBServicesList] = useState([]);

    useImperativeHandle(ref, () => ({
        requestDataRefresh() {
            console.log("Re-Rendering Elements");
            requestReRender(renderUUID + 1);
        },
    }));

    //deleteStorageKey ('services');
    //addService ("Home Zone DNS", "internet.dns.ramalingam.org", () => {});

    useEffect(() => {
        fetchServices.then((servicesList) => {
            let updatedState = [];

            for (const [uuid, data] of Object.entries(servicesList)) {
                //console.log(`${uuid}: ${JSON.stringify(data)}`);
                updatedState.push(<SystemAccordition key={uuid} systemID={uuid} systemName={data.systemName + new Date().getTime().toString()} systemDesc={data.systemDesc} systemTelnet={data.systemTelnet} statusColor={statusColors.indeterminate}></SystemAccordition>);
            }
            
            setDBServicesList(updatedState);
        });        
    }, [renderUUID])

    return (
        <Provider theme={monitoringTheme}>
            <List.AccordionGroup renderKey={renderUUID} minHeight="full">{dbServicesList}</List.AccordionGroup>
        </Provider>
    );
});

export default SystemStatusGroup;