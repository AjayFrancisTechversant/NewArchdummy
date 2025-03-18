import * as React from 'react';
import {View} from 'react-native';
import {ReaderProvider} from '@epubjs-react-native/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {useScreenContext} from '../../ScreenContext';
import Epub from '../Epub';
interface EpubReaderProps {
  navigation: any;
  params: object;
  route: {
    params: RouteParams;
  };
}
interface RouteParams {
  urlPath: string;
  name: string;
}

const EpubReader: React.FC<EpubReaderProps> = props => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  const [initialPage, setInitialPage] = React.useState<string>('');
  const [initialAsyncBgTheme, setInitialAsyncBgTheme] =
    React.useState<string>('');
  const [initialAsyncFont, setInitialAsyncFont] = React.useState<string>('');
  React.useEffect(() => {
    initailEpub();
  });
  const initailEpub = async () => {
    const quickPage = await AsyncStorage.getItem('myLocationCfi');
    await AsyncStorage.setItem('sameFile', props.route.params.name);
    if (quickPage) {
      setInitialPage(quickPage);
    }
  };
  const retrieveDataFromAsyncStorage = React.useCallback(async () => {
    const data = await AsyncStorage.getItem('myFont');
    const bgThemes = await AsyncStorage.getItem('myBgTheme');
    if (bgThemes && bgThemes === 'DARK') {
      setInitialAsyncBgTheme('DARK');
    } else if (bgThemes === 'SEPIA') {
      setInitialAsyncBgTheme('SEPIA');
    } else {
      setInitialAsyncBgTheme('LIGHT');
    }
    if (data) {
      setInitialAsyncFont(`${data}`);
    }
  }, []);

  React.useEffect(() => {
    retrieveDataFromAsyncStorage();
  });
  return (
    <View style={screenStyles.main}>
      <ReaderProvider>
        <Epub
          navigation={props.navigation}
          urlV={'https://github.com/IDPF/epub3-samples/releases/download/20230704/accessible_epub_3.epub'}
          initialPageAsyncStore={initialPage}
          initialAsyncBgTheme={initialAsyncBgTheme}
          initialAsyncFont={initialAsyncFont}
        />
      </ReaderProvider>
    </View>
  );
};

export default React.memo(EpubReader);
