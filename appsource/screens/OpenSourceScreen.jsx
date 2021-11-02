import React from 'react';
import { ScrollView } from 'native-base';
import LicenseComponent from '../components/LicenseComponent';

const OpenSourceScreen = (props) => {
    return (
        <ScrollView>
            <LicenseComponent componentTitle="async-storage" componentURL="https://www.npmjs.com/package/@react-native-async-storage/async-storage" />
            <LicenseComponent componentTitle="react-navigation" componentURL="https://www.npmjs.com/package/react-navigation" />
            <LicenseComponent componentTitle="react-stately" componentURL="https://www.npmjs.com/package/react-stately" />
            <LicenseComponent componentTitle="axios" componentURL="https://www.npmjs.com/package/axios" />
            <LicenseComponent componentTitle="expo" componentURL="https://www.npmjs.com/package/expo" />
            <LicenseComponent componentTitle="native-base" componentURL="https://www.npmjs.com/package/native-base" />
            <LicenseComponent componentTitle="react" componentURL="https://www.npmjs.com/package/react" />
            <LicenseComponent componentTitle="react-dom" componentURL="https://www.npmjs.com/package/react-dom" />
            <LicenseComponent componentTitle="react-native" componentURL="https://www.npmjs.com/package/react-native" />
            <LicenseComponent componentTitle="react-native-device-info" componentURL="https://www.npmjs.com/package/react-native-device-info/v/0.9.1" />
            <LicenseComponent componentTitle="react-native-document-picker" componentURL="https://www.npmjs.com/package/react-native-document-picker" />
            <LicenseComponent componentTitle="react-native-fs" componentURL="https://www.npmjs.com/package/react-native-fs" />
            <LicenseComponent componentTitle="react-native-gesture-handler" componentURL="https://www.npmjs.com/package/react-native-gesture-handler" />
            <LicenseComponent componentTitle="react-native-mime-types" componentURL="https://www.npmjs.com/package/react-native-mime-types" />
            <LicenseComponent componentTitle="react-native-paper" componentURL="https://www.npmjs.com/package/react-native-paper" />
            <LicenseComponent componentTitle="react-native-tcp-socket" componentURL="https://www.npmjs.com/package/react-native-tcp-socket" />
            <LicenseComponent componentTitle="react-native-uuid" componentURL="https://www.npmjs.com/package/react-native-uuid" />
            <LicenseComponent componentTitle="react-native-vector-icons" componentURL="https://www.npmjs.com/package/react-native-vector-icons" />
            <LicenseComponent componentTitle="styled-components" componentURL="https://www.npmjs.com/package/styled-components" />
            <LicenseComponent componentTitle="create-react-app" componentURL="https://www.npmjs.com/package/create-react-app" />
        </ScrollView>
    );
}

export default OpenSourceScreen;