import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        style={{
          margin: 100,
          backgroundColor: 'blue',
          borderRadius: 10,
          padding: 10,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('ListScreen')}>
        <Text style={{color: 'white'}}>go to lists</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
