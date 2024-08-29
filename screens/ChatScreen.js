import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import DefaultView from "../components/DefaultView";
import TeamChatScreen from "./TeamChatScreen";
import GlobalStyles from "../styles/GlobalStyles";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { view_unreads } from "../components/Firebase/FirebaseConfig";

export default function ChatScreen({navigation}) {
    const [search, setSearch] = useState("");
    const [check, setCheck] = useState(0);
    const [unreads, setUnreads] = useState(null);

    useEffect(() => {
        async function set_unreads() {
            const teams = await view_unreads();
            setUnreads(teams);
        }
        set_unreads();
    }, [check]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCheck(value => value+1);
            console.log("all chats");
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <DefaultView
            HeaderText = {"All Chats"}
            Content = {
                <View style={{flex: 1}}>
                    <View style={{padding: 20}} />
                    <TextInput
                        selectionColor={'white'}
                        ref={this.textInput}
                        style={GlobalStyles.textInput}
                        placeholder='Team Number:'
                        placeholderTextColor='white'
                        onChangeText={input => setSearch(input)}
                        returnKeyType="google"
                        value={search}
                        onSubmitEditing={() => {
                            try {
                                const capitalised = search.substring(0, search.length-2) + search[search.length-1].toUpperCase;
                                if (capitalised.length <= 6) setSearch(capitalised);
                            }
                            catch (error) {}
                            if ( (search[0] >= '0' && search[0] <= '9') && (search[search.length-1] >= 'A' && search[search.length-1] <= 'Z') ) {
                                navigation.navigate("Team Chat", {search});
                                setSearch('');
                            }
                        }}
                    />
                    <Text style={{fontWeight:'bold', fontSize:24, color:'white', paddingLeft:20}}>Unreads:</Text>
                    {!unreads &&
                        <Text style={{fontSize: 18, color: 'white', padding: 25, alignSelf: 'center'}}>No new messages!</Text>
                    }
                    <FlatList
                        data={unreads}
                        keyExtractor={({item}) => item}
                        renderItem={({item}) =>
                            <Pressable
                                onPress={() => {
                                    const search = item;
                                    navigation.navigate("Team Chat", {search});
                                }}
                            >
                                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'white', alignSelf: 'center', padding: 10}}>{item} - unread</Text>
                            </Pressable>
                        }
                        ItemSeparatorComponent={<View style={{height: 1, backgroundColor: '#aaa', marginHorizontal: 30}} />}
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
