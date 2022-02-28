import { useTheme } from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const EyeButton = ({name, onPress}) => {
  
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.2}>
      <IconAntDesign
        name={name}
        size={31}
        color={colors.text}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    position: 'relative',
    bottom: 60,
    right: 15,
  },
});

export default EyeButton;
