import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from 'react';
import ScrollingSelect from '../components/ScrollingSelect.js';
import DefaultView from "../components/DefaultView.js";
import { RE_KEY } from '@env';

export default function TeamSelectScreen() {
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        get_competitions(setNames, setLoading, setError);
    }, []);

    if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

    const Competitions = names.map(name => ({ title: name }));

    return (
        <DefaultView
            HeaderText = {"Select Competition and Team"}
            Content = {
                <View style = {styles.scrollingSelectContainer}>
                    <ScrollingSelect Data={Competitions} Placeholder="Select Competition"/>
                    <ScrollingSelect Data={TeamNames} Placeholder="Select Team"/>
                </View>
            }
            ButtonLink = {"Home"}
            ButtonText = {"Home"}
        />
    );
}

async function get_competitions(setNames, setLoading, setError) {
    // high stakes = 190 spin up = 173
    // 13765X = 111877
    const api_key = {RE_KEY};
    const team_number = "111877"; //
    const season = "173"; //
    const request_url = "https://www.robotevents.com/api/v2/events?team%5B%5D="+team_number+"&season%5B%5D="+season+"&myEvents=false";
    const headers = {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json'
    };
    try {
        const reply = await fetch(request_url, {headers})
        if (!reply.ok) throw new Error("Error: " + reply.statusText);
        const result = await reply.json();
        const competition_names = result.data.map(item => item.name);
        setNames(competition_names);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};

const TeamNames = [
    {title: "112123"},
    {title: "112121"},
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

const styles = StyleSheet.create ({
    scrollingSelectContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
