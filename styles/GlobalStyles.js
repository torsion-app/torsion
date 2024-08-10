import { StyleSheet } from "react-native";

export default GlobalStyles = StyleSheet.create({
    headerTextContainer: {
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
        color: '#edebeb',
    },
    BodyText: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 20,
        color: '#edebeb',
    },
    scrollingSelectContainer: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    subtitle: {
        paddingLeft: 15,
        paddingTop: 35,
        fontSize: 20,
        fontWeight: "bold",
        color: "#edebeb",
    },
    textInput: {
        paddingLeft: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 35,
        marginTop: -15,
        fontSize: 18,
        height: 50,
        borderColor: "black",
        borderWidth: 1.15,
        borderRadius: 20,
        color: 'white',
        borderColor: '#edebeb',
    },
});
