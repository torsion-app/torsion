import { View, TextInput, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import authenticate_firebase, { } from './Firebase/FirebaseConfig.js';
import DefaultView from "./DefaultView.js";
import GlobalStyles from "../styles/GlobalStyles.js";

export default function LoginScreen({setLogin, setLoading}) {
    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [buttonPress, setButtonPress] = useState(false);

    useEffect(() => {
        async function authenticate() {
            if (email && pwd && buttonPress) {
                setLoading(true);
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
            Content={
                <View style={styles.container}>
                    <TextInput
                        selectionColor={'white'}
                        autoComplete={'email'}
                        style={GlobalStyles.textInput}
                        placeholder='Email'
                        placeholderTextColor='white'
                        onChangeText={input => setEmail(input)}
                    />
                    <TextInput
                        selectionColor={'white'}
                        autoComplete={'current-password'}
                        style={GlobalStyles.textInput}
                        placeholder='Password'
                        placeholderTextColor='white'
                        onChangeText={input => setPwd(input)}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Submit!"
                            onPress={() => setButtonPress(true)}
                            color='#93d6fa'
                        />
                    </View>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
    },
    buttonContainer: {
        flexDirection: 'column',
        position: 'relative',
        marginTop: 0,
    },
});
