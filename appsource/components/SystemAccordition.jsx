import React from 'react';
import { List } from 'react-native-paper';
import { useState } from 'react/cjs/react.development';
import { checkServiceAvailability } from '../controllers/TcpController';
import { actionTextStyles, statusColors } from '../themes/blueberry';

const SystemAccordition = ({ systemID, systemName, systemDesc, statusColor }) => {
  const [serverAvailabilityColor, setServerAvailabilityColor] = useState(statusColors.indeterminate);

  console.log(systemID);
  checkServiceAvailability(systemID, (availabilityStatus) => {
    console.log(`REQ STAT: ${availabilityStatus}`);
    switch (availabilityStatus) {
      case 0:
        setServerAvailabilityColor(statusColors.available);
        break;
      case 1:
        setServerAvailabilityColor(statusColors.unavailable);
        break;
      default:
        setServerAvailabilityColor(statusColors.indeterminate);
        break;
    }
  });

  return (
    <List.Accordion left={(props_internal) => <List.Icon {...props_internal} color={serverAvailabilityColor} icon="circle" />} title={systemName} description={systemDesc} id={systemID}>
      <List.Item onPress={() => { }} title="Report Issue" />
      <List.Item titleStyle={actionTextStyles.warningListAction} onPress={() => { }} title="Request Service Restart" />
      <List.Item titleStyle={actionTextStyles.dangerListAction} onPress={() => { }} title="Remove this Service" />
    </List.Accordion>
  );
};

export default SystemAccordition;
