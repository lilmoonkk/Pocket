import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    function sendResetEmail() {
      if (email == ''){
        alert("Please enter email!")
      }
      auth
          .sendPasswordResetEmail(email)
          .catch(error => alert(error.message))
    }

    return (
      <View style = {{flex: 1}}>
        <View style = {styles.headerContainer}></View>
        <View style = {styles.background}>
          <Text style={styles.header}>Forgot {'\n'} Password ?</Text>
          <View style = {styles.body}>
            <Text style={styles.description}>
              Please Enter Your Registered Email Address{'\n'}
              We will send  a verification code to your registered email.
            </Text>
            <View style = {{flexDirection: 'row'}}>
              <MaterialCommunityIcons 
                style = {styles.icon} 
                name="email" 
                size={40} color="black" />
              <TextInput
                placeholder="Email"
                value={email}
                autoComplete='email'
                keyboardType='email-address'
                onChangeText={text => setEmail(text)}
                style={styles.input}
              />
            </View>
            <View style = {styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={sendResetEmail}
                style={styles.button}
              >
                  <Text style={styles.buttonText}>SEND EMAIL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.replace('SignUp')}
                style={styles.button}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    headerContainer: {
      marginTop: 40,
      height: 170,
      backgroundColor: "#FFCFD7",
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      shadowColor: 'black',
      shadowOpacity: 1,
      shadowOffset: {width: 1, height: 3},
      elevation: 4,
    },
    background: {
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
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
    },
    body: {
      flex: 1,
      marginTop: 10,
      backgroundColor: 'white',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    description: {
        fontSize: 14,
        lineHeight: 18,
        alignSelf: 'center',
        padding: 10,
        textAlign: 'center',
        marginTop: 10,
        color: 'black',
    },
    input: {
        width:'70%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginTop: 80,
        alignSelf: 'center',
        fontSize: 16,
    },
    icon: { 
      alignSelf: 'flex-end',
      marginRight: 10,
      marginLeft: 10,
      width: 50,
    },
    buttonContainer:{
      alignItems: 'center',
      marginTop: 120,
    },
    button: {
        width: '90%',
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#FFCFD7",
    },
    buttonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
