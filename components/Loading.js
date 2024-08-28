import { ActivityIndicator, View } from "react-native";

export default function Loading() {
    return (
        <View style={ {flex: 1, justifyContent: 'center', backgroundColor: '#121212'} }>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
}

export function OverlayLoading() {
    return <ActivityIndicator style={{position:'absolute', zIndex:999, bottom: '50%', left: '50%'}} size="large" color="white" />;
}
