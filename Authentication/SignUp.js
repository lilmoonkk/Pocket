import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import {auth} from '../firebase'

const SignUp = () => {
  
  const [userid, setUID] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNo, setPhone] = useState('')
  const [Ic, setIc] = useState('')
  const navigation = useNavigation()
  	
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("MainPage", { userid: user.uid });
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    if(username == "" || phoneNo == "" || Ic == "")
    {
      window.alert("Must field must be filled!");
    }
    else{
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('registered with', user.email);

        //setUID(user.uid)

        //send data to backend
        fetch('http://192.168.0.9:19002/AddUser', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userid : user.uid,
            username : username,
            identitycardno : Ic,
            email : email,
            phoneno : phoneNo    
          })
        }).then(response=>response.json()).then(data=>{
             window.alert(data)
             console.log(' with', user.email);
             //Do anything else like Toast etc.
        })
      })
      .catch(error => alert(error.message))
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >

      <View style={styles.LogoContainer}>

      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.header}
        >
          <Text style={styles.headerText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.replace('Login')}
          style={styles.headerOutline}
        >
          <Text style={styles.headerText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer} >
        <ScrollView>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Identity Card No."
          value={Ic}
          onChangeText={text => setIc(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Phone No."
          value={phoneNo}
          onChangeText={text => setPhone(text)}
          style={styles.input}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </ScrollView>
          
      </View>
  </KeyboardAvoidingView>
    )
}

export default SignUp

const styles = StyleSheet.create({

container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

LogoContainer:{
  marginTop: 50,
  height: 150,
},
inputContainer: {
    width: '80%',
},
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    textAlign: 'center',
},
headerContainer: {
    width: '60%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50,
},
headerOutline: {
    backgroundColor: '#DCF4F5',
    width: '82%',
    padding: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
},
header: {
    backgroundColor: 'rgba(172, 224, 221, 0.6)',
    width: '82%',
    padding: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
},
headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
},

button: {
    backgroundColor: 'rgba(172, 224, 221, 0.6)',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
},
buttonText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
} 
})
