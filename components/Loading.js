import { ActivityIndicator, View } from "react-native";

export default function Loading() {
    return (
        <View style={ {flex: 1, justifyContent: 'center'} }>
            <ActivityIndicator size="large" color="#000000" />
        </View>
    );
}
