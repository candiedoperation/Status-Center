import 'react-native-gesture-handler';
import React, { useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBar from "./AppBar";
import MainScreen from '../screens/MainScreen';
import LicenseScreen from '../screens/LicenseScreen';
import { navigationTheme } from '../themes/blueberry';

const Drawer = createDrawerNavigator();

const ApplicationInterface = (props) => {
    const MainScreenReference = useRef();

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
                    />, 
            }}>
                <Drawer.Screen name="System Status" children={(props) => <MainScreen {...props} ref={MainScreenReference} />} />
                <Drawer.Screen name="About Application" children={LicenseScreen} />
                <Drawer.Screen name="Open Source Licenses" children={LicenseScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default ApplicationInterface;