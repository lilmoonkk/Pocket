import React from 'react'
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native'

const ChangePassword = () => {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>

            <View style={styles.container}>
                <TextInput
                    placeholder="Old Password"
                    style={styles.input}
                />

                <TextInput
                    placeholder="New Password"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Confirm New Password"
                    style={styles.input}
                />

            </View>

            <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.button}
                    
            >
                <Text style={styles.buttonText}>UPDATE PASSWORD</Text>
            </TouchableOpacity>

            <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.replace('EditProfile')}
                    style={styles.button2}
            >
                <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    input: {
        width:'80%',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(140, 225, 229, 0.8)',
    },
    button2: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'rgba(140, 225, 229, 0.5)',
    },
    buttonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
