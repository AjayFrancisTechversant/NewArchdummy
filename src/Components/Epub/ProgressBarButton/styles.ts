import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme/Colors';

const styles = () =>
  StyleSheet.create({
    barView: {
      width: '90%',
      height: 10,
      backgroundColor: Colors.name.lightMediumDarkGrey,
      borderRadius: 20,
      position: 'relative',
    },
    filledBar: {
      height: '80%',
      borderRadius: 20,
    },
    touchView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circlView: {
      width: '100%',
      height: '100%',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      bottom: '20%',
    },
  });

export default styles;
