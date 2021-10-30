import { ScrollView } from 'native-base';
import React from 'react';
import { List, View, Text, Provider } from 'react-native-paper';
import { monitoringTheme, statusColors } from '../themes/blueberry';
import SystemAccordition from './SystemAccordition';
import { addService, deleteStorageKey, fetchServices } from '../controllers/StorageController';

const SystemStatusGroup = () => {
    const [accorditionGroupElements, setAccorditionGroupElements] = React.useState ([]);

    //deleteStorageKey ('services');
    //addService ("Home Zone DNS", "internet.dns.ramalingam.org", () => {});
    fetchServices.then((servicesList) => {
        for (const [key, value] of Object.entries(servicesList)) {
            console.log(`000${key}: ${JSON.stringify(value)}`);
            setAccorditionGroupElements(accorditionGroupElements, [...accorditionGroupElements, <SystemAccordition systemID={key} systemName={value.systemName} systemDesc={value.systemDesc} statusColor={statusColors.indeterminate}></SystemAccordition>]);
        }
    });

    return (
        <Provider theme={monitoringTheme}>
            <ScrollView>
                <List.AccordionGroup>{accorditionGroupElements}</List.AccordionGroup>
            </ScrollView>
        </Provider>
    );
};

export default SystemStatusGroup;