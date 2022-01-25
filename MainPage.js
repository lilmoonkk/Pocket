import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, Modal, SafeAreaView, FlatList, StyleSheet, Text, Image, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { auth } from './firebase';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Picker} from '@react-native-picker/picker';
import { globalStyles } from './styles/global';

export default function MainPage(){
  const topTab = createMaterialTopTabNavigator();
  const route = useRoute();
  const {userid} = route.params;
  
  return(
    
    <SafeAreaView style={{flex: 1}}>
      <View style={globalStyles.header}></View>
      <View style={globalStyles.background}>
        <topTab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {
              elevation: 2,
              backgroundColor: "#FFD6A5",
              marginBottom: 30,
            }}}>
          <topTab.Screen name="Spending" component={spending} initialParams={{userid: userid}}/>
          <topTab.Screen name="Income" component={income} initialParams={{userid: userid}}/>
        </topTab.Navigator>
      </View>
      
    </SafeAreaView>
    
  );
}

function spending(){
  const route = useRoute();
  const {userid} = route.params;
  const [AddExpenseModalVisible, setAEModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const date = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
  const day = new Date().getDate();
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear()
  
  useEffect(() => {
    fetchExpenseData();
  }, [])

  const fetchExpenseData = async()=>{
    const response = await fetch('http://192.168.43.89:19002/GetExpense?userid=' + userid + '&day=' + day + '&month=' + month + '&year=' + year);
    const expense = await response.json();
    //setIncomeData(JSON.stringify(income));
    setExpenseData(expense[0]);
    //console.log(typeof income[1][0].sum)
    //setIncomeSum(income[1][0].sum);
    //console.log(incomeSum[0].sum);
    //console.log(JSON.stringify(incomeData));
  }

  const AddExpense = () => {
    if(description == "" || amount == "")
    {
      window.alert("All field must be filled!");
    }
    else{
        //send data to backend
        fetch('http://192.168.43.89:19002/AddExpense', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userid : userid,
            desc : description,
            category : category,
            amount : amount,
            day : day,
            month : month,
            year : year,
            time : new Date().getHours() + ':' + new Date().getMinutes()
          })
        }).then(response=>response.json()).then(data=>{
             window.alert(data)
             //Do anything else like Toast etc.
        })
      .catch(error => alert(error.message))
    }
  }

  const confirmDelete = (expenseid) => {
    Alert.alert(
      "",
      "Are you sure?",
      [
        {
          text: "DELETE",
          onPress: () => fetch('http://192.168.43.89:19002/DeleteExpense', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id : expenseid
            })
          }).then(response=>response.json()).then(data=>{
               window.alert(data)
               //Do anything else like Toast etc.
               fetchExpenseData();
          })
        .catch(error => alert(error.message)),
          style: "cancel"
        },
        { text: "CANCEL", onPress: () => console.log("CANCEL Pressed") }
      ]
    );
  }

  return(
    <View style={{flex: 1, backgroundColor:"#FFD6A5",}}>
      <SafeAreaView style={globalStyles.body}>
        <Text style = {{fontWeight: 'bold', fontSize: 18}}>
          Today {date}
        </Text>
        <FlatList  
          horizontal = {false}
          data = {expenseData}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
          <View style={globalStyles.detailContainer}>
              <View style = {globalStyles.details}>
                <Text style={{color:'#000', fontWeight:'bold', fontSize: 16}}>{item.time}</Text>
                <TouchableOpacity
                  onPress = {() => confirmDelete(item.id)}>
                  <Image source={require('./assets/trash.png')}
                    style={globalStyles.delete_btn}></Image>
                </TouchableOpacity>
              </View>
              <Text style={{color:'#000', fontWeight: 'bold', fontSize: 16}}>{item.category}</Text>
              <View style = {globalStyles.details}>
                <Text style={{color:'#000', fontSize: 16}}>{item.desc}</Text>
                <Text style={{color:'#000', fontSize: 16}}>RM {item.amount.toFixed(2)}</Text>
              </View>
            </View>
          }/>
        <TouchableOpacity 
          style={globalStyles.addBtn}
          onPress = {() => {
            setAEModalVisible(true);
          }}>
          <Image source={require('./assets/add_button.png')}
            style={{width:40,height:40}}>
          </Image>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        transparent = {true}
        backdropColor={'green'}
        backdropOpacity= {1}
        visible = {AddExpenseModalVisible}
        onRequestClose = {() => {

        }}>
        <View style = {globalStyles.modal_container}>
          <View style = {globalStyles.modal}>
            <Text style={globalStyles.modal_label}>Add Spending</Text>
            <Text style = {globalStyles.label}>Description</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setDescription}/>
            <Text style = {globalStyles.label}>Category</Text>
            <Picker style = {globalStyles.input} selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
              <Picker.Item label = "Charity" value ="Charity"/>
              <Picker.Item label = "Clothes and Beauty" value ="Clothes and Beauty"/>
              <Picker.Item label = "Education and Self-improvement" value ="Education and Self-improvement"/>
              <Picker.Item label = "Entertainment" value ="Entertainment"/>
              <Picker.Item label = "Food" value ="Food"/>
              <Picker.Item label = "Groceries and Household good" value ="Groceries and Household good"/>
              <Picker.Item label = "Insurance and Healthcare" value ="Insurance and Healthcare"/>
              <Picker.Item label = "Transportation" value ="Transportation"/>
              <Picker.Item label = "Others" value ="Others"/>
            </Picker>
            <Text style = {globalStyles.label}>Amount(MYR)</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setAmount}/>
            <View style ={globalStyles.buttonContainer}>
              <Text 
                style = {globalStyles.button} 
                onPress = {() => {
                  AddExpense(); 
                  fetchExpenseData(); 
                  setAEModalVisible(false);
                }}>SAVE</Text>
              
              <Text 
                style = {globalStyles.button}
                onPress = {() => {
                setAEModalVisible(false);
                }}>CANCEL</Text>
            </View>    
          </View>
        </View>
        
      </Modal>
    </View>
  );
}

