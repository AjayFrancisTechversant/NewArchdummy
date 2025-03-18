import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign';
import CogIcon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../../theme/Colors';
import styles from './styles';
import { useScreenContext } from '../../../ScreenContext';

interface HeaderComponentProps {
  onPressEvent: () => void;
  onScreenChangeEvent: (item: boolean) => void;
  screenStatus: boolean;
  settingsScreen: boolean;
  searchValue: (data: string) => void;
  closeCallBack: () => void;
  epubCfiArray: string;
  screenChangeActive: boolean;
}

const HeaderComponent: FC<HeaderComponentProps> = props => {
  const {
    onPressEvent,
    onScreenChangeEvent,
    searchValue,
    screenStatus,
    settingsScreen,
    closeCallBack,
    epubCfiArray,
    screenChangeActive,
  } = props;
  const screenContext = useScreenContext();
  const [searchText, setSearchText] = useState<string>('');
  const [searchCompleted, setSearchCompleted] = useState<boolean>(false);
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const {} = props;
  const appColor = 'green';
  const clickEvent = () => {
    if (screenStatus === true) {
      onPressEvent();
    } else {
      onScreenChangeEvent(true);
    }
  };
  React.useEffect(() => {
    if (screenChangeActive === true) {
      setSearchText('');
    }
  }, [screenChangeActive]);
  const handleEndEditing = () => {
    Keyboard.dismiss();
    searchValue(searchText);
    setSearchCompleted(true);
  };
  return (
    <View style={screenStyles.headerMainView}>
      <TouchableOpacity
        onPress={() => clickEvent()}
        style={[screenStyles.headerBackView, {borderColor: appColor}]}>
        <BackIcon
          name={'left'}
          style={screenStyles.icon}
          size={
            screenContext[
              screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
            ] * (screenContext.isTypeTablet ? 0.05 : 0.06)
          }
          color={appColor}
        />
      </TouchableOpacity>
      {!settingsScreen ? (
        <>
          <View
            style={[screenStyles.headerSearchView, {borderColor: appColor}]}>
            <View style={screenStyles.searchText}>
              <TextInput
                style={screenStyles.searchInput}
                value={searchText}
                placeholder={'search'}
                placeholderTextColor={Colors.name.black}
                onEndEditing={handleEndEditing}
                onChangeText={text => {
                  setSearchText(text);
                }}
              />
            </View>
            {searchCompleted === true && searchText !== '' ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                  closeCallBack();
                  setSearchCompleted(false);
                }}
                style={screenStyles.searchClose}>
                <BackIcon
                  name={'closecircleo'}
                  size={
                    screenContext[
                      screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                    ] * (screenContext.isTypeTablet ? 0.04 : 0.05)
                  }
                  color={Colors.name.darkRed}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={screenStyles.searchClose}
                onPress={() => handleEndEditing()}>
                <BackIcon
                  name={'search1'}
                  size={
                    screenContext[
                      screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                    ] * (screenContext.isTypeTablet ? 0.04 : 0.05)
                  }
                  color={Colors.name.lightGrey}
                />
              </TouchableOpacity>
            )}
          </View>
          {epubCfiArray.length ? (
            <TouchableOpacity
              onPress={() => onScreenChangeEvent(false)}
              style={screenStyles.settingsView}>
              <CogIcon
                name={'cog'}
                style={screenStyles.icon}
                size={
                  screenContext[
                    screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                  ] * (screenContext.isTypeTablet ? 0.06 : 0.08)
                }
                color={appColor}
              />
            </TouchableOpacity>
          ) : null}
        </>
      ) : (
        <>
          <View style={screenStyles.settingView}>
            <Text style={screenStyles.settingsFont}>Settings</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default React.memo(HeaderComponent);
