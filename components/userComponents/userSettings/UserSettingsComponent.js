import { View, StyleSheet, Text } from "react-native";

const UserSettingsComponent = ({state, dispatch}) => {

    const styles = StyleSheet.create({
        userSettingsContainer : {
            width : "80%",
            height: "75%",
            borderWidth : 1,
            borderColor: "#ffffff87",
            backgroundColor: "#0f0f0f",
            borderRadius: 10,
            alignSelf: "center",
            
            alignItems: "center",

        },
        profileHeader:{
            fontFamily: "OpenCustom",
            fontSize: 36,
            color: "#FFFFFF",
            marginVertical: 10,
        },

    });

    console.log("we are here!");

    return (
        <View style={styles.userSettingsContainer}>
            <Text style={styles.profileHeader}>
                Profile Settings
            </Text>
        </View>
    );

}

export default UserSettingsComponent;

