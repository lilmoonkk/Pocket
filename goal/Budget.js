import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert,TextInput, SafeAreaView, FlatList, Modal } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {useRoute } from '@react-navigation/core';

export default function Budget()
{
    const route = useRoute();
    const {userid} = route.params;
    const [category,setCategory] = useState("")
    const [budgetData, setBudgetData] = useState("");
    const [UpdateBudgetModalVisible, setUBModalVisible] = useState(false);
    const[amount, setAmount] = useState("")
    
    useEffect(() => {
        fetchBudgetData();
      }, [])

    const fetchBudgetData = async()=>{
        const response = await fetch('http://192.168.0.12:19002/GetBudget?userid=' + userid);
        const expense = await response.json();
        setBudgetData(expense[0]);
    }

    const UpdateBudget= () => {
        if(amount == "")
        {
          window.alert("All field must be filled!");
        }
        else
        {
            //send data to backend
            fetch('http://192.168.0.12:19002/UpdateBudget', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                userid : userid,
                category : category,
                amount : amount
              })
            }).then(response=>response.json()).then(data=>{
                 window.alert(data)
                 //Do anything else like Toast etc.
            })
          .catch(error => alert(error.message))
        }
    }

    return (
    <View style={{flex: 1, backgroundColor:'yellow'}}>
        <SafeAreaView style={styles.incomesContainer}>
        
          <FlatList
          
          horizontal = {false}
          data = {budgetData}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
          <View style={styles.income}>
              <TouchableOpacity
              onPress = {() => {setUBModalVisible(true); setCategory(item.category);}}>
              <Text style={{color:'#000', fontWeight:'bold'}}>{item.category}</Text>
              <Text style={{color:'#000'}}>RM {item.amount.toFixed(2)}</Text>
              </TouchableOpacity>
          </View>
          }
          />
        <Modal
        transparent = {true}
        backdropColor={'green'}
        backdropOpacity= {1}
        visible = {UpdateBudgetModalVisible}
        onRequestClose = {() => {

        }}>
        <View style = {styles.modal}>
          <Text>Update Budget</Text>
          <Text style = {{marginBottom: 10}}>{category}</Text>
          <Text style = {{marginBottom: 10}}>Amount(MYR)</Text>
          <TextInput style = {{borderBottomWidth: 1}} onChangeText = {setAmount}/>
          <Text 
          style = {{margin: 30}} onPress = {() => {UpdateBudget(); fetchBudgetData(); setUBModalVisible(false); setAmount("")}}>OK</Text>
          
          <Text onPress = {() => {
            setUBModalVisible(false);
          }}>CANCEL</Text>
        </View>
        </Modal>
        </SafeAreaView>
        
    </View>
    );
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
        //fontFamily:"Avenir"
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
        //fontFamily:"Avenir",
        justifyContent:'center',
        alignItems:'center'
        
    },
    saveText:{
        fontSize:16,
        color:"#757575",
        fontWeight:"400",
        //fontFamily:"Avenir",
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
        //fontFamily: "Play",
        fontSize: 18,
        lineHeight: 21
    },

    income: {
        backgroundColor: "#9BF6FF",
        width : '70%',
        height : 100,
        padding : 10,
        margin : 10
    },

    incomesContainer: {
        backgroundColor: 'purple',
        width: '80%',
        flex: 2
    },

    modal: {
        marginTop: 150,
        marginLeft: 50,
        marginRight: 50,
        height: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})