import React from "react";
import { View } from "react-native";
import DefaultView from "../components/DefaultView";

export default function SpecificTeamScreen({route}) {
    const selected_team_num = route.params.selected_team_num;
    console.log(route.params);
    return (
        <DefaultView
            HeaderText={`${selected_team_num} Information`}
            Content={
                <View></View>
            }
            ButtonLink={"Home"}
            ButtonText={"Home"}
        />
    );
}
