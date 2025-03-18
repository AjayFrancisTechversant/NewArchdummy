import React, {ReactElement, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontStyles from '../../theme/FontStyles';
import {Reader, useReader, Themes} from '@epubjs-react-native/core';
import {useFileSystem} from '@epubjs-react-native/file-system';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NextPrev from 'react-native-vector-icons/AntDesign';
import EyeIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme/Colors';
import HeaderComponent from './HeaderComponent';
import SettingsScreen from './SettingsScreen';
import SearchMoveComponent from './SearchMoveComponent';
import styles from './styles';
import {useScreenContext} from '../../ScreenContext';
import EpubHandler from '../../handler/Epub';

interface ListItem {
  itemHeader: string;
  headerImagename: string;
  fontFamily: string;
  cardView: string;
}

interface EpubProps {
  navigation: any;
  urlV: string;
  initialPageAsyncStore: string;
  initialAsyncBgTheme: string;
  initialAsyncFont: string;
}

type SearchItem = {
  cfi: string;
  excerpt: string;
  pageNumber: string;
};

type Theme = {
  [key: string]: {
    [key: string]: string;
  };
};

const Epub: React.FC<EpubProps> = props => {
  const {
    navigation,
    urlV,
    initialPageAsyncStore,
    initialAsyncFont,
    initialAsyncBgTheme,
  } = props;
  const [screenChange, setScreenChange] = React.useState<boolean>(true);
  const [settingsScreen, setSettingScreen] = React.useState<boolean>(false);
  const [sourceEpub, setSourceEpub] = React.useState<string>('');
  const [defaultBgTheme, setDefaultBgTheme] = React.useState<string>('');
  const [newSearchList, setNewSearchList] = React.useState<SearchItem[]>([]);
  const [customFontValue, setCustomFontValue] = React.useState<string>('');
  const [initialPage, setInitialPage] = React.useState<string>('');
  const [searchText, setSearchText] = React.useState<string>('');
  const [count, setCount] = React.useState<number>(0);
  const [changedIndex, setChangedIndex] = React.useState<number>(0);
  const [initialPageForfontnBg, setInitialPageForfontnBg] =
    React.useState<string>('');
  const [showHide, setShowHide] = React.useState<boolean>(false);
  const [epubCfiArray, setEpubCfiArray] = React.useState<string>('');
  const [epubCfiArrayOne, setEpubCfiArrayOne] = React.useState<string>('');
  const [epubCfiArrays, setEpubCfiArrays] = React.useState<string[]>([]);
  const [searchActive, setSearchActive] = React.useState<boolean>(false);
  const [nextBtnActive, setNextBtnActive] = React.useState<boolean>(false);
  const [prevBtnActive, setPrevBtnActive] = React.useState<boolean>(false);
  const [reRender, setRerender] = React.useState<boolean>(false);
  const [searchResultActive, setSearchResultActive] =
    React.useState<boolean>(false);
  const [visible, setVisible] = React.useState(false);
  const [theam, setTheam] = React.useState<Theme>(Themes.LIGHT);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const [searchPage, setSearchPage] = React.useState<number>(1);
  const [isSearchingMore, setSearchingMore] = React.useState<boolean>(false);
  const searchLimit: number = 20;
  const [totalSearchResultsCount, setTotalSearchResultsCount] =
    React.useState<number>(0);

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );

  const {
    search,
    searchResults,
    goToLocation,
    addAnnotation,
    removeAnnotationByCfi,
    currentLocation,
    goNext,
    goPrevious,
    changeFontSize,
    changeTheme,
    getLocations,
  } = useReader();

  React.useEffect(() => {
    setInitialPage(initialPageAsyncStore);
    goToLocation(initialPageAsyncStore);
    setRerender(true);
    setInitialPageForfontnBg(initialPageAsyncStore);
    setCustomFontValue(initialAsyncFont);
  }, [
    initialPageAsyncStore,
    initialAsyncFont,
    initialAsyncBgTheme,
    changedIndex,
    goToLocation,
    getLocations,
    reRender,
  ]);
  React.useEffect(() => {
    setDefaultBgTheme(initialAsyncBgTheme);
  }, [
    initialPageAsyncStore,
    initialAsyncFont,
    initialAsyncBgTheme,
    goToLocation,
    getLocations,
  ]);

  React.useEffect(() => {
    if (searchResults.totalResults) {
      setTotalSearchResultsCount(searchResults.totalResults);
    }
    if (searchText && searchResults.results.length !== 0) {
      setSearchResultActive(true);
    }
  }, [searchText, searchResults, addAnnotation, totalSearchResultsCount]);

  React.useEffect(() => {
    if (count < 1) {
      setPrevBtnActive(false);
    } else {
      setPrevBtnActive(true);
    }
    if (count >= newSearchList.length - 1) {
      setNextBtnActive(false);
    } else {
      setNextBtnActive(true);
    }
  }, [count, newSearchList.length]);

  React.useEffect(() => {
    const totalPages = Math.ceil(searchResults?.totalResults / searchLimit);
    const hasMoreResults = searchPage < totalPages;
    setHasMore(hasMoreResults);

    const mappedSearchList: SearchItem[] = searchResults.results.map(
      result => ({
        cfi: result.cfi,
        excerpt: result.excerpt,
        pageNumber: (result as any).pageNumber,
      }),
    );
    if (searchResultActive && searchPage === 1) {
      setNewSearchList(mappedSearchList);
    } else if (searchResultActive && searchPage !== 1) {
      setNewSearchList(oldList => [...oldList, ...mappedSearchList]);
    } else {
      setSearchActive(false);
      if (searchText !== '') {
        const timeoutId = setTimeout(() => {
          Snackbar.show({
            fontFamily: FontStyles.FontFamily_Roboto,
            text: 'No results found',
            duration: Snackbar.LENGTH_SHORT,
          });
        }, 3000);

        return () => clearTimeout(timeoutId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults, searchResultActive, searchText]);

  useEffect(() => {
    if (isSearchingMore) {
      setTimeout(() => {
        setSearchingMore(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSearchList]);

  const navigations = useNavigation();

  React.useEffect(() => {
    const handleBackButton = () => {
      if (settingsScreen) {
        onScreenChangeEvent(true);
        return true;
      }
      onConfirmback();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigations, settingsScreen]);

  React.useEffect(() => {
    const locationArray = getLocations();
    const locationArrayString: string = JSON.stringify(locationArray);
    const locationData = JSON.parse(locationArrayString);
    setEpubCfiArray(locationData);
    setEpubCfiArrays(locationData);
  }, [getLocations]);

  const onConfirmback = () => {
    navigation.goBack();
    setSettingScreen(false);
  };
  const {width, height} = useWindowDimensions();
  const settingsData: ListItem[] = [
    {
      itemHeader: 'quick navigation',
      headerImagename: 'arrows-h',
      fontFamily: 'FontAwesome',
      cardView: 'Quick_Navigation',
    },
    {
      itemHeader: 'font size',
      headerImagename: 'format-size',
      fontFamily: 'MaterialIcons',
      cardView: 'Font_Size',
    },
    {
      itemHeader: 'background theme',
      headerImagename: 'image',
      fontFamily: 'FontAwesome',
      cardView: 'Theme',
    },
  ];

  const appColor = 'green';

  const onScreenChangeEvent = (item: boolean): void => {
    try {
      setSearchActive(false);
      setNextBtnActive(false);
      setPrevBtnActive(false);
      setScreenChange(item);
      setSettingScreen(!settingsScreen);
      setRerender(true);
    } catch (error) {}
  };

  const initialLoction = async (data: string): Promise<void> => {
    setInitialPage(data);
    await AsyncStorage.setItem('myLocationCfi', data.toString());
    setEpubCfiArrayOne(data);
  };
  const changedIndexLoction = async (data: number): Promise<void> => {
    setChangedIndex(data);
  };
  const renderItem = (item: ListItem) => {
    return (
      <View>
        <SettingsScreen
          headerName={item.itemHeader}
          cardView={item.cardView}
          headerIcon={item.headerImagename}
          fontFamily={item.fontFamily}
          customFont={customFont}
          customFontValue={customFontValue}
          bgTheme={bgTheme}
          defaultBgTheme={defaultBgTheme}
          naviLocation={epubCfiArray}
          initialLoction={initialLoction}
          changedIndexLoction={changedIndexLoction}
          currentLocation={currentLocation}
        />
      </View>
    );
  };
  const searchValue = (item: string) => {
    try {
      setSearchPage(1);
      if (item === '') {
        setSearchActive(false);
        setNextBtnActive(false);
        setPrevBtnActive(false);
        setSourceEpub(urlV);
        setCount(0);
        setSearchPage(1);
        newSearchList.map(resultItem => {
          try {
            removeAnnotationByCfi(resultItem.cfi);
          } catch (error) {}
        });
        setNewSearchList([]);
      } else if (item.trim().split(/\s+/).length < 2) {
        Snackbar.show({
          fontFamily: FontStyles.FontFamily_Roboto,
          text: 'minimum 2 words required',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        if (searchText !== item.toLowerCase()) {
          newSearchList.map(resultItem => {
            try {
              removeAnnotationByCfi(resultItem.cfi);
            } catch (error) {}
          });
          setNewSearchList([]);
        }
        setSearchText(item.toLowerCase());
        search(item.trim(), searchPage, searchLimit);
        showModal();
      }
    } catch (error) {}
  };

  const searchMore = () => {
    if (hasMore) {
      try {
        setSearchingMore(true);
        search(searchText, searchPage + 1, searchLimit);
        setSearchPage(oldPage => oldPage + 1);
      } catch (error) {}
    }
  };

  const closeCallBack = () => {
    try {
      setCount(0);
      setSearchActive(false);
      setNextBtnActive(false);
      setPrevBtnActive(false);
      setSearchResultActive(false);
      setSearchText('');
      setSearchPage(1);
      newSearchList.map(item => {
        try {
          removeAnnotationByCfi(item.cfi);
        } catch (error) {}
      });
    } catch (error) {}
  };
  const retrieveDataFromAsyncStorage = React.useCallback(async () => {
    try {
      if (defaultBgTheme === 'DARK') {
        changeTheme(Themes.DARK);
        setTheam(Themes.DARK);
      } else if (defaultBgTheme === 'SEPIA') {
        changeTheme(Themes.SEPIA);
        setTheam(Themes.SEPIA);
      } else {
        changeTheme(Themes.LIGHT);
        setTheam(Themes.LIGHT);
      }
    } catch (error) {}
  }, [changeTheme, defaultBgTheme]);

  const retrieveDataFromAsyncStorageFont = React.useCallback(async () => {
    try {
      const storeData = await AsyncStorage.getItem('myFont');
      const url =
        EpubHandler.label === 'quickNav' ? initialPage : initialPageForfontnBg;
      goToLocation(url);
      if (customFontValue !== '' && storeData == null) {
        const fontSize = customFontValue.toString();
        changeFontSize(`${fontSize}px`);
        await AsyncStorage.setItem('myFont', `${fontSize}px`);
      } else if (storeData !== null && customFontValue !== '') {
        changeFontSize(storeData);
      } else {
        await AsyncStorage.setItem(
          'myFont',
          screenContext.isTypeTablet ? '18px' : '12px',
        );
        changeFontSize(screenContext.isTypeTablet ? '18px' : '12px');
      }
    } catch (error) {}
  }, [
    customFontValue,
    changeFontSize,
    screenContext,
    initialPageForfontnBg,
    goToLocation,
    initialPage,
  ]);
  const downloadEpub = React.useCallback(async () => {
    try {
      setSourceEpub(urlV);
    } catch (error) {}
  }, [urlV]);

  React.useEffect(() => {
    downloadEpub();
  }, [sourceEpub, downloadEpub]);

  const customFont = (data: string, item: string): void => {
    try {
      storeDataInAsyncStorage(data.toString());
      setCustomFontValue(`${data.toString()}`);
      setInitialPageForfontnBg(item.toString());
    } catch (error) {}
  };

  const bgTheme = (data: string, item: string): void => {
    try {
      setDefaultBgTheme(data);
      setInitialPageForfontnBg(item.toString());
      storeMyBgThemeInAsyncStorage(data);
    } catch (error) {}
  };

  React.useEffect(() => {
    retrieveDataFromAsyncStorage();
  }, [retrieveDataFromAsyncStorage]);

  React.useEffect(() => {
    let timeOutWait: ReturnType<typeof setTimeout>;
    const applyFontSize = () => {
      timeOutWait = setTimeout(() => {
        retrieveDataFromAsyncStorageFont();
      }, 1200);
    };

    applyFontSize();

    return () => clearTimeout(timeOutWait);
  }, [settingsScreen, customFontValue, retrieveDataFromAsyncStorageFont]);

  React.useEffect(() => {
    let timeOutWaitLoc: ReturnType<typeof setTimeout>;
    const locationFocus = () => {
      timeOutWaitLoc = setTimeout(() => {
        goToLocation(epubCfiArrayOne);
      }, 900);
    };

    locationFocus();

    return () => clearTimeout(timeOutWaitLoc);
  }, [goToLocation, epubCfiArrayOne, reRender, screenChange]);

  const storeDataInAsyncStorage = async (font: string) => {
    try {
      await AsyncStorage.setItem('myFont', `${font}px`);
    } catch (error) {}
  };

  const storeMyBgThemeInAsyncStorage = async (data: string) => {
    try {
      await AsyncStorage.setItem('myBgTheme', data);
    } catch (error) {}
  };

  const searchedItem = (data: {
    cfi: string;
    excerpt: string;
    pageNumber: string;
  }) => {
    try {
      goToLocation(data.cfi);
      newSearchList.map(word => addAnnotation('highlight', word.cfi));
      hideModal();
      setSearchActive(true);
      const targetIndex = newSearchList.findIndex(
        item => item.cfi === data.cfi,
      );
      const inc = targetIndex === 0 ? 0 : targetIndex;
      setCount(inc);
    } catch (error) {}
  };
  const searchIncrement = () => {
    try {
      setCount(prevCount => {
        const inc = 1;
        const indexValue = prevCount + inc;
        if (indexValue <= newSearchList.length) {
          setPrevBtnActive(true);
          if (indexValue === newSearchList.length) {
            setNextBtnActive(false);
          } else {
            setNextBtnActive(true);
            const nextItem = newSearchList[indexValue];
            goToLocation(nextItem.cfi);
          }
          return indexValue;
        } else {
          return prevCount;
        }
      });
    } catch (error) {}
  };
  const searchDecrement = () => {
    try {
      setCount(prevCount => {
        if (prevCount - 1 < 1) {
          setPrevBtnActive(false);
        }
        if (prevCount - 1 > 0) {
          setNextBtnActive(true);
          const previousItem = newSearchList[prevCount - 1];
          goToLocation(previousItem.cfi);
          return prevCount - 1;
        } else {
          return prevCount - 1;
        }
      });
    } catch (error) {}
  };
  const goBacktoSearch = () => {
    setVisible(true);
    setNextBtnActive(false);
    setPrevBtnActive(false);
    newSearchList.map(item => {
      try {
        removeAnnotationByCfi(item.cfi);
      } catch (error) {}
    });
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const renderItems = ({
    item,
  }: {
    item: {cfi: string; excerpt: string; pageNumber: string};
  }): ReactElement<any, any> => {
    const words = item.excerpt.split(new RegExp(`(${searchText})`, 'gi'));
    return (
      <TouchableOpacity
        onPress={() => searchedItem(item)}
        style={screenStyles.item}>
        <Text
          style={
            screenStyles.itemPage
          }>{`page number ${item.pageNumber}`}</Text>
        <Text style={screenStyles.itemText}>
          {words.map((part, index) =>
            part.toLowerCase() === searchText.toLowerCase() ? (
              <Text key={index} style={screenStyles.highlightedWord}>
                {part}
              </Text>
            ) : (
              <Text style={{color: Colors.name.borderGrey}} key={index}>
                {part}
              </Text>
            ),
          )}
        </Text>
      </TouchableOpacity>
    );
  };
  const total =
    epubCfiArrays.length !== 0 ? JSON.parse(epubCfiArray).length : '';
  return (
    <SafeAreaView style={screenStyles.mainView}>
      <View style={screenStyles.headerView}>
        <HeaderComponent
          onScreenChangeEvent={onScreenChangeEvent}
          onPressEvent={onConfirmback}
          screenStatus={screenChange}
          settingsScreen={settingsScreen}
          searchValue={searchValue}
          closeCallBack={closeCallBack}
          epubCfiArray={epubCfiArray}
          screenChangeActive={settingsScreen}
        />
      </View>
      {searchActive ? (
        <View style={screenStyles.nextBtnView}>
          <SearchMoveComponent
            prevBtnActive={prevBtnActive}
            nextBtnActive={nextBtnActive}
            searchIcrement={searchIncrement}
            searchDcrement={searchDecrement}
            goBacktoSearch={goBacktoSearch}
          />
        </View>
      ) : null}
      <ScrollView
        style={
          !searchActive ? screenStyles.bodyView : screenStyles.searchBtnwithBody
        }>
        {screenChange === true ? (
          <>
            {newSearchList.length ? (
              <>
                <Portal>
                  <Modal visible={visible} onDismiss={hideModal}>
                    <View style={screenStyles.dropdown}>
                      <View style={screenStyles.modalFirstView}>
                        <TouchableOpacity
                          onPress={() => {
                            hideModal();
                            closeCallBack();
                          }}
                          style={screenStyles.closeBtn}>
                          <View style={screenStyles.closeyBtnIcon}>
                            <NextPrev
                              name={'close'}
                              style={screenStyles.icon}
                              size={
                                screenContext[
                                  screenContext.isPortrait
                                    ? 'windowWidth'
                                    : 'windowHeight'
                                ] * (screenContext.isTypeTablet ? 0.021 : 0.045)
                              }
                              color={appColor}
                            />
                          </View>
                          <View style={screenStyles.closBtnTextView}>
                            <Text
                              style={[
                                screenStyles.closeBtnText,
                                {color: appColor},
                              ]}>
                              Close
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <View style={screenStyles.resultsCountView}>
                          <Text style={screenStyles.resultsCountText}>
                            Showing Results: {newSearchList?.length || '...'}/
                            {totalSearchResultsCount}
                          </Text>
                        </View>
                      </View>
                      <View style={screenStyles.modalSecondView}>
                        <FlatList
                          data={newSearchList}
                          renderItem={renderItems}
                          keyExtractor={(item, index) => index.toString()}
                          onEndReached={() => searchMore()}
                          onEndReachedThreshold={1}
                          extraData={searchResults}
                          ListFooterComponent={
                            isSearchingMore || hasMore ? (
                              <View style={screenStyles.loadMoreIndicator}>
                                <ActivityIndicator
                                  animating
                                  color={appColor}
                                  size={30}
                                />
                              </View>
                            ) : null
                          }
                        />
                      </View>
                    </View>
                  </Modal>
                </Portal>
              </>
            ) : null}
            <Reader
              src={sourceEpub}
              width={!screenContext.isPortrait ? width * 0.8 : width}
              height={
                screenContext.isTypeTablet &&
                screenContext.isPortrait &&
                Platform.OS === 'android'
                  ? height / 1.28
                  : screenContext.isPortrait && Platform.OS === 'android'
                  ? height / 1.26
                  : !screenContext.isPortrait && Platform.OS === 'android'
                  ? height * 0.75
                  : height / 1.4
              }
              waitForLocationsReady={reRender}
              fileSystem={useFileSystem}
              defaultTheme={theam}
            />
          </>
        ) : (
          <>
            <View style={[screenStyles.settingsMain, {borderColor: appColor}]}>
              <TouchableOpacity
                onPress={() => setShowHide(!showHide)}
                style={screenStyles.hideView}>
                <EyeIcon
                  name={showHide === false ? 'eye' : 'eye-off'}
                  style={screenStyles.icon}
                  size={
                    screenContext[
                      screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                    ] * (screenContext.isTypeTablet ? 0.08 : 0.06)
                  }
                  color={appColor}
                />
              </TouchableOpacity>
              <View style={screenStyles.hideTextView}>
                <Text style={[screenStyles.headerText, {color: appColor}]}>
                  {showHide === false
                    ? 'Hide Page controls'
                    : 'Show page controls'}
                </Text>
              </View>
            </View>
            {showHide === false ? (
              <View style={screenStyles.settingsList}>
                <FlatList
                  data={settingsData}
                  renderItem={({item}) => renderItem(item)}
                  keyExtractor={item => item.itemHeader}
                />
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
      {screenChange === true ? (
        <View style={screenStyles.searchbtnwithBottomView}>
          <View style={screenStyles.bottomBtnRight}>
            <TouchableOpacity
              onPress={() => {
                goPrevious();
              }}>
              <NextPrev
                name={'left'}
                style={screenStyles.icon}
                size={
                  screenContext[
                    screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                  ] * 0.06
                }
                color={appColor}
              />
            </TouchableOpacity>
          </View>
          <View style={screenStyles.BottomTextView}>
            <Text style={[screenStyles.pageIndex, {color: appColor}]}>
              {!searchActive
                ? `${
                    currentLocation?.start?.location === undefined
                      ? ''
                      : currentLocation?.start?.location + 1
                  }/${total}`
                : `Search Results : ${count + 1}/${newSearchList?.length}`}
            </Text>
          </View>
          <View style={screenStyles.bottomBtnLeft}>
            <TouchableOpacity
              onPress={() => {
                goNext();
              }}>
              <NextPrev
                name={'right'}
                style={screenStyles.icon}
                size={
                  screenContext[
                    screenContext.isPortrait ? 'windowWidth' : 'windowHeight'
                  ] * 0.06
                }
                color={appColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Epub;
