import { ScrollView } from 'native-base';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { List, Provider } from 'react-native-paper';
import { monitoringTheme, statusColors } from '../themes/blueberry';
import SystemAccordition from './SystemAccordition';
import { fetchServices } from '../controllers/StorageController';
import { addService } from '../controllers/StorageController';

const getRandomId = () => parseInt(Math.random() * 100, 10);

const SystemStatusGroup = forwardRef((props, ref) => {
    const [renderUUID, requestReRender] = useState('');
    const [dbServicesList, setDBServicesList] = useState([]);

    function utilizeServiceFetchAPI () {
        dbServicesList.length = 0;
        setDBServicesList(dbServicesList);

        fetchServices.then((servicesList) => {
            for (const [uuid, data] of Object.entries(servicesList)) {
                //console.log(`${uuid}: ${JSON.stringify(data)}`);
                dbServicesList.push(<SystemAccordition systemID={uuid} systemName={data.systemName} systemDesc={data.systemDesc} systemTelnet={data.systemTelnet} statusColor={statusColors.indeterminate}></SystemAccordition>);
            }

            setDBServicesList(dbServicesList);
            requestReRender("forceRender");
        });
    }

    useImperativeHandle(ref, () => ({
        requestDataRefresh() {
            console.log("Re-Rendering Elements");
            utilizeServiceFetchAPI ();
        },
    }));

    //deleteStorageKey ('services');
    //addService ("Home Zone DNS", "internet.dns.ramalingam.org", () => {});

    useEffect(() => {
        utilizeServiceFetchAPI();
    })

    return (
        <Provider theme={monitoringTheme}>
            <List.AccordionGroup minHeight="full">{dbServicesList}</List.AccordionGroup>
        </Provider>
    );
});

export default SystemStatusGroup;