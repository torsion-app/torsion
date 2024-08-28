import { View, Text, Button, Pressable } from "react-native";
import GlobalStyles from '../styles/GlobalStyles.js';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { firebase_logout } from "./Firebase/FirebaseConfig.js";

export default function DefaultView({ HeaderText, logout, Content, ButtonLink, ButtonText }) {
    const navigation = useNavigation();

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#121212'
        }}>
            { HeaderText &&
                <View style={[GlobalStyles.headerTextContainer, {flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5}]}>
                    <Text 
                        style={GlobalStyles.headerText}
                    >{HeaderText}</Text>
                    { logout &&
                        <Pressable onPress={firebase_logout} style={{paddingRight: 20}}>
                            <Ionicons style={{justifyContent: 'center'}} name={"log-out-outline"} size={35} color={'gray'} />
                        </Pressable>
                    }
                </View>
            }
            { Content &&
                <View style={ {flex: 1} }>
                    {Content}
                </View>
            }
            { ButtonLink && ButtonText &&
                <View style={ {height: 80} }>
                    <Button
                        title={ButtonText+""}
                        onPress = {() =>
                            navigation.navigate({name: ButtonLink})
                        }
                        color='#93d6fa'
                    />
                </View>
            }
        </View>
    );
}
