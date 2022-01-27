import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import colors from '../color/colors';
import NoteButtons from '../components/NoteButtons';
import NoteCreate from '../components/NoteCreate';
import NotFound from '../components/NotFound';
import Notes from '../components/Notes';
import SaveButton from '../components/SaveButton';
import SearchBar from '../components/SearchBar';
import {useNotes} from '../contexts/NoteProvider';

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NoteScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const {notes, setNotes, findNotes} = useNotes();

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, content) => {
    const note = {id: Date.now(), title, content, time: Date.now()};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const openNote = note => {
    navigation.navigate('NoteDetails', {note});
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.POWDER} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notes</Text>
        </View>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{marginVertical: 15}}
              onClear={handleOnClear}
            />
          ) : null}
          <View style={styles.headerButton}>
            <SaveButton name="eye" />
          </View>
        {resultNotFound ? (
          <NotFound />
        ) : (
          <FlatList
            data={reverseNotes}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Notes onPress={() => openNote(item)} item={item} />
            )}
          />
        )}

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
      <NoteCreate
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
    paddingHorizontal: 5,
    paddingVertical: 30,
  },
  headerText: {
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
    zIndex: 1,
  },
  headerButton: {
    flex: 1,
    position: 'relative',
    marginBottom: 10,
    bottom: 106,
    left: 26,
  },
});

export default NoteScreen;
