import React, { } from 'react';
import { Text, View, Button } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles.js';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen ({navigation}) {
    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.headerText}>Home Screen</Text>
            <Button
                style={GlobalStyles.navButton}
                containerStyle={GlobalStyles.buttonContainer}
                title="Select Team"
                onPress = { () =>
                    navigation.navigate("Team Selection")
                }
            />
            <StatusBar barStyle="auto" />
        </View>
    );
}
