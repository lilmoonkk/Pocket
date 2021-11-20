import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core'
import { Modal, SafeAreaView, FlatList, StyleSheet, Text, Image, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';

export default function MainPage() {

  //Get params from last screen
  const route = useRoute();
  const {userid} = route.params;
  
  const [AddIncomeModalVisible, setAIModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const date = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
  const [incomeData, setIncomeData] = useState("");
  const [incomeSum, setIncomeSum] = useState("");

  useEffect(() => {
    fetchData();

    
  }, [])

  const AddIncome = () => {
    if(description == "" || amount == "")
    {
      window.alert("Must field must be filled!");
    }
    else{
        
        //send data to backend
        fetch('http://192.168.0.5:19002/AddIncome', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userid : userid,
            desc : description,
            amount : amount,
            date : date,
            time : new Date().getHours() + ':' + new Date().getMinutes()
          })
        }).then(response=>response.json()).then(data=>{
             window.alert(data)
             //Do anything else like Toast etc.
        })
      .catch(error => alert(error.message))
    }
  }

  const fetchData = async()=>{
    const response = await fetch('http://192.168.0.5:19002/GetIncome?userid=' + userid + '&date=' + date);
    const income = await response.json();
    //setIncomeData(JSON.stringify(income));
    setIncomeData(income[0]);
    //console.log(typeof income[1][0].sum)
    setIncomeSum(income[1][0].sum);
    //console.log(incomeSum[0].sum);
    //console.log(JSON.stringify(incomeData));
  }

  
  
  
  return (
    <ScrollView style={[AddIncomeModalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, John!</Text>
        <Text style={styles.welcome}>Welcome back.</Text>
        <StatusBar style="auto"/>
      </View>
      
      <View style={{paddingLeft: 100},{flexDirection: "row"}}>
        <Text >Income</Text>
        
        <TouchableOpacity onPress = {() => {
          setAIModalVisible(true);
        }}>
          <Image source={require('./assets/add_button.png')}
          style={{width: 25, height: 25}}></Image>
        </TouchableOpacity>
        <Modal
          transparent = {true}
          backdropColor={'green'}
          backdropOpacity= {1}
          visible = {AddIncomeModalVisible}
          onRequestClose = {() => {

          }}>
          <View style = {styles.modal}>
            <Text>Add Income</Text>
            <Text style = {{marginBottom: 10}}>Description</Text>
            <TextInput style = {{borderBottomWidth: 1}} onChangeText = {setDescription}/>
            <Text style = {{marginBottom: 10}}>Amount(MYR)</Text>
            <TextInput style = {{borderBottomWidth: 1}} onChangeText = {setAmount}/>
            <Text 
            style = {{margin: 30}}
            onPress = {AddIncome}>OK</Text>
            <Text onPress = {() => {
              setAIModalVisible(false);
            }}>CANCEL</Text>
          </View>
        </Modal>
        
      </View>
      
      <SafeAreaView>
        <Text>RM {parseFloat(incomeSum).toFixed(2)}</Text>
        <FlatList
        horizontal = {true}
        data = {incomeData}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item}) =>

        <View style={styles.income}>
            <Image source={require('./assets/trash.png')}
            style={{width: 25, height: 25}}></Image>
            <Text style={{color:'#000', fontWeight:'bold'}}>{item.time}</Text>
            <Text style={{color:'#000'}}>{item.desc}</Text>
            <Text style={{color:'#000'}}>RM {item.amount.toFixed(2)}</Text>
        </View>

        }
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#FFD6A5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  greeting: {
    paddingTop: 100,
    paddingLeft: 30,
    //fontFamily: "PaytoneOne",
    fontSize: 30,
    fontWeight: 'bold'
  },

  welcome: {
    paddingLeft: 30,
    //fontFamily: "Paytone One"
    fontSize: 25
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

  income: {
    backgroundColor: "#9BF6FF",
    width : 140,
    height : 80,
    padding : 10,
    margin : 10
  }
});