import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../color/colors';

const Notes = ({item, onPress}) => {
  const {title, content, time} = item;
  const formatDate = time => {
    const date = new Date(time);
    const dateDetails = date.toLocaleString('default', {month: 'short'});
    return `${dateDetails}`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.content} numberOfLines={3}>
        {content}
      </Text>
      <Text style={styles.time}>{formatDate(time)}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.COTTON,
    width: width / 2 - 10,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
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
