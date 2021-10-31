import React from 'react';
import {
  List,
} from 'react-native-paper';
import { actionTextStyles } from '../themes/blueberry';

const SystemAccordition = ({
  systemID, systemName, systemDesc, statusColor,
}) => (
  <List.Accordion left={(props_internal) => <List.Icon {...props_internal} color={statusColor} icon="circle" />} title={systemName} description={systemDesc} id={systemID}>
    <List.Item onPress={() => {}} title="Report Issue" />
    <List.Item titleStyle={actionTextStyles.warningListAction} onPress={() => {}} title="Request Service Restart" />
    <List.Item titleStyle={actionTextStyles.dangerListAction} onPress={() => {}} title="Remove this Service" />
  </List.Accordion>
);

export default SystemAccordition;
