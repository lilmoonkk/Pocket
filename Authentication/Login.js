import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import {auth} from '../firebase'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("Goal", { userid: user.uid });
          }
        })

        return unsubscribe
    }, [])

    function handleLogin() {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log('Logged in with:', user.email)
            })
            .catch(error => alert(error.message))
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
                    onPress={() => navigation.replace('SignUp')}
                    style={styles.headerOutline}
                >
                    <Text style={styles.headerOutlineText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.header}
                >
                    <Text style={styles.headerText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer} >
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

                <Text 
                    onPress={() => navigation.replace('ForgetPassword')}>
                    Forget Password?</Text>
                
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

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
    },
    headerContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:60,
    },
    headerOutline: {
        backgroundColor: '#DCF4F5',
        width: '82%',
        padding: 15,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
    },
    header: {
        backgroundColor: 'rgba(172, 224, 221, 0.6)',
        width: '82%',
        padding: 15,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
    },
    headerText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },
    headerOutlineText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,
    },  
    button: {
        backgroundColor: 'rgba(172, 224, 221, 0.6)',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginTop: 60,
        alignItems: 'center',
    },
    buttonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    } 
})
