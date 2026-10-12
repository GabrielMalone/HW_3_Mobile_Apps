import { View, StyleSheet, Text } from "react-native";

import IsoSphere from "../../assets/svg/IsoSphere";

const HeaderComponent = ()=> {
    return (

        <View style={styles.headerContainer}>
            <Text style={styles.logoStyle}>
                ESuRio
            </Text>
            <IsoSphere
                width={300}
                height={300}
                lightColor = "#19adc149"
                darkColor = "#54063727"
            />
        </View>

    );
}

const styles = StyleSheet.create({
    headerContainer : {
        flexDirection: "row",
        justifyContent: "center",
        // backgroundColor: "#090909",
        marginBottom: 5,
        maxHeight: 45,
        overflow: "hidden",
        position: "relative",
    },
    logoStyle : {
        top: 3,
        position: "absolute",
        fontFamily: "UnicaCustom",
        fontSize: 36,
        color: "#FFFFFF",
        zIndex: 2,
    },
});

export default HeaderComponent


