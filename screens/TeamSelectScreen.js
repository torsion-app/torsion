import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from 'react';
import ScrollingSelect from '../components/ScrollingSelect.js';
import DefaultView from "../components/DefaultView.js";
import { RE_KEY } from '@env';

export default function TeamSelectScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [comp_names, setCompNames] = useState([]);
    const [comp_ids, setCompIds] = useState([]);
    const [team_names, setTeamNames] = useState([]);
    const [team_ids, setTeamIds] = useState([]);

    const [selected_comp, setSelectedComp] = useState(null);
    const [team_name_dd, setTeamNameDd] = useState(null);

    // high stakes = 190 spin up = 173
    // 13765X = 111877
    const team_number = "111877"; //
    const season = "173"; //
    const comp_url = "https://www.robotevents.com/api/v2/events?team%5B%5D="+team_number+"&season%5B%5D="+season+"&myEvents=false";
    call_api(setCompNames, setCompIds, setLoading, setError, loading, error, comp_url, []);
    const Competitions = comp_names.map((name, index) => ({
        title: name,
        id: comp_ids[index],
    }));

    useEffect(() => {
        const team_url = "https://www.robotevents.com/api/v2/teams?event%5B%5D="+selected_comp+"&myTeams=false";
        call_api(setTeamNames, setTeamIds, setLoading, setError, loading, error, team_url, []);
        setTeamNameDd(team_names.map((name, index) => ({
            title: name,
            id: team_ids[index],
        })));
    }, [selected_comp]);

    return (
        <DefaultView
            HeaderText = {"Select Competition and Team"}
            Content = {
                <View style = {styles.scrollingSelectContainer}>
                    <ScrollingSelect Data={Competitions} Placeholder="Select Competition" onSelect={setSelectedComp}/>
                    <ScrollingSelect Data={team_name_dd} Placeholder="Select Team"/>
                </View>
            }
            ButtonLink = {"Home"}
            ButtonText = {"Home"}
        />
    );
}

function call_api(setNames, setIds, setLoading, setError, loading, error, url, render) {
    useEffect(() => {
        get_api_data(setNames, setIds, setLoading, setError, url);
    }, render);

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

async function get_api_data(setNames, setIds, setLoading, setError, url) {
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

const styles = StyleSheet.create ({
    scrollingSelectContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
