import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../../theme/Colors';
import FontStyles from '../../../theme/FontStyles';

interface screenContextInterface {
  windowWidth: number;
  windowHeight: number;
  isTypeTablet: any;
  windowFontScale: number;
  isPortrait: any;
}
const styles = (
  screenContext: screenContextInterface,
  width: any,
  height: any,
) =>
  StyleSheet.create({
    mainView: {flex: 1},
    nextnPrevView: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextBtnView: {
      backgroundColor: Colors.name.lightBlue,
      borderRadius: 5,
      height: screenContext.isPortrait ? height * 0.04 : height * 0.03,
      width: '40%',
      margin: width * 0.01,
      justifyContent: 'center',
    },
    searchBtnView: {
      backgroundColor: Colors.name.disable,
      borderRadius: 5,
      height: screenContext.isPortrait ? height * 0.04 : height * 0.03,
      width: '95%',
      margin: width * 0.01,
      justifyContent: 'center',
    },
    textStyle: {
      alignSelf: 'center',
      color: 'white',
      textAlign: 'center',
      fontFamily: FontStyles.FontFamily_RobotoMediumBold,
      fontWeight:
        Platform.OS === 'android' ? undefined : '600',
      fontSize:
        (screenContext.isTypeTablet ? 24 : 15) / screenContext.windowFontScale,
    },
    icon: {
      alignSelf: 'center',
      margin: screenContext.isPortrait ? height * 0.01 : null,
      bottom: screenContext.isPortrait ? null : height * 14,
      top: screenContext.isPortrait ? null : height * 0.001,
    },
    btnView: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;
