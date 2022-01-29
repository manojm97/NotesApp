import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NotFound = () => {
  const {colors} = useTheme();
  
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Icon name='sad-outline' size={90} color={colors.text} />
      <Text style={{ marginTop: 20, fontSize: 20 ,color:colors.text}}>No Results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    zIndex: -1,
  },
});

export default NotFound;