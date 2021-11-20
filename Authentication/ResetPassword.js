import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'

const ResetPassword = () => {

    const [email, setEmail] = useState('')

    const navigation = useNavigation()

    function sendResetEmail() {
        auth
            .sendPasswordResetEmail(email)
            .catch(error => alert(error.message))
    }

    return (
        
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Forgot {'\n'}Password ?</Text>
            </View>

            <Text style={styles.description}>
                    Please Enter Your Registered Email Address{'\n'}
                    We will send  a verification code to your registered email.
                </Text>

            <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
            />

            <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={sendResetEmail}
                    style={styles.button}
                    
            >
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.replace('Login')}
                    style={styles.button2}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: 'black',
        backgroundColor: 'rgba(249, 229, 232, 1)',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        width: '100%',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
    },
    description: {
        fontWeight: 'bold',
        fontSize: 11,
        lineHeight:18,
        alignItems: 'center',
        left: 6,
    },
    input: {
        width:'80%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 60,
        marginBottom: 50,
    },
    button: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 207, 215, 1)',
    },
    button2: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 211, 218, 0.58)',
    },
    buttonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    }

})
