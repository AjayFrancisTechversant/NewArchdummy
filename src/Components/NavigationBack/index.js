import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../assets/chevron_left.png';
import styles from './style';

const NavigationBack = React.memo(props => {
  const navigation = useNavigation();
  const screenStyles = styles();

  return (
    <TouchableOpacity
      style={screenStyles.outerContainer}
      onPress={() => {
        navigation.goBack();
      }}>
      <Image source={BackIcon} style={screenStyles.imageCover} />
    </TouchableOpacity>
  );
});

NavigationBack.propTypes = {};

export default NavigationBack;
