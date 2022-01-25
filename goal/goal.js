import React, { useEffect, useState} from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, Modal, SafeAreaView, FlatList, StyleSheet, Text, Image, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import {auth} from '../firebase';
import { ProgressBar, Colors } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'; 
import { globalStyles } from '../styles/global';

export default function Goal() {

  const route = useRoute();
  const {userid} = route.params;
  const [AddGoalModalVisible, setAGModalVisible] = useState(false);
  const [UpdateGoalModalVisible, setUGModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [target, setTarget] = useState("");
  const [allocated, setAllocated] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setID] = useState("");
  const [saving, setSaving] = useState("");
  const [goalData, setGoalData] = useState("");
  const [emergencyFundData, setEFData] = useState("");

  useEffect(() => {
    fetchGoalData();
    fetchSaving();
  }, [])

  const fetchGoalData = async()=>{
    const response = await fetch('http://192.168.43.89:19002/GetGoal?userid=' + userid);
    const goal = await response.json();
    //setIncomeData(JSON.stringify(income));
    setGoalData(goal[0]);
    //console.log(goal[1][0]["id"])
    setEFData(goal[1][0]);
    //console.log(emergencyFundData);
    //setProgress(emergencyFundData["allocated"]/emergencyFundData["target"])
    //console.log(emergencyFundData);
    //console.log(emergencyFundData[0]);
    //console.log(JSON.stringify(emergencyFundData[0]["id"]));
    //setEFData(JSON.stringify(emergencyFundData));
    //console.log(emergencyFundData["id"]);
    //console.log("2"+Object.fromEntries(emergencyFundData));
    //console.log(typeof income[1][0].sum)
    //setIncomeSum(income[1][0].sum);
    //console.log(incomeSum[0].sum);
    //console.log(JSON.stringify(incomeData));
  }
  
  const fetchSaving = async()=>{
    const response = await fetch('http://192.168.43.89:19002/GetSaving?userid=' + userid);
    const saving = await response.json();
    setSaving(saving[0].amount.toFixed(2));
  }

  const UpdateGoal= () => {
    if(amount == "")
    {
      window.alert("All field must be filled!");
    }
    else
    {
        //send data to backend
        fetch('http://192.168.43.89:19002/UpdateGoal', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id : id,
            amount : amount
          })
        }).then(response=>response.json()).then(data=>{
             window.alert(data)
             //Do anything else like Toast etc.
        })
      .catch(error => alert(error.message))
    }
  }

  const AddGoal = () => {
    if(description == "" || target == "")
    {
      window.alert("All field must be filled!");
    }
    else{
        //send data to backend
        fetch('http://192.168.43.89:19002/AddGoal', {
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
          onPress: () => fetch('http://192.168.43.89:19002/DeleteGoal', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id : goalid
            })
          }).then(response=>response.json()).then(data=>{
               window.alert(data)
               //Do anything else like Toast etc.
               fetchGoalData();
          })
        .catch(error => alert(error.message)),
          style: "cancel"
        },
        { text: "CANCEL", onPress: () => console.log("CANCEL Pressed") }
      ]
    );
  }

  const openModalWithID = (id) =>{
    setUGModalVisible(true);
    setID(id);
  }

  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}></View>
      <SafeAreaView style={styles.incomesContainer}>
        <Text style = {styles.header}> Goal </Text>
        <View style = {styles.body}>
          <View style = {{alignItems: 'center'}}>
            <Text style = {{fontWeight: 'bold', fontSize: 18}}>Total Saving:</Text>
            <Text style = {{fontSize: 16}}> RM {saving}</Text>
          </View>
          <View style={styles.income} >
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style = {styles.title}>Now - Forever</Text>
              <TouchableOpacity
                onPress = {() => openModalWithID(emergencyFundData["id"])}>
                <AntDesign style = {{padding:5}} name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.title}>{emergencyFundData["desc"]}</Text>
            <Text style={styles.text}>Target: RM {emergencyFundData["target"]}</Text>
            <Text style={styles.text}>Now: RM {emergencyFundData["allocated"]}</Text>
            <Text style={styles.text}>Progress:</Text>
            <ProgressBar color = 'blue' style = {styles.progress} progress={emergencyFundData["percentage"]}  />  
          </View>
            
          <FlatList
            horizontal = {false}
            data = {goalData}
            keyExtractor={(item, index) => index.toString()}
            renderItem = {({item}) =>
            <View style={styles.income}>
              <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Till {item.day}/{item.month}/{item.year}</Text>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity
                    onPress = {() => confirmDelete(item.id)}>
                    <AntDesign style = {{padding:5}} name="delete" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress = {() => openModalWithID(item.id)}>
                    <AntDesign style = {{padding:5}} name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.title}>{item.desc}</Text>
              <Text style={styles.text}>Target: RM {item.target.toFixed(2)}</Text>
              <Text style={styles.text}>Now: RM {item.allocated.toFixed(2)}</Text>
              <Text style={styles.text}>Progress:</Text>
              <ProgressBar color = 'blue' style = {styles.progress} progress={item.percentage}  />  
            </View>
            }/>
            <TouchableOpacity 
              style={styles.addBtn}
              onPress = {() => {
                  setAGModalVisible(true);
                }}>
                <Image source={require('../assets/add_button.png')}
                  style={{width:40,height:40}}></Image>
            </TouchableOpacity>
        </View>

        
      </SafeAreaView>
      
      <Modal
        transparent = {true}
        backdropColor={'green'}
        backdropOpacity= {1}
        visible = {AddGoalModalVisible}
        onRequestClose = {() => {

        }}>
        <View style = {styles.modal_container}>
          <View style = {styles.modal}>
            <Text style = {globalStyles.modal_label}>Add Goal</Text>
            <Text style = {globalStyles.label}>Description</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setDescription}/>
            <View style = {{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <View style = {{flex: 1, flexDirection: 'column'}}>
                <Text style = {globalStyles.label}>Day</Text>
                <TextInput style = {styles.input} onChangeText = {setDay}/>
              </View>
              <View style = {{flex: 1, flexDirection: 'column'}}>
                <Text style = {globalStyles.label}>Month</Text>
                <TextInput style = {styles.input} onChangeText = {setMonth}/>
              </View>
              <View style = {{flex: 1, flexDirection: 'column'}}>
                <Text style = {globalStyles.label}>Year</Text>
                <TextInput style = {styles.input} onChangeText = {setYear}/>
              </View>
            </View>
            
            <Text style = {globalStyles.label}>Target</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setTarget}/>
            <Text style = {globalStyles.label}>Allocated</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setAllocated}/>
            <View style ={globalStyles.buttonContainer}>
              <Text 
                style = {globalStyles.button} 
                onPress = {() => {
                  AddGoal(); 
                  fetchGoalData(); 
                  setAGModalVisible(false); 
                }}>SAVE</Text>
              
              <Text 
                style = {globalStyles.button}
                onPress = {() => { 
                setAGModalVisible(false);
              }}>CANCEL</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent = {true}
        backdropColor={'green'}
        backdropOpacity= {1}
        visible = {UpdateGoalModalVisible}
        onRequestClose = {() => {

        }}>
        <View style = {globalStyles.modal_container}>
          <View style = {styles.modal}>
            <Text style = {styles.title}>Please enter the amount you would like to add on for this goal:</Text>
            <Text style = {styles.title}>(Enter -xx to extract allocated amount)</Text>
            <Text style = {globalStyles.label}>Amount(MYR)</Text>
            <TextInput style = {globalStyles.input} onChangeText = {setAmount}/>
            <View style ={globalStyles.buttonContainer}>
              <Text 
                style = {globalStyles.button} 
                onPress = {() => {
                  UpdateGoal(); 
                  fetchGoalData(); 
                  setUGModalVisible(false); 
                }}>SAVE</Text>
              
              <Text 
                style = {globalStyles.button} 
                onPress = {() => {
                setUGModalVisible(false);
              }}>CANCEL</Text>
            </View>
            
          </View>
        </View>
        
      </Modal>
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  headerContainer: {
        height: 200,
        marginTop: 40,
        height: 170,
        backgroundColor: '#B0B2FF',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
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
  body: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    marginTop: 5,
  },

  text: {
    fontSize: 16,
    padding: 5,
    color: 'black',
  },

  progress: {
    height: 10,
    borderRadius: 10,
    margin: 10,
  },

  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: 320,
    maxHeight: 500,
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

  input: {
    width: '80%',
    fontSize: 16,
    alignSelf: "flex-start",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  income: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    width : 300,
    maxHeight: 150,
    padding : 10,
    margin : 10,
    borderRadius: 10,
  },

  incomesContainer: {
        flex: 1,
        marginTop: -100,
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 10,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 1, height: 3},
        elevation: 4,
  }
});