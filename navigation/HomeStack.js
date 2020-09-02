import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Main from '../screens/Main';
import StartTimer from '../screens/StartTimer';
import RestTimer from '../screens/RestTimer';
import temp from '../screens/temp';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={Main}
            options={{
                title: 'Workout Timer',
                headerStyle: {
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#E1B4ED',
                },
                headerTitleAlign: 'center'
            }} />
            <Stack.Screen 
            name="Start" 
            component={StartTimer} 
            options={{ headerShown: false }} />
            <Stack.Screen 
            name="Rest" 
            component={RestTimer} 
            options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default HomeStack;
