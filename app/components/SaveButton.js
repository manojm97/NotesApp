import { useTheme } from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const SaveButton = ({name, onPress}) => {
  
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.2}>
      <IconAntDesign
        name={name}
        size={29}
        color={colors.text}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 50,
    right: 70,
    padding: 1,
  },
});

export default SaveButton;
