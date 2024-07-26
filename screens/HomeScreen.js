import React, { useState, useEffect } from 'react';
import { View, Text, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DefaultView from '../components/DefaultView.js';
import Loading from '../components/Loading.js';
import { user_logged_in, firebase_logout, init_all_firebase } from '../components/Firebase/FirebaseConfig.js';
import GlobalStyles from '../styles/GlobalStyles.js';
import LoginScreen from '../components/LoginScreen.js';
import TeamSelectScreen from './TeamSelectScreen.js';
import SpecificTeamScreen from './SpecificTeamScreen.js';

export default function HomeScreen() {
    const [login, setLogin] = useState(false);
    const [team, setTeam] = useState('');
    const [inited, setInited] = useState(false);
    const [loading, setLoading] = useState(true);

    async function logout() {
        const logging_out = await firebase_logout();
        if (logging_out) setLogin(false);
    }

    useEffect(() => {
        async function init() {
            const res = await init_all_firebase();
            console.log("res: "+res);
            if (res) {
                setInited(true);
            }
        }
        init();
    }, []);

    useEffect(() => {
        async function check_login_state() {
            console.log("here");
            const Team = await user_logged_in();
            if (Team !== false) {
                setTeam(Team);
                setLogin(true);
            }
            setLoading(false);
        }
        check_login_state();
    }, [inited, login]);

    if (loading) return <Loading />
    else return (
        <DefaultView
            HeaderText = {"Home Screen"}
            Content = {
                <View style={{flex: 1}}>
                    {login ? (
                        <View style={{paddingTop: 10}}>
                            <Button
                                color='#93d6fa'
                                title="Log Out"
                                onPress={logout}
                            />
                            <Text style={GlobalStyles.BodyText}>You are logged in!</Text>
                            <Text style={GlobalStyles.BodyText}>Team: {team}</Text>
                            <View style={{paddingTop: 30}} />
                            <Text style={GlobalStyles.BodyText}>Proceed to selecting a team by pressing 'Select Team'!</Text>
                        </View>
                    ) : (
                        <View style={{flex: 1}}>
                            <Text style={GlobalStyles.BodyText}>You are not logged in yet!</Text>
                            <LoginScreen setLogin={setLogin} setLoading={setLoading}/>
                        </View>
                    )}
                </View>
            }
            ButtonLink = {login && "Team Selection"}
            ButtonText = {login && "Select Team"}
        />
    );
}

export function HomeScreenStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Home Screen"
                component={HomeScreen}
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
    );
}
