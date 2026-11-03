import { View, StyleSheet, Text } from "react-native";
// --------------------------------------------------------------------------------
const UserSettingsComponent = ({state, dispatch}) => {

    const styles = StyleSheet.create({
        userSettingsContainer : {

            position: "absolute",
            top: 110,

            width : "100%",
            height: "69%",
            backgroundColor: "#0f0f0f",
            alignSelf: "center",
      
            alignItems: "center",
            zIndex : 10,

        },
        profileHeader:{
            fontFamily: "OpenCustom",
            fontSize: 36,
            color: "#FFFFFF",
            marginVertical: 10,
        },

    });

    return (
        <View style={styles.userSettingsContainer}>
            <Text style={styles.profileHeader}>
                User Settings
            </Text>
        </View>
    );

}
// --------------------------------------------------------------------------------
export default UserSettingsComponent;

