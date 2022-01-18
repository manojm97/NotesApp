import React from 'react';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../color/colors';

const NoteButtons = ({name,onPress}) => {
  return (
    <TouchableHighlight 
    onPress={onPress} 
    style={styles.touch} 
    underlayColor={colors.LIGHTGREY}
    activeOpacity={0.2}>
    <IconAntDesign
      name={name}
      size={25}
      color={colors.LIGHTWHITE}
      style={styles.icon}
    />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY,
    position: 'absolute',
    bottom: 40,
    right: 35,
    padding: 17,
    elevation: 8,
    zIndex: 1,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    position: 'relative',
    bottom: 10,
    right: 10,
    padding: 10,
  },
});

export default NoteButtons;
