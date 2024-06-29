import { View, TextInput, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import authenticate_firebase, { } from '../components/Firebase/FirebaseConfig.js';
import DefaultView from "../components/DefaultView.js";

export default function LoginScreen() {
    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [buttonPress, setButtonPress] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        async function authenticate() {
            if (email && pwd && buttonPress) {
                const uid = await authenticate_firebase(email, pwd);
                if (uid !== false) {
                    setLogin(true);
                }
            }
            if (buttonPress) setButtonPress(false);
        }
        authenticate();
    }, [buttonPress]);

    return (
        <DefaultView
            HeaderText={"Login"}
            Content={
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
                    <Button
                        title="login"
                        onPress={() => setButtonPress(true)}
                    />
                {login &&
                    <Text>Logged in!</Text>
                }
                </View>
            }
            ButtonLink={"Home"}
            ButtonText={"Home"}
        />
    );
}
