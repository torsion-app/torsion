import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DefaultView from '../components/DefaultView.js';
import { user_logged_in, firebase_logout } from '../components/Firebase/FirebaseConfig.js';
import GlobalStyles from '../styles/GlobalStyles.js';

export default function HomeScreen({navigation}) {
    const [login, setLogin] = useState(false);
    const [team, setTeam] = useState('');

    async function logout() {
        const logging_out = await firebase_logout();
        if (logging_out) setLogin(false);
    }

    useFocusEffect(
        useCallback(() => {
            async function check_login_state() {
                const Team = await user_logged_in();
                if (Team !== false) {
                    setTeam(Team);
                    setLogin(true);
                }
            }
            check_login_state();
        }, [])
    );

    return (
        <DefaultView
            HeaderText = {"Home Screen"}
            Content = {
                <View>
                    {login ? (
                        <View style={{
                            paddingTop: 10,
                        }}>
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
                        <Text style={GlobalStyles.BodyText}>You are not logged in yet!</Text>
                    )}
                </View>
            }
            ButtonLink = {login ? "Team Selection" : "Login Page"}
            ButtonText = {login ? "Select Team" : "Login"}
        />
    );
}
