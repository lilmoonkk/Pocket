import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Authentication/SignUp';
import ResetPassword from './Authentication/ResetPassword';
import EditProfile from './Authentication/EditProfile';
import bottomNavigator from './bottomNavigator';
import Login from './Authentication/Login';
import ChangePassword from './Authentication/ChangePassword';
import Budget from './goal/Budget';
import ViewOngoing from './goal/view_ongoing';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="ForgetPassword" component={ResetPassword} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name="MainPage" component={bottomNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="Budget" component={Budget} />
        <Stack.Screen options={{ headerShown: false }} name="ViewOngoing" component={ViewOngoing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
