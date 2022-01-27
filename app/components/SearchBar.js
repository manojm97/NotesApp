import React, { useState } from 'react';
import {Keyboard,StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../color/colors';
import SearchButton from './SearchButton';

const SearchBar = ({containerStyle, value, onClear, onChangeText}) => {

  const [search, setSearch] = useState(false);
 // const [searchButton, setSearchButton] = useState(true);
  const handleSearchClick = () => {
    console.log('ok')
  }
  return (
    <View style={[styles.container, {...containerStyle}]}>
      {search ? (
      <TextInput
        value={value}
        autoFocus={true}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder="Search notes"
      />
      ) : null}
      <View style={styles.headerButton}>
      <SearchButton 
        name="search" 
        onPress={() => setSearch(true)}
        onPressIn={handleSearchClick}
      />
      </View>
      {value ? (
        <Icon
          name="close"
          size={23}
          color={colors.DARK}
          onPress={onClear}
          onPressIn={() => Keyboard.dismiss()}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50, 
    paddingLeft: 20,
    paddingBottom:18,
    fontSize: 18,
  },
  container: {
    justifyContent: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 100,
    top:10,
  },
  headerButton: {
    flex: 1,
    position: 'absolute',
    marginBottom: 10,
    bottom: 80,
    left: 20,
  },
});

export default SearchBar;
