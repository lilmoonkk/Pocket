import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, Modal, FlatList, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/core';
import { ProgressBar, Colors } from 'react-native-paper';

export default function Report(){
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
          <topTab.Screen name="Daily" component={daily} initialParams={{userid: userid}}/>
          <topTab.Screen name="Monthly" component={monthly} initialParams={{userid: userid}}/>
        </topTab.Navigator>
      </View>
      
    </View>
    
  );
}

function daily()
{
  const route = useRoute();
  const {userid} = route.params;
  const [CalenderModalVisible, setCalenderModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth()+1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [saving, setSaving] = useState("");
  const [incomeData, setIncomeData] = useState("");
  const [sumIncomeData, setSumIncomeData] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [sumExpenseData, setSumExpenseData] = useState("");
  const [budgetCapacityData, setBCData] = useState("");
  const [showBudgetCapacity, setBCVisible] = useState(true);

  useEffect(() => {
    fetchSaving();
    fetchIncomeData();
    fetchExpenseData();
    fetchBudgetCapacity();
  }, [])

  const toggleBudgetCapacity = () =>{
    if (day==new Date().getDate() && month==new Date().getMonth()+1 && year==new Date().getFullYear()){
      setBCVisible(true);
    }
    else{
      setBCVisible(false);
    }
  }

  const onDateChange = (date) => {
      //function to handle the date change
      /*
      if (type === 'END_DATE') {
        setSelectedEndDate(date);
      } else {
        setSelectedEndDate(null);
        setSelectedStartDate(date);
      }*/
      //setSelectedDate(date);
      setYear(parseInt(JSON.stringify(date).substring(1,5)));
      setMonth(parseInt(JSON.stringify(date).substring(6,8)));
      setDay(parseInt(JSON.stringify(date).substring(9,11)));
      
      //console.log(date.substring(0,5));
  };

  const fetchSaving = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetSaving?userid=' + userid);
    const saving = await response.json();
    setSaving(saving[0].amount.toFixed(2));
  }

  const fetchIncomeData = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetIncome?userid=' + userid + '&day=' + day + '&month=' + month + '&year=' + year);
    const income = await response.json();
    setIncomeData(income[0]);
    if (income[1][0].sum == null){
      setSumIncomeData(null);
    }
    else{
      setSumIncomeData(income[1][0].sum.toFixed(2));
    }
  }

  const fetchExpenseData = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetExpense?userid=' + userid + '&day=' + day + '&month=' + month + '&year=' + year);
    const expense = await response.json();
    setExpenseData(expense[0]);
    if (expense[1][0].sum == null){
      setSumExpenseData(null);
    }
    else{
      setSumExpenseData(expense[1][0].sum.toFixed(2));
    }
    
  }

  const fetchBudgetCapacity = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetBudgetCapacity?userid=' + userid + '&month=' + month + '&year=' + year);
    const budgetCapacity = await response.json();
    setBCData(budgetCapacity);
  }

  return (
    <View style={{paddingTop: 30}}>
      <TouchableOpacity
        style={{alignItems:'flex-end'}}
        onPress = {() => {
        setCalenderModalVisible(true);}}>
        <MaterialCommunityIcons name="calendar" size={26} />
      </TouchableOpacity>
      <Text>Saving you've got by far:</Text>
      <Text>RM {saving}</Text>
      <Text>Income</Text>
      {sumIncomeData == null ? <Text>Null</Text> :<Text>Total (RM) : {sumIncomeData}</Text>} 
      <FlatList
          horizontal = {true}
          data = {incomeData}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
            <View style={styles.income}>
                <Text style={{color:'#000', fontWeight:'bold'}}>{item.time}</Text>
                <Text style={{color:'#000'}}>{item.desc}</Text>
                <Text style={{color:'#000'}}>RM {item.amount.toFixed(2)}</Text>
            </View>}
      />
      <Text>Expenses</Text>
      {sumExpenseData == null ? <Text>Null</Text> :<Text>Total (RM) : {sumExpenseData}</Text>} 
      <FlatList
          horizontal = {true}
          data = {expenseData}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
          <View style={styles.income}>
              <Text style={{color:'#000', fontWeight:'bold'}}>{item.time}</Text>
              <Text style={{color:'#000'}}>{item.desc}</Text>
              <Text style={{color:'#000'}}>{item.category}</Text>
              <Text style={{color:'#000'}}>RM {item.amount.toFixed(2)}</Text>
          </View>
          }
      />
      {showBudgetCapacity?<Text>Budget Capacity</Text>:null}
      <FlatList
          style={{opacity: showBudgetCapacity==true?1: 0}}
          horizontal = {false}
          data = {budgetCapacityData}
          keyExtractor={(item, index) => index.toString()}
          renderItem = {({item}) =>
          <View style={styles.income}>
              <Text style={{color:'#000', fontWeight:'bold'}}>{item.category} (RM): {item.expense.toFixed(2)}/{item.budget.toFixed(2)}</Text>
              <ProgressBar progress={item.percentage == null?1:item.percentage} color={item.percentage >= 1 || item.percentage == null ?Colors.red800:Colors.blue100} />
          </View>
          }
      />
      <Modal
        transparent = {true}
        backdropColor={'green'}
        backdropOpacity= {1}
        visible = {CalenderModalVisible}
        >
        <View style={styles.modal}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          minDate={new Date(2021, 5, 1)}
          maxDate={new Date(2050, 6, 3)}
          
          weekdays={
            [
              'Mon', 
              'Tue', 
              'Wed', 
              'Thur', 
              'Fri', 
              'Sat', 
              'Sun'
            ]}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          width={350}
          onDateChange={onDateChange}
        />
        <Text style = {{margin: 0}} onPress = {() => {
          fetchSaving();
          fetchIncomeData();
          fetchExpenseData();
          fetchBudgetCapacity(); 
          toggleBudgetCapacity();
          setCalenderModalVisible(false);}}>
          OK
        </Text>
        <Text style = {{margin: 10}} onPress = {() => {
          setCalenderModalVisible(false);}}>
          Cancel
        </Text>
        </View>
      </Modal>
    </View>
  )
}

function monthly()
{
  return(
    <Text>Hi</Text>
  )
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
  body: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  text:{
      fontSize: 24,
      lineHeight: 24,
      color: '#000000'
  },
  modal: {
    marginTop: 150,
    marginLeft: 10,
    marginRight: 10,
    height: 410,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 30,
    //paddingLeft: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})