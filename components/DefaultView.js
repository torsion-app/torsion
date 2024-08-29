import { View, Text, Pressable } from "react-native";
import GlobalStyles from '../styles/GlobalStyles.js';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { firebase_logout } from "./Firebase/FirebaseConfig.js";

export default function DefaultView({ HeaderText, logout, setLogin, Content, ButtonLink, ButtonText }) {
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
                        <Pressable
                            onPress={() => {
                                firebase_logout();
                                setLogin(false);
                            }}
                            style={({pressed}) => [
                                {
                                    opacity: pressed ? 0.5 : 1,
                                    paddingRight: 20
                                }
                            ]}
                        >
                            <Ionicons style={{justifyContent: 'center'}} name={"log-out-outline"} size={35} color={'gray'} />
                        </Pressable>
                    }
                </View>
            }
            { Content &&
                <View style={{flex: 1}}>
                    {Content}
                </View>
            }
            { ButtonLink && ButtonText &&
                <View style={{height: 80}}>
                    <Pressable onPress={() => navigation.navigate({name: ButtonLink})} style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
                        <View style={{backgroundColor: '#0a84ff', alignItems: 'center', justifyContent: 'center', marginHorizontal:20, borderRadius: 20}}>
                            <Text style={{fontSize: 20, color: 'white', padding: 10}}>{ButtonText}</Text>
                        </View>
                    </Pressable>
                </View>
            }
        </View>
    );
}
