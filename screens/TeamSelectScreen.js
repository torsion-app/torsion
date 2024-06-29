import { View, StyleSheet, Button } from "react-native";
import { useEffect, useState } from 'react';
import ScrollingSelect from '../components/ScrollingSelect.js';
import DefaultView from "../components/DefaultView.js";
import call_re_api from "../components/REApiCall.js";
import { make_request } from "../components/Firebase/FirebaseConfig.js";
import GlobalStyles from "../styles/GlobalStyles.js";

export default function TeamSelectScreen({navigation}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [comp_names, setCompNames] = useState([]);
    const [comp_ids, setCompIds] = useState([]);
    const [mappedComps, setMappedComps] = useState([]);
    const [team_names, setTeamNames] = useState([]);
    const [team_ids, setTeamIds] = useState([]);

    const [selected_comp, setSelectedComp] = useState(null);
    const [selected_team, setSelectedTeam] = useState(null);
    const [selected_team_num, setSelectedTeamNum] = useState(null);
    const [team_names_dd, setTeamNamesDd] = useState([]);

    const [request_sent, setRequestSent] = useState(false);

    // high stakes = 190 spin up = 173
    // 13765X = 111877
    const team_number = "111877"; //
    const season = "173"; //
    const comp_url = "https://www.robotevents.com/api/v2/events?team%5B%5D="+team_number+"&season%5B%5D="+season+"&myEvents=false";

    useEffect(() => {
        call_re_api(setCompNames, setCompIds, loading, setLoading, error, setError, comp_url, 'name');
    }, []);

    useEffect(() => {
        setMappedComps(comp_names.map((name, index) => ({
            label: name,
            value: comp_ids[index],
        })));
    }, [comp_names, comp_ids]);

    useEffect(() => {
        if (selected_comp) {
            const team_url = "https://www.robotevents.com/api/v2/teams?event%5B%5D="+selected_comp+"&myTeams=false&per_page=250";
            call_re_api(setTeamNames, setTeamIds, loading, setLoading, error, setError, team_url, 'number');
        }
    }, [selected_comp]);

    useEffect(() => {
        setTeamNamesDd(team_names.map((name, index) => ({
            label: name,
            value: team_ids[index],
        })));
    }, [team_names, team_ids]);

    useEffect(() => {
        if (selected_team) {
            const url = 'https://www.robotevents.com/api/v2/teams/'+selected_team;
            call_re_api(setSelectedTeamNum, null, loading, setLoading, error, setError, url, 'single number');
        }
    }, [selected_team]);

    async function alliance_requested() {
        console.log("1");
        if (!request_sent) {
            const res = await make_request(selected_team_num, selected_comp);
            if (res) {
                setRequestSent(true);
            }
        }
    }

    return (
        <DefaultView
            HeaderText = {"Select Competition and Team"}
            Content = {
                <View style = {styles.scrollingSelectContainer}>
                    <ScrollingSelect Data={mappedComps} Placeholder="Select Competition" selectedValue={selected_comp} onSelect={setSelectedComp} zindex={2000}/>
                    {selected_comp && (
                        <ScrollingSelect Data={team_names_dd} Placeholder="Select Team" selectedValue={selected_team} onSelect={setSelectedTeam} zindex={1000}/>
                    )}
                    {selected_team_num && (
                        <View style={{paddingTop: 15}}>
                            <Button
                                title={`${selected_team_num} Team Information`}
                                containerStyle={GlobalStyles.buttonContainer}
                                    onPress = {() =>
                                    navigation.navigate("Team Info", {selected_team, selected_team_num, selected_comp})
                                }
                            />
                            <View style={{paddingTop: 20}}/>
                            <Button
                                title={`Request Alliance with ${selected_team_num}`}
                                containerStyle={GlobalStyles.buttonContainer}
                                onPress = {() => alliance_requested()}
                            />
                            {request_sent &&
                                <Text style={GlobalStyles.BodyText}>Request Sent!</Text>
                            }
                        </View>
                    )}
                </View>
            }
            ButtonLink = {"Home"}
            ButtonText = {"Home"}
        />
    );
}

const styles = StyleSheet.create ({
    scrollingSelectContainer: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
