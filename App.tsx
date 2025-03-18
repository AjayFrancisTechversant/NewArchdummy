import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Components/HomeScreen';
import ListScreen from './src/Components/ListScreen';
import HeaderBackground from './src/Components/HeaderBackground';
import NavigationBack from './src/Components/NavigationBack';
import {ScreenContextProvider} from './src/ScreenContext';
import EpubReader from './src/Components/EpubReader';

const App = () => {
  return (
    <ScreenContextProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ScreenContextProvider>
  );
};

export default App;

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={() => ({
          title: '',
          headerBackground: props => <HeaderBackground {...props} />,
          headerLeft: props => <NavigationBack {...props} />,
        })}
      />
      <Stack.Screen
        name={'EpubReader'}
        component={EpubReader}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
