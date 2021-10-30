import 'react-native-gesture-handler';
import React from "react";
import AppBar from "../components/AppBar";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../screens/MainScreen';

const Drawer = createDrawerNavigator();

const ApplicationInterface = (props) => {
    return (
        <NavigationContainer theme={props.navigationtheme}>
            <Drawer.Navigator initialRouteName="System Status" screenOptions={{ header: AppBar }}>
                <Drawer.Screen name="System Status" component={MainScreen} />
                <Drawer.Screen name="Licenses" component={MainScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default ApplicationInterface;