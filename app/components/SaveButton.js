import React from 'react';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../color/colors';

const SaveButton = ({name, onPress}) => {
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
    left: 280,
    padding: 1,
  },
  icon: {
    width: 25,
    height: 22,
    position: 'absolute',
    top: 15,
    left: 12,
    padding: 1,
  },
});

export default SaveButton;
