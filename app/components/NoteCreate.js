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
      <View style={StyleSheet.absoluteFillObject}>
        {title.trim() || content.trim() ? (
          <SaveButton name="check" onPress={handleSave} />
        ) : null}
        <BackButton name="left" onPress={handleBack} />
      </View>
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={[StyleSheet.absoluteFillObject, styles.emptySpace]} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    borderBottomColor: colors.LIGHTGREY,
    borderBottomWidth: 1,
    fontSize: 30,
    fontFamily: 'sans-serif-bold',
  },
  content: {
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  emptySpace: {
    flex: 1,
    zIndex: -1,
  },
});

export default NoteCreate;
