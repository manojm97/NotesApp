import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Notes = ({item}) => {
    const {title,content} = item;
    return (
        <View>
            <Text>{title}</Text>
            <Text>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Notes
