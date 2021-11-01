import {
  Provider, Appbar,
} from 'react-native-paper';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import AddMonitoredService from './AddMonitoredService';
import { monitoringTheme } from '../themes/blueberry';
import { useState } from 'react/cjs/react.development';

const styles = StyleSheet.create({
  appbar: {
    left: 0,
    right: 0,
    top: 0,
  },
});

function AppBar(props) {
  const [refreshAllowed, setRefreshAllowed] = useState(true);

  function handleRefreshRequest() {
    props.onUserRefreshRequest();
    setRefreshAllowed(false);
    setTimeout(() => {
      setRefreshAllowed(true);
    }, 5000);
  }

  return (
    <Appbar style={styles.appbar}>
      <Appbar.Action icon="menu" onPress={() => { props.navigation.toggleDrawer(); }} />
      <Appbar.Content title={props.route.name} />
      <Appbar.Action style={{ display: props.route.name == 'System Status' ? 'flex' : 'none' }} icon="plus" onPress={props.onUserAddServiceRequest} />
      <Appbar.Action disabled={!refreshAllowed} style={{ display: props.route.name == 'System Status' ? 'flex' : 'none' }} icon="refresh" onPress={handleRefreshRequest} />
      <Appbar.Action style={{ display: props.route.name == 'System Status' ? 'flex' : 'none' }} icon="cog-outline" onPress={() => { }} />
    </Appbar>
  );
}

export default AppBar;
