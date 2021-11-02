import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { deleteService, getStatusCenterURL } from '../controllers/StorageController';
import { actionTextStyles, statusColors } from '../themes/blueberry';
import { forwardRestartToBackend } from '../controllers/NetworkController';
import { TcpController } from '../controllers/TcpController';

const SystemAccordition = ({ sendReport, renderRequest, systemID, systemName, systemDesc, statusColor }) => {
  const [remoteServerAvailable, setRemoteServerAvailable] = useState(false);

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
    forwardRestartToBackend(systemID,
      (response) => {
        alert('Service Restart has been Requested');
      },
      (error) => {
        alert('Failed to Request Service Restart');
      }
    );
  }

  getStatusCenterURL(
    (statusCenterURL) => {
      if (statusCenterURL == null || statusCenterURL.trim() == "") {
        setRemoteServerAvailable(false);
      } else {
        setRemoteServerAvailable(true);
      }
    },
    (error) => { console.error(error) }
  );

  return (
    <List.Accordion left={(props_internal) => <List.Icon {...props_internal} color={statusColor} icon="circle" />} title={systemName} description={systemDesc} id={systemID}>
      <List.Item disabled={remoteServerAvailable == true ? false : true} titleStyle={remoteServerAvailable == true ? actionTextStyles.normalTextAction : actionTextStyles.normalTextStrikeAction} onPress={() => { sendReport(systemID, systemName) }} title="Report Issue" />
      <List.Item disabled={remoteServerAvailable == true ? false : true} titleStyle={remoteServerAvailable == true ? actionTextStyles.warningListAction : actionTextStyles.warningListStrikeAction} onPress={handleRestartRequest} title="Request Service Restart" />
      <List.Item titleStyle={actionTextStyles.dangerListAction} onPress={handleSelfDeletion} title="Remove this Service" />
    </List.Accordion>
  );
};

export default SystemAccordition;
