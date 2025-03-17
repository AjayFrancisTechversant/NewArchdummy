import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import styles from './style';
import {useWindowDimensions, View} from 'react-native';
import {Canvas, Rect, LinearGradient} from '@shopify/react-native-skia';

const HeaderBackground = React.memo(props => {
  const {flex} = props;
  const {height, width} = useWindowDimensions();
  const screenContext = {
    windowWidth: width,
    windowHeight: height,
  };
  const screenStyles = styles();
  const appColor = 'blue';
  const backgroundColor = [
    Color(appColor).lighten(0.11).hex(),
    appColor,
    Color(appColor).darken(0.11).hex(),
  ];
  const commonStyles = [
    screenStyles.linearGradient,
    flex ? screenStyles.singleFlex : {},
  ];
  return (
    <>
      <Canvas style={commonStyles}>
        <Rect
          x={0}
          y={0}
          width={screenContext.windowWidth}
          height={screenContext.windowHeight}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{
              x: 0,
              y: screenContext.windowHeight * 3,
            }}
            colors={backgroundColor}
          />
        </Rect>
      </Canvas>
      <View style={[...commonStyles, screenStyles.childContainer]}>
        {props.children}
      </View>
    </>
  );
});

HeaderBackground.propTypes = {
  children: PropTypes.element,
};

export default HeaderBackground;
