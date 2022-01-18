import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../color/colors';

const NoteDetails = (props) => {
  const {note} = props.route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,  
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
});

export default NoteDetails;
