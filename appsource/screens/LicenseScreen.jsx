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
                    <Button mode="contained" style={{marginRight: 10, marginLeft: 10 }} onPress={() => { Linking.openURL("https://candiedoperation.github.io/status-center/donate.html"); }}>Donate</Button>
                    <Button mode="outlined" onPress={() => { Linking.openURL("https://github.com/candiedoperation/Status-Center"); }}>View Source</Button>
                </Card.Actions>
            </Card>
        </Flex>
    );
}

export default LicenseScreen;