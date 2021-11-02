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

import { ScrollView } from 'native-base';
import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { List, Provider } from 'react-native-paper';
import { monitoringTheme } from '../themes/blueberry';
import SystemAccordition from './SystemAccordition';
import { fetchServices } from '../controllers/StorageController';
import { RequestConnectionAddition, ReRenderRequestHandler, StartConnectionQueue, StopConnectionQueue } from '../controllers/TcpController';

const SystemStatusGroup = React.forwardRef((props, ref) => {
    const [renderUUID, requestReRender] = useState(0);
    const [dbServicesList, setDBServicesList] = useState([]);
    const getRandomId = () => parseInt(Math.random() * 100, 10);

    React.useImperativeHandle(ref, () => ({
        requestDataRefresh() {
            requestReRender(getRandomId());
        },
    }));

    React.useEffect(() => {
        fetchServices((servicesList) => {
            console.log("Re-Rendering Elements");
            ReRenderRequestHandler();
            const updatedState = [];

            for (const [uuid, data] of Object.entries(servicesList)) {
                console.log(`${uuid}: ${JSON.stringify(data)}`);
                RequestConnectionAddition({
                    systemUUID: uuid,
                    systemTelnet: data.systemTelnet
                });

                updatedState.push(
                    <SystemAccordition
                        sendReport={props.sendReport}
                        renderRequest={childReRenderRequest} 
                        key={uuid}
                        systemID={uuid} 
                        systemName={data.systemName} 
                        systemDesc={data.systemDesc} 
                        systemTelnet={data.systemTelnet}>
                    </SystemAccordition>
                );
            }

            StartConnectionQueue(() => { props.showsnackbar("Service Status Updated"); });
            setDBServicesList(updatedState);
        });
    }, [renderUUID]);

    function childReRenderRequest () {
        requestReRender(getRandomId());
    }

    return (
        <Provider theme={monitoringTheme}>
            <List.AccordionGroup renderKey={renderUUID} minHeight="full">{dbServicesList}</List.AccordionGroup>
        </Provider>
    );
});

export default SystemStatusGroup;