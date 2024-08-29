import { useState, useEffect } from 'react';
import { FlatList, Text, ScrollView, View, Pressable } from "react-native";
import DefaultView from "../components/DefaultView";
import ScrollingSelect from "../components/ScrollingSelect";
import { OverlayLoading } from '../components/Loading';
import { accept_req, view_received_requests, view_sent_requests } from "../components/Firebase/FirebaseConfig";
import GlobalStyles from '../styles/GlobalStyles';
import { fetch_uid_team } from '../components/Firebase/FirebaseConfig';
import call_re_api from '../components/REApiCall';

export default function RequestsScreen() {
    const [requestsSent, SetRequestsSent] = useState([]);
    const [requestsGot, SetRequestsGot] = useState([]);
    const [selected_comp, setSelectedComp] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function findreqs() {
            setLoading(true);
            const reply = await view_sent_requests(selected_comp);
            SetRequestsSent(reply);
            const Reply = await view_received_requests(selected_comp);
            SetRequestsGot(Reply);
            setLoading(false);
        }
        if (selected_comp !== null) findreqs();
    }, [selected_comp, refresh]);

    const [team_id, setTeamId] = useState(null);
    const [comp_names, setCompNames] = useState([]);
    const [comp_ids, setCompIds] = useState([]);
    const [mappedComps, setMappedComps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const season = "173"; //

    useEffect(() => {
        async function getteamnum() {
            setLoading(true);
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

    async function accepted(id) {
        const res = await accept_req(id);
        if (res) setRefresh(refresh+1);
    }

    if (error) {
        return (
            <Text style={GlobalStyles.BodyText}>Error: {error.message}</Text>
        );
    }

    return (
        <DefaultView
            HeaderText={"View All Requests"}
            Content={
                <View style={{flex:1}}>
                    {loading &&
                        <OverlayLoading />
                    }
                    <View style={{marginTop: -10, paddingBottom: 45, zIndex: 100}}>
                        <Text style={GlobalStyles.subtitle}>Select Competition:</Text>
                        <View style = {GlobalStyles.scrollingSelectContainer}>
                            <ScrollingSelect Data={mappedComps} Placeholder="Select Competition" selectedValue={selected_comp} onSelect={setSelectedComp} zindex={100}/>
                        </View>
                    </View>
                    <ScrollView style={{zIndex: 10}}>
                        <Text style={GlobalStyles.subtitle}>Requests Sent:</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={requestsSent}
                            renderItem={ 
                                ({item}) => 
                                    <Text style={GlobalStyles.BodyText}>{item.requested}: {item.accepted ? "Accepted!" : "No reply yet"}</Text>
                            }
                            keyExtractor={(item) => item.id}
                        />
                        <Text style={GlobalStyles.subtitle}>Requests Recieved:</Text>
                        <FlatList
                            scrollEnabled={false}
                            data={requestsGot}
                            renderItem={ 
                                ({item}) => 
                                    <View>
                                        <Text style={GlobalStyles.BodyText}>{item.requester}: {item.accepted ? "Accepted!" : "No reply sent"}</Text>
                                        {!item.accepted &&
                                            <Pressable onPressOut={() => accepted(item.id)}>
                                                <Text style={{fontSize: 20, textAlign: "center", color: "blue", textDecorationLine:"underline", paddingTop: 5}}>Accept</Text>
                                            </Pressable>
                                        }
                                    </View>
                            }
                            keyExtractor={(item) => item.id}
                        />
                    </ScrollView>
                </View>
            }
        />
    );
}
