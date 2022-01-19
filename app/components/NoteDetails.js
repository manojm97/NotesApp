import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import colors from '../color/colors';
import NoteButtons from './NoteButtons';
import NoteCreate from './NoteCreate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../contexts/NoteProvider';
import {TextInput} from 'react-native-gesture-handler';
import SaveButton from './SaveButton';

const NoteDetails = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const {setNotes} = useNotes();

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
      },
    );
  };



  const handleUpdateNotes = async (text, value) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        if(value === 'title') {
            n.title = text;
        }
        if(value === 'content') {
            n.content = text;
        }
        n.time = Date.now();
        //to update notes on notes state change with title and content
         setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };


  const handleGoBack = () => { 
    props.navigation.goBack();
  };


  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          multiline
          maxLength={30}
          numberOfLines={2}
          blurOnSubmit={true}
          style={styles.title}
          value={note.title}
          onChangeText={text => handleUpdateNotes(text, 'title')}
          />
        <TextInput 
        multiline 
        style={styles.content}
        value={note.content}
        onChangeText={text => handleUpdateNotes(text, 'content')}
        />
      </ScrollView>
      <View style={styles.deleteButton}>
        <NoteButtons name="delete" onPress={displayDeleteAlert} />
      </View>
      <View style={StyleSheet.absoluteFillObject}>
        <SaveButton name="check" onPress={handleGoBack} />
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