function income(){
  const bottomTab = createMaterialBottomTabNavigator();
  const route = useRoute();
  const {userid} = route.params;
  const [AddIncomeModalVisible, setAIModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeData, setIncomeData] = useState("");
  const date = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
  const day = new Date().getDate();
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear()

  useEffect(() => {
    fetchIncomeData();
  }, [])

  const fetchIncomeData = async()=>{
    const response = await fetch('http://192.168.43.89:19002/GetIncome?userid=' + userid + '&day=' + day + '&month=' + month + '&year=' + year);
    const income = await response.json();
    //setIncomeData(JSON.stringify(income));
    setIncomeData(income[0]);
    //console.log(typeof income[1][0].sum)
    //setIncomeSum(income[1][0].sum);
    //console.log(incomeSum[0].sum);
    //console.log(JSON.stringify(incomeData));
  }
  
  const AddIncome = () => {
    if(description == "" || amount == "")
    {
      window.alert("All field must be filled!");
    }
    else{
        //send data to backend
        fetch('http://192.168.43.89:19002/AddIncome', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userid : userid,
            desc : description,
            amount : amount,
            //date : date,
            day : day,
            month : month,
            year : year,
            time : new Date().getHours() + ':' + new Date().getMinutes()
          })
        }).then(response=>response.json()).then(data=>{
             window.alert(data)
             //Do anything else like Toast etc.
        })
      .catch(error => alert(error.message))
    }
  }

  const confirmDelete = (incomeid) => {
    Alert.alert(
      "",
      "Are you sure?",
      [
        {
          text: "DELETE",
          onPress: () => fetch('http://192.168.43.89:19002/DeleteIncome', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id : incomeid
            })
          }).then(response=>response.json()).then(data=>{
               window.alert(data)
               //Do anything else like Toast etc.
               fetchIncomeData();
          })
        .catch(error => alert(error.message)),
          style: "cancel"
        },
        { text: "CANCEL", onPress: () => console.log("CANCEL Pressed") }
      ]
    );
  }

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: "#FFD6A5",}}>
      <SafeAreaView style={globalStyles.body}>
        <Text style = {{fontWeight: 'bold', fontSize: 18}}>
          Today {date}
        </Text>
        <FlatList
          horizontal = {false}
          data = {incomeData}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
            <View style={globalStyles.detailContainer}>
                <View style = {globalStyles.details}>
                  <Text style={{color:'#000', fontSize: 16, fontWeight:'bold'}}>Time: {item.time}</Text>
                  <TouchableOpacity
                    onPress = {() => confirmDelete(item.id)}>
                    <Image source={require('./assets/trash.png')}
                      style={globalStyles.delete_btn}></Image>
                  </TouchableOpacity>
                </View>
                <View style = {globalStyles.details}>
                  <Text style={{color:'#000', fontSize: 16}}>{item.desc}</Text>
                  <Text style={{color:'#000', fontSize: 16}}>RM {item.amount.toFixed(2)}</Text>
                </View>
            </View>
          }/>
        <TouchableOpacity 
          style={globalStyles.addBtn}
          onPress = {() => {
            setAIModalVisible(true);
          }}>
          <Image source={require('./assets/add_button.png')}
            style={{width:40,height:40}}>
          </Image>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        transparent = {true}
        backdropColor={'green'}
        backdropOpacity= {1}
        visible = {AddIncomeModalVisible}
        onRequestClose = {() => {

        }}>
        <View style = {globalStyles.modal_container}>
          <View style = {globalStyles.modal}>
            <Text style={{fontWeight: 'bold',marginTop: 10,}}>Add Income</Text>
            <Text style = {globalStyles.label}>Description</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setDescription}/>
            <Text style = {globalStyles.label}>Amount(MYR)</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setAmount}/>
            <View style ={globalStyles.buttonContainer}>
              <Text 
                style = {globalStyles.button} 
                onPress = {() => {
                  AddIncome(); 
                  fetchIncomeData(); 
                  setAIModalVisible(false); 
                  }}>SAVE</Text>
              
              <Text 
                style = {globalStyles.button}
                onPress = {() => {
                setAIModalVisible(false);
                }}>CANCEL</Text>
            </View>  
          </View>
        </View>
        
      </Modal>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    height: 170,
    backgroundColor: "#FADD8D",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 3},
    elevation: 4,
  },
});

