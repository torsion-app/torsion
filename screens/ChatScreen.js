import { View, TextInput } from "react-native";
import DefaultView from "../components/DefaultView";
import TeamChatScreen from "./TeamChatScreen";
import GlobalStyles from "../styles/GlobalStyles";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function ChatScreen({navigation}) {
    const [search, setSearch] = useState("");
    return (
        <DefaultView
            HeaderText = {"All Chats"}
            Content = {
                <View style={{flex: 1}}>
                    <View style={{padding: 20}} />
                    <TextInput
                        style={GlobalStyles.textInput}
                        placeholder='Team Number:'
                        placeholderTextColor='white'
                        onChangeText={input => setSearch(input)}
                        returnKeyType="google"
                        onSubmitEditing={() => navigation.navigate("Team Chat", {search})}
                    />
                </View>
            }
        />
    );
}

export function ChatScreenStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Main Screen"
                component={ChatScreen}
            />
            <Stack.Screen
                name="Team Chat"
                component={TeamChatScreen}
            />
        </Stack.Navigator>
    );
}
