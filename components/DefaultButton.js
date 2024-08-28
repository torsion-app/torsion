import { View, Pressable, Text } from "react-native";

export default function DefaultButton({text, touched}) {
    return (
        <Pressable onPress={touched} style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
            <View style={{backgroundColor: '#0a84ff', alignItems: 'center', justifyContent: 'center', marginHorizontal:20, borderRadius: 20}}>
                <Text style={{fontSize: 20, color: 'white', padding: 10}}>{text}</Text>
            </View>
        </Pressable>
    );
}
