import { StyleSheet } from "react-native";

export default GlobalStyles = StyleSheet.create({
    headerTextContainer: {
        backgroundColor: '#d4d4d4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        width: 80,
        backgroundColor: '#fff',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 50,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 26,
        position: 'relative',
    },
    navButton: {
        position: 'absolute',
        bottom: 0,
        left: 15,
    },
});
