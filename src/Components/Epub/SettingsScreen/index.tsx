import React, {FC, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import CogIcon from 'react-native-vector-icons/FontAwesome';
import FontIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import ProgressBarButton from '../ProgressBarButton';
import {useScreenContext} from '../../../ScreenContext';

interface SettingsScreenProps {
  customFont: (data: string, item: string) => void;
  bgTheme: (item: string, data: string) => void;
  initialLoction: (item: string) => void;
  changedIndexLoction: (item: number) => void;
  headerName: string;
  headerIcon: string;
  fontFamily: string;
  cardView: string;
  customFontValue: string;
  defaultBgTheme: string;
  naviLocation: string;
  currentLocation: any;
}

const SettingsScreen: FC<SettingsScreenProps> = props => {
  const {
    customFont,
    bgTheme,
    initialLoction,
    changedIndexLoction,
    headerName,
    cardView,
    headerIcon,
    fontFamily,
    customFontValue,
    defaultBgTheme,
    naviLocation,
    currentLocation,
  } = props;
  const screenContext = useScreenContext();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const locationData = naviLocation.length ? JSON.parse(naviLocation) : [];
  const locationLength = locationData.length;
  const [locationTotal, setLocationTotal] = useState<number>(locationLength);
  const [fontSize, setFontSize] = useState<any>(12);
  const [checked, setChecked] = useState<string>(defaultBgTheme);
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const appColor = 'green';
  const options = [
    {label: 'white', value: 'LIGHT'},
    {label: 'black', value: 'DARK'},
    {label: 'sepia', value: 'SEPIA'},
  ];
  const progressCallBack = (data: number, flag: boolean): void => {
    if (flag === false) {
      setPageNumber(data);
      storeLastLocationInAsyncStorage(data);
      const selectedIndex = data !== 0 ? data - 1 : 0;
      const locationItem = locationData[selectedIndex];
      changedIndexLoction(selectedIndex);
      initialLoction(locationItem);
    }
  };
  const storeLastLocationInAsyncStorage = async (data: number) => {
    await AsyncStorage.setItem('myLocation', data.toString());
  };
  const fontCallBack = (data: number, flag: boolean): void => {
    if (flag === true) {
      const convertedValue: number = data;
      const fontSizes = convertedValue.toString();
      const fontValue = convertedValue.toFixed(1);
      setFontSize(fontSizes === 'NaN' ? '12' : parseFloat(fontValue));
      const currentCfi = currentLocation.start.cfi;
      customFont(fontSizes, currentCfi);
      storeDataInAsyncStorage(fontSizes);
    }
  };

  const bgThemeCallBack = (data: string): void => {
    setChecked(data);
    const currentCfi = currentLocation.start.cfi;
    bgTheme(data, currentCfi);
    storeMyBgThemeInAsyncStorage(data);
  };

  const storeDataInAsyncStorage = async (font: string) => {
    await AsyncStorage.setItem('myFont', `${font}px`);
  };

  const storeMyBgThemeInAsyncStorage = async (data: string) => {
    await AsyncStorage.setItem('myBgTheme', data);
  };
  return (
    <View style={screenStyles.mainView}>
      <View style={[screenStyles.cardView, {borderColor: appColor}]}>
        <View style={[screenStyles.cardHeader, {borderBottomColor: appColor}]}>
          <View style={screenStyles.headerIconView}>
            {fontFamily === 'FontAwesome' ? (
              <CogIcon
                name={headerIcon}
                style={screenStyles.icon}
                size={
                  screenContext[
                    screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                  ] * (screenContext.isTypeTablet ? 0.05 : 0.06)
                }
                color={appColor}
              />
            ) : (
              <FontIcon
                name={headerIcon}
                style={screenStyles.icon}
                size={
                  screenContext[
                    screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                  ] * 0.06
                }
                color={appColor}
              />
            )}
          </View>
          <View style={screenStyles.headerNameView}>
            <Text style={[screenStyles.headerText, {color: appColor}]}>
              {headerName}
            </Text>
          </View>
        </View>
        <View style={screenStyles.contentContainer}>
          <View style={screenStyles.container}>
            {cardView === 'Quick_Navigation' ? (
              <View style={screenStyles.optionContainer}>
                <View style={screenStyles.progressBarView}>
                  <ProgressBarButton
                    progressCallBack={progressCallBack}
                    fontCallBack={fontCallBack}
                    progressBtn={'navigation'}
                    customFontValue={parseFloat(customFontValue)}
                    fontProgressActive={false}
                    totalLocation={locationTotal}
                  />
                </View>
                <View style={screenStyles.progressCountView}>
                  <Text
                    style={[
                      screenStyles.contentText,
                      {color: appColor},
                    ]}>{`${pageNumber}/${locationTotal}`}</Text>
                </View>
              </View>
            ) : cardView === 'Font_Size' ? (
              <View style={screenStyles.optionContainer}>
                <View style={screenStyles.progressBarView}>
                  <ProgressBarButton
                    fontCallBack={fontCallBack}
                    progressCallBack={progressCallBack}
                    progressBtn={'font'}
                    customFontValue={parseFloat(customFontValue)}
                    fontProgressActive={true}
                    totalLocation={locationTotal}
                  />
                </View>
                <View style={screenStyles.progressCountView}>
                  <Text style={[screenStyles.contentText, {color: appColor}]}>
                    {`${fontSize} px`}
                  </Text>
                </View>
              </View>
            ) : (
              <>
                {options.map(option => (
                  <View key={option.value} style={screenStyles.optionContainer}>
                    <View style={screenStyles.radioView}>
                      <RadioButton.Android
                        value={checked}
                        status={
                          checked === option.value ? 'checked' : 'unchecked'
                        }
                        onPress={() => bgThemeCallBack(option.value)}
                        color={appColor} // Customize the color
                        style={screenStyles.radioStyle}
                      />
                      <Text
                        style={[screenStyles.contentText, {color: appColor}]}>
                        {option.label}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(SettingsScreen);
