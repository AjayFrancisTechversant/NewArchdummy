import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme/Colors';

import FontStyles from '../../../theme/FontStyles';

interface screenContextInterface {
  windowWidth: number;
  windowHeight: number;
  isTypeTablet: any;
  windowFontScale: number;
}
const styles = (
  screenContext: screenContextInterface,
  width: any,
  height: any,
) =>
  StyleSheet.create({
    headerMainView: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: Colors.name.silver,
      alignItems: 'center',
    },
    headerBackView: {
      flex: 0.09,
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderWidth: 1,
      borderRadius: 4,
      height: height * 0.04,
      margin: height * 0.01,
    },
    headerSearchView: {
      flex: 0.7,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 4,
      height: height * 0.04,
      margin: height * 0.01,
      backgroundColor: Colors.name.white,
    },
    searchText: {flex: 0.9, left: height * 0.01},
    searchClose: {flex: 0.1, margin: height * 0.003},
    searchlabeltnView: {
      flex: 0.11,
      flexDirection: 'row',
    },
    searchbtnView: {
      flex: 1,
      margin: height * 0.001,
    },
    settingsView: {
      flex: 0.2,
    },
    settingsFont: {
      fontSize:
        (screenContext.isTypeTablet ? 24 : 15) / screenContext.windowFontScale,
      fontFamily: FontStyles.FontFamily_Roboto,
      color: Colors.name.darkGrey,
      right: width * 0.04,
    },
    icon: {
      alignSelf: 'center',
    },
    searchInput: {
      width: '100%',
      height: height * 0.05,
      color: Colors.name.black,
      alignSelf: 'center',
    },
    settingView: {flex: 0.9, alignItems: 'flex-end'},
  });

export default styles;
