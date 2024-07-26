import { View } from "react-native";
import DefaultView from "../components/DefaultView";
import TeamChatScreen from "./TeamChatScreen";

export default function ChatScreen() {
    return (
        <DefaultView
            HeaderText = {"Chats"}
            Content = {
                <View style={{flex: 1}}>
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
