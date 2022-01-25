import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Alert,TextInput, SafeAreaView, FlatList, Modal, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {useRoute } from '@react-navigation/core';
import { globalStyles } from '../styles/global';
import { AntDesign } from '@expo/vector-icons'; 
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import ndarray from 'ndarray';


export default function Budget()
{
    const route = useRoute();
    const {userid} = route.params;
    const [category,setCategory] = useState("")
    const [budgetData, setBudgetData] = useState("");
    const [UpdateBudgetModalVisible, setUBModalVisible] = useState(false);
    const[amount, setAmount] = useState("")
    const [isTfReady, setTfReady] = useState(false);
    const [result, setResult] = useState(null);
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();

    if(month == 1){
        year = year -1;
        month = 12;
    }


    useEffect(() => {
        async function waitForTensorFlowJs() {
        await tf.ready();
            setTfReady(true);
        }
        waitForTensorFlowJs();
    }, []);

    useEffect(() => {
        async function predict(){
            if (isTfReady) {
            const response = await fetch('http://192.168.100.5:19002/GetLastMonthIncome?userid=' + userid + '&month=' + month + '&year=' + year);
            const lmincome = await response.json()
            var lm_income = lmincome[0]["sum"];
            var fixspend = 540;
            lm_income = (lm_income-670)/(66395-670)
            fixspend = (fixspend-418)/(1621-418)
            const x = tf.tensor2d([[lm_income,fixspend]])
            const modelJson = await require('../assets/model/model.json');
            const modelWeights = await require('../assets/model/group1-shard1of1.bin');
            // Use the bundleResorceIO IOHandler to load the model
            const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
            //Predict result
            var result = await model.predict(x).dataSync()
            result = parseFloat(result).toFixed(2)
            setResult(result)
        }
    }
    predict();
    }, [isTfReady]);
    
    useEffect(() => {
        fetchBudgetData();
      }, [])
    
      

    const fetchBudgetData = async()=>{
        const response = await fetch('http://192.168.100.5:19002/GetBudget?userid=' + userid);
        const expense = await response.json();
        setBudgetData(expense[0]);
        //console.log("data")
        //console.log(typeof(expense[1][0]["sum"]))
    }

    const UpdateBudget= () => {
        if(amount == "")
        {
          window.alert("All field must be filled!");
        }
        else
        {
            //send data to backend
            fetch('http://192.168.100.5:19002/UpdateBudget', {
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
    <View style={{flex: 1,}}>
         <View style = {styles.prediction}>
           <Text style = {styles.text2}>Your predicted this month budget:{"\n"}
           <Text style = {styles.text3}>        RM{result}</Text>
           </Text>
        </View>
        <View style={globalStyles.header}></View>
        <View style={styles.background}>
            <SafeAreaView style={styles.body}>
                <FlatList
                    horizontal = {false}
                    data = {budgetData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {({item}) =>
                    <View style={styles.detailContainer}>
                        <View style = {styles.details}>
                            <Text style={{color:'#000', fontWeight:'bold'}}>{item.category}</Text>
                            <Text style={{color:'#000'}}>RM {item.amount.toFixed(2)}</Text>
                        </View>
                        <View style = {styles.details}>
                            <TouchableOpacity
                            onPress = {() => {
                                setUBModalVisible(true); 
                                setCategory(item.category);}}>
                                <AntDesign name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                }/>
                <Modal
                    transparent = {true}
                    backdropColor={'green'}
                    backdropOpacity= {1}
                    visible = {UpdateBudgetModalVisible}
                    onRequestClose = {() => {

                    }}>
                    <View style = {styles.modal_container}>
                        <View style = {styles.modal}>
                            <Text style = {globalStyles.modal_label}>Update Budget</Text>
                            <Text style = {{fontWeight: 'bold', fontSize: 16}}>{category}</Text>
                            <Text style = {globalStyles.label}>Amount(MYR)</Text>
                            <TextInput style = {globalStyles.input} onChangeText = {setAmount}/>
                            <View style ={globalStyles.buttonContainer}>
                                <Text 
                                    style = {globalStyles.button} 
                                    onPress = {() => {
                                        UpdateBudget(); 
                                        fetchBudgetData(); 
                                        setUBModalVisible(false); 
                                        setAmount("")
                                    }}>SAVE</Text>
                                
                                <Text 
                                    style = {globalStyles.button}
                                    onPress = {() => {
                                    setUBModalVisible(false);
                                }}>DISCARD</Text>
                            </View>
                        </View>
                    </View>
                    
                </Modal>
            </SafeAreaView>
        </View> 
    </View>
    );
}

const styles = StyleSheet.create
({
    background:{
        flex: 1,
        marginTop: -100,
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20, 
    },

    body:{ 
        backgroundColor:'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 4,
    },

    detailContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width : 300,
        height : 70,
        padding : 10,
        margin : 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },

    details:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
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

    modal_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        width: 320,
        height: 220,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    prediction:{
        width:230,
        height:60,
        top:40,
        left:75,
        backgroundColor: '#ECF0F9',
        alignItems: 'center',
        justifyContent: 'center',
        margin:7,
        borderRadius: 10,
    },
    text3:{
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding:10,
        //letterSpacing: 2,
        //margin:20,
    },
})