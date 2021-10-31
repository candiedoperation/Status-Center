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
};

export {
  monitoringTheme, navigationTheme, statusColors, actionTextStyles,
};
