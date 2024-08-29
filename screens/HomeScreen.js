import React, { useState, useEffect } from 'react';
import { View, Text, Button, Pressable} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DefaultView from '../components/DefaultView.js';
import Loading from '../components/Loading.js';
import { user_logged_in, firebase_logout, init_all_firebase, firebase_auth, fetch_uid_team } from '../components/Firebase/FirebaseConfig.js';
import GlobalStyles from '../styles/GlobalStyles.js';
import LoginScreen from '../components/LoginScreen.js';
import TeamSelectScreen from './TeamSelectScreen.js';
import SpecificTeamScreen from './SpecificTeamScreen.js';
import { onAuthStateChanged } from 'firebase/auth';

export default function HomeScreen() {
    const [login, setLogin] = useState(false);
    const [team, setTeam] = useState('');
    const [inited, setInited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [checkLogin, setCheckLogin] = useState(true);

    useEffect(() => {
        if (firebase_auth !== null) {
            onAuthStateChanged(firebase_auth, (user) => {
                async function set_things() {
                    if (user) {
                        setTeam(await fetch_uid_team());
                        setInited(true);
                        setLogin(true);
                        setLoading(false);
                    }
                }
                set_things();
            });
        }
    }, [team]);

    useEffect(() => {
        async function init() {
            const res = await init_all_firebase();
            if (res) {
                setInited(true);
            }
        }
        init();
    }, []);

    useEffect(() => {
        async function check_login_state() {
            const Team = await user_logged_in();
            if (Team !== false) {
                setTeam(Team);
                setLogin(true);
            } else {
                setTeam('');
                setLogin(false);
            }
            setLoading(false);
        }
        if (inited) check_login_state();
    }, [inited, login, checkLogin]);

    useEffect(() => {
        if (!login) {
            const intervalId = setInterval(() => {
                setCheckLogin(value => value+1);
                console.log("home");
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, []);

    if (loading) return <Loading />
    else return (
        <DefaultView
            HeaderText = {"Home Screen"}
            logout = {login && true}
            setLogin = {setLogin}
            Content = {
                <View style={{flex: 1}}>
                    {login ? (
                        <View style={{paddingTop: 30}}>
                            <View style={{backgroundColor: '#0a84ff', alignItems: 'center', justifyContent: 'center', marginHorizontal:20, borderRadius: 20}}>
                                <Text style={{fontSize: 20, color: 'white', paddingTop: 15, paddingBottom: 5}}>You are logged in!</Text>
                                <Text style={{fontSize: 20, color: 'white', paddingBottom: 15}}>Team: {team}</Text>
                            </View>
                            <View style={{paddingTop: 30}} />
                            <Text style={GlobalStyles.BodyText}>Proceed to selecting a team by pressing 'Select Team'!</Text>
                        </View>
                    ) : (
                        <View style={{flex: 1}}>
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
