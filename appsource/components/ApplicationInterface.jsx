import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBar from "./AppBar";
import MainScreen from '../screens/MainScreen';

const Drawer = createDrawerNavigator();

const ApplicationInterface = (props) => {
    return (
        <NavigationContainer theme={props.navigationtheme}>
            <Drawer.Navigator initialRouteName="System Status" screenOptions={{ header: (props) => <AppBar {...props} onUserAddServiceRequest={() => { console.log("Add Request") }} />, }}>
                <Drawer.Screen name="System Status" component={MainScreen} />
                <Drawer.Screen name="Licenses" component={MainScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default ApplicationInterface;