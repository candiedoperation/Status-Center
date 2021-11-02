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