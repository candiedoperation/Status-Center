import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { checkServiceAvailability } from '../controllers/TcpController';
import { deleteService } from '../controllers/StorageController';
import { actionTextStyles, statusColors } from '../themes/blueberry';

const SystemAccordition = ({ renderRequest, systemID, systemName, systemDesc, statusColor }) => {
  const [serverAvailabilityColor, setServerAvailabilityColor] = useState(statusColors.indeterminate);

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

  function handleSelfDeletion() {
    deleteService(systemID,
      (response) => {
        renderRequest();
      },
      (error) => {
        console.error(error);
      });
  }

  function handleReportRequest() {

  }

  function handleRestartRequest() {
    
  }

  return (
    <List.Accordion left={(props_internal) => <List.Icon {...props_internal} color={serverAvailabilityColor} icon="circle" />} title={systemName} description={systemDesc} id={systemID}>
      <List.Item onPress={handleReportRequest} title="Report Issue" />
      <List.Item titleStyle={actionTextStyles.warningListAction} onPress={handleRestartRequest} title="Request Service Restart" />
      <List.Item titleStyle={actionTextStyles.dangerListAction} onPress={handleSelfDeletion} title="Remove this Service" />
    </List.Accordion>
  );
};

export default SystemAccordition;
