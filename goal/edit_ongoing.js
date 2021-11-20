import {useSelector,useDispatch}from 'react-redux'
import { useAsyncStorage } from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { ScrollView, TextInput } from 'react-native-gesture-handler'

export default function edit_ongoing({navigation})
{
    const [pickerValue,setPickerValue] = useState('category')
    
    const[amount, setAmount] = useState('')
    
    return (
        <View style={[styles.wrap]}>
            <Text style={[styles.text, styles.titleText]}>Record</Text>
                <Text style={styles.inputTitle}>Category</Text>
                    <Picker style = {styles.picker} selectedValue={pickerValue} onValueChange={(itemValue) => setPickerValue(itemValue)}>
                    <Picker.Item label = "Donation" value ="Donation"/>
                    <Picker.Item label = "Education" value ="Education"/>
                    <Picker.Item label = "Foundation" value ="Foundation"/>
                    <Picker.Item label = "Insurance and Healthcare" value ="Insurance and Healthcare"/>
                    <Picker.Item label = "Property" value ="Property"/>
                    <Picker.Item label = "Shopping and Entertainment" value ="Shopping and Entertainment"/>
                    <Picker.Item label = "Others" value ="Others"/>
                </Picker>
            <Text style={styles.inputTitle}>Amount</Text>
            <TextInput
                style={styles.picker}
                placeholder = '   RM0.00'
                onChangeText={(value)=>setAmount}
                keyboardType="numeric"
            />
            <View style ={{flexDirection:"row",justifyContent:'center',
        alignItems:'center'}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[styles.modalButton, styles.center]}
                    onPress={()=>console.log('react')}
                >
                    
                <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[styles.modalButton, styles.center]}
                    onPress={()=>console.log('react')}
                >
                    <Text style={styles.discardText}>Discard</Text>
                </TouchableOpacity>
            </View>
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
        padding:10
    },
    input:
    {
        width:'100%',
        borderWidth:1,
        borderColor:'#5555',
        backgroundColor:'#ffffff',
        textAlign:'left',
        fontSize:20,
        margin:10,
        paddingHorizontal:10
    },
    wrap:{
        padding:15,
        margin:15,
        borderRadius:10,
        backgroundColor:"rgba(255, 255, 255, 1)" 
    },
    text:{
        fontSize:28.8,
        color:"#ECF0F9",
        fontWeight:"600",
        fontFamily:"Avenir"
    },
    titleText:{
        fontSize:30,
        textAlign:"center",
        marginTop:10,
        color:"rgba(11, 57, 84, 1)"
    },
    picker:{
        width:'100%',
        height:45
    },
    discardText:{
        fontSize:16,
        color:"rgba(211, 0, 0, 0.72)",
        fontWeight:"400",
        fontFamily:"Avenir",
        justifyContent:'center',
        alignItems:'center'
        
    },
    saveText:{
        fontSize:16,
        color:"#757575",
        fontWeight:"400",
        fontFamily:"Avenir",
        justifyContent:'center',
        alignItems:'center'
    },
    modalButton:{
        backgroundColor:"transparent",
        borderRadius:100,
        borderColor:"#ffff",
        marginTop:64,
        borderWidth:1,
        paddingTop:16,
        paddingBottom:16,
        paddingLeft:25,
        paddingRight:25,
        marginHorizontal:5,
        flex:1
    },
    inputAmount:
    {
        width:'100%',
        borderWidth:1,
        borderColor:'#555555',
        borderRadius:10,
        backgroundColor:'#ffff',
        textAlign:'left',
        fontSize:20,
        margin:10,
        marginLeft:"30%",
        paddingHorizontal:10
    },
    inputTitle:
    {
        margin:5,
        fontFamily: "Play",
        fontSize: 18,
        lineHeight: 21
    }
})