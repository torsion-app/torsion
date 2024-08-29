import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { HomeScreenStack } from './screens/HomeScreen.js';
import RequestsScreen from './screens/RequestsScreen.js';
import { ChatScreenStack } from './screens/ChatScreen.js';
import { user_logged_in } from './components/Firebase/FirebaseConfig.js';

const Tab = createBottomTabNavigator();

export default function App() {
    const [checkLogin, setCheckLogin] = useState(0);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        async function check_login_state() {
            const Team = await user_logged_in();
            if (Team !== false) setLogin(true);
            else setLogin(false);
        }
        check_login_state();
    }, [checkLogin]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCheckLogin(value => value+1);
            console.log("App");
        }, 1500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <NavigationContainer theme={DarkTheme}>
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
                {login &&
                    <>
                        <Tab.Screen
                            name="Requests"
                            component={RequestsScreen}
                        />
                        <Tab.Screen
                            name="Messages"
                            component={ChatScreenStack}
                        />
                    </>
                }
            </Tab.Navigator>
        </NavigationContainer>
    );
}
