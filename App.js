import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Team Selection"
                    component={TeamSelectScreen}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
      );
}

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Home Screen</Text>
            <Button
                style={styles.navButton}
                containerStyle={styles.buttonContainer}
                title="Select Team"
                onPress = { () =>
                    navigation.navigate("Team Selection")
                }
            />

        </View>
    );
}

const TeamSelectScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Select Team</Text>
            <ScrollingTeamSelect Data={TeamNames} />
            <Button
                style={styles.navButton}
                containerStyle={styles.buttonContainer}
                title="Home"
                onPress = { () =>
                    navigation.navigate("Home")
                }
            />
            <StatusBar barStyle="auto" />
        </View>
    );
}


const ScrollingTeamSelect = ({Data}) => {
    const [selectedValue, setSelectedValue] = useState(null);
    return (
        <Dropdown
            style={styles.dropdown}
            data={Data}
            labelField="title"
            placeholder="Select team"
            value={selectedValue}
            onChange={item => {
                setSelectedValue(item.value);
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        width: 80,
        backgroundColor: '#fff',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 50,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 35,
        position: 'absolute',
        top: 10,
        left: 15,
    },
    navButton: {
        fontSize: 63,
        position: 'absolute',
        bottom: 0,
        left: 15,
    },
    dropdown: {
        height: 50,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});

const TeamNames = [
    {title: "13765X"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
    {title: "112123"},
];