/*
const spending = () =>{
  const route = useRoute();
  const {userid} = route.params;
  console.log(userid);
  return(
    <Text>Spending</Text>
  );
}

const income = () =>{
  const route = useRoute();
  const {userid} = route.params;
  const [AddIncomeModalVisible, setAIModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const date = new Date().getDate() + '/' + (new Date().getMonth()+1) + '/' + new Date().getFullYear();
////onPress = {() => {AddIncome(); fetchData(); forceUpdate();}}>OK</Text>
  return(
    <ScrollView>
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
        <View>
          <Text>Add Income</Text>
          <Text style = {{marginBottom: 10}}>Description</Text>
          <TextInput style = {{borderBottomWidth: 1}} onChangeText = {setDescription}/>
          <Text style = {{marginBottom: 10}}>Amount(MYR)</Text>
          <TextInput style = {{borderBottomWidth: 1}} onChangeText = {setAmount}/>
          <Text 
          style = {{margin: 30}}>OK</Text>
          
          <Text onPress = {() => {
            setAIModalVisible(false);
          }}>CANCEL</Text>
        </View>
      </Modal>
    </ScrollView>
  );
}

const bill = () =>{
  const route = useRoute();
  const {userid} = route.params;
  return(
    <Text>Bill</Text>
  );
}
*/