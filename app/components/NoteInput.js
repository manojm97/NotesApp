import React, { useState } from 'react';
import {Keyboard, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import colors from '../color/colors';
import BackButton from './BackButton';
import SaveButton from './SaveButton';
import NoteButtons from './NoteButtons';


const NoteInput = ({visible, onClose, onSubmit}) => {

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    const handleModalClose = () => {
        Keyboard.dismiss();
      };

    const handleOnChangeText = (text, valueOf) => {
        if(valueOf === 'title') setTitle(text);
        if(valueOf === 'content') setContent(text);
    }

    const handleSave = () => { 
        if(!title.trim() && !content.trim()) return onClose();
        onSubmit(title,content);
        setTitle('');
        setContent('');
        onClose();
    }

  return (
      <Modal visible={visible} animationType='fade' >
        <View style={styles.container}>
         <TextInput 
          multiline 
          maxLength={30} 
          numberOfLines={2} 
          blurOnSubmit={true} 
          placeholder='Title' 
          style={styles.title}
          value={title}
          onChangeText={text => handleOnChangeText(text, 'title')}
         />
         <TextInput 
          multiline 
          placeholder='Content' 
          style={styles.content}
          value={content}
          onChangeText={text => handleOnChangeText(text, 'content')}
         />
          <View style={styles.deleteButton}>
            <NoteButtons name="delete"/>
          </View>
        </View>
        <View style={StyleSheet.absoluteFillObject}>
         {title.trim() || content.trim() ? (
            <SaveButton 
             name="check" 
             onPress={handleSave} 
            />
            ) : null}
            <BackButton 
              name="left" 
              onPress={handleSave}
            />
          </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[StyleSheet.absoluteFillObject,styles.emptySpace]} />
        </TouchableWithoutFeedback>
      </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 60,     
      },
      title: {
        borderBottomColor : colors.LIGHTGREY ,
        borderBottomWidth : 1,
        fontSize : 30,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-bold',
      },
      content: {
        fontSize : 15,
        fontFamily: 'sans-serif',
      },
    emptySpace:{
        flex: 1,
        zIndex: -1,
    },
    deleteButton:{
        position: 'absolute',
        top: 750,
        right: 20,
        padding: 10,
      },
});

export default NoteInput;
