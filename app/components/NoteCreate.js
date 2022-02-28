import React, {useState} from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from '../color/colors';
import BackButton from './BackButton';
import SaveButton from './SaveButton';
import { useTheme } from '@react-navigation/native';

const NoteCreate = ({visible, onClose, onSubmit}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const {colors} = useTheme();
  

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueOf) => {
    if (valueOf === 'title') setTitle(text);
    if (valueOf === 'content') setContent(text);
  };

  const handleBack = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  const handleSave = () => {
    onSubmit(title, content);
    setTitle('');
    setContent('');
    onClose();
  };


  return (
    <Modal visible={visible} animationType="fade" onRequestClose={handleBack}>
      <View style={[{backgroundColor:colors.card},styles.container]}>
        <TextInput
          multiline
          maxLength={30}
          numberOfLines={2}
          blurOnSubmit={true}
          placeholder="Title"
          placeholderTextColor={colors.text}
          style={[{color:colors.text},styles.title]}
          value={title}
          onChangeText={text => handleOnChangeText(text, 'title')}
        />
        <TextInput
          multiline
          placeholder="Content"
          placeholderTextColor={colors.text}
          style={[{color:colors.text},styles.content]}
          value={content}
          autoFocus={true}
          showSoftInputOnFocus={true}
          onChangeText={text => handleOnChangeText(text, 'content')}
        />
      </View>
      <View>
        {title.trim() || content.trim() ? (
          <SaveButton name="check" onPress={handleSave} />
        ) : null}
        <BackButton name="left" onPress={handleBack} />
      </View>
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 20,
    paddingTop: 150,
  },
  title: {
    borderBottomColor: colors.LIGHTGREY,
    borderBottomWidth: 1,
    padding:10,
    fontSize: 30,
    fontWeight: 'bold',
   // fontFamily: 'sans-serif-bold',
  },
  content: {
    fontSize: 15,
    padding:10,
   //fontFamily: 'sans-serif',
  },
  emptySpace: {
    flex: 1,
    // to make back and save button work on note create
    zIndex: -1,
  },
});

export default NoteCreate;
