import { useState, useEffect } from 'react';
import { FlatList, Text, ScrollView, View, ActivityIndicator } from "react-native";
import DefaultView from "../components/DefaultView";
import ScrollingSelect from "../components/ScrollingSelect";
import { view_sent_requests } from "../components/Firebase/FirebaseConfig";
import GlobalStyles from '../styles/GlobalStyles';
import { fetch_uid_team } from '../components/Firebase/FirebaseConfig';
import call_re_api from '../components/REApiCall';

export default function RequestsScreen() {
    const [requestsSent, SetRequestsSent] = useState([]);
    const [selected_comp, setSelectedComp] = useState(null);

    useEffect(() => {
        async function findsent() {
            console.log("comp: ", selected_comp);
            const reply = await view_sent_requests(selected_comp);
            SetRequestsSent(reply);
        }
        if (selected_comp !== null) findsent();
    }, [selected_comp]);

    const [team_id, setTeamId] = useState(null);
    const [comp_names, setCompNames] = useState([]);
    const [comp_ids, setCompIds] = useState([]);
    const [mappedComps, setMappedComps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const season = "173"; //

    useEffect(() => {
        async function getteamnum() {
            const team_number = await fetch_uid_team();
            const team_id_url = "https://www.robotevents.com/api/v2/teams?number%5B%5D="+team_number+"&myTeams=false";
            call_re_api(setTeamId, null, loading, setLoading, error, setError, team_id_url, 'single id');
        }
        getteamnum();
    }, []);

    useEffect(() => {
        if (team_id !== null && team_id !== undefined) {
            const comp_url = "https://www.robotevents.com/api/v2/events?team%5B%5D="+team_id+"&season%5B%5D="+season+"&myEvents=false";
            call_re_api(setCompNames, setCompIds, loading, setLoading, error, setError, comp_url, 'name');
        }
    }, [team_id]);

    useEffect(() => {
        setMappedComps(comp_names.map((name, index) => ({
            label: name,
            value: comp_ids[index],
        })));
    }, [comp_names, comp_ids]);

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

    return (
        <DefaultView
            HeaderText={"View Alliance Requests"}
            Content={
                <View>
                    <View style={{paddingBottom: 70, zIndex: 100}}>
                        <Text style={{paddingLeft: 15, paddingTop: 20, fontSize: 20, fontWeight: "bold"}}>Select Competition:</Text>
                        <View style = {GlobalStyles.scrollingSelectContainer}>
                            <ScrollingSelect Data={mappedComps} Placeholder="Select Competition" selectedValue={selected_comp} onSelect={setSelectedComp} zindex={100}/>
                        </View>
                    </View>
                    <ScrollView style={{zIndex: 10}}>
                        <Text style={{paddingLeft: 15, paddingTop: 20, fontSize: 20, fontWeight: "bold"}}>Requests Sent:</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={requestsSent}
                            renderItem={ 
                                ({item}) => 
                                    <Text style={GlobalStyles.BodyText}>{item.requested}: {item.accepted ? "Accepted!" : "No reply yet"}</Text>
                            }
                            keyExtractor={(item) => item.id}
                        />
                        <Text style={{paddingLeft: 15, paddingTop: 35, fontSize: 20, fontWeight: "bold"}}>Requests Recieved:</Text>
                    </ScrollView>
                </View>
            }
        />
    );
}
