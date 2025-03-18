import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../theme/Colors';
import FontStyles from '../../theme/FontStyles';

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
    modelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertContainer: {
      backgroundColor: Colors.theme.backgroundPrimary,
      shadowOpacity: 0.6,
      shadowRadius: 3,
      shadowColor: Colors.theme.backgroundSecondary,
      shadowOffset: {height: 3, width: 3},
      borderRadius: width / 30,
      width: width / 1.1,
      elevation: 3,
      padding: height * 0.02,
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: height * 0.01,
    },
    infoContainer: {
      paddingTop: height * 0.02,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: height * 0.01,
    },
    buttonContainerLeave: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: height * 0.01,
      marginLeft: screenContext.isTypeTablet ? width * 0.16 : width * 0.01,
      marginRight: screenContext.isTypeTablet ? width * 0.16 : width * 0.01,
    },
    headerText: {
      fontSize:
        (screenContext.isTypeTablet ? 24 : 15) / screenContext.windowFontScale,
      fontFamily: FontStyles.FontFamily_Roboto,
      margin: height * 0.01,
    },
    icon: {
      alignSelf: 'center',
      margin: screenContext.isPortrait ? height * 0.01 : null,
      bottom: screenContext.isPortrait ? null : height * 14,
      top: screenContext.isPortrait ? null : height * 0.001,
    },
    bottomBtnView: {
      flex: 0.1,
      flexDirection: 'row',
    },
    BottomTextView: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomBtnRight: {
      flex: 0.2,
      borderWidth: 1,
      borderTopRightRadius: screenContext.isTypeTablet ? 60 : 40,
      borderBottomRightRadius: screenContext.isTypeTablet ? 60 : 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.name.white,
      borderColor: Colors.name.white,
      shadowColor: Colors.name.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bottomBtnLeft: {
      flex: 0.2,
      borderWidth: 1,
      borderTopLeftRadius: screenContext.isTypeTablet ? 60 : 40,
      borderBottomLeftRadius: screenContext.isTypeTablet ? 60 : 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.name.white,
      borderColor: Colors.name.white,
      shadowColor: Colors.name.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
    },
    pageIndex: {
      fontSize:
        (screenContext.isTypeTablet ? 24 : 16) / screenContext.windowFontScale,
      fontFamily: FontStyles.FontFamily_Roboto,
    },
    mainView: {
      flex: 1,
    },
    headerView: {flex: screenContext.isPortrait ? 0.1 : 0.12},
    bodyView: {flex: 0.9},
    viewPdfView: {flex: 0.9},
    settingsMain: {
      flex: screenContext.isPortrait ? 0.1 : 0.2,
      flexDirection: 'row',
      margin: 6,
      borderRadius: 8,
      borderWidth: 1,
    },
    hideView: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
    hideTextView: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    settingsList: {flex: screenContext.isPortrait ? 0.7 : 0.6},
    item: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.name.borderGrey,
    },
    itemText: {
      // color: Colors.name.black,
      margin: width * 0.01,
      fontSize:
        (screenContext.isTypeTablet ? 20 : 14) / screenContext.windowFontScale,
      fontFamily: FontStyles.FontFamily_Roboto,
    },
    containerStyle: {backgroundColor: 'white', padding: 20},
    dropdown: {
      position: Platform.OS === 'ios' ? 'absolute' : undefined,
      backgroundColor: Colors.name.white,
      alignSelf: 'flex-start',
      width: '100%',
      // bottom: height * 0.01,
      height:
        screenContext.isTypeTablet && screenContext.isPortrait
          ? height * 0.82
          : screenContext.isTypeTablet
          ? height * 0.52
          : screenContext.isPortrait && Platform.OS === 'ios'
          ? height * 0.72
          : screenContext.isPortrait &&
            Platform.OS === 'android'
          ? height * 0.78
          : height * 0.35,
      shadowColor: Colors.name.borderGrey,
      shadowRadius: 4,
      shadowOffset: {height: 4, width: 0},
      shadowOpacity: 0.5,
    },
    itemPage: {
      color: Colors.name.black,
      fontFamily: FontStyles.FontFamily_RobotoBold,
      fontWeight:
        Platform.OS === 'android' ? undefined : 'bold',
      margin: width * 0.01,
      fontSize:
        (screenContext.isTypeTablet ? 22 : 16) / screenContext.windowFontScale,
    },
    modalFirstView: {
      flex: screenContext.isPortrait ? 0.1 : 0.2,
      alignItems: 'flex-end',
    },
    modalSecondView: {flex: screenContext.isPortrait ? 0.9 : 0.8},
    closeBtn: {
      width: screenContext.isTypeTablet ? width * 0.13 : width * 0.2,
      height: height * 0.04,
      borderColor: Colors.name.borderGrey,
      borderWidth: 1,
      borderRadius: 5,
      margin: width * 0.01,
      flexDirection: 'row',
    },
    closeBtnText: {
      fontSize:
        (screenContext.isTypeTablet ? 20 : 14) / screenContext.windowFontScale,
      fontFamily: FontStyles.FontFamily_RobotoBold,
      fontWeight:
        Platform.OS === 'android' ? undefined : 'bold',
    },
    closeyBtnIcon: {flex: 0.4, justifyContent: 'center'},
    closBtnTextView: {
      flex: 0.6,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    nextBtnView: {
      flex: !screenContext.isPortrait ? 0.3 : 0.15,
      backgroundColor: Colors.name.white,
    },
    searchBtnwithBody: {
      flex: !screenContext.isPortrait ? 0.5 : 0.65,
    },
    searchbtnwithBottomView: {
      flex: 0.1,
      flexDirection: 'row',
      backgroundColor: Colors.name.white,
    },
    highlightedWord: {
      color: Colors.name.blue,
      textDecorationLine: 'underline',
    },
    loadMoreIndicator: {
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultsCountView: {paddingHorizontal: 20},
    resultsCountText: {
      textAlign: 'right',
      color: Colors.theme.appSecondary,
    },
  });

export default styles;
