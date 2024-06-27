import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useEffect, useState } from 'react';
import ScrollingSelect from '../components/ScrollingSelect.js';
import DefaultView from "../components/DefaultView.js";
import { useNavigation } from '@react-navigation/native';
import { RE_KEY } from '@env';

export default function TeamSelectScreen() {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [comp_names, setCompNames] = useState([]);
    const [comp_ids, setCompIds] = useState([]);
    const [mappedComps, setMappedComps] = useState([]);
    const [team_names, setTeamNames] = useState([]);
    const [team_ids, setTeamIds] = useState([]);

    const [selected_comp, setSelectedComp] = useState(null);
    const [selected_team, setSelectedTeam] = useState(null);
    const [team_names_dd, setTeamNamesDd] = useState([]);

    // high stakes = 190 spin up = 173
    // 13765X = 111877
    const team_number = "111877"; //
    const season = "173"; //
    const comp_url = "https://www.robotevents.com/api/v2/events?team%5B%5D="+team_number+"&season%5B%5D="+season+"&myEvents=false";

    useEffect(() => {
        call_api(setCompNames, setCompIds, setLoading, setError, loading, error, comp_url, 'name');
    }, []);

    useEffect(() => {
        console.log('comp_names:', comp_names);
        console.log('comp_ids:', comp_ids);
        setMappedComps(comp_names.map((name, index) => ({
            label: name,
            value: comp_ids[index],
        })));
    }, [comp_names, comp_ids]);

    useEffect(() => {
        console.log('selected comp: ', selected_comp);
        if (selected_comp) {
            const team_url = "https://www.robotevents.com/api/v2/teams?event%5B%5D="+selected_comp+"&myTeams=false&per_page=250";
            call_api(setTeamNames, setTeamIds, setLoading, setError, loading, error, team_url, 'number');
        }
    }, [selected_comp]);

    useEffect(() => {
        console.log('team names: ', team_names);
        setTeamNamesDd(team_names.map((name, index) => ({
            label: name,
            value: team_ids[index],
        })));
    }, [team_names, team_ids]);

    return (
        <DefaultView
            HeaderText = {"Select Competition and Team"}
            Content = {
                <View style = {styles.scrollingSelectContainer}>
                    <ScrollingSelect Data={mappedComps} Placeholder="Select Competition" selectedValue={selected_comp} onSelect={setSelectedComp} zindex={2000}/>
                    {selected_comp && (
                        <ScrollingSelect Data={team_names_dd} Placeholder="Select Team" selectedValue={selected_team} onSelect={setSelectedTeam} zindex={1000}/>
                    )}
                    {selected_team && (
                        <Button
                            title={`${selected_team.label} Team Information`}
                            style={GlobalStyles.navButton}
                            containerStyle={GlobalStyles.buttonContainer}
                                onPress = {() =>
                                navigation.navigate({name: "Team Info"})
                            }
                        />
                    )}
                </View>
            }
            ButtonLink = {"Home"}
            ButtonText = {"Home"}
        />
    );
}

function call_api(setNames, setIds, setLoading, setError, loading, error, url, info) {
    setLoading(true);
    get_api_data(setNames, setIds, setLoading, setError, url, info);

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

async function get_api_data(setNames, setIds, setLoading, setError, url, info) {
    const headers = {
        'Authorization': `Bearer ${RE_KEY}`,
        'Content-Type': 'application/json'
    };
    try {
        const reply = await fetch(url, {headers})
        if (!reply.ok) throw new Error("Error: " + reply.statusText);
        const result = await reply.json();
        console.log('result: ', result);
        let all_names = null;
        if (info === 'name') {
            all_names = result.data.map(item => item.name);
        } else if (info === 'number') {
            all_names = result.data.map(item => item.number);
        }
        setNames(all_names);
        const all_ids = result.data.map(item => item.id);
        setIds(all_ids);
        console.log('Fetched Names:', all_names);
        console.log('Fetched IDs:', all_ids);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};

const styles = StyleSheet.create ({
    scrollingSelectContainer: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
