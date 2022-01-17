import React from 'react';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../color/colors';

const BackButton = ({name, onPress}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.touch}
      underlayColor={colors.LIGHTGREY}
      activeOpacity={0.2}>
      <IconAntDesign
        name={name}
        size={25}
        color={colors.GREY}
        style={styles.icon}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.LIGHT,
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 1,
  },
  icon: {
    width: 20,
    height: 30,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 1,
  },
});

export default BackButton;
