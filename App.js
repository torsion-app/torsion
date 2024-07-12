import React, { } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import TeamSelectScreen from './screens/TeamSelectScreen.js';
import SpecificTeamScreen from './screens/SpecificTeamScreen.js';
import RequestsScreen from './screens/RequestsScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Requests Screen"
                    component={RequestsScreen}
                />
                <Stack.Screen
                    name="Team Selection"
                    component={TeamSelectScreen}
                />
                <Stack.Screen
                    name="Team Info"
                    component={SpecificTeamScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
