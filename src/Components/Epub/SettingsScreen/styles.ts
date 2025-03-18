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
    mainView: {
      flex: 0.8,
    },
    cardView: {
      flex: 1,
      margin: width * 0.01,
      borderRadius: 8,
      borderWidth: 1,
    },
    cardHeader: {
      flex: 0.2,
      backgroundColor: Colors.name.lightMediumDarkGrey,
      flexDirection: 'row',
      height: height * 0.04,
      borderBottomWidth: 1,
      borderColor: Colors.name.lightGrey,
    },
    icon: {
      alignSelf: 'center',
    },
    headerText: {
      fontSize:
        (screenContext.isTypeTablet ? 24 : 15) / screenContext.windowFontScale,
      fontFamily: FontStyles.FontFamily_Roboto,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      height: height * 0.09,
    },
    progressBarView: {
      flex: 0.85,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressCountView: {
      flex: 0.15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    headerIconView: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
    headerNameView: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    contentContainer: {flex: 0.8},
    radioView: {alignItems: 'center', flexDirection: 'row'},
    radioStyle: {margin: 20},
    contentText: {
      fontSize:
        (screenContext.isTypeTablet ? 24 : 15) / screenContext.windowFontScale,
      fontFamily: FontStyles.FontFamily_Roboto,
    },
  });

export default styles;
