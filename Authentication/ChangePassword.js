import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core';
import { auth, emailcred } from '../firebase';

const ChangePassword = () => {

    const [currentPass, setCurrentPassword] = useState('')
    const [newPass, setNewPassword] = useState('')
    const [matchPass, setMatchPassword] = useState('')
    const navigation = useNavigation()
    const route = useRoute();
    const {userid} = route.params;
    

    const updatePassword = (currentPassword, newPassword, matchPassword) => {
        const oldP = currentPassword;
        const newP = newPassword;
        const matchP = matchPassword;
        const user = auth.currentUser;
        if(oldP == '' || newP == '' || matchP ==''){
            alert("All fields must be filled!")
        }
        else if( matchP == newP){
            const email = user.email;
            const cred = emailcred.EmailAuthProvider.credential(email, oldP );
            user.reauthenticateWithCredential(cred)
            .then(() => {
                user.updatePassword(newP)
                .then(() => {
                    alert("Password Updated!");
                    navigation.navigate('MainPage', {userid: userid});
                }).catch((error) => { alert(error); });
            }).catch(error => alert(error.message));
            
        }
        else{
            alert('The New Password and Confirm Password Are Not Match!');
        }
    };

    return (
        <SafeAreaView style={{flex: 1,}}>
            <View style = {styles.headerContainer}></View>
            <View style = {styles.background}>
                <Text style = {styles.header}>Change {'\n'} Password</Text>
                <View style = {styles.body}>
                    <View style = {{flex: 1, justifyContent: 'center'}}>
                        <TextInput
                            placeholder="Old Password"
                            style={styles.input}
                            onChangeText={setCurrentPassword}
                            secureTextEntry
                        />

                        <TextInput
                            placeholder="New Password"
                            style={styles.input}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />

                        <TextInput
                            placeholder="Confirm New Password"
                            style={styles.input}
                            onChangeText={setMatchPassword}
                            secureTextEntry
                        /> 
                    </View>
                    

                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress = {() =>updatePassword(currentPass, newPass, matchPass)}
                        >   
                            <Text style={styles.buttonText}>UPDATE PASSWORD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                                onPress={() => navigation.navigate('MainPage', {userid: userid})}
                                style={styles.button}
                        >
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    headerContainer: {
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
    background: {
        flex: 1,
        marginTop: -160,
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
        marginTop: 15,
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: 'center',
    },
    input: {
        width:'80%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        alignSelf: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginTop: 70,
        width: '90%',
    },
    button: {
        borderWidth: 2,
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        alignItems: 'center',
        borderColor: "#A0C4FF"
    },
    buttonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
