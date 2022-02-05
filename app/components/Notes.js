import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
//import colors from '../color/colors';

const Notes = ({item, onPress}) => {
  const {title, content, time} = item;
  const {colors} = useTheme();
  
  const formatDate = time => {
    const date = new Date(time);
    const dateDetails = date.toLocaleString('default', {month: 'short'});
    return `${dateDetails}`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={[{backgroundColor:'#00000009'},styles.container]}>
      <Text style={[{color:colors.text},styles.title]} numberOfLines={2}>
        {title}
      </Text>
      <Text style={[{color:colors.text},styles.content]} numberOfLines={3}>
        {content}
      </Text>
      <Text style={[{color:colors.text},styles.time]}>{formatDate(time)}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    padding: 12,
    borderRadius: 15,
    borderBottomWidth:4,
    borderBottomColor:'teal',
  },
  title: {
    fontSize: 15,
    fontFamily: 'sans-serif-bold',
  },
  content: {
    fontSize: 10,
    fontFamily: 'sans-serif',
  },
  time: {
    fontSize: 10,
    paddingVertical: 5,
    fontFamily: 'Roboto',
    opacity: 0.5,
  },
});

export default Notes;
