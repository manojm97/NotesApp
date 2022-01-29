import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchButton from './SearchButton';

const SearchBar = ({containerStyle, value, onClear, onChangeText}) => {
  const [search, setSearch] = useState(false);
  const [searchClick, setSearchClick] = useState(true);

  const {colors} = useTheme();

  const handleSearchClick = () => {
    setSearch(true);
    setSearchClick(false);
  };

  const handleCancel = () => {
    setSearch(false);
    setSearchClick(true);
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, {...containerStyle}]}>
      {search ? (
        <TextInput
          value={value}
          autoFocus={true}
          onChangeText={onChangeText}
          style={[{color:colors.text},styles.searchBar]}
          placeholder="Search notes"
          placeholderTextColor={colors.text}
        />
      ) : null}
      <View style={styles.headerButton}>
        {searchClick ? (
          <SearchButton name="search" onPress={handleSearchClick} />
        ) : null}
      </View>
      {value ? (
        <Icon
          name="close"
          size={25}
          color={colors.text}
          onPress={onClear}
          onPressIn={handleCancel}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    width: 240,
    paddingLeft: 15,
    paddingBottom: 10,
    fontSize: 18,
  },
  container: {
    justifyContent: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 90,
    top: 12,
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
