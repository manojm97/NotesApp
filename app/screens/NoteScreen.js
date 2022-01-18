import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlightComponent,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../color/colors';
import NoteButtons from '../components/NoteButtons';
import NoteInput from '../components/NoteInput';
import Notes from '../components/Notes';

const NoteScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    // AsyncStorage.clear();
    findNotes();
  }, []);

  const handleOnSubmit = async (title, content) => {
    const note = {id: Date.now(), title, content, time: Date.now()};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };


  const openNote = (note) => {
    navigation.navigate('NoteDetails', { note });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.POWDER} />
      <View style={styles.container}>
        <Text style={styles.header}>Notes</Text>
        <FlatList
          data={notes}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Notes onPress={() => openNote(item)} item={item} />
          )}
        />
        {!notes.length ? (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              styles.emptyHeaderContainer,
            ]}>
            <Text style={styles.emptyHeader}>Add Notes</Text>
          </View>
        ) : null}
      </View>
      <NoteButtons name="plus" onPress={() => setModalVisible(true)} />
      <NoteInput
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: colors.POWDER,
    zIndex: 1,
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin',
    color: colors.DARK,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});

export default NoteScreen;

