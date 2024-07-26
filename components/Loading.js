import { ActivityIndicator, View } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import { LinearGradient } from 'expo-linear-gradient';

export default function Loading() {
    return (
        <View style={ {flex: 1, justifyContent: 'center', backgroundColor: 'white'} }>
            <LinearGradient
                style={GlobalStyles.background}
                colors={['#737373', '#919191']}
            />
            <ActivityIndicator size="large" color="white" />
        </View>
    );
}

export function OverlayLoading() {
    return <ActivityIndicator style={{position:'absolute', zIndex:999, bottom: '50%', left: '50%'}} size="large" color="white" />;
}
