import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      data : []
    }
  }

  fetchData = async()=>{
    const response = await fetch('http://192.168.0.5:19002/people');
    const users = await response.json();
    this.setState({data: users});
    //console.log("Connect");
    console.log(JSON.stringify(this.state.data))
  }
  /*
  connect = () => {
    const URL = "http://192.168.0.5:19000/people";
    try{
    fetch(URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, ',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      
    }).then(response => {
      //console.log(JSON.stringify(response));
      const users = response.text();
      this.setState({data : users});
      console.log(JSON.stringify(response));
    })
    }
    catch(Exception){
      console.log(Exception);
    }
  };*/

  componentDidMount(){
    this.fetchData();
    console.log("Fetched");
  }

  
  
  render(){

    const Item = ({ name }) => (
      <View>
        <Text>{name}</Text>
      </View>
    );
  
   
  
    renderItem = ({ item }) => (
      <Item title={item.name} />
    );
  
  return (
    <View style={styles.container}>
      <Text>Help Pocket</Text>
      <Text>data.name</Text>
      <FlatList
        data={this.state.data}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) =>

       <View style={{backgroundColor:'#abc123',padding:10,margin:10}}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>{item.name}</Text>
          <Text style={{color:'#fff'}}>{item.age}</Text>
  
         </View>

       }
        
      />
      <StatusBar style="auto" />
    </View>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
