import React from 'react';
import { Button, Card } from 'react-native-paper';
import { Linking } from 'react-native';

const LicenseComponent = (props) => {
    const ComponentSource = () => {
        return (
            <Button marginLeft={8} marginRight={10} mode="contained" onPress={() => { Linking.openURL(props.componentURL); }}>View Source</Button>
        );
    }

    return (
        <Card margin={6}>
            <Card.Title title={props.componentTitle} subtitle={props.componentURL} right={ComponentSource} />
        </Card>
    );
}

export default LicenseComponent;