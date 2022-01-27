import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Modal, FlatList, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from '@react-navigation/core';
import { ProgressBar, Colors } from 'react-native-paper';
import MonthSelectorCalendar from 'react-native-month-selector'; 


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
              backgroundColor: "#A0C4FF",
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
    <View style={{flex: 1, backgroundColor:"#A0C4FF",}}>
      <View style = {styles.body}>
        <View style = {styles.savingContainer}>
          <View>
            <Text style = {styles.text}>Saving you've got by far:</Text>
            <Text style = {styles.text}> RM {saving}</Text>
          </View>
          <View style={styles.calendar}>
            <TouchableOpacity
              onPress = {() => {
                setCalenderModalVisible(true);}}>
              <MaterialCommunityIcons name="calendar" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style = {{paddingLeft: 15,}}>
          <Text style = {styles.title}>Income</Text>
          {sumIncomeData == null ? <Text style={styles.text}>Null</Text> :<Text style = {styles.text}>Total: RM {sumIncomeData}</Text>} 
          <FlatList
              horizontal = {true}
              data = {incomeData}
              keyExtractor={(item, index) => index.toString()}
              renderItem = {({item}) =>
                <View style={styles.income}>
                    <Text style={styles.title}>{item.time}</Text>
                    <Text style={styles.text}>{item.desc}</Text>
                    <Text style={styles.text}> RM {item.amount.toFixed(2)}</Text>
                </View>}
          />
          
          <Text style = {styles.title}>Expenses</Text>
          {sumExpenseData == null ? <Text style={styles.text}>Null</Text> :<Text style={styles.text}>Total (RM) : {sumExpenseData}</Text>} 
          <FlatList
              horizontal = {true}
              data = {expenseData}
              keyExtractor={(item, index) => index.toString()}
              renderItem = {({item}) =>
              <View style={styles.income}>
                  <Text style={styles.title}>{item.time}</Text>
                  <Text style={styles.text}>{item.desc}</Text>
                  <Text style={styles.text}>{item.category}</Text>
                  <Text style={styles.text}> RM {item.amount.toFixed(2)}</Text>
              </View>
              }
          />

          {showBudgetCapacity?<Text style = {styles.title}>Budget Capacity</Text>:null}
          <FlatList
              style={{opacity: showBudgetCapacity==true?1: 0}}
              horizontal = {false}
              data = {budgetCapacityData}
              keyExtractor={(item, index) => index.toString()}
              renderItem = {({item}) =>
              <View style={styles.budget}>
                  <Text style={styles.title}>{item.category} (RM): {item.expense.toFixed(2)}/{item.budget.toFixed(2)}</Text>
                  <ProgressBar style = {styles.progress} progress={item.percentage == null?1:item.percentage} color={item.percentage >= 1 || item.percentage == null ?Colors.red800:Colors.blue800} />
              </View>
              }
          />
        </View>
        
        <Modal
          transparent = {true}
          backdropColor={'green'}
          backdropOpacity= {1}
          visible = {CalenderModalVisible}
          >
          <View style = {styles.modal_container}>
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
                width={330}
                textStyle = {{fontSize: 16}}
                onDateChange={onDateChange}
              />
              <View style = {styles.buttonContainer}>
                <Text style = {styles.button} 
                  onPress = {() => {
                  fetchSaving();
                  fetchIncomeData();
                  fetchExpenseData();
                  fetchBudgetCapacity(); 
                  toggleBudgetCapacity();
                  setCalenderModalVisible(false);
                  }}>OK</Text>
                <Text style = {styles.button} 
                  onPress = {() => {
                    setCalenderModalVisible(false);}}>
                  Cancel</Text>
              </View>
          </View>
          
          </View>
        </Modal>
      </View>
      
    </View>
  )
}

