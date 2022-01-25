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
        
    <View style={{flex: 1}}>
        <View style={globalStyles.header}></View>
        <View style={globalStyles.background}>
            <Text style = {styles.header}> Budget </Text>
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
        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 1, height: 3},
        elevation: 4, 
    },

    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },

    body:{ 
        flex: 1,
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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