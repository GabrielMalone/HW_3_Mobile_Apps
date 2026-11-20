import { View, StyleSheet, Text, Pressable } from "react-native";
import GlobeSearchIcon from "../../assets/svg/GlobeSeachIcon";
import ResetIcon from "../../assets/svg/ResetIcon";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import { clearLikesAndDislikes, setSearchRadius } from "../../helpers/firebaseDatabase";
import { logOut } from "../../helpers/firebaseAuth";
// --------------------------------------------------------------------------------
const radiusOptions = [1000, 2000, 5000, 10000];

const activeColor = "lightgreen";
const mutedColor = "dimgray";
// --------------------------------------------------------------------------------
const SettingsAction = ({label, Icon, onPress, color = "#FFFFFF"}) => {
    return (
        <Pressable
            style={({pressed}) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
            ]}
            onPress={onPress}
        >
            {({pressed}) => (
                <>
                    <Icon color={pressed ? activeColor : color} size={24}/>
                    <Text style={[styles.actionText, {color: pressed ? activeColor : color}]}>
                        {label}
                    </Text>
                </>
            )}
        </Pressable>
    );
}
// --------------------------------------------------------------------------------
const UserSettingsComponent = ({state, dispatch}) => {

    const updateRadius = async (radius) => {
        dispatch({type: "SET_SEARCH_RADIUS", searchRadius: radius});
        await setSearchRadius(state.uid, radius);
    }

    return (
        <View style={styles.userSettingsContainer}>
            <Text style={styles.profileHeader}>
                Settings
            </Text>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <GlobeSearchIcon color={mutedColor} size={24}/>
                    <Text style={styles.sectionTitle}>
                        Search radius
                    </Text>
                </View>
                <View style={styles.radiusRow}>
                    {radiusOptions.map((radius) => {
                        const selected = state.searchRadius === radius;
                        return (
                            <Pressable
                                key={radius}
                                style={[styles.radiusPill, selected && styles.radiusPillSelected]}
                                onPress={() => updateRadius(radius)}
                            >
                                <Text style={[styles.radiusText, selected && styles.radiusTextSelected]}>
                                    {radius / 1000} km
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>

            <View style={styles.section}>
                <SettingsAction
                    label="Reset Shuffle"
                    Icon={ResetIcon}
                    onPress={async () => {
                        dispatch({type: "RESET_LIKED"});
                        await clearLikesAndDislikes(state.uid);
                    }}
                />
                <SettingsAction
                    label="Log out"
                    Icon={SettingsIcon}
                    color="#FAA0A0"
                    onPress={() => logOut(dispatch, state)}
                />
            </View>
        </View>
    );

}
// --------------------------------------------------------------------------------
const styles = StyleSheet.create({
    userSettingsContainer : {
        flex: 1,
        width : "100%",
        backgroundColor: "#0f0f0f",
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    profileHeader:{
        fontFamily: "OpenCustom",
        fontSize: 36,
        color: "#FFFFFF",
        marginVertical: 10,
    },
    section : {
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#343734",
        paddingVertical: 16,
        gap: 12,
    },
    sectionHeader : {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    sectionTitle : {
        fontFamily: "OpenCustom",
        fontSize: 16,
        color: "#FFFFFF",
    },
    radiusRow : {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    radiusPill : {
        borderWidth: 1,
        borderColor: mutedColor,
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    radiusPillSelected : {
        borderColor: activeColor,
    },
    radiusText : {
        fontFamily: "OpenCustom",
        fontSize: 14,
        color: "#FFFFFF",
    },
    radiusTextSelected : {
        color: activeColor,
    },
    actionButton : {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#151515",
    },
    actionButtonPressed : {
        backgroundColor: "#1d1d1d",
    },
    actionText : {
        fontFamily: "OpenCustom",
        fontSize: 16,
    },
});
// --------------------------------------------------------------------------------
export default UserSettingsComponent;
