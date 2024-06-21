import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from 'react';
import ScrollingSelect from '../components/ScrollingSelect.js';
import DefaultView from "../components/DefaultView.js";
import { RE_KEY } from '@env';

export default function TeamSelectScreen() {
    const [names, setNames] = useState([]);
    const [ids, setIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // high stakes = 190 spin up = 173
    // 13765X = 111877
    const team_number = "111877"; //
    const season = "173"; //
    const comp_url = "https://www.robotevents.com/api/v2/events?team%5B%5D="+team_number+"&season%5B%5D="+season+"&myEvents=false";
    call_api(setNames, setIds, setLoading, setError, loading, error, comp_url);
    const Competitions = names.map(name => ({ title: name }));
    const event_ids = ids;

    const team_url = "";

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

function call_api(setNames, setIds, setLoading, setError, loading, error, url) {
    useEffect(() => {
        get_competitions(setNames, setIds, setLoading, setError, url);
    }, []);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }
}

async function get_competitions(setNames, setIds, setLoading, setError, url) {
    const headers = {
        'Authorization': `Bearer ${RE_KEY}`,
        'Content-Type': 'application/json'
    };
    try {
        const reply = await fetch(url, {headers})
        if (!reply.ok) throw new Error("Error: " + reply.statusText);
        const result = await reply.json();
        const all_names = result.data.map(item => item.name);
        setNames(all_names);
        const all_ids = result.data.map(item => item.id);
        setIds(all_ids);
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
