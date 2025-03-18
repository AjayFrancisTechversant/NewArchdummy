// Import necessary components and types
import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NextPrev from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../../theme/Colors';
import styles from './styles';
import {useScreenContext} from '../../../ScreenContext';

interface SearchMoveComponentProps {
  searchIcrement: () => void;
  searchDcrement: () => void;
  goBacktoSearch: () => void;
  nextBtnActive: boolean;
  prevBtnActive: boolean;
}

const SearchMoveComponent: FC<SearchMoveComponentProps> = props => {
  const {
    searchIcrement,
    searchDcrement,
    goBacktoSearch,
    prevBtnActive,
    nextBtnActive,
  } = props;
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  return (
    <View style={screenStyles.mainView}>
      <View style={screenStyles.nextnPrevView}>
        {prevBtnActive ? (
          <>
            <TouchableOpacity
              onPress={() => searchDcrement()}
              style={screenStyles.nextBtnView}>
              <View style={screenStyles.btnView}>
                <NextPrev
                  name={'left'}
                  style={screenStyles.icon}
                  size={
                    screenContext[
                      screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                    ] * (screenContext.isTypeTablet ? 0.03 : 0.04)
                  }
                  color={Colors.name.white}
                />
                <Text style={screenStyles.textStyle}>Previous</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}
        {nextBtnActive ? (
          <TouchableOpacity
            onPress={() => searchIcrement()}
            style={screenStyles.nextBtnView}>
            <View style={screenStyles.btnView}>
              <Text style={screenStyles.textStyle}>Next</Text>
              <NextPrev
                name={'right'}
                style={screenStyles.icon}
                size={
                  screenContext[
                    screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                  ] * (screenContext.isTypeTablet ? 0.03 : 0.04)
                }
                color={Colors.name.white}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={screenStyles.nextnPrevView}>
        <TouchableOpacity
          onPress={() => goBacktoSearch()}
          style={screenStyles.searchBtnView}>
          <Text style={screenStyles.textStyle}>Back to search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(SearchMoveComponent);
