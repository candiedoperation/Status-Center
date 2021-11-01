import React from 'react';
import { Flex, ScrollView } from 'native-base';
import { Button, Card, Title, Text } from 'react-native-paper';
import { getVersion } from 'react-native-device-info';
import LicenseInformation from '../components/AppLicense';

const LicenseScreen = (props) => {
    return (
        <Flex style={{ padding: 8 }}>
            <Card style={{ maxHeight: "100%" }}>
                <Card.Title title={`Status Center ${getVersion()}`} subtitle="Copyright © 2021  Atheesh Thirumalairajan" />
                <Card.Content>
                    <ScrollView height="78%">
                        <Text>{LicenseInformation}</Text>
                    </ScrollView>
                </Card.Content>
                <Card.Actions style={{ flexDirection: "row-reverse" }}>
                    <Button mode="contained" style={{marginRight: 10, marginLeft: 10 }} onPress={() => {}}>Donate</Button>
                    <Button mode="outlined" onPress={() => { }}>View Source</Button>
                </Card.Actions>
            </Card>
        </Flex>
    );
}

export default LicenseScreen;