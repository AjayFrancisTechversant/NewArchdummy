import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  PanResponder,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../../theme/Colors';
import styles from './styles';
import {useScreenContext} from '../../../ScreenContext';
import EpubHandler from '../../../handler/Epub';
interface ProgressBarButtonProps {
  progressCallBack: (data: number, flag: boolean) => void;
  fontCallBack: (data: number, flag: boolean) => void;
  progressBtn: string;
  customFontValue: number;
  fontProgressActive: boolean;
  totalLocation: number;
}

const ProgressBarButton: React.FC<ProgressBarButtonProps> = props => {
  const {progressCallBack, fontCallBack, fontProgressActive, totalLocation} =
    props;
  const [progress, setProgress] = useState<number>(0.5);
  const [progressQuick, setProgressQuick] = useState<number>(0);
  const [progressStart, setProgressStart] = useState<boolean>(false);
  const [numberPx, setNumberPx] = useState<number>(0);
  const screenContext = useScreenContext();
  const screenStyles = styles();
  const retrieveDataFromAsyncStorage = React.useCallback(async () => {
    const data = await AsyncStorage.getItem('myFont');
    const lastLocation = await AsyncStorage.getItem('myLocation');
    if (lastLocation) {
      setProgressStart(true);
      const integerValue = parseFloat(lastLocation);
      const convertedValue = integerValue / totalLocation;
      setProgressQuick(convertedValue);
      EpubHandler.label = 'quickNav';
    }
    if (data) {
      const asyncData = parseFloat(data) / 1;
      const parsedData = data === 'NaN' ? 12 : asyncData;
      const count = screenContext.isTypeTablet ? 25 : 20;
      const convertedValue = parsedData / count;
      setProgress(convertedValue);
      setNumberPx(convertedValue);
      EpubHandler.label = 'font';
    }
  }, [totalLocation, screenContext]);
  React.useEffect(() => {
    const fetchData = async () => {
      await retrieveDataFromAsyncStorage();
    };
    fetchData();
  }, [retrieveDataFromAsyncStorage]);
  React.useEffect(() => {
    if (progressStart) {
      progressCallBack(
        Math.floor(progressQuick * totalLocation),
        fontProgressActive,
      );
    }
  }, [
    fontProgressActive,
    progressCallBack,
    progressQuick,
    totalLocation,
    progressStart,
  ]);

  const appColor = 'green';
  const containerWidthRef = useRef<number>(0);
  const containerXRef = useRef<number>(0);
  const circleButtonWidth = 30;
  const circleButtonHeight = 30;
  const overlap = 10;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (fontProgressActive) {
          const width = containerWidthRef.current;
          const x = Math.min(
            width - circleButtonWidth + overlap,
            Math.max(0, gestureState.moveX - containerXRef.current),
          );
          const newProgress = x / (width - circleButtonWidth + overlap);
          setProgress(newProgress);
          setNumberPx(newProgress);
          EpubHandler.label = 'font';
        } else {
          const width = containerWidthRef.current;
          const x = Math.min(
            width - circleButtonWidth + overlap,
            Math.max(0, gestureState.moveX - containerXRef.current),
          );
          const newProgress = x / (width - circleButtonWidth + overlap);
          setProgressQuick(newProgress);
          EpubHandler.label = 'quickNav';
          setProgressStart(true);
        }
      },
    }),
  ).current;

  const onContainerLayout = useCallback((e: LayoutChangeEvent) => {
    containerWidthRef.current = e.nativeEvent.layout.width;
    containerXRef.current = e.nativeEvent.layout.x;
  }, []);

  const circleButtonStyle = {
    position: 'absolute',
    top: -((circleButtonHeight - 20) / 2),
    left: `${fontProgressActive ? progress * 100 : progressQuick * 100}%`,
    width: circleButtonWidth,
    height: circleButtonHeight,
  };

  useEffect(() => {
    const prgressValue = screenContext.isTypeTablet ? 25 : 20;
    fontCallBack(Math.floor(progress * prgressValue), fontProgressActive);
  }, [numberPx, fontProgressActive, progress, screenContext, fontCallBack]);

  return (
    <View onLayout={onContainerLayout} style={screenStyles.barView}>
      <View
        style={[
          screenStyles.filledBar,
          {
            width: `${
              fontProgressActive ? progress * 100 : progressQuick * 100
            }%`,
            backgroundColor: appColor,
          },
        ]}
      />
      <View {...panResponder.panHandlers} style={circleButtonStyle}>
        <TouchableOpacity style={screenStyles.touchView}>
          <View
            style={[
              screenStyles.circlView,
              {
                backgroundColor: appColor,
                borderRadius: circleButtonWidth / 2,
                borderColor: Colors.name.white,
                left: -overlap,
              },
            ]}>
            <Text>{''}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProgressBarButton;
