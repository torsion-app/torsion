import { View } from "react-native";
import ScrollingSelect from '../components/ScrollingSelect.js';
import DefaultView from "../components/DefaultView.js";

export default function TeamSelectScreen () {
    return (
        <DefaultView
            HeaderText = {"Select Competition and Team"}
            Content = {
                <View>
                    <ScrollingSelect Data={TeamNames} Placeholder="Select Team"/>
                    <ScrollingSelect Data={TeamNames} Placeholder="Select Team"/>
                </View>
            }
            ButtonLink = {"Home"}
            ButtonText = {"Home"}
        />
    );
}

const Competitions = [

];

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
