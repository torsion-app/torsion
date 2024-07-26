import { View, Text, Button } from "react-native";
import { useState } from "react";
import GlobalStyles from '../styles/GlobalStyles.js';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";

export default function DefaultView({ HeaderText, Content, ButtonLink, ButtonText }) {
    const [numberOfLines, setNumberOfLines] = useState(1);
    const navigation = useNavigation();

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <LinearGradient
                style={GlobalStyles.background}
                colors={['#737373', '#919191']}
                start={{x: 0, y:0}}
                locations={[0.3, 0.7]}
            />
            { HeaderText &&
                <View style={ [GlobalStyles.headerTextContainer, {height: 50*numberOfLines}] }>
                    <Text 
                        style={GlobalStyles.headerText}
                        onTextLayout={(e) => {
                            const lines = e.nativeEvent.lines.length;
                            setNumberOfLines(lines);
                        }}
                    >{HeaderText}</Text>
                    <StatusBar barStyle="auto" />
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
