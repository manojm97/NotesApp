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

const NoteScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result =  await AsyncStorage.getItem('notes');
    if(result!== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    findNotes();
  }, []);

  const handleOnSubmit = async (title, content) => {
    const note = {id: Date.now(), title, content, time: Date.now()};
    const updatedNotes = [...notes,note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <View style={styles.container}>
        <Text style={styles.header}>Notes</Text>
        <FlatList 
          data={notes} 
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Notes item={item} /> } 
        />
        <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
          <Text style={styles.emptyHeader}>Add Notes</Text>      
        </View>
        <NoteButtons name="plus" onPress={() => setModalVisible(true)} />
      </View>
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
    paddingHorizontal: 25,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: colors.LIGHT,
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
