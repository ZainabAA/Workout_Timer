import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import HomeStack from './HomeStack';

const Route = () => {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    );
};

export default Route;
