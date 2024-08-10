import React, { } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import { HomeScreenStack } from './screens/HomeScreen.js';
import RequestsScreen from './screens/RequestsScreen.js';
import { ChatScreenStack } from './screens/ChatScreen.js';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused
                            ? "home"
                            : "home-outline"
                    } else if (route.name === "Requests") {
                        iconName = focused 
                            ? "list"
                            : "list-outline";
                    } else if (route.name === "Messages") {
                        iconName = focused 
                            ? "chatbubbles"
                            : "chatbubbles-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                })}
            >
                <Tab.Screen 
                    name="Home"
                    component={HomeScreenStack}
                />
                <Tab.Screen
                    name="Requests"
                    component={RequestsScreen}
                />
                <Tab.Screen
                    name="Messages"
                    component={ChatScreenStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
