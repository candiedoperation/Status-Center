import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { checkServiceAvailability } from '../controllers/TcpController';
import { deleteService, getStatusCenterURL } from '../controllers/StorageController';
import { actionTextStyles, statusColors } from '../themes/blueberry';

const SystemAccordition = ({ sendReport, renderRequest, systemID, systemName, systemDesc }) => {
  const [serverAvailabilityColor, setServerAvailabilityColor] = useState(statusColors.indeterminate);
  const [remoteServerAvailable, setRemoteServerAvailable] = useState(false);

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

  function handleRestartRequest() {
    
  }

  getStatusCenterURL (
    (statusCenterURL) => {
      if(statusCenterURL == null || statusCenterURL.trim() == "") {
        setRemoteServerAvailable(false);
      } else {
        setRemoteServerAvailable(true);
      }
    }, 
    (error) => { console.error(error) }
  );

  return (
    <List.Accordion left={(props_internal) => <List.Icon {...props_internal} color={serverAvailabilityColor} icon="circle" />} title={systemName} description={systemDesc} id={systemID}>
      <List.Item disabled={remoteServerAvailable == true ? false : true} titleStyle={remoteServerAvailable == true ? actionTextStyles.normalTextAction : actionTextStyles.normalTextStrikeAction} onPress={() => { sendReport(systemID, systemName) }} title="Report Issue" />
      <List.Item disabled={remoteServerAvailable == true ? false : true} titleStyle={remoteServerAvailable == true ? actionTextStyles.warningListAction : actionTextStyles.warningListStrikeAction} onPress={handleRestartRequest} title="Request Service Restart" />
      <List.Item titleStyle={actionTextStyles.dangerListAction} onPress={handleSelfDeletion} title="Remove this Service" />
    </List.Accordion>
  );
};

export default SystemAccordition;
