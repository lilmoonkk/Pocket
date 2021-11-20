import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import goal from './goal';

const Stack = createStackNavigator();


function main_report({navigation})
{
    const onPressHandler = () =>
    {
        navigation.navigate('goal');
    }
    return (
        <View style = {styles.body}>
            <Text style = {styles.text}>
                Report
            </Text>
            <Button onPress={onPressHandler}
                    title="Goal"
                    color="rgba(0, 178, 202, 0.33)"
            />
        </View>
    )
}


export default function report()
{
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name = 'main_report' component = {main_report}/>
            <Stack.Screen name = 'goal' component = {goal}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    body: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 24,
        lineHeight: 24,
        color: '#000000'
    }
})