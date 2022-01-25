import React, {useEffect, useState} from 'react'
import { ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {auth} from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const SignUp = () => {
    const topTab = createMaterialTopTabNavigator();

    return (
        <View style={{flex: 1}}>
            <View style={styles.LogoContainer}>
                <Image style = {styles.image} source={require('../assets/logo.png')}></Image>
            </View>
            <View style={styles.tabContainer}>
                <topTab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: 'black',
                        tabBarIndicatorStyle: {
                            borderColor: "#8FCACA",
                            borderWidth: 1.5,
                        },
                        tabBarLabelStyle: {
                            fontSize: 18,
                            fontWeight: 'bold',
                        },
                        tabBarItemStyle:{
                            borderLeftWidth: 1,
                            borderColor: "#8FCACA",
                        },
                        tabBarStyle: {
                        elevation: 4,
                        borderRadius: 15,
                        backgroundColor: "#D4F0F0",
                        height: 50,
                    }}}>
                    <topTab.Screen name="Login" component={login} />
                    <topTab.Screen name="Sign Up" component={signUp} />
                </topTab.Navigator>
            </View>
        </View>
    )
}

function login (){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("MainPage", { userid: user.uid });
          }
        })
        return unsubscribe
    }, [])

    function handleLogin() {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                alert('Logged in with:' + '\n ' + email)
            })
            .catch(error => alert(error.message))
    }

    return(
        <View style={styles.bodyContainer} >
            <View style={styles.body}>
                <View style = {styles.inputContainer}>
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
                </View >
                
                <View style = {styles.inputContainer}>
                    <MaterialCommunityIcons 
                        style = {styles.icon} 
                        name="account-lock" 
                        size={40} color="black" />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        keyboardType='numeric'
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                
                <Text 
                    style = {styles.forget}
                    onPress={() => navigation.replace('ForgetPassword')}>
                    Forget Password?</Text>
            </View>
            
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>    
            
        </View>
    );
}

function signUp(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [phoneNo, setPhone] = useState('')
    const [Ic, setIc] = useState('')
    const [fs, setFixedSpending] = useState('')
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
        if(username == "" || phoneNo == "" || Ic == "" || password == "" || fs == ""){
            window.alert("All fields must be filled!");
        }
        else if(password < 8){
            window.alert("Password must be at least 8 characters");
        }
        else{
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            window.alert('Successfully Registered with' + ('\n') + email);
            //send data to backend
            fetch('http://192.168.43.89:19002/AddUser', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                userid : user.uid,
                username : username,
                identitycardno : Ic,
                email : email,
                phoneno : phoneNo,
                fixedspending: fs    
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
        <View style={styles.bodyContainer}>
            <ScrollView 
                persistentScrollbar = {true}
                style = {{width: '90%',
                        marginLeft: 10, marginTop: 10, marginBottom: 50,}}>
                <View style = {styles.inputContainer}>
                    <FontAwesome
                        style = {styles.icon}  
                        name="user" 
                        size={40} color="black" />
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={styles.input}
                    />
                </View>

                <View style = {styles.inputContainer}>
                    <FontAwesome
                        style = {styles.icon}  
                        name="id-card" 
                        size={36} color="black" />
                    <TextInput
                        placeholder="Identity Card No."
                        value={Ic}
                        keyboardType='numeric'
                        onChangeText={text => setIc(text)}
                        style={styles.input}
                    />
                </View>
                
                <View style = {styles.inputContainer}>
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
                
                <View style = {styles.inputContainer}>
                    <MaterialCommunityIcons 
                        style = {styles.icon} 
                        name="account-lock" 
                        size={40} color="black" />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style = {styles.inputContainer}>
                    <FontAwesome
                        style = {styles.icon}  
                        name="phone-square" 
                        size={40} color="black" />
                    <TextInput
                        placeholder="Phone No."
                        value={phoneNo}
                        keyboardType='phone-pad'
                        onChangeText={text => setPhone(text)}
                        style={styles.input}
                    />
                </View>

                <View style = {styles.inputContainer}>
                    <FontAwesome
                        style = {styles.icon}  
                        name="dollar" 
                        size={40} color="black" />
                    <TextInput
                        placeholder="Fixed Spending/Month (RM)"
                        value={fs}
                        keyboardType='numeric'
                        onChangeText={text => setFixedSpending(text)}
                        style={styles.input}
                    />
                </View>        
            </ScrollView>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity> 
            </View>
            
        </View>
    );
}

export default SignUp

const styles = StyleSheet.create({
    LogoContainer: {
        marginTop: 40,
        height: '30%',
        alignContent: 'center',
    },
    tabContainer: {
        flex: 1,
        borderRadius: 15,
        elevation: 4,
        backgroundColor: 'white',
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    body: {
        flex : 1, 
        justifyContent: 'center',
        marginTop: 30, 
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        width: '70%',
        borderBottomColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        fontSize: 16,
    },
    icon: { 
        alignSelf: 'flex-end',
        marginRight: 10,
        marginLeft: 10,
        width: 50,
    },
    forget: {
        marginTop: 10, 
        fontSize: 18, 
        alignSelf: 'flex-start',
        marginStart: 10,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '95%',
        marginTop: 10,
        marginBottom: 20,
    },
    button: {
        borderWidth: 2,
        borderColor: "#8FCACA",
        borderRadius: 15,
        padding: 10,
        height: 50,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    } 
})
