import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainPage from './MainPage';
import EditProfile from './Authentication/EditProfile';
import Budget from './goal/Budget';
import Report from './goal/report';
import Goal from './goal/goal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createMaterialBottomTabNavigator();

export default function bottomNavigator() {
    const route = useRoute();
    const {userid} = route.params;
    return (
        <Tab.Navigator
            initialRouteName = "Main"
            activeColor = 'black'
            labelStyle = {{ fontSize: 12, borderWidth:1, borderRadius: 15,}}
            barStyle = {{ backgroundColor: 'white', }}
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
                name="Budget"
                component={Budget}
                initialParams={{userid: userid}}
                options={{
                tabBarLabel: 'Budget',
                tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="file-invoice-dollar" size={24} color="black" />
                ),
                }}
            />

            <Tab.Screen
                name="Goal"
                component={Goal}
                initialParams={{userid: userid}}
                options={{
                tabBarLabel: 'Goal',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="event-note" color={color} size={26} />
                ),
                }}
            />

            <Tab.Screen
                name="Report"
                component={Report}
                initialParams={{userid: userid}}
                options={{
                tabBarLabel: 'Goal',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="event-note" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={EditProfile}
                initialParams={{userid: userid}}
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