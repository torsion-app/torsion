import { useEffect, useRef, useState } from "react";
import { View, FlatList, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { send_msg, view_msgs } from "../components/Firebase/FirebaseConfig";
import GlobalStyles from "../styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

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
            setSent(sent+1);
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
        }}>
            <LinearGradient
                style={GlobalStyles.background}
                colors={['#737373', '#919191']}
                start={{x: 0, y:0}}
                locations={[0.3, 0.7]}
            />
            <View style={ [GlobalStyles.headerTextContainer, {height: 50}] }>
                <Text 
                    style={GlobalStyles.headerText}
                >Chat with {route.params.search}</Text>
                <StatusBar barStyle="auto" />
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
