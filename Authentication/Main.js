import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import {auth} from '../firebase'

const Main = () => {

    const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

    return (
        <View>
          <Text>Main Page</Text>
          <Text
          onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Text>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign out</Text>           
          </TouchableOpacity>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
})
