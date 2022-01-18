import React from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import colors from '../color/colors';
import NoteButtons from './NoteButtons';
import SaveButton from './SaveButton';
import { useHeaderHeight } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';


const NoteDetails = (props) => {
  const {note} = props.route.params;
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
        'This note will be deleted',
        '...',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
      <>
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>

    </ScrollView>
    <View style={styles.editButton}>
      <NoteButtons name='edit'
      onPress={() => console.log('Edit')}
      />   
   </View>
   <View style={styles.deleteButton}>
   <NoteButtons name='delete'
   onPress={displayDeleteAlert}
   /> 
   </View>
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 80, 
  },
  title: {
    borderBottomColor: colors.LIGHTGREY,
    borderBottomWidth: 1,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-bold',
    color: colors.DARK,
    
  },
  content: {
    fontSize: 15,
    fontFamily: 'sans-serif',
    
  },
  editButton: {
    position: 'absolute',
    right: -1,
    bottom: 100,
  },
  deleteButton: {
    position: 'absolute',
    right: -1,
    bottom: 30,
  },
});

export default NoteDetails;
