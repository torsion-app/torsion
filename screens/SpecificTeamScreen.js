import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import { useFonts } from 'expo-font';
import DefaultView from "../components/DefaultView";
import call_re_api from "../components/REApiCall";
import Loading from "../components/Loading";

export default function SpecificTeamScreen({selected_team, selected_team_num, selected_comp, loading, setLoading}) {
    let [fontsLoaded] = useFonts({RobotoMono_400Regular});
    const [error, setError] = useState(null);

    const [teamEventData, setTeamEventData] = useState([]);
    const url = "https://www.robotevents.com/api/v2/teams/"+selected_team+"/rankings?event%5B%5D="+selected_comp;
    useEffect(() => {
        async function callapi() {
            await call_re_api(setTeamEventData, null, loading, setLoading, error, setError, url, 'team event data');
        }
        callapi();
    }, [selected_team]);

    useEffect(() => {
        if (fontsLoaded) setLoading(false);
    }, [fontsLoaded]);

    const total_played = teamEventData[1]+teamEventData[2]+teamEventData[3];
    const last_digit_of_rank = teamEventData[0] % 10;

    return (
        <View style={styles.DataTextContainer}>
            <Text style={styles.DataTextTitle}>{selected_team_num} Statistics:</Text>
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>Rank:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[0]}{last_digit_of_rank === 1 ? "st" : last_digit_of_rank === 2 ? "nd" : last_digit_of_rank === 3 ? "rd" : "th"}</Text>
            </View>
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>Wins:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[1]}/{total_played}</Text>
            </View>
            {teamEventData[3] > 0 &&
                <View style={styles.DataRow}>
                    <Text style={styles.DataTextLabel}>Ties:</Text>
                    <Text style={styles.DataTextValue}>{teamEventData[3]}/{total_played}</Text>
                </View>
            }
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>Losses:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[2]}/{total_played}</Text>
            </View>
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>WP:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[4]}</Text>
            </View>
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>AP:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[5]}</Text>
            </View>
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>SP:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[6]}</Text>
            </View>
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>High Score:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[7]}</Text>
            </View>
            <View style={styles.DataRow}>
                <Text style={styles.DataTextLabel}>Avg Score:</Text>
                <Text style={styles.DataTextValue}>{teamEventData[8]}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    DataTextContainer: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 25,
        backgroundColor: '#505050',
        borderRadius: 20,
        alignSelf: 'center',
        width: Dimensions.get("window").width - 40,
    },
    DataTextTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 5,
    },
    DataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    DataTextLabel: {
        fontSize: 23,
        color: 'white',
    },
    DataTextValue: {
        fontSize: 23,
        color: '#dddddd',
    },
});
