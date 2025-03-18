import {
  TextInput,
  View,
  Text,
  Button,
  Image,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {FlashList} from '@shopify/flash-list';

// New HeavyItem component
const HeavyItem = ({title}: {title: string}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{margin: 5, padding: 10, borderWidth: 1}}>
      <Text>{title}</Text>
      <Image
        source={{uri: 'https://via.placeholder.com/150'}}
        style={{width: 150, height: 150, marginVertical: 5}}
      />
      <TextInput
        style={{marginVertical: 5, borderWidth: 1}}
        placeholder="Input here"
        keyboardType="default"
      />
      <Switch
        value={isEnabled}
        onValueChange={() => setIsEnabled(previousState => !previousState)}
      />
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text>This is a modal!</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button
        title="Click Me"
        onPress={() => Alert.alert(`You clicked on ${title}`)}
      />
      <Text style={{marginVertical: 5}}>
        Additional information about {title}.
      </Text>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg',
        }}
        style={{width: 100, height: 100, marginVertical: 5}}
      />
      <Text style={{marginVertical: 5}}>More details can be added here.</Text>
    </View>
  );
};

const ListScreen = ({}) => {
  const DATA = Array.from({length: 100000}, (_, index) => ({
    id: index.toString(),
    title: `Item ${index + 1}`,
  }));

  return (
    <View style={{flex: 1}}>
      <FlashList
        data={DATA}
        renderItem={({item}) => <HeavyItem title={item.title} />}
        estimatedItemSize={100000}
      />
    </View>
  );
};

export default ListScreen;
