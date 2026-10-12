import { View, StyleSheet, Text } from "react-native";

import IsoSphere from "../../assets/svg/IsoSphere";

const HeaderComponent = ({state})=> {

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
            fontFamily: state.logoTextFont,
            fontSize: state.logoTextSize,
            color: state.logoTextColor,
            zIndex: 2,
        },
    });

    return (

        <View style={styles.headerContainer}>
            <Text style={styles.logoStyle}>
                eSUriO
            </Text>
            <IsoSphere
                width={300}
                height={300}
                lightColor = {state.logoColor_1}
                darkColor = {state.logoColor_2}
            />
        </View>

    );
}



export default HeaderComponent


