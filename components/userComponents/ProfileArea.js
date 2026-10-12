import { View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import UserProfileBox from "./UserProfileBox.js";
import FriendList from "./FriendList.js";

// --------------------------------------------------------------------------------
// This holds the current user and the user they are matching things with
// --------------------------------------------------------------------------------
const ProfileArea = () => {
    const [friendListActive, setFriendListActive] = useState(false);
    // eventually get this from backend and wire up a little differently
    const userProfile = require('../../assets/profileImg/p1.png');
    const partnerProfile = require('../../assets/profileImg/p2.png');

    return (
        <View style={styles.profilesCotainer}>
            <UserProfileBox profilePic={userProfile}/>
            {friendListActive ? <FriendList /> : null}
            <Pressable
                onPress={()=>setFriendListActive(!friendListActive)}
            >
                <UserProfileBox profilePic={partnerProfile}/>
            </Pressable>
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
        position: "relative",
    },
});
// --------------------------------------------------------------------------------
export default ProfileArea;