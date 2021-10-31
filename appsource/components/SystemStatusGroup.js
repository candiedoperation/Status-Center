import { ScrollView } from 'native-base';
import React, { useState, useCallback } from 'react';
import { List, View, Text, Provider } from 'react-native-paper';
import { monitoringTheme, statusColors } from '../themes/blueberry';
import SystemAccordition from './SystemAccordition';
import { addService, deleteStorageKey, fetchServices } from '../controllers/StorageController';

const SystemStatusGroup = () => {
    const [renderUUID, requestReRender] = useState('');
    const [dbServicesList, setDBServicesList] = useState([]);

    //deleteStorageKey ('services');
    //addService ("Home Zone DNS", "internet.dns.ramalingam.org", () => {});

    fetchServices.then((servicesList) => {
        for (const [uuid, data] of Object.entries(servicesList)) {
            console.log(`${uuid}: ${JSON.stringify(data)}`);
            dbServicesList.push({ uuid: uuid, data: data });
        }

        setDBServicesList(dbServicesList);
        requestReRender("123");
    });

    return (
        <Provider theme={monitoringTheme}>
            <ScrollView>
                <List.AccordionGroup>
                    {dbServicesList.map(service => <SystemAccordition systemID={service.uuid} systemName={service.data.systemName} systemDesc={service.data.systemDesc} statusColor={statusColors.indeterminate}></SystemAccordition>)}
                </List.AccordionGroup>
            </ScrollView>
        </Provider>
    );
};

export default SystemStatusGroup;