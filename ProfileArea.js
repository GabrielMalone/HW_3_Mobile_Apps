import { View, StyleSheet } from "react-native";
import UserProfileBox from "./UserProfileBox";
// --------------------------------------------------------------------------------
const ProfileArea = () => {

    // eventually get this from backend and wire up a little differently
    const userProfile = require('./assets/profileImg/p1.png');
    const partnerProfile = require('./assets/profileImg/p2.png');

    return (
        <View style={styles.profilesCotainer}>
            <UserProfileBox profilePic={userProfile}/>
            <UserProfileBox profilePic={partnerProfile}/>
        </View>
    );
}
// --------------------------------------------------------------------------------
const styles = StyleSheet.create({
    profilesCotainer:{
        width: "100%",
        maxHeight: 125,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
});
// --------------------------------------------------------------------------------
export default ProfileArea;