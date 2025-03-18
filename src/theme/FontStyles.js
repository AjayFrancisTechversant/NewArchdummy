import {Platform} from 'react-native';

export default {
  HTML_tagStyles: {
    b: {
      fontFamily:
        Platform.OS === 'android'
          ? 'Roboto-Bold'
          : undefined,
      fontWeight:
        Platform.OS === 'android' ? undefined : 'bold',
    },
    strong: {
      fontFamily:
        Platform.OS === 'android'
          ? 'Roboto-Bold'
          : undefined,
      fontWeight:
        Platform.OS === 'android' ? undefined : 'bold',
    },
  },
  FontFamily_Roboto:
    Platform.OS === 'android' ? 'Roboto' : undefined,
  FontFamily_RobotoBold:
    Platform.OS === 'android'
      ? 'Roboto-Bold'
      : undefined,
  FontFamily_RobotoMediumBold:
    Platform.OS === 'android'
      ? 'Roboto-Medium'
      : undefined,
};
