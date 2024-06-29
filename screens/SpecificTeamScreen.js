import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import { useFonts } from 'expo-font';
import DefaultView from "../components/DefaultView";
import call_re_api from "../components/REApiCall";

export default function SpecificTeamScreen({route}) {
    let [fontsLoaded] = useFonts({RobotoMono_400Regular});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selected_team = route.params.selected_team;
    const selected_comp = route.params.selected_comp;
    const selected_team_num = route.params.selected_team_num;
    
    const [teamEventData, setTeamEventData] = useState([]);
    const url = "https://www.robotevents.com/api/v2/teams/"+selected_team+"/rankings?event%5B%5D="+selected_comp;
    useEffect(() => {
        call_re_api(setTeamEventData, null, loading, setLoading, error, setError, url, 'team event data');
    }, [selected_team]);

    const total_played = teamEventData[1]+teamEventData[2]+teamEventData[3];

    if (!fontsLoaded) {
        return <View />;
    } else {
        return (
            <DefaultView
                HeaderText={`${selected_team_num} Information`}
                Content={
                    <View style={styles.DataTextContainer}>
                        <Text style={styles.DataText}>Rank:         {teamEventData[0]}th</Text>
                        <Text style={styles.DataText}>Wins:         {teamEventData[1]}/{total_played}</Text>
                        {teamEventData[3] > 0 &&
                            <Text style={styles.DataText}>Ties:         {teamEventData[3]}/{total_played}</Text>
                        }
                        <Text style={styles.DataText}>Losses:       {teamEventData[2]}/{total_played}</Text>
                        <Text style={styles.DataText}>WP:           {teamEventData[4]}</Text>
                        <Text style={styles.DataText}>AP:           {teamEventData[5]}</Text>
                        <Text style={styles.DataText}>SP:           {teamEventData[6]}</Text>
                        <Text style={styles.DataText}>High Score:   {teamEventData[7]}</Text>
                        <Text style={styles.DataText}>Avg Score:    {teamEventData[8]}</Text>
                    </View>
                }
                ButtonLink={"Home"}
                ButtonText={"Home"}
            />
        );
    }
}

const styles = StyleSheet.create({
    DataTextContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    DataText: {
        fontSize: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: 'RobotoMono_400Regular',

    }
});
