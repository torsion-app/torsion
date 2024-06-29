import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import authenticate_firebase, { } from '../components/Firebase/FirebaseConfig.js';
import DefaultView from "../components/DefaultView.js";
import GlobalStyles from "../styles/GlobalStyles.js";

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
                    <Button
                        title="Submit!"
                        onPress={() => setButtonPress(true)}
                    />
                {login &&
                    <Text style={GlobalStyles.BodyText}>Success! Logged in!</Text>
                }
                </View>
            }
            ButtonLink={"Home"}
            ButtonText={"Home"}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    textInput: {
        paddingLeft: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 35,
        marginTop: -15,
        fontSize: 18,
        height: 50,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 20,
    },
});
