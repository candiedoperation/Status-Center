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

import { DefaultTheme as NavigatorDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

const monitoringTheme = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#002e99',
    accent: '#a56de2',
  },
};

const navigationTheme = {
  ...NavigatorDefaultTheme,
  colors: {
    ...NavigatorDefaultTheme.colors,
    primary: '#002e99',
  },
};

const statusColors = {
  available: '#3a9104',
  unavailable: '#a10705',
  indeterminate: '#abacae',
};

const actionTextStyles = {
  dangerListAction: {
    color: '#c6262e',
    fontWeight: 'bold',
  },
  warningListAction: {
    color: '#cc3b02',
    fontWeight: 'bold',
  },
  warningListStrikeAction: {
    color: '#cc3b02',
    fontWeight: 'bold',
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },
  normalTextStrikeAction: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'    
  },
  normalTextAction: {

  }
};

export {
  monitoringTheme, navigationTheme, statusColors, actionTextStyles,
};
