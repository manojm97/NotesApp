import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Appearance, Dimensions, FlatList, StatusBar, StyleSheet, Switch, Text, View} from 'react-native';
import colors from '../color/colors';
import NoteButtons from '../components/NoteButtons';
import NoteCreate from '../components/NoteCreate';
import NotFound from '../components/NotFound';
import Notes from '../components/Notes';
import SaveButton from '../components/SaveButton';
import SearchBar from '../components/SearchBar';
import {useNotes} from '../contexts/NoteProvider';
import { EventRegister } from 'react-native-event-listeners';
import { useTheme } from '@react-navigation/native';

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NoteScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);
  const [toggle,setToggle] = useState(false);

  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    if(colorScheme == "dark") {
      setToggle(true);
    }
  }, []);
  
  const {colors} = useTheme();
  
  const {notes, setNotes, findNotes} = useNotes();

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, content) => {
    const note = {id: Date.now(), title, content, time: Date.now()};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const openNote = note => {
    navigation.navigate('NoteDetails', {note});
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  let AnimatedHeaderValue = useRef(new Animated.Value(0)).current;
  
    const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
         inputRange:[0,400],
         outputRange:[(50 * Dimensions.get('window').width) / 100, 0],
         extrapolate:'clamp'
    })

    const onScrollEvent = Animated.event(
      [{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}],
      {useNativeDriver: false}
   );


  return (
    <>
      <StatusBar barStyle={!toggle ? "dark-content" : "light-content"} backgroundColor={colors.card} />
      <View style={[{backgroundColor:colors.card},styles.container]}>
        <Animated.View style={[styles.header, {height: animatedHeaderHeight}]}>
          <Text style={[{color:colors.text},styles.headerText]}>Notes</Text>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{marginVertical: 15}}
              onClear={handleOnClear}
            />
          ) : null}
          <View style={styles.headerButton}>
            <SaveButton name="eye" />
            <Switch 
            style={styles.switch}
            thumbColor="white"
            trackColor={{false: 'grey',true: 'teal'}}
            onValueChange={(val) => {
              setToggle(val);
              EventRegister.emit('changeThemeEvent',val);
            }}
            value={toggle}
            />
          </View>
        </Animated.View>
        {resultNotFound ? (
          <NotFound />
        ) : (
          <FlatList
            data={reverseNotes}
            numColumns={2}
            scrollEventThrottle={16}
            onScroll={onScrollEvent}
            contentInsetAdjustmentBehavior="automatic"
            columnWrapperStyle={{
              justifyContent: 'space-around',
              marginBottom: 15,
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Notes onPress={() => openNote(item)} item={item} />
            )}
          />
        )}

        {!notes.length ? (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              styles.emptyHeaderContainer,
            ]}>
            <Text style={styles.emptyHeader}>Add Notes</Text>
          </View>
        ) : null}
      </View>
      <NoteButtons name="plus" onPress={() => setModalVisible(true)} />
      <NoteCreate
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    //important to display cards in bottom full screen
    paddingBottom: 0,
    flex: 1,
    zIndex: 1,
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin',
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerButton: {
    flex: 1,
    position: 'relative',
    marginBottom: 10,
    bottom: 107,
    left: 60,
  },
  switch:{
    position: 'absolute',
    top: 80,
    right: 60,
  },
});

export default NoteScreen;
