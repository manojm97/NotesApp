import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../color/colors';

const SearchButton = ({name, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.touch}
      activeOpacity={0.2}>
      <Icon
        name={name}
        size={25}
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
    left: 240,
    padding: 1,
  },
  icon: {
    width: 30,
    height: 30,
  //  color:colors.DARK,
    position: 'absolute',
    top: 15,
    left: 12,
    padding: 1,
  },
});

export default SearchButton;
