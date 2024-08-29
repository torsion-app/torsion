import { useEffect, useRef, useState } from "react";
import { View, FlatList, Text, TextInput, KeyboardAvoidingView, Pressable } from "react-native";
import { send_msg, view_msgs } from "../components/Firebase/FirebaseConfig";
import GlobalStyles from "../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function TeamChatScreen({navigation, route}) {
    const [msgs, setMsgs] = useState(null);
    const [send, setSend] = useState("");
    const [sent, setSent] = useState(0);
    const flatListRef = useRef(null);

    useEffect(() => {
        async function set_msgs() {
            const Messages = await view_msgs(route.params.search);
            setMsgs(Messages);
        }
        set_msgs();
    }, [sent]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSent(value => value+1);
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            backgroundColor: '#121212',
        }}>
            <View style={[GlobalStyles.headerTextContainer, {flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5}, {height: 50}] }>
                <Text 
                    style={GlobalStyles.headerText}
                >Chat with {route.params.search}</Text>
                <Pressable onPress={() => navigation.navigate("Main Screen")} style={({pressed}) => [{opacity: pressed ? 0.5 : 1, paddingRight: 20}]}>
                    <Ionicons style={{justifyContent: 'center'}} name={"arrow-back-outline"} size={35} color={'gray'} />
                </Pressable>
            </View>
            <KeyboardAvoidingView style={{flex:1, justifyContent: 'flex-end'}} behavior="padding" keyboardVerticalOffset={90}>
                <FlatList
                    ref={flatListRef}
                    scrollEnabled={true}
                    data={msgs}
                    renderItem={ 
                        ({item}) => <Text style={{
                            fontSize: 20,
                            paddingTop: 20,
                            paddingLeft: 20,
                            color: '#edebeb',
                        }}>{item.sender}: {item.content}</Text>
                    }
                    keyExtractor={(item) => item.id}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false }) }
                />
                <View style={{padding: 20}} />
                <TextInput
                    ref={input => { this.textInput = input }}
                    style={GlobalStyles.textInput}
                    placeholder='Message'
                    placeholderTextColor='white'
                    onChangeText={input => setSend(input)}
                    returnKeyType="send"
                    value={send}
                    onSubmitEditing={() => {
                        setSend("");
                        setSent(sent+1);
                        send_msg(route.params.search, send);
                    }}
                    clearButtonMode="always"
                />
            </KeyboardAvoidingView>
        </View>
    );
}
