import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import colors from '../color/colors';
import NoteAddButton from '../components/NoteAddButton';

const NoteScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <View style={styles.container}>
        <Text style={styles.header}>Notes</Text>
        <View style={styles.emptyHeaderContainer}>
          <Text style={styles.emptyHeader}>Add Notes</Text>
          <NoteAddButton />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flex: 1,
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
