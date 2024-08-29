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
        }, 4000);
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
                        ({item}) => <ChatBubble sender={item.sender} content={item.content} other_team={route.params.search} />
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
                        if (send !== '') {
                            setSend("");
                            setSent(sent+1);
                            send_msg(route.params.search, send);
                        }
                    }}
                    clearButtonMode="always"
                />
            </KeyboardAvoidingView>
        </View>
    );
}

function ChatBubble({sender, content, other_team}) {
    if (sender === other_team) return (
        <View style={{flex: 1, backgroundColor: 'green', marginLeft: 15, maxWidth: 260, borderRadius: 20, marginVertical: 4, alignSelf: 'flex-start'}}>
            <Text
                style={{fontSize: 18, paddingVertical: 10, paddingHorizontal: 15, color: 'white'}}
            >{content}</Text>
        </View>
    );
    else return (
        <View style={{flex: 1, backgroundColor: '#0a84ff', marginRight: 15, maxWidth: 260, borderRadius: 20, marginVertical: 4, alignSelf: 'flex-end'}}>
            <Text
                style={{fontSize: 18, paddingVertical: 10, paddingHorizontal: 15, color: 'white'}}
            >{content}</Text>
        </View>
    );
}
