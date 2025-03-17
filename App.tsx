import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Components/HomeScreen';
import ListScreen from './src/Components/ListScreen';
import HeaderBackground from './src/Components/HeaderBackground';
import NavigationBack from './src/Components/NavigationBack';

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
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
    </Stack.Navigator>
  );
}
