/*
    Status Center
    Copyright (C) 2021  Atheesh Thirumalairajan

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
      <Appbar.Action style={{ display: props.route.name == 'System Status' ? 'flex' : 'none' }} icon="cog-outline" onPress={props.onUserSettingsRequest} />
    </Appbar>
  );
}

export default AppBar;
