import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/core';
import { auth, emailcred } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { globalStyles } from '../styles/global'; 

const EditProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {userid} = route.params;
    const [UpdateProfileModalVisible, setUPModalVisible] = useState(false);
    const [userData, setUserData] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState('');
    const [phoneNo, setPhone] = useState("");
    const [fs, setFixedSpending] = useState("");
    const [password, setPassword] = useState('');

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("SignUp")
          })
          .catch(error => alert(error.message))
    }

    useEffect(() => {
        fetchUserData();
      }, [])

    const fetchUserData = async()=>{
        const response = await fetch('http://192.168.43.89:19002/GetProfile?userid=' + userid);
        const profile = await response.json();
        setUserData(profile[0]);
        setUsername(profile[0].username);
        setEmail(profile[0].email);
        setPhone(profile[0].phoneno);
        setFixedSpending(profile[0].fixedspending.toString());
        console.log(fs);
    }

    const changeEmail = (newEmail, password) => {
        const user = auth.currentUser;
        const currentPassword = password;
        const email = user.email;
        
        if (email != newEmail){
            const cred = emailcred.EmailAuthProvider.credential(email, currentPassword );
            user.reauthenticateWithCredential(cred)
            .then(()=>{
                user.updateEmail(newEmail)
                .then(() => {
                    alert("Email updated! Please Login Again using the New Email");
                    handleSignOut();
                })
                .catch((error) => { console.log(error); });})
            .catch((error) => { console.log(error); });
        }
    }

    const UpdateProfile = () => {
        if(username == "" || email == "" || phoneNo == "")
        {
          window.alert("All field must be filled!");
        }
        else if(username == userData.username && email == userData.email 
            && phoneNo == userData.phoneno && fs == userData.fixedspending){
            alert('No Update is Done!');
        }
        else
        {
            if(password == ""){
                alert('Password is required to Update Profile')
            }
            else{
                //send data to backend
                fetch('http://192.168.43.89:19002/UpdateProfile', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userid : userid,
                    username : username,
                    email : email,
                    phoneno : phoneNo,
                    fixedspending : fs
                })
                }).then(response=>response.json()).then(data=>{
                    window.alert(data)
                })
            .catch(error => alert(error.message))
            }
            
        }
    }

    return (
        <View style = {{flex: 1}}>
            <View style = {styles.headerContainer}></View>
            <View style = {styles.background}>
                <Text style = {styles.header}> Profile </Text>
                    
                <SafeAreaView style = {styles.body}>
                    <TouchableOpacity
                        style = {{alignSelf: 'flex-end', padding: 15,}}
                        onPress = {() => {
                            setUPModalVisible(true);}}>
                            <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>

                    <View style = {styles.detailsContainer}>
                        <Text style = {styles.label}>Username</Text>
                        <Text style = {styles. details}>{userData.username}</Text>
                    </View>   
                    <View style = {styles.detailsContainer}>
                        <Text style = {styles.label}>Identity Card No.</Text>
                        <Text style = {styles. details}>{userData.identitycardno}</Text>
                    </View> 
                    <View style = {styles.detailsContainer}>
                        <Text style = {styles.label}>Email Address</Text>
                        <Text style = {styles. details}>{userData.email}</Text>
                    </View> 
                    <View style = {styles.detailsContainer}>
                        <Text style = {styles.label}>Phone No.</Text>
                        <Text style = {styles. details}>{userData.phoneno}</Text>
                    </View> 
                    <View style = {styles.detailsContainer}>
                        <Text style = {styles.label}>Fixed Spending/Month (RM)</Text>
                        <Text style = {styles. details}>RM {parseFloat(userData.fixedspending).toFixed(2)}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {() => navigation.navigate("ChangePassword", { userid: userid })}>
                            <Text style = {styles.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {handleSignOut}>
                            <Text style = {styles.buttonText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        transparent = {true}
                        visible = {UpdateProfileModalVisible}
                        onRequestClose = {() => {

                        }}>
                        <View style = {{flex: 1, justifyContent: 'center',alignItems: 'center',}}>
                            <View style = {styles.modal}>
                                <Text style = {globalStyles.modal_label}>Update Profile</Text>
                                <Text style = {globalStyles.label}>Username</Text>
                                <TextInput 
                                    style = {globalStyles.input} 
                                    value = {username}
                                    onChangeText = {setUsername}/>
                                <Text style = {globalStyles.label}>Email Address</Text>
                                <TextInput 
                                    style = {globalStyles.input} 
                                    value = {email}
                                    onChangeText = {setEmail}/>
                                <Text style = {globalStyles.label}>Phone No.</Text>
                                <TextInput 
                                    style = {globalStyles.input} 
                                    value = {phoneNo}
                                    onChangeText = {setPhone}/>
                                <Text style = {globalStyles.label}>Fixed Spending/Month (RM)</Text>
                                <TextInput 
                                    style = {globalStyles.input} 
                                    value = {fs}
                                    keyboardType = 'numeric'
                                    onChangeText = {setFixedSpending}/>
                                <Text style = {globalStyles.label}>Enter Password to Update Profile:</Text>
                                <TextInput 
                                    style = {globalStyles.input} 
                                    onChangeText = {setPassword}
                                    secureTextEntry/>

                                <View style ={globalStyles.buttonContainer}>
                                    <Text 
                                        style = {globalStyles.button} 
                                        onPress = {() => {
                                            UpdateProfile();
                                            changeEmail(email, password);
                                            fetchUserData();
                                            setUPModalVisible(false);
                                        }}>SAVE</Text>
                                    
                                    <Text 
                                        style = {globalStyles.button}
                                        onPress = {() => {
                                        setUPModalVisible(false);
                                    }}>CLOSE</Text>
                                </View>
                            </View>
                        </View>
                        
                    </Modal>
                </SafeAreaView>
            </View>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    headerContainer: {
        height: 170,
        marginTop: 40,
        backgroundColor: "#FFADAD",
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
    body: {
        flex: 1,
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    header: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    detailsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
        paddingTop: 15,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '95%',
        marginTop: 10,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        borderRadius: 15,
        padding: 10,
        height: 50,
        alignItems: 'center',
        borderColor: "#FFADAD",
        borderWidth: 2,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modal: {
        width: 320,
        height: 450,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "flex-start",
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 3},
        shadowRadius: 4,
        elevation: 5
    },
    modal_label:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 5,
    }, 
})
