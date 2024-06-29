import { View, Text, Button } from "react-native";
import { useState } from "react";
import GlobalStyles from '../styles/GlobalStyles.js';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function DefaultView({ HeaderText, Content, ButtonLink, ButtonText }) {
    const [numberOfLines, setNumberOfLines] = useState(1);
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'white',
        }}>
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
            <View style={ {flex: 1} }>
                {Content}
            </View>
            <View style={ {height: 80} }>
                <Button
                    style={GlobalStyles.navButton}
                    containerStyle={GlobalStyles.buttonContainer}
                    title={ButtonText+""}
                    onPress = {() =>
                        navigation.navigate({name: ButtonLink})
                    }
                />
            </View>
        </View>
    );
}
