import react from "react";
import { Image, View, StyleSheet } from "react-native";

const List: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image source={require('./assets/images/human.png')} style={styles.Image} />
            <Image source={require('./assets/images/home.png')} style={styles.Image} />
            <Image source={require('./assets/images/calender.png')} style={styles.Image} />
            <Image source={require('./assets/images/checkbox.png')} style={styles.Image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },

    Image : {
        width : 30,
        height : 30,
        marginHorizontal: 5,
        borderRadius: 10,
    },
});