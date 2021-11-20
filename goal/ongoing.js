import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import view_ongoing from './view_ongoing';
import edit_ongoing from './edit_ongoing';

const Stack = createStackNavigator();

export default function goal() {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name = "view_ongoing" component = {view_ongoing}/>
        <Stack.Screen options={{ headerShown: false }} name = "edit_ongoing" component = {edit_ongoing}/>
      </Stack.Navigator>
  );
}