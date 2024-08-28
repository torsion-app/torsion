import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import authenticate_firebase, { } from './Firebase/FirebaseConfig.js';
import DefaultView from "./DefaultView.js";
import GlobalStyles from "../styles/GlobalStyles.js";
import DefaultButton from "./DefaultButton.js";

export default function LoginScreen({setLogin, setLoading}) {
    const [email, setEmail] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [invalid, setInvalid] = useState(false);
    const [buttonPress, setButtonPress] = useState(false);

    useEffect(() => {
        async function authenticate() {
            if (email && pwd && buttonPress) {
                setLoading(true);
                const uid = await authenticate_firebase(email, pwd);
                if (uid !== false) {
                    setLogin(true);
                } else {
                    setInvalid(true);
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
                    <View style={{margin: -20}} />
                    <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
                        { invalid ?
                            "Incorrect Email and/or Password!"
                            :
                            "You are not logged in yet!"
                        }
                    </Text>
                    <View style={{padding: 25}} />
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
                        <DefaultButton
                            text={"Login!"}
                            touched={() => setButtonPress(true)}
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
