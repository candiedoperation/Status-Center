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

import 'react-native-gesture-handler';
import React, { useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBar from "./AppBar";
import MainScreen from '../screens/MainScreen';
import LicenseScreen from '../screens/LicenseScreen';
import { navigationTheme } from '../themes/blueberry';
import OpenSourceScreen from '../screens/OpenSourceScreen';

const Drawer = createDrawerNavigator();

const ApplicationInterface = (props) => {
    const MainScreenReference = React.useRef();

    return (
        <NavigationContainer theme={navigationTheme}>
            <Drawer.Navigator 
                initialRouteName="System Status" 
                screenOptions={{ header: (props) => 
                    <AppBar {...props} 
                        onUserAddServiceRequest={() => { 
                            MainScreenReference.current.requestShowAddServiceDialog(true) 
                        }}
                        onUserRefreshRequest={() => {
                            MainScreenReference.current.requestDataRefresh()
                        }}
                        onUserSettingsRequest={() => {
                            MainScreenReference.current.requestShowSettingsDialog(true)
                        }} 
                    />, 
            }}>
                <Drawer.Screen name="System Status" children={(props) => <MainScreen {...props} ref={MainScreenReference} />} />
                <Drawer.Screen name="About Application" children={LicenseScreen} />
                <Drawer.Screen name="Open Source Licenses" children={OpenSourceScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default ApplicationInterface;