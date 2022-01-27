import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../color/colors';

const SaveButton = ({name, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.touch}
      activeOpacity={0.2}>
      <IconAntDesign
        name={name}
        size={28}
        color={colors.GREY}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.POWDER,
    position: 'absolute',
    top: 30,
    left: 280,
    padding: 1,
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 15,
    left: 12,
    padding: 1,
  },
});

export default SaveButton;
