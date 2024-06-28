import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import DefaultView from '../components/DefaultView.js';
import authenticate_firebase from '../components/Firebase/FirebaseConfig.js';

export default function HomeScreen() {
    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (email && pwd) {
            console.log(authenticate_firebase(email, pwd));
            if (authenticate_firebase(email, pwd) != false) setLogin(true);
        }
    }, [email, pwd]);

    return (
        <DefaultView
            HeaderText = {"Home Screen"}
            Content = {
                <View>
                    <TextInput
                        placeholder='email'
                        onChangeText={input => setEmail(input)}
                    />
                    <TextInput
                        placeholder='pwd'
                        onChangeText={input => setPwd(input)}
                        secureTextEntry={true}
                    />
                    {login &&
                        <Text>yaaay</Text>
                    }
                </View>
            }
            ButtonLink = {"Team Selection"}
            ButtonText = {"Select Team"}
        />
    );
}
