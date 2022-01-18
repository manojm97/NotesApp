import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../color/colors';

const Notes = ({item,onPress}) => {
    const {title,content} = item;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text numberOfLines={3}>{content}</Text>
        </TouchableOpacity>
    )
}

const width = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.SMOKE,
        width: width / 2 -10,
        padding: 15,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'sans-serif-bold',
        
      },
})

export default Notes
