import React, { } from 'react';
import { View } from 'react-native';
import DefaultView from '../components/DefaultView.js';

export default function HomeScreen() {
    return (
        <DefaultView
            HeaderText = {"Home Screen"}
            Content = {
                <View></View>
            }
            ButtonLink = {"Team Selection"}
            ButtonText = {"Select Team"}
        />
    );
}
