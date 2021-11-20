import React from 'react'
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'

const EditProfile = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    Edit Profile 
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Personal Details</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.headerOutline}
                    >
                        <Text style={styles.title}>Edit</Text>
                    </TouchableOpacity>
                </View>
                

                <Text style={styles.details}>Username</Text>
                <Text style={styles.details}>Identity Card No.</Text>
                <Text style={styles.details}>Email Address</Text>
                <Text style={styles.details}>Phone No.</Text>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={[styles.titleContainer, styles.title]}>Login</Text>
                <Text
                    onPress={() => navigation.navigate('ChangePassword')}
                    style={styles.details}>
                        Change Password</Text>
            </View>

        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        padding: 15,
        backgroundColor: 'rgba(178, 233, 241, 0.82)',
    },
    header: {
        left: 60,
        fontWeight: 'bold',
        fontSize: 16,
    },
    detailsContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 50,
        backgroundColor: 'rgba(244, 255, 249, 0.7)',
        
        shadowColor: "black",
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 5,
    },
    titleContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'rgba(203, 243, 240, 0.8)',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    details: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
        overflow: 'hidden',
    },
})
