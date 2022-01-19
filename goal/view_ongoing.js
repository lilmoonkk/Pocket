import React, {useState} from 'react'
import { KeyboardAvoidingView, Animated, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Picker} from '@react-native-picker/picker';
import {useRoute } from '@react-navigation/core';

export default function view_ongoing()
{
    const route = useRoute();
    const {userid} = route.params;
    const[amount, setAmount] = useState('')
    
    const colors ={
        red:"#6B4346",
        background:"#f4f6fc",
        greyish:"#a4a4a4",
        tint:"rgba(0, 178, 202, 0.0)"
    }
    const [pickerValue,setPickerValue] = useState('category')
    return (
    <ScrollView>
    <KeyboardAvoidingView
      behavior="padding"
    >
        <View style ={{flex:1}}>
            <View style = {{padding:16, flexDirection: "row",  justifyContent:"space-between"}}>
                <MaterialCommunityIcons name="text" size={30} style = {{color : colors.red}}/>
                <View style = {{flexDirection:"row",}}>
                    {/* <MaterialCommunityIcons name="bell-outline" size={30} style = {{color : colors.red}}/> */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('edit_ongoing')}
                    >
                    <MaterialCommunityIcons name="pencil" size={30} style = {{color : colors.red}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.headerContainer}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.Header}
            >
                <Text style={styles.headerText}>Ongoing</Text>
            </TouchableOpacity>
        
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('overdue')}
                style={styles.headerOutline}
            >
                <Text style={styles.headerOutlineText}>Overdue</Text>
            </TouchableOpacity>
        </View>
        <View style ={{
                paddingHorizontal: 16, 
                paddingVertical:6,
                flexDirection: "row",
                justifyContent: "Space-between",
                backgroundColor: colors.tint,
                borderRadius:20,
                marginVertical:20,
                alignItems: "center",
                border: 2 ,
                borderColor: 'rgba(144, 202, 249, 0.3)',
                borderStyle: 'solid',
                borderRadius: 11
            }}>    
                <MaterialCommunityIcons name="magnify" size={30} style = {{color : colors.red}}/>
                {/* <View style ={{flexDirection:"row"}}> */}
                    {/* <MaterialCommunityIcons name="microphone" size={30} style = {{color : colors.red}}/>
                    <MaterialCommunityIcons name="tune" size={30} style = {{color : colors.red}}/> */}
                {/* </View> */}
        </View>
        <View style={{padding:16}}>    
            <Text style={{
                color: "#0B3954", 
                fontSize:30,
                fontFamily: 'Inter-Black',
                fontBorder: 3, 
                fontBorderStyle:'solid',
                fontBorderColor: '#0B3954'
            }}>
                {"Your Target:"}
            </Text>
            <Text style={{
                color: "#6B4346", 
                fontSize:40,
                fontFamily: 'Inter-Black'
            }}>
                {"RM1000.00:"}
            </Text>
        </View>

        <View style = {{
            padding:20, 
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems: "center"
            }}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.replace('edit_ongoing')}
            >
                <MaterialCommunityIcons name="plus" size={40} 
                style = {{
                    color : '#79BCB8',
                    backgroundColor: '#0000',
                    borderRadius:20,
                    marginHorizontal:8,
                    border: 2 ,
                    borderColor: '#C4C4C4',
                    borderStyle: 'solid',
                    color:"rgba(0, 178, 202, 0.33)"
                }}/>
            </TouchableOpacity> 
            <Animated.View style = {[]}>
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
                    <Text>  </Text>
                    <Text style={styles.inputTitle}>Amount</Text>
                    <TextInput
                        style={styles.picker}
                        placeholder = '   RM0.00'
                        onChangeText={(value)=>setAmount}
                        keyboardType="numeric"
                    />
                    <View style ={{flexDirection:"row"}}>
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
            </Animated.View>
            
        </View>
        <View style = {{
            padding:20, 
            flexDirection:"row",
            border: 2 ,
            borderColor: '#C4C4C4',
            borderStyle: 'solid',
            justifyContent:"flex-end",
            alignItems: "center"
            }}>
            <Text>
                
            </Text>
        </View>
    </KeyboardAvoidingView>
    </ScrollView>    
    )
}

const styles = StyleSheet.create({

    headerContainer: {
        width: '60%',
        marginTop: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50,
    },
    Header: {
        backgroundColor: 'rgba(172, 224, 221, 0.5)',
        width: '82%',
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
    },
    headerText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },
    headerOutline: {
        backgroundColor: 'rgba(172, 224, 221, 0.0)',
        width: '82%',
        padding: 15,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
    },
    headerOutlineText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,
    },
    center:
    {
        justifyContent:'center',
        alignItems:'center'
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
    moreText:{
        textAlign:"center",
        marginTop:20
    },
    picker:{
        width:300,
        height:45
    },
    discardText:{
        fontSize:16,
        color:"rgba(211, 0, 0, 0.72)",
        fontWeight:"400",
        fontFamily:"Avenir"
    },
    saveText:{
        fontSize:16,
        color:"#757575",
        fontWeight:"400",
        fontFamily:"Avenir"
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
        lineHeight: 21, 
    }
})
