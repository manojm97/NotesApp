import React, {useState} from 'react';
import {StyleSheet, View, TextInput, ScrollView, Alert} from 'react-native';
import NoteButtons from './NoteButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../contexts/NoteProvider';
//import {TextInput} from 'react-native-gesture-handler';
import SaveButton from './SaveButton';
import { useTheme } from '@react-navigation/native';
import colors from '../color/colors';

const NoteDetails = props => {
  const [note] = useState(props.route.params.note);
  const {setNotes} = useNotes();

  const {colors} = useTheme();
  
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
          onPress: () => {},
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
        if (value === 'title') {
          n.title = text;
        }
        if (value === 'content') {
          n.content = text;
        }
        n.time = Date.now();
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
      <ScrollView contentContainerStyle={[{backgroundColor:colors.card},styles.container]}>
        <TextInput
          multiline
          maxLength={30}
          numberOfLines={2}
          blurOnSubmit={true}
          style={[{color:colors.text},styles.title]}
          defaultValue={note.title}
          onChangeText={text => handleUpdateNotes(text, 'title')}
        />
        <TextInput
          multiline
          style={[{color:colors.text},styles.content]}
         // autoFocus={true}
          defaultValue={note.content}
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
    flex:1,
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  title: {
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-bold',
  },
  content: {
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  deleteButton: {
    position: 'absolute',
    right: -1,
    bottom: 30,
  },
});

export default NoteDetails;
