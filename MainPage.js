import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';


export default function MainPage() {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, John!</Text>
        <Text style={styles.welcome}>Welcome back.</Text>
        <StatusBar style="auto" />
      </View>
      <View style={{paddingLeft: 30}}>
        <Text>Income</Text>
        <Text>RM 200.00</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#FFD6A5",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  greeting: {
    paddingTop: 100,
    paddingLeft: 30,
    //fontFamily: "PaytoneOne",
    fontSize: 30,
    fontWeight: 'bold'
  },

  welcome: {
    paddingLeft: 30,
    //fontFamily: "Paytone One"
    fontSize: 25
  }
});