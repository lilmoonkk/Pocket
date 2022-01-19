import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, Modal, SafeAreaView, FlatList, StyleSheet, Text, Image, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import {auth} from './firebase';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Picker} from '@react-native-picker/picker';

export default function MainPage(){
  const topTab = createMaterialTopTabNavigator();
  const route = useRoute();
  const {userid} = route.params;
  
  return(
    
    <View style={{flex: 1,}}>
      <View style={styles.header}></View>
      <View style={styles.background}>
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
          <topTab.Screen name="Bill" component={bill} initialParams={{userid: userid}}/>
        </topTab.Navigator>
      </View>
      
    </View>
    
  );
}

function spending(){
  const route = useRoute();
  const {userid} = route.params;
  const [AddExpenseModalVisible, setAEModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("category");
  const [amount, setAmount] = useState("");
  return(
    <View style={{flex: 1, backgroundColor: "#FFD6A5",}}>
      <View style={styles.body}>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress = {() => {
            setAEModalVisible(true);
          }}>
          <Image source={require('./assets/add_button.png')}
            style={{width:40,height:40}}>
          </Image>
        </TouchableOpacity>
        <Modal
          transparent = {true}
          backdropColor={'green'}
          backdropOpacity= {1}
          visible = {AddExpenseModalVisible}
          onRequestClose = {() => {

          }}>
        <View style = {styles.modal}>
          <Text style={{fontWeight: 'bold', marginTop: 10,}}>Add Spending</Text>
          <Text style = {styles.label}>Description</Text>
          <TextInput style = {styles.input} onChangeText = {setDescription}/>
          <Text style = {styles.label}>Category</Text>
          <Picker style = {styles.input} selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
            <Picker.Item label = "Food" value ="Food"/>
            <Picker.Item label = "Grocery" value ="Grocery"/>
            <Picker.Item label = "CLothes" value ="Clothes"/>
            <Picker.Item label = "Shopping and Entertainment" value ="Shopping and Entertainment"/>
            <Picker.Item label = "Others" value ="Others"/>
          </Picker>
          <Text style = {styles.label}>Amount(MYR)</Text>
          <TextInput style = {styles.input} onChangeText = {setAmount}/>
          <View style={styles.buttonContainer}>
            <Text 
              style={styles.button}
              onPress = {() => {setAEModalVisible(false)}}>
                Save</Text>
          
            <Text 
              style={styles.button}
              onPress = {() => {setAEModalVisible(false);}}>
                Discard</Text>
          </View>
          
        </View>
      </Modal>
        </View>
        
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

  useEffect(() => {
    fetchIncomeData();
  }, [])

  const fetchIncomeData = async()=>{
    const response = await fetch('http://192.168.43.89:19002/GetIncome?userid=' + userid + '&date=' + date);
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
      window.alert("Must field must be filled!");
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
      <SafeAreaView style={styles.body}>
        <FlatList
          horizontal = {false}
          data = {incomeData}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
            <View style={styles.income}>
                <TouchableOpacity
                onPress = {() => confirmDelete(item.id)}>
                <Image source={require('./assets/trash.png')}
                style={{width: 25, height: 25}}></Image></TouchableOpacity>
                <Text style={{color:'#000', fontWeight:'bold'}}>{item.time}</Text>
                <Text style={{color:'#000'}}>{item.desc}</Text>
                <Text style={{color:'#000'}}>RM {item.amount.toFixed(2)}</Text>
            </View>}
        />
        <TouchableOpacity 
          style={styles.addBtn}
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
        <View style = {styles.modal}>
          <Text style={{fontWeight: 'bold',marginTop: 10,}}>Add Income</Text>
          <Text style = {styles.label}>Description</Text>
          <TextInput style = {styles.input} onChangeText = {setDescription}/>
          <Text style = {styles.label}>Amount(MYR)</Text>
          <TextInput style = {styles.input} onChangeText = {setAmount}/>
          <View style ={styles.buttonContainer}>
            <Text 
              style = {styles.button} 
              onPress = {() => {AddIncome(); fetchIncomeData(); setAIModalVisible(false); }}>
                SAVE</Text>
            
            <Text 
              style = {styles.button}
              onPress = {() => {
              setAIModalVisible(false);
            }}>DISCARD</Text>
          </View>
          
        </View>
      </Modal>
      
    </SafeAreaView>
    
  );
}





function bill(){
  const route = useRoute();
  const {userid} = route.params;
  return(
    <Text>Bill</Text>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    height: 150,
    backgroundColor: "#FFD6A5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 3},
    elevation: 4,
  },
  background:{
    flex: 1,
    marginTop: -150,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
    elevation: 4,
  },
  body:{
    flex: 1, 
    justifyContent: 'flex-end', 
    backgroundColor:'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginBottom: 5,
    marginRight: 5,
  },

  welcome: {
    paddingLeft: 30,
    //fontFamily: "Paytone One"
    fontSize: 25
  },

  label:{
    marginTop: 15,
  },
  input:{
    width: '100%',
    height: '10%',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  button:{
    textAlign: 'center',
    padding: 10,
  },
  modal: {
    marginTop: 150,
    marginLeft: 50,
    marginRight: 50,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
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

  income: {
    backgroundColor: 'white',
    width : 300,
    height : 100,
    padding : 10,
    margin : 10,
    borderColor: 'black',
    borderWidth: 1,
  },

  incomesContainer: {
    backgroundColor: 'purple',
    width: '80%',
    flex: 1
  }
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