import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainPage from './MainPage';
import EditProfile from './Authentication/EditProfile';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default function bottomNavigator() {
    const route = useRoute();
    const {userid} = route.params;
    return (
        <Tab.Navigator
        initialRouteName="Main"
        activeColor="#e91e63"
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: 'tomato' }}
        >
        <Tab.Screen
            name="Main"
            component={MainPage}
            initialParams={{userid: userid}}
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={EditProfile}
            options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            }}
        />
        </Tab.Navigator>
    );
}