import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

export default function news({navigation})
{
    return (
        <View style = {styles.body}>
            <Text style = {styles.text}>
                News
            </Text>
        </View>
    )
}

const styles = StyleSheet.create
({
    body: 
    {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:
    {
        fontSize: 24,
        lineHeight: 24,
        color: '#000000'
    }
})