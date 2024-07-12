import React, { useState, useEffect } from 'react';
import { View, Text, Button} from 'react-native';
import DefaultView from '../components/DefaultView.js';
import Loading from '../components/Loading.js';
import { user_logged_in, firebase_logout, init_all_firebase } from '../components/Firebase/FirebaseConfig.js';
import GlobalStyles from '../styles/GlobalStyles.js';
import LoginScreen from './LoginScreen.js';

export default function HomeScreen({navigation}) {
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
                                title="Log Out"
                                onPress={logout}
                            />
                            <Text style={GlobalStyles.BodyText}>You are logged in!</Text>
                            <Text style={GlobalStyles.BodyText}>Team: {team}</Text>
                            <View style={{paddingTop: 30}} />
                            <Button
                                title="View All Requests"
                                onPress={ () => {navigation.navigate("Requests Screen")} }
                            />
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
