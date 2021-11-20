import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ongoing from './ongoing';
import overdue from './overdue';

const Stack = createStackNavigator();

export default function goal() {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name = "ongoing" component = {ongoing}/>
        <Stack.Screen options={{ headerShown: false }} name = "overdue" component = {overdue}/>
      </Stack.Navigator>
  );
}