function monthly()
{
  const route = useRoute();
  const {userid} = route.params;
  const [month, setMonth] = useState(new Date().getMonth()+1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [CalenderModalVisible, setCalenderModalVisible] = useState(false);
  const [incomeData, setIncomeData] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [saving, setSaving] = useState("");
  const [incomeBreakdown, setIB] = useState("")
  const [expenseBreakdown, setEB] = useState("")

  useEffect(() => {
    fetchIncomeData();
    fetchSaving();
    fetchExpenseData();
    fetchIBData();
    fetchEBData();
  }, [])

  const fetchIncomeData = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetTotalIncome?userid=' + userid + '&month=' + month + '&year=' + year);
    const income = await response.json();
    if (income[0].sum == null){
      setIncomeData(null);
    }
    else{
      setIncomeData(income[0].sum.toFixed(2));
    }
    //setIncomeData(income[0].sum.toFixed(2));
    //console.log(income[0].sum.toFixed(2))
  }

  const fetchSaving = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetSaving?userid=' + userid);
    const saving = await response.json();
    if (saving[0].amount == null){
      setSaving(null);
    }
    else{
      setSaving(saving[0].amount.toFixed(2));
    }
    //setSaving(saving[0].amount.toFixed(2));
  }

  const fetchExpenseData = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetTotalExpense?userid=' + userid + '&month=' + month + '&year=' + year);
    const expense = await response.json();
    //console.log(expense);
    if (expense[0].sum == null){
      setExpenseData(null);
    }
    else{
      setExpenseData(expense[0].sum.toFixed(2));
    }
    //setExpenseData(expense[0].sum.toFixed(2));
    
  }

  const fetchIBData = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetIncomePie?userid=' + userid + '&month=' + month + '&year=' + year);
    const income = await response.json();
    if (income == null){
      setIB(null);
    }
    else{
      setIB(income);
    }
    //setIB(income);
    //console.log(income);
    //setTA(income.map(item => item.total));
    //console.log(income.map(item => item.total));
  }

  const fetchEBData = async()=>{
    const response = await fetch('http://192.168.0.12:19002/GetExpensePie?userid=' + userid + '&month=' + month + '&year=' + year);
    const expense = await response.json();
    if (expense == null){
      setEB(null);
    }
    else{
      setEB(expense);
    }
    //console.log(income);
    //setTA(income.map(item => item.total));
    //console.log(income.map(item => item.total));
  }

  return(
    <View style={{flex: 1, backgroundColor:"#A0C4FF",}}>
      <View style = {styles.body}>
      <View style={styles.calendar}>
            <TouchableOpacity
              onPress = {() => {
                setCalenderModalVisible(true);}}>
              <MaterialCommunityIcons name="calendar" size={30} />
            </TouchableOpacity>
      </View>
      <Text>Total Income</Text>
      {incomeData == null ? <Text style={styles.text}>Null</Text> :<Text style={styles.text}>RM {incomeData}</Text>} 
      <Text>Total Expense</Text>
      {expenseData == null ? <Text style={styles.text}>Null</Text> :<Text style={styles.text}>RM {expenseData}</Text>} 
      <Text>Cash Flow</Text>
      <Text style = {{color: incomeData - expenseData<=0? 'red' : 'green'}}>{incomeData - expenseData<=0? '- ' : '+ '}RM {incomeData - expenseData}</Text>
      <View style={{opacity: month==new Date().getMonth+1 && year==new Date().getFullYear?1: 0}}>
        <Text>Total Saving</Text>
        {saving == null ? <Text style={styles.text}>Null</Text> :<Text style={styles.text}>RM {saving}</Text>} 
      </View>
      <Text>Income Breakdown</Text>
      <FlatList
        horizontal = {false}
        data = {incomeBreakdown}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item}) =>
        <View style={styles.income}>
            <Text style={styles.text}>{item.desc}</Text>
            <Text style={styles.text}>{((item.total/incomeData).toFixed(2)) * 100} %</Text>
        </View>
        }
      />
      <Text>Spending Breakdown</Text>
      <FlatList
        horizontal = {false}
        data = {expenseBreakdown}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item}) =>
        <View style={styles.income}>
            <Text style={styles.text}>{item.category}</Text>
            <Text style={styles.text}>{((item.total/expenseData).toFixed(2)) * 100} %</Text>
        </View>
        }
      />
      <Modal
          transparent = {true}
          backdropColor={'green'}
          backdropOpacity= {1}
          visible = {CalenderModalVisible}
      >
        <View style = {styles.modal_container}>
          <View style={styles.modal}>
            <MonthSelectorCalendar
                onMonthTapped={(selectedDate) => {setMonth(selectedDate.month()+1); setYear(selectedDate.year());}}
            />
            <Text style = {styles.button} 
              onPress = {() => {
                fetchIncomeData();
                fetchSaving();
                fetchExpenseData();
                fetchIBData();
                fetchEBData();
                setCalenderModalVisible(false);}}>
              Go</Text>
          </View>
        </View>
      </Modal>
      
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    height: 170,
    backgroundColor: "#A0C4FF",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
    marginBottom: 10,
    elevation: 4,
  },
  body: {
    flex: 1, 
    backgroundColor:'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 4,
  },
  savingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 70,
    padding : 15,
  },
  title: {
    fontSize: 16, 
    color: '#000000', 
    fontWeight: 'bold'
  },
  text:{
      fontSize: 16,
      color: '#000000'
  },
  calendar: {
    padding: 5, 
    backgroundColor: "#A0C4FF", 
    alignItems: 'flex-end',
    borderRadius: 15,
  },
  income: {
    borderWidth: 2,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    borderColor: "#A0C4FF",
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    width: 350,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  budget: {
    borderWidth: 2,
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
    borderColor: "#A0C4FF",
    width: '90%',
  },
  progress: {
    height: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 50,
  },
  button:{
    textAlign: 'center',
    padding: 15,
    fontSize: 16,
  },
})