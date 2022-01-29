import { useTheme } from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';


const SearchButton = ({name, onPress}) => {
  const {colors} = useTheme();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.2}>
      <Icon
        name={name}
        size={25}
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
    left: 245,
  },
});

export default SearchButton;
