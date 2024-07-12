import { View, TextInput, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import authenticate_firebase, { } from './components/Firebase/FirebaseConfig.js';
import DefaultView from "./DefaultView.js";

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
                        style={styles.textInput}
                        placeholder='Email'
                        onChangeText={input => setEmail(input)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        onChangeText={input => setPwd(input)}
                        secureTextEntry={true}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Submit!"
                            onPress={() => setButtonPress(true)}
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
    textInput: {
        paddingLeft: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 35,
        marginTop: -15,
        fontSize: 18,
        height: 50,
        borderColor: "black",
        borderWidth: 1.15,
        borderRadius: 20,
    },
    buttonContainer: {
        flexDirection: 'column',
        position: 'relative',
        marginTop: 0,
    },
});
