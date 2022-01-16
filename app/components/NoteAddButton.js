import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../color/colors';

const NoteAddButton = () => {
  return (
    <IconAntDesign
      name="plus"
      size={25}
      color={colors.LIGHT}
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 20,
    right: 10,
    padding: 17,
    elevation: 8,
  },
});

export default NoteAddButton;
