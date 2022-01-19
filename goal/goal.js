import React, { useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, Modal, SafeAreaView, FlatList, StyleSheet, Text, Image, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import {auth} from '../firebase';
export default function Goal() {

  const route = useRoute();
  const {userid} = route.params;
  const [AddGoalModalVisible, setAGModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [goalData, setGoalData] = useState("");
  const [emergencyFundData, setEFData] = useState("");

  useEffect(() => {
    fetchGoalData();
  }, [])

  const fetchGoalData = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetGoal?userid=' + userid);
    const goal = await response.json();
    //setIncomeData(JSON.stringify(income));
    setGoalData(goal[0]);
    setEFData(goal[1]);
    console.log(emergencyFundData);
    console.log(emergencyFundData[0]);
    //console.log(JSON.stringify(emergencyFundData));
    //setEFData(JSON.stringify(emergencyFundData));
    //console.log(emergencyFundData["id"]);
    //console.log("2"+Object.fromEntries(emergencyFundData));
    //console.log(typeof income[1][0].sum)
    //setIncomeSum(income[1][0].sum);
    //console.log(incomeSum[0].sum);
    //console.log(JSON.stringify(incomeData));
  }
  
  const AddGoal = () => {
    if(description == "" || target == "")
    {
      window.alert("All field must be filled!");
    }
    else{
        //send data to backend
        fetch('http://192.168.0.12:19002/AddGoal', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userid : userid,
            desc : description,
            day : day,
            month : month,
            year : year,
            target : target,
            allocated : allocated
          })
        }).then(response=>response.json()).then(data=>{
             window.alert(data)
             //Do anything else like Toast etc.
        })
      .catch(error => alert(error.message))
    }
  }

  const confirmDelete = (goalid) => {
    Alert.alert(
      "",
      "Are you sure?",
      [
        {
          text: "DELETE",
          onPress: () => fetch('http://192.168.0.12:19002/DeleteGoal', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id : goalid
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
    <SafeAreaView style={{flex: 1, backgroundColor:'yellow', alignItems: 'center'}}>
      <SafeAreaView style={styles.incomesContainer}>
      <FlatList
        
        horizontal = {false}
        data = {emergencyFundData}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item}) =>
        <View style={styles.income}>
            <TouchableOpacity
            onPress = {() => confirmDelete(item.id)}>
            <Image source={require('../assets/trash.png')}
            style={{width: 25, height: 25}}></Image></TouchableOpacity>
            <Text style={{color:'#000'}}>{item.desc}</Text>
            <Text style={{color:'#000'}}>RM {item.target.toFixed(2)}</Text>
            <Text style={{color:'#000'}}>RM {item.allocated.toFixed(2)}</Text>
        </View>
        }
        />
        <FlatList
        
        horizontal = {false}
        data = {goalData}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item}) =>
        <View style={styles.income}>
            <TouchableOpacity
            onPress = {() => confirmDelete(item.id)}>
            <Image source={require('../assets/trash.png')}
            style={{width: 25, height: 25}}></Image></TouchableOpacity>
            <Text style={{color:'#000'}}>{item.desc}</Text>
            <Text style={{color:'#000'}}>RM {item.target.toFixed(2)}</Text>
            <Text style={{color:'#000'}}>RM {item.allocated.toFixed(2)}</Text>
            
        </View>
        }
        />
      </SafeAreaView>
      <TouchableOpacity 
      style={styles.addBtn}
        onPress = {() => {
          setAGModalVisible(true);
        }}>
        <Image source={require('../assets/add_button.png')}
          style={{width:40,height:40}}></Image>
      </TouchableOpacity>
      <Modal
        transparent = {true}
        backdropColor={'green'}
        backdropOpacity= {1}
        visible = {AddGoalModalVisible}
        onRequestClose = {() => {

        }}>
        <View style = {styles.modal}>
          <Text>Add Income</Text>
          <Text style = {{marginBottom: 10}}>Description</Text>
          <TextInput style = {{borderBottomWidth: 1}} onChangeText = {setDescription}/>
          <Text style = {{marginBottom: 10}}>Amount(MYR)</Text>
          <TextInput style = {{borderBottomWidth: 1}} onChangeText = {setTarget}/>
          <Text 
          style = {{margin: 30}} onPress = {() => {AddGoal(); fetchGoalData(); setAGModalVisible(false); }}>OK</Text>
          
          <Text onPress = {() => {
            setAGModalVisible(false);
          }}>CANCEL</Text>
        </View>
      </Modal>
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#FFD6A5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  
  addBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    left: 100
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
    width : '70%',
    height : 100,
    padding : 10,
    margin : 10
  },

  incomesContainer: {
    backgroundColor: 'purple',
    width: '80%',
    flex: 2
  }
});