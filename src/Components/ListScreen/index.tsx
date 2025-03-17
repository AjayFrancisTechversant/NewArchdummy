import {TextInput, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

const ListScreen = ({}) => {
  const DATA = Array.from({length: 100000}, (_, index) => ({
    id: index.toString(),
    title: `Item ${index + 1}`,
  }));
  console.log(DATA);

  return (
    <View style={{flex:1}}>
      <FlashList
        data={DATA}
        renderItem={({item}) => (
          <TextInput
            style={{margin: 5,borderWidth:1}}
            // onChangeText={}
            // value={item.title}
            placeholder={item.title}
            keyboardType="numeric"
          />
        )}
        estimatedItemSize={100000}
      />
    </View>
  );
};

export default ListScreen;
