import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Select Team</Text>
            <ScrollingTeamSelect Data={TeamNames} />
            <StatusBar style="auto" />
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
        top: 65,
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